#!/usr/bin/env python

import sys
import re
import tokenize
import StringIO

_versions = {
    '2.7.6' : '2.7',
    '3.3.5' : '3.3',
}
_baseUrl = "http://docs.python.org/%s/reference/grammar.html"
_nodeTypes = {
    'SINGLE': 0,
    'MULTIPLE': 1,
}

class Leaf(object):
    def __init__(self, value, optional, multiple, literal):
        self.value = value
        self.optional = optional
        self.multiple = multiple
        self.literal = literal

    def __repr__(self):
        if self.literal:
            return "'%s'" % self.value
        else:
            return str(self.value)

    @classmethod
    def create(cls, match, force_optional, literal):
        optional = force_optional or match.group(2) == '*'
        multiple = match.group(2) in ('*', '+')
        return cls(match.group(1), optional, multiple, literal)

    @classmethod
    def node(cls, match, force_optional, node):
        optional = force_optional or match.group(2) == '*'
        multiple = match.group(2) in ('*', '+')
        return cls(node, optional, multiple, False)

    @classmethod
    def subnode(cls, node, optional, multiple):
        return cls(node, optional, multiple, False)

class Node(object):
    def __init__(self, name, rawstr):
        self.name = name
        if not any(x in rawstr for x in ('xor_expr',)):
            self.rawstr = rawstr.replace('|', ' | ')
        else:
            self.rawstr = rawstr
        self.expr = [[]]
        #self.subnodes = []

    def __repr__(self):
        return "N'%s'" % self.name

    def toString(self):
        return '%s:\t%s\n\t%s' % (self.name, self.rawstr, str(self.expr))

def testLiteral(s):
    return re.match(r"'([^']+)'(\s|$|\*|\+)", s)
def testToken(s):
    return re.match(r'([A-Z]+)(\s|$|\*|\+)', s)
def testNode(s):
    return re.match(r'([a-z][a-z0-9_]+)(\s|$|\*|\+)', s)

def testLiteralEnd(s):
    return re.match(r"'([^']+)'($)", s)
def testTokenEnd(s):
    return re.match(r'([A-Z]+)($)', s)
def testNodeEnd(s):
    return re.match(r'([a-z][a-z0-9_]+)($)', s)
    
_brackets = {
    '(': ')',
    '[': ']',
}

def getBracketStr(s):
    pos = 1
    openBr = 1
    ob = s[0]
    while pos < len(s):
        if s[pos] == ob:
            openBr += 1
        elif s[pos] == _brackets[ob]:
            openBr -= 1
        if openBr == 0: break
        pos += 1
    return s[1:pos]

def parseNodeStr(node, nodes):
    pos = 0
    or_lvl = 0
    while pos < len(node.rawstr):
        s = node.rawstr[pos:]
        isLit   = testLiteral(s)
        isToken = testToken(s)
        isNode  = testNode(s)
        if s[0] == ' ':
            pos += 1
        elif isLit:
            node.expr[or_lvl].append(Leaf.create(isLit, False, True))
            pos += len(isLit.group(0))
        elif isToken:
            node.expr[or_lvl].append(Leaf.create(isToken, False, False))
            pos += len(isToken.group(0))
        elif isNode:
            #node.expr[or_lvl].append(nodes[isNode.group(1)])
            node.expr[or_lvl].append(Leaf.node(isNode, False, nodes[isNode.group(1)]))
            pos += len(isNode.group(0))
        elif s[0] == '|':
            or_lvl += 1
            node.expr.append([])
            pos += 1
        elif s[0] == '[':
            inner = getBracketStr(s)
            # if inner isLit/Token/Node - add simple optional leaf
            innLit   = testLiteralEnd(inner)
            innToken = testTokenEnd(inner)
            innNode  = testNodeEnd(inner)
            if innLit:
                node.expr[or_lvl].append(Leaf.create(innLit, True, True))
            elif innToken:
                node.expr[or_lvl].append(Leaf.create(innToken, True, False))
            elif innNode:
                node.expr[or_lvl].append(Leaf.node(innNode, True, nodes[innNode.group(1)]))
            else:
                n = Node('%s_%d_%d' % (node.name, or_lvl, len(node.expr[or_lvl])), inner)
                multiple = len(s) > (len(inner)+2) and s[len(inner)+2] in ('*', '+')
                # Unlikely to have multiple optional but might be valid...
                node.expr[or_lvl].append(Leaf.subnode(n, True, multiple))
                parseNodeStr(n, nodes)
                if multiple:
                    pos += 1
            pos += len(inner)+2
        elif s[0] == '(':
            inner = getBracketStr(s)

            n = Node('%s_%d_%d' % (node.name, or_lvl, len(node.expr[or_lvl])), inner)
            multiple = len(s) > (len(inner)+2) and s[len(inner)+2] in ('*', '+')
            optional = len(s) > (len(inner)+2) and s[len(inner)+2] == '*'
            # Unlikely to have multiple optional but might be valid...
            node.expr[or_lvl].append(Leaf.subnode(n, optional, multiple))
            parseNodeStr(n, nodes)
            if optional or multiple:
                pos += 1
            pos += len(inner)+2
        elif s[0] == '#':
            return
        else:
            print "Unknown: %s (%s)" % (s, node)
            pos += 1

def parseNodes(nodes):
    for k, node in nodes.items():
        parseNodeStr(node, nodes)

def parseGrammar(g):
    names = {}
    nodes = {}
    for l in g:
        if len(l) == 0: continue
        if l[0] == '#': continue
        m = re.match(r'([a-z0-9_]+):(.*)$', l)
        c = re.match(r'\s+(.*)$', l)

        if m:
            name = m.group(1)
            names[name] = m.group(2)
        elif c:
            names[name] += ' '+c.group(1)
        else:
            print "Warning: unmatched line '%s'" % l

    for k in names.keys():
        nodes[k] = Node(k, names[k])

    parseNodes(nodes) 
    
    return nodes

def usage():
    print 'Usage: ./gen_grammar.py [VERSION|FILE] TARGET'
    print ''
    print 'Currently supported/tested versions:',
    print ', '.join(_versions.keys())

if __name__ == '__main__':
    if len(sys.argv) != 3:
        usage()
    else:
        grammar = []
        if sys.argv[1] in _versions:
            try:
                import urllib2
                from xml.sax.saxutils import unescape

                gf = urllib2.urlopen(_baseUrl % _versions[sys.argv[1]])

                state = 'INIT'
                for l in gf:
                    if l[0] == '#': continue
                    if state == 'INIT':
                        m = re.search(r'id="full-grammar-specification"', l)
                        if m:
                            state = 'PRE'
                    if state == 'PRE':
                        m = re.search(r'<pre>(.*)$', l)
                        if m:
                            state = 'ENDPRE'
                            grammar.append(m.group(1).rstrip('\r\n'))
                    elif state == 'ENDPRE':
                        m = re.search(r'(.*)</pre>', l)
                        if m:
                            grammar.append(m.group(1).rstrip('\r\n'))
                            break
                        else:
                            grammar.append(l.rstrip('\r\n'))

                # Cleaning up html from 3.3 grammar
                # Nowhere near foolproof but only has to deal with a couple of variations
                for i in xrange(len(grammar)):
                    grammar[i] = re.sub(r'<.*?>', '', grammar[i])
                    grammar[i] = unescape(grammar[i])
                    grammar[i] = re.sub(r'&#(\d+);', lambda m: chr(int(m.group(1), 10)), grammar[i])
            except:
                raise
                print "Couldn't open Python grammar from %s, try specifying a local copy" % \
                        (_baseUrl % _versions[sys.argv[1]])
                sys.exit()
        else:
            gf = open(sys.argv[1])
            grammar = list(gf)
            for i in xrange(len(grammar)):
                grammar[i] = re.sub(r'^#.*$', '', grammar[i], 0, re.MULTILINE)
                grammar[i] = grammar[i].rstrip('\r\n')
        
        
        g = parseGrammar(grammar)

        #for k in sorted(g.keys()):
        #    print g[k].toString()

        #if sys.argv[1] in _versions:
        #    f = open('python_%s_grammar.js' % sys.argv[1], 'w')
        #else:
        #    f = open('python_grammar.js', 'w')
        f = StringIO.StringIO()

        f.write('var grammar = {};\n\n')
        f.write('var nodes = ["')
        f.write('", "'.join(g.keys()))
        f.write('"];\n\n')

        f.write("""
for (var i = 0; i < nodes.length; (i++)) {
    grammar[nodes[i]] = {};
}

""")

        def node_literal(node):
            expr = []
            for orl in node.expr:
                eor = []
                for e in orl:
                    s = ''
                    if isinstance(e.value, Node): # Node
                        jtype = "N"
                        m = re.match(r'([a-z][a-z0-9_]+)_\d+_\d+', e.value.name)
                        if not m: # Top node
                            jval = 'grammar.%s' % e.value.name
                        else: # Subnode
                            jval = node_literal(e.value)
                    else:
                        if e.literal: # Literal
                            jtype = 'L'
                        else: # Token
                            jtype = 'T'
                        jval = '"%s"' % e.value
                    s += 'type: "%s", ' % jtype
                    s += 'name: "sn", '
                    s += 'val: %s, ' % jval
                    s += 'opt: %s, ' % ('true' if e.optional else 'false')
                    s += 'mul: %s' % ('true' if e.multiple else 'false')
                    eor.append(s)
                expr.append('{%s}' % '}, {'.join(eor))
            
            return '{expr: [[%s]]}' % ' ], ['.join(expr)

        for k in sorted(g.keys()):
            f.write('grammar.%s.expr = ' % k)
            f.write('[[')
            
            expr = []
            for orl in g[k].expr:
                eor = []
                for e in orl:
                    jname = None
                    if isinstance(e.value, Node): # Node
                        jtype = "N"
                        m = re.match(r'([a-z][a-z0-9_]+)_\d+_\d+', e.value.name)
                        if not m: # Top node
                            jval = 'grammar.%s' % e.value.name
                            jname = e.value.name
                        else: # Subnode
                            jval = node_literal(e.value)
                    else:
                        if e.literal: # Literal
                            jtype = 'L'
                        else: # Token
                            jtype = 'T'
                        jval = '"%s"' % e.value
                    s = 'type: "%s", ' % jtype
                    if jname is not None:
                        s += 'name: "%s", ' % jname
                    s += 'val: %s, ' % jval
                    s += 'opt: %s, ' % ('true' if e.optional else 'false')
                    s += 'mul: %s' % ('true' if e.multiple else 'false')
                    eor.append(s)
                expr.append('{%s}' % '}, {'.join(eor))
            f.write(' ], ['.join(expr))            

            f.write(']]')
            f.write(';\n')
        f.write('''
grammar.entry = grammar.file_input;
''')

        target = open(sys.argv[2], 'r')
        tstr = ''.join(target.readlines())
        target.close()
        target = open(sys.argv[2], 'w')
        
        pattern = r'/\*START_PYTHON_GRAMMAR\*/(.*)/\*END_PYTHON_GRAMMAR\*/'
        repl = r'/*START_PYTHON_GRAMMAR*/\n%s\n/*END_PYTHON_GRAMMAR*/' % f.getvalue()
        f.close()
        target.write(re.sub(pattern, repl, tstr, 1, re.DOTALL))
        target.close()


"""
        subnodes = []
        done_sub = []
        lines = []

        for k in sorted(g.keys()):
            for orl in g[k].expr:
                for e in orl:
                    if isinstance(e.value, Node):
                        name = e.value.name
                        m = re.match(r'([a-z][a-z0-9_]+)_\d+_\d+', name)
                        if m:
                            name = m.group(1)
                            subnodes.append(e.value)
                        if name == g[k].name:
                            continue
                        l = "%s -> %s" % (g[k].name, name)
                        if not l in lines:
                            lines.append(l)
        while len(subnodes) > 0:
            node = subnodes.pop()
            done_sub.append(node.name)
            for orl in node.expr:
                for e in orl:
                    if isinstance(e.value, Node):
                        name1 = e.value.name
                        name2 = node.name
                        m1 = re.match(r'([a-z][a-z0-9_]+?)_\d+_\d+', name1)
                        if m1:
                            name1 = m1.group(1)
                            #subnodes.append(e.value)
                            if e.value.name not in done_sub:
                                subnodes.append(e.value)
                        m2 = re.match(r'([a-z][a-z0-9_]+?)_\d+_\d+', name2)
                        if m2:
                            name2 = m2.group(1)
                        if name1 == name2:
                            continue
                        l = "%s -> %s" % (name2, name1)
                        if not l in lines:
                            lines.append(l)

        if sys.argv[1] in _versions:
            f = open('python_%s.dot' % sys.argv[1], 'w')
        else:
            f = open('python.dot', 'w')
        f.write('digraph Python {\n')
        f.write('page="8.3,11.7";\n')
        f.write(';\n'.join(lines))

        f.write('\n}\n')
        f.close()
"""

