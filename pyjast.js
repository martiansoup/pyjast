/*
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Alex Beharrell
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Author: Alex Beharrell <endlessroad.co.uk>
 */
      
/*START_PYTHON_GRAMMAR*/
var grammar = {};

var nodes = ["print_stmt", "dotted_as_names", "import_as_name", "try_stmt", "eval_input", "small_stmt", "augassign", "import_from", "fplist", "funcdef", "return_stmt", "yield_stmt", "not_test", "testlist_comp", "suite", "listmaker", "old_test", "arglist", "break_stmt", "except_clause", "comp_op", "expr_stmt", "parameters", "single_input", "fpdef", "shift_expr", "dotted_as_name", "list_iter", "exec_stmt", "factor", "test", "testlist_safe", "subscript", "with_item", "import_name", "compound_stmt", "and_expr", "dotted_name", "yield_expr", "power", "comparison", "simple_stmt", "subscriptlist", "dictorsetmaker", "testlist", "comp_if", "stmt", "encoding_decl", "assert_stmt", "list_for", "for_stmt", "and_test", "lambdef", "atom", "import_as_names", "decorated", "raise_stmt", "old_lambdef", "exprlist", "decorator", "pass_stmt", "sliceop", "global_stmt", "term", "comp_iter", "if_stmt", "xor_expr", "argument", "decorators", "del_stmt", "or_test", "classdef", "expr", "with_stmt", "while_stmt", "varargslist", "testlist1", "comp_for", "import_stmt", "continue_stmt", "list_if", "arith_expr", "flow_stmt", "trailer", "file_input"];


for (var i = 0; i < nodes.length; (i++)) {
    grammar[nodes[i]] = {};
}

grammar.and_expr.expr = [[{type: "N", name: "shift_expr", val: grammar.shift_expr, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: "&", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.shift_expr, opt: false, mul: false}]]}, opt: true, mul: true}]];
grammar.and_test.expr = [[{type: "N", name: "not_test", val: grammar.not_test, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: "and", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.not_test, opt: false, mul: false}]]}, opt: true, mul: true}]];
grammar.arglist.expr = [[{type: "N", val: {expr: [[{type: "N", name: "sn", val: grammar.argument, opt: false, mul: false}, {type: "L", name: "sn", val: ",", opt: false, mul: false}]]}, opt: true, mul: true}, {type: "N", val: {expr: [[{type: "N", name: "sn", val: grammar.argument, opt: false, mul: false}, {type: "L", name: "sn", val: ",", opt: true, mul: false} ], [{type: "L", name: "sn", val: "*", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.argument, opt: false, mul: false}]]}, opt: true, mul: true}, {type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "L", name: "sn", val: "**", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}]]}, opt: true, mul: false} ], [{type: "L", name: "sn", val: "**", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}]]}, opt: false, mul: false}]];
grammar.argument.expr = [[{type: "N", name: "test", val: grammar.test, opt: false, mul: false}, {type: "N", name: "comp_for", val: grammar.comp_for, opt: true, mul: false} ], [{type: "N", name: "test", val: grammar.test, opt: false, mul: false}, {type: "L", val: "=", opt: false, mul: false}, {type: "N", name: "test", val: grammar.test, opt: false, mul: false}]];
grammar.arith_expr.expr = [[{type: "N", name: "term", val: grammar.term, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: "+", opt: false, mul: false} ], [{type: "L", name: "sn", val: "-", opt: false, mul: false}]]}, opt: false, mul: false}, {type: "N", name: "sn", val: grammar.term, opt: false, mul: false}]]}, opt: true, mul: true}]];
grammar.assert_stmt.expr = [[{type: "L", val: "assert", opt: false, mul: false}, {type: "N", name: "test", val: grammar.test, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}]]}, opt: true, mul: false}]];
grammar.atom.expr = [[{type: "N", val: {expr: [[{type: "L", name: "sn", val: "(", opt: false, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "N", name: "sn", val: grammar.yield_expr, opt: false, mul: false} ], [{type: "N", name: "sn", val: grammar.testlist_comp, opt: false, mul: false}]]}, opt: true, mul: false}, {type: "L", name: "sn", val: ")", opt: false, mul: false} ], [{type: "L", name: "sn", val: "[", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.listmaker, opt: true, mul: false}, {type: "L", name: "sn", val: "]", opt: false, mul: false} ], [{type: "L", name: "sn", val: "{", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.dictorsetmaker, opt: true, mul: false}, {type: "L", name: "sn", val: "}", opt: false, mul: false} ], [{type: "L", name: "sn", val: "`", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.testlist1, opt: false, mul: false}, {type: "L", name: "sn", val: "`", opt: false, mul: false} ], [{type: "T", name: "sn", val: "NAME", opt: false, mul: false} ], [{type: "T", name: "sn", val: "NUMBER", opt: false, mul: false} ], [{type: "T", name: "sn", val: "STRING", opt: false, mul: true}]]}, opt: false, mul: false}]];
grammar.augassign.expr = [[{type: "N", val: {expr: [[{type: "L", name: "sn", val: "+=", opt: false, mul: false} ], [{type: "L", name: "sn", val: "-=", opt: false, mul: false} ], [{type: "L", name: "sn", val: "*=", opt: false, mul: false} ], [{type: "L", name: "sn", val: "/=", opt: false, mul: false} ], [{type: "L", name: "sn", val: "%=", opt: false, mul: false} ], [{type: "L", name: "sn", val: "&=", opt: false, mul: false} ], [{type: "L", name: "sn", val: "  |  =", opt: false, mul: false} ], [{type: "L", name: "sn", val: "^=", opt: false, mul: false} ], [{type: "L", name: "sn", val: "<<=", opt: false, mul: false} ], [{type: "L", name: "sn", val: ">>=", opt: false, mul: false} ], [{type: "L", name: "sn", val: "**=", opt: false, mul: false} ], [{type: "L", name: "sn", val: "//=", opt: false, mul: false}]]}, opt: false, mul: false}]];
grammar.break_stmt.expr = [[{type: "L", val: "break", opt: false, mul: false}]];
grammar.classdef.expr = [[{type: "L", val: "class", opt: false, mul: false}, {type: "T", val: "NAME", opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: "(", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.testlist, opt: true, mul: false}, {type: "L", name: "sn", val: ")", opt: false, mul: false}]]}, opt: true, mul: false}, {type: "L", val: ":", opt: false, mul: false}, {type: "N", name: "suite", val: grammar.suite, opt: false, mul: false}]];
grammar.comp_for.expr = [[{type: "L", val: "for", opt: false, mul: false}, {type: "N", name: "exprlist", val: grammar.exprlist, opt: false, mul: false}, {type: "L", val: "in", opt: false, mul: false}, {type: "N", name: "or_test", val: grammar.or_test, opt: false, mul: false}, {type: "N", name: "comp_iter", val: grammar.comp_iter, opt: true, mul: false}]];
grammar.comp_if.expr = [[{type: "L", val: "if", opt: false, mul: false}, {type: "N", name: "old_test", val: grammar.old_test, opt: false, mul: false}, {type: "N", name: "comp_iter", val: grammar.comp_iter, opt: true, mul: false}]];
grammar.comp_iter.expr = [[{type: "N", name: "comp_for", val: grammar.comp_for, opt: false, mul: false} ], [{type: "N", name: "comp_if", val: grammar.comp_if, opt: false, mul: false}]];
grammar.comp_op.expr = [[{type: "L", val: "<", opt: false, mul: false} ], [{type: "L", val: ">", opt: false, mul: false} ], [{type: "L", val: "==", opt: false, mul: false} ], [{type: "L", val: ">=", opt: false, mul: false} ], [{type: "L", val: "<=", opt: false, mul: false} ], [{type: "L", val: "<>", opt: false, mul: false} ], [{type: "L", val: "!=", opt: false, mul: false} ], [{type: "L", val: "in", opt: false, mul: false} ], [{type: "L", val: "not", opt: false, mul: false}, {type: "L", val: "in", opt: false, mul: false} ], [{type: "L", val: "is", opt: false, mul: false} ], [{type: "L", val: "is", opt: false, mul: false}, {type: "L", val: "not", opt: false, mul: false}]];
grammar.comparison.expr = [[{type: "N", name: "expr", val: grammar.expr, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "N", name: "sn", val: grammar.comp_op, opt: false, mul: false}, {type: "N", name: "sn", val: grammar.expr, opt: false, mul: false}]]}, opt: true, mul: true}]];
grammar.compound_stmt.expr = [[{type: "N", name: "if_stmt", val: grammar.if_stmt, opt: false, mul: false} ], [{type: "N", name: "while_stmt", val: grammar.while_stmt, opt: false, mul: false} ], [{type: "N", name: "for_stmt", val: grammar.for_stmt, opt: false, mul: false} ], [{type: "N", name: "try_stmt", val: grammar.try_stmt, opt: false, mul: false} ], [{type: "N", name: "with_stmt", val: grammar.with_stmt, opt: false, mul: false} ], [{type: "N", name: "funcdef", val: grammar.funcdef, opt: false, mul: false} ], [{type: "N", name: "classdef", val: grammar.classdef, opt: false, mul: false} ], [{type: "N", name: "decorated", val: grammar.decorated, opt: false, mul: false}]];
grammar.continue_stmt.expr = [[{type: "L", val: "continue", opt: false, mul: false}]];
grammar.decorated.expr = [[{type: "N", name: "decorators", val: grammar.decorators, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "N", name: "sn", val: grammar.classdef, opt: false, mul: false} ], [{type: "N", name: "sn", val: grammar.funcdef, opt: false, mul: false}]]}, opt: false, mul: false}]];
grammar.decorator.expr = [[{type: "L", val: "@", opt: false, mul: false}, {type: "N", name: "dotted_name", val: grammar.dotted_name, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: "(", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.arglist, opt: true, mul: false}, {type: "L", name: "sn", val: ")", opt: false, mul: false}]]}, opt: true, mul: false}, {type: "T", val: "NEWLINE", opt: false, mul: false}]];
grammar.decorators.expr = [[{type: "N", name: "decorator", val: grammar.decorator, opt: false, mul: true}]];
grammar.del_stmt.expr = [[{type: "L", val: "del", opt: false, mul: false}, {type: "N", name: "exprlist", val: grammar.exprlist, opt: false, mul: false}]];
grammar.dictorsetmaker.expr = [[{type: "N", val: {expr: [[{type: "N", name: "sn", val: {expr: [[{type: "N", name: "sn", val: grammar.test, opt: false, mul: false}, {type: "L", name: "sn", val: ":", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "N", name: "sn", val: grammar.comp_for, opt: false, mul: false} ], [{type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}, {type: "L", name: "sn", val: ":", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}]]}, opt: true, mul: true}, {type: "L", name: "sn", val: ",", opt: true, mul: false}]]}, opt: false, mul: false}]]}, opt: false, mul: false} ], [{type: "N", name: "sn", val: {expr: [[{type: "N", name: "sn", val: grammar.test, opt: false, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "N", name: "sn", val: grammar.comp_for, opt: false, mul: false} ], [{type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}]]}, opt: true, mul: true}, {type: "L", name: "sn", val: ",", opt: true, mul: false}]]}, opt: false, mul: false}]]}, opt: false, mul: false}]]}, opt: false, mul: false}]];
grammar.dotted_as_name.expr = [[{type: "N", name: "dotted_name", val: grammar.dotted_name, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: "as", opt: false, mul: false}, {type: "T", name: "sn", val: "NAME", opt: false, mul: false}]]}, opt: true, mul: false}]];
grammar.dotted_as_names.expr = [[{type: "N", name: "dotted_as_name", val: grammar.dotted_as_name, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.dotted_as_name, opt: false, mul: false}]]}, opt: true, mul: true}]];
grammar.dotted_name.expr = [[{type: "T", val: "NAME", opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: ".", opt: false, mul: false}, {type: "T", name: "sn", val: "NAME", opt: false, mul: false}]]}, opt: true, mul: true}]];
grammar.encoding_decl.expr = [[{type: "T", val: "NAME", opt: false, mul: false}]];
grammar.eval_input.expr = [[{type: "N", name: "testlist", val: grammar.testlist, opt: false, mul: false}, {type: "T", val: "NEWLINE", opt: true, mul: true}, {type: "T", val: "ENDMARKER", opt: false, mul: false}]];
grammar.except_clause.expr = [[{type: "L", val: "except", opt: false, mul: false}, {type: "N", val: {expr: [[{type: "N", name: "sn", val: grammar.test, opt: false, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: "as", opt: false, mul: false} ], [{type: "L", name: "sn", val: ",", opt: false, mul: false}]]}, opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}]]}, opt: true, mul: false}]]}, opt: true, mul: false}]];
grammar.exec_stmt.expr = [[{type: "L", val: "exec", opt: false, mul: false}, {type: "N", name: "expr", val: grammar.expr, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: "in", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}]]}, opt: true, mul: false}]]}, opt: true, mul: false}]];
grammar.expr.expr = [[{type: "N", name: "xor_expr", val: grammar.xor_expr, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: "|", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.xor_expr, opt: false, mul: false}]]}, opt: true, mul: true}]];
grammar.expr_stmt.expr = [[{type: "N", name: "testlist", val: grammar.testlist, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "N", name: "sn", val: grammar.augassign, opt: false, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "N", name: "sn", val: grammar.yield_expr, opt: false, mul: false} ], [{type: "N", name: "sn", val: grammar.testlist, opt: false, mul: false}]]}, opt: false, mul: false} ], [{type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: "=", opt: false, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "N", name: "sn", val: grammar.yield_expr, opt: false, mul: false} ], [{type: "N", name: "sn", val: grammar.testlist, opt: false, mul: false}]]}, opt: false, mul: false}]]}, opt: true, mul: true}]]}, opt: false, mul: false}]];
grammar.exprlist.expr = [[{type: "N", name: "expr", val: grammar.expr, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.expr, opt: false, mul: false}]]}, opt: true, mul: true}, {type: "L", val: ",", opt: true, mul: false}]];
grammar.factor.expr = [[{type: "N", val: {expr: [[{type: "L", name: "sn", val: "+", opt: false, mul: false} ], [{type: "L", name: "sn", val: "-", opt: false, mul: false} ], [{type: "L", name: "sn", val: "~", opt: false, mul: false}]]}, opt: false, mul: false}, {type: "N", name: "factor", val: grammar.factor, opt: false, mul: false} ], [{type: "N", name: "power", val: grammar.power, opt: false, mul: false}]];
grammar.file_input.expr = [[{type: "N", val: {expr: [[{type: "T", name: "sn", val: "NEWLINE", opt: false, mul: false} ], [{type: "N", name: "sn", val: grammar.stmt, opt: false, mul: false}]]}, opt: true, mul: true}, {type: "T", val: "ENDMARKER", opt: false, mul: false}]];
grammar.flow_stmt.expr = [[{type: "N", name: "break_stmt", val: grammar.break_stmt, opt: false, mul: false} ], [{type: "N", name: "continue_stmt", val: grammar.continue_stmt, opt: false, mul: false} ], [{type: "N", name: "return_stmt", val: grammar.return_stmt, opt: false, mul: false} ], [{type: "N", name: "raise_stmt", val: grammar.raise_stmt, opt: false, mul: false} ], [{type: "N", name: "yield_stmt", val: grammar.yield_stmt, opt: false, mul: false}]];
grammar.for_stmt.expr = [[{type: "L", val: "for", opt: false, mul: false}, {type: "N", name: "exprlist", val: grammar.exprlist, opt: false, mul: false}, {type: "L", val: "in", opt: false, mul: false}, {type: "N", name: "testlist", val: grammar.testlist, opt: false, mul: false}, {type: "L", val: ":", opt: false, mul: false}, {type: "N", name: "suite", val: grammar.suite, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: "else", opt: false, mul: false}, {type: "L", name: "sn", val: ":", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.suite, opt: false, mul: false}]]}, opt: true, mul: false}]];
grammar.fpdef.expr = [[{type: "T", val: "NAME", opt: false, mul: false} ], [{type: "L", val: "(", opt: false, mul: false}, {type: "N", name: "fplist", val: grammar.fplist, opt: false, mul: false}, {type: "L", val: ")", opt: false, mul: false}]];
grammar.fplist.expr = [[{type: "N", name: "fpdef", val: grammar.fpdef, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.fpdef, opt: false, mul: false}]]}, opt: true, mul: true}, {type: "L", val: ",", opt: true, mul: false}]];
grammar.funcdef.expr = [[{type: "L", val: "def", opt: false, mul: false}, {type: "T", val: "NAME", opt: false, mul: false}, {type: "N", name: "parameters", val: grammar.parameters, opt: false, mul: false}, {type: "L", val: ":", opt: false, mul: false}, {type: "N", name: "suite", val: grammar.suite, opt: false, mul: false}]];
grammar.global_stmt.expr = [[{type: "L", val: "global", opt: false, mul: false}, {type: "T", val: "NAME", opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "T", name: "sn", val: "NAME", opt: false, mul: false}]]}, opt: true, mul: true}]];
grammar.if_stmt.expr = [[{type: "L", val: "if", opt: false, mul: false}, {type: "N", name: "test", val: grammar.test, opt: false, mul: false}, {type: "L", val: ":", opt: false, mul: false}, {type: "N", name: "suite", val: grammar.suite, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: "elif", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}, {type: "L", name: "sn", val: ":", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.suite, opt: false, mul: false}]]}, opt: true, mul: true}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: "else", opt: false, mul: false}, {type: "L", name: "sn", val: ":", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.suite, opt: false, mul: false}]]}, opt: true, mul: false}]];
grammar.import_as_name.expr = [[{type: "T", val: "NAME", opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: "as", opt: false, mul: false}, {type: "T", name: "sn", val: "NAME", opt: false, mul: false}]]}, opt: true, mul: false}]];
grammar.import_as_names.expr = [[{type: "N", name: "import_as_name", val: grammar.import_as_name, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.import_as_name, opt: false, mul: false}]]}, opt: true, mul: true}, {type: "L", val: ",", opt: true, mul: false}]];
grammar.import_from.expr = [[{type: "N", val: {expr: [[{type: "L", name: "sn", val: "from", opt: false, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: ".", opt: true, mul: true}, {type: "N", name: "sn", val: grammar.dotted_name, opt: false, mul: false} ], [{type: "L", name: "sn", val: ".", opt: false, mul: true}]]}, opt: false, mul: false}, {type: "L", name: "sn", val: "import", opt: false, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: "*", opt: false, mul: false} ], [{type: "L", name: "sn", val: "(", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.import_as_names, opt: false, mul: false}, {type: "L", name: "sn", val: ")", opt: false, mul: false} ], [{type: "N", name: "sn", val: grammar.import_as_names, opt: false, mul: false}]]}, opt: false, mul: false}]]}, opt: false, mul: false}]];
grammar.import_name.expr = [[{type: "L", val: "import", opt: false, mul: false}, {type: "N", name: "dotted_as_names", val: grammar.dotted_as_names, opt: false, mul: false}]];
grammar.import_stmt.expr = [[{type: "N", name: "import_name", val: grammar.import_name, opt: false, mul: false} ], [{type: "N", name: "import_from", val: grammar.import_from, opt: false, mul: false}]];
grammar.lambdef.expr = [[{type: "L", val: "lambda", opt: false, mul: false}, {type: "N", name: "varargslist", val: grammar.varargslist, opt: true, mul: false}, {type: "L", val: ":", opt: false, mul: false}, {type: "N", name: "test", val: grammar.test, opt: false, mul: false}]];
grammar.list_for.expr = [[{type: "L", val: "for", opt: false, mul: false}, {type: "N", name: "exprlist", val: grammar.exprlist, opt: false, mul: false}, {type: "L", val: "in", opt: false, mul: false}, {type: "N", name: "testlist_safe", val: grammar.testlist_safe, opt: false, mul: false}, {type: "N", name: "list_iter", val: grammar.list_iter, opt: true, mul: false}]];
grammar.list_if.expr = [[{type: "L", val: "if", opt: false, mul: false}, {type: "N", name: "old_test", val: grammar.old_test, opt: false, mul: false}, {type: "N", name: "list_iter", val: grammar.list_iter, opt: true, mul: false}]];
grammar.list_iter.expr = [[{type: "N", name: "list_for", val: grammar.list_for, opt: false, mul: false} ], [{type: "N", name: "list_if", val: grammar.list_if, opt: false, mul: false}]];
grammar.listmaker.expr = [[{type: "N", name: "test", val: grammar.test, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "N", name: "sn", val: grammar.list_for, opt: false, mul: false} ], [{type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}]]}, opt: true, mul: true}, {type: "L", name: "sn", val: ",", opt: true, mul: false}]]}, opt: false, mul: false}]];
grammar.not_test.expr = [[{type: "L", val: "not", opt: false, mul: false}, {type: "N", name: "not_test", val: grammar.not_test, opt: false, mul: false} ], [{type: "N", name: "comparison", val: grammar.comparison, opt: false, mul: false}]];
grammar.old_lambdef.expr = [[{type: "L", val: "lambda", opt: false, mul: false}, {type: "N", name: "varargslist", val: grammar.varargslist, opt: true, mul: false}, {type: "L", val: ":", opt: false, mul: false}, {type: "N", name: "old_test", val: grammar.old_test, opt: false, mul: false}]];
grammar.old_test.expr = [[{type: "N", name: "or_test", val: grammar.or_test, opt: false, mul: false} ], [{type: "N", name: "old_lambdef", val: grammar.old_lambdef, opt: false, mul: false}]];
grammar.or_test.expr = [[{type: "N", name: "and_test", val: grammar.and_test, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: "or", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.and_test, opt: false, mul: false}]]}, opt: true, mul: true}]];
grammar.parameters.expr = [[{type: "L", val: "(", opt: false, mul: false}, {type: "N", name: "varargslist", val: grammar.varargslist, opt: true, mul: false}, {type: "L", val: ")", opt: false, mul: false}]];
grammar.pass_stmt.expr = [[{type: "L", val: "pass", opt: false, mul: false}]];
grammar.power.expr = [[{type: "N", name: "atom", val: grammar.atom, opt: false, mul: false}, {type: "N", name: "trailer", val: grammar.trailer, opt: true, mul: true}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: "**", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.factor, opt: false, mul: false}]]}, opt: true, mul: false}]];
grammar.print_stmt.expr = [[{type: "L", val: "print", opt: false, mul: false}, {type: "N", val: {expr: [[{type: "N", name: "sn", val: {expr: [[{type: "N", name: "sn", val: grammar.test, opt: false, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}]]}, opt: true, mul: true}, {type: "L", name: "sn", val: ",", opt: true, mul: false}]]}, opt: true, mul: false} ], [{type: "L", name: "sn", val: ">>", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}]]}, opt: false, mul: true}, {type: "L", name: "sn", val: ",", opt: true, mul: false}]]}, opt: true, mul: false}]]}, opt: false, mul: false}]];
grammar.raise_stmt.expr = [[{type: "L", val: "raise", opt: false, mul: false}, {type: "N", val: {expr: [[{type: "N", name: "sn", val: grammar.test, opt: false, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}]]}, opt: true, mul: false}]]}, opt: true, mul: false}]]}, opt: true, mul: false}]];
grammar.return_stmt.expr = [[{type: "L", val: "return", opt: false, mul: false}, {type: "N", name: "testlist", val: grammar.testlist, opt: true, mul: false}]];
grammar.shift_expr.expr = [[{type: "N", name: "arith_expr", val: grammar.arith_expr, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: "<<", opt: false, mul: false} ], [{type: "L", name: "sn", val: ">>", opt: false, mul: false}]]}, opt: false, mul: false}, {type: "N", name: "sn", val: grammar.arith_expr, opt: false, mul: false}]]}, opt: true, mul: true}]];
grammar.simple_stmt.expr = [[{type: "N", name: "small_stmt", val: grammar.small_stmt, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: ";", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.small_stmt, opt: false, mul: false}]]}, opt: true, mul: true}, {type: "L", val: ";", opt: true, mul: false}, {type: "T", val: "NEWLINE", opt: false, mul: false}]];
grammar.single_input.expr = [[{type: "T", val: "NEWLINE", opt: false, mul: false} ], [{type: "N", name: "simple_stmt", val: grammar.simple_stmt, opt: false, mul: false} ], [{type: "N", name: "compound_stmt", val: grammar.compound_stmt, opt: false, mul: false}, {type: "T", val: "NEWLINE", opt: false, mul: false}]];
grammar.sliceop.expr = [[{type: "L", val: ":", opt: false, mul: false}, {type: "N", name: "test", val: grammar.test, opt: true, mul: false}]];
grammar.small_stmt.expr = [[{type: "N", val: {expr: [[{type: "N", name: "sn", val: grammar.expr_stmt, opt: false, mul: false} ], [{type: "N", name: "sn", val: grammar.print_stmt, opt: false, mul: false} ], [{type: "N", name: "sn", val: grammar.del_stmt, opt: false, mul: false} ], [{type: "N", name: "sn", val: grammar.pass_stmt, opt: false, mul: false} ], [{type: "N", name: "sn", val: grammar.flow_stmt, opt: false, mul: false} ], [{type: "N", name: "sn", val: grammar.import_stmt, opt: false, mul: false} ], [{type: "N", name: "sn", val: grammar.global_stmt, opt: false, mul: false} ], [{type: "N", name: "sn", val: grammar.exec_stmt, opt: false, mul: false} ], [{type: "N", name: "sn", val: grammar.assert_stmt, opt: false, mul: false}]]}, opt: false, mul: false}]];
grammar.stmt.expr = [[{type: "N", name: "simple_stmt", val: grammar.simple_stmt, opt: false, mul: false} ], [{type: "N", name: "compound_stmt", val: grammar.compound_stmt, opt: false, mul: false}]];
grammar.subscript.expr = [[{type: "L", val: ".", opt: false, mul: false}, {type: "L", val: ".", opt: false, mul: false}, {type: "L", val: ".", opt: false, mul: false} ], [{type: "N", name: "test", val: grammar.test, opt: false, mul: false} ], [{type: "N", name: "test", val: grammar.test, opt: true, mul: false}, {type: "L", val: ":", opt: false, mul: false}, {type: "N", name: "test", val: grammar.test, opt: true, mul: false}, {type: "N", name: "sliceop", val: grammar.sliceop, opt: true, mul: false}]];
grammar.subscriptlist.expr = [[{type: "N", name: "subscript", val: grammar.subscript, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.subscript, opt: false, mul: false}]]}, opt: true, mul: true}, {type: "L", val: ",", opt: true, mul: false}]];
grammar.suite.expr = [[{type: "N", name: "simple_stmt", val: grammar.simple_stmt, opt: false, mul: false} ], [{type: "T", val: "NEWLINE", opt: false, mul: false}, {type: "T", val: "INDENT", opt: false, mul: false}, {type: "N", name: "stmt", val: grammar.stmt, opt: false, mul: true}, {type: "T", val: "DEDENT", opt: false, mul: false}]];
grammar.term.expr = [[{type: "N", name: "factor", val: grammar.factor, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: "*", opt: false, mul: false} ], [{type: "L", name: "sn", val: "/", opt: false, mul: false} ], [{type: "L", name: "sn", val: "%", opt: false, mul: false} ], [{type: "L", name: "sn", val: "//", opt: false, mul: false}]]}, opt: false, mul: false}, {type: "N", name: "sn", val: grammar.factor, opt: false, mul: false}]]}, opt: true, mul: true}]];
grammar.test.expr = [[{type: "N", name: "or_test", val: grammar.or_test, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: "if", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.or_test, opt: false, mul: false}, {type: "L", name: "sn", val: "else", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}]]}, opt: true, mul: false} ], [{type: "N", name: "lambdef", val: grammar.lambdef, opt: false, mul: false}]];
grammar.testlist.expr = [[{type: "N", name: "test", val: grammar.test, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}]]}, opt: true, mul: true}, {type: "L", val: ",", opt: true, mul: false}]];
grammar.testlist1.expr = [[{type: "N", name: "test", val: grammar.test, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}]]}, opt: true, mul: true}]];
grammar.testlist_comp.expr = [[{type: "N", name: "test", val: grammar.test, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "N", name: "sn", val: grammar.comp_for, opt: false, mul: false} ], [{type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}]]}, opt: true, mul: true}, {type: "L", name: "sn", val: ",", opt: true, mul: false}]]}, opt: false, mul: false}]];
grammar.testlist_safe.expr = [[{type: "N", name: "old_test", val: grammar.old_test, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.old_test, opt: false, mul: false}]]}, opt: false, mul: true}, {type: "L", name: "sn", val: ",", opt: true, mul: false}]]}, opt: true, mul: false}]];
grammar.trailer.expr = [[{type: "L", val: "(", opt: false, mul: false}, {type: "N", name: "arglist", val: grammar.arglist, opt: true, mul: false}, {type: "L", val: ")", opt: false, mul: false} ], [{type: "L", val: "[", opt: false, mul: false}, {type: "N", name: "subscriptlist", val: grammar.subscriptlist, opt: false, mul: false}, {type: "L", val: "]", opt: false, mul: false} ], [{type: "L", val: ".", opt: false, mul: false}, {type: "T", val: "NAME", opt: false, mul: false}]];
grammar.try_stmt.expr = [[{type: "N", val: {expr: [[{type: "L", name: "sn", val: "try", opt: false, mul: false}, {type: "L", name: "sn", val: ":", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.suite, opt: false, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "N", name: "sn", val: {expr: [[{type: "N", name: "sn", val: grammar.except_clause, opt: false, mul: false}, {type: "L", name: "sn", val: ":", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.suite, opt: false, mul: false}]]}, opt: false, mul: true}, {type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: "else", opt: false, mul: false}, {type: "L", name: "sn", val: ":", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.suite, opt: false, mul: false}]]}, opt: true, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: "finally", opt: false, mul: false}, {type: "L", name: "sn", val: ":", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.suite, opt: false, mul: false}]]}, opt: true, mul: false} ], [{type: "L", name: "sn", val: "finally", opt: false, mul: false}, {type: "L", name: "sn", val: ":", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.suite, opt: false, mul: false}]]}, opt: false, mul: false}]]}, opt: false, mul: false}]];
grammar.varargslist.expr = [[{type: "N", val: {expr: [[{type: "N", name: "sn", val: {expr: [[{type: "N", name: "sn", val: grammar.fpdef, opt: false, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: "=", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}]]}, opt: true, mul: false}, {type: "L", name: "sn", val: ",", opt: false, mul: false}]]}, opt: true, mul: true}, {type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: "*", opt: false, mul: false}, {type: "T", name: "sn", val: "NAME", opt: false, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "L", name: "sn", val: "**", opt: false, mul: false}, {type: "T", name: "sn", val: "NAME", opt: false, mul: false}]]}, opt: true, mul: false} ], [{type: "L", name: "sn", val: "**", opt: false, mul: false}, {type: "T", name: "sn", val: "NAME", opt: false, mul: false}]]}, opt: false, mul: false} ], [{type: "N", name: "sn", val: grammar.fpdef, opt: false, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: "=", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}]]}, opt: true, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.fpdef, opt: false, mul: false}, {type: "N", name: "sn", val: {expr: [[{type: "L", name: "sn", val: "=", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.test, opt: false, mul: false}]]}, opt: true, mul: false}]]}, opt: true, mul: true}, {type: "L", name: "sn", val: ",", opt: true, mul: false}]]}, opt: false, mul: false}]];
grammar.while_stmt.expr = [[{type: "L", val: "while", opt: false, mul: false}, {type: "N", name: "test", val: grammar.test, opt: false, mul: false}, {type: "L", val: ":", opt: false, mul: false}, {type: "N", name: "suite", val: grammar.suite, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: "else", opt: false, mul: false}, {type: "L", name: "sn", val: ":", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.suite, opt: false, mul: false}]]}, opt: true, mul: false}]];
grammar.with_item.expr = [[{type: "N", name: "test", val: grammar.test, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: "as", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.expr, opt: false, mul: false}]]}, opt: true, mul: false}]];
grammar.with_stmt.expr = [[{type: "L", val: "with", opt: false, mul: false}, {type: "N", name: "with_item", val: grammar.with_item, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: ",", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.with_item, opt: false, mul: false}]]}, opt: true, mul: true}, {type: "L", val: ":", opt: false, mul: false}, {type: "N", name: "suite", val: grammar.suite, opt: false, mul: false}]];
grammar.xor_expr.expr = [[{type: "N", name: "and_expr", val: grammar.and_expr, opt: false, mul: false}, {type: "N", val: {expr: [[{type: "L", name: "sn", val: "^", opt: false, mul: false}, {type: "N", name: "sn", val: grammar.and_expr, opt: false, mul: false}]]}, opt: true, mul: true}]];
grammar.yield_expr.expr = [[{type: "L", val: "yield", opt: false, mul: false}, {type: "N", name: "testlist", val: grammar.testlist, opt: true, mul: false}]];
grammar.yield_stmt.expr = [[{type: "N", name: "yield_expr", val: grammar.yield_expr, opt: false, mul: false}]];

grammar.entry = grammar.file_input;

/*END_PYTHON_GRAMMAR*/
          
// May need a level of indirection for 2/3 grammar
//grammar.file_input.ast ==

function flattenResult(input, output) {
    if (!output) { output = []; }
    for (var i = 0; i < input.length; i++) {
        if (typeof input[i].v !== 'undefined' && input[i].v.constructor == Array) {
            flattenResult(input[i].v, output);
        } else if (typeof input[i].v !== 'undefined' && typeof input[i].v.type !== 'undefined') {
            // AST Node
            output.push(input[i].v);
        } else {
            // Intermediate node
            output.push({t: input[i].t, v: input[i].v});
        }
    }
    return output;
}

grammar.suite.ast = function(result) {
    var fres = flattenResult(result);
    var res = [];
    for (var i = 0; i < fres.length; i++) {
        if (typeof fres[i].t === 'undefined') {
            res.push(fres[i]);
        }
    }
    return {
        type: "BlockStatement",
        body: res
    };
}

grammar.or_test.ast = function(result) {
    var fres = flattenResult(result);
    if (!(fres.length == 1 && typeof fres[0].type !== undefined)) {
        var binary, unary, lhs, rhs, op, exp, index = 0;
        binary = true;
        while (binary) {
            binary = fres[index+2] && typeof fres[index+1].t !== 'undefined' && fres[index+1].t == 'Literal';
            if (binary) {
                lhs = exp || fres[index]; // Pick up previous expression if exists
                rhs = fres[index+2];
                switch (fres[index+1].v) {
                    case "and":
                        op = "&&";
                        break;
                    case "or":
                        op = "||";
                        break;
                    default:
                        op = "INVALID";
                        break;
                }
                exp = {
                    type: "LogicalExpression",
                    operator: op,
                    left: lhs,
                    right: rhs
                };
                index += 2;
            }
        }
        return exp || result;
    }
    return result;
    
}

grammar.not_test.ast = function(result) {
    var fres = flattenResult(result);
    if (fres.length == 2 && typeof fres[0].v !== 'undefined' && fres[0].v == 'not') {
        return {
            type: "UnaryExpression",
            operator: "!",
            prefix: true,
            argument: fres[1]
        };
    }
    return result;
}

grammar.expr_stmt.ast = function(result) {
    // REVISIT check LHS is identifier rather than expr
    var fres = flattenResult(result);
    if (fres.length == 3) {
        // Simple ident-op-expr
        // REVISIT operator may not exist in JS
        return {
            type: "AssignmentExpression",
            operator: fres[1].v,
            left: fres[0],
            right: fres[2]
        };
    } else {
        // Something else
        console.log("Cleverness needed");
    }
    return result;
    //return JSON.stringify(fres, undefined, 1);
}

grammar.expr.ast = function(result) {
    var fres = flattenResult(result);
    if (!(fres.length == 1 && typeof fres[0].type !== undefined)) {
        var binary, unary, lhs, rhs, exp, index = 0;
        binary = true;
        while (binary) {
            binary = fres[index+2] && typeof fres[index+1].t !== 'undefined' && fres[index+1].t == 'Literal';
            if (binary) {
                lhs = exp || fres[index]; // Pick up previous expression if exists
                rhs = fres[index+2];
                exp = {
                    type: "BinaryExpression",
                    operator: fres[index+1].v,
                    left: lhs,
                    right: rhs
                };
                index += 2;
            }
        }
        return exp || result;
    }
    return result;
}

grammar.simple_stmt.ast = function(result) {
    var fres = flattenResult(result);
    var res = [];
    for (var i = 0; i < fres.length; i++) {
        if (typeof fres[i].t === 'undefined') {
            res.push({v: fres[i]});
        }
    }
    return res;
}

grammar.small_stmt.ast = function(result) {
    var fres = flattenResult(result);
    return {
        type: "ExpressionStatement",
        expression: fres[0]
    };
}

grammar.factor.ast = function(result) {
    var fres = flattenResult(result);
    if (fres[0].t == 'Literal') {
        return {
            type: "UnaryExpression",
            operator: fres[0].v,
            prefix: true,
            argument: fres[1]
        };
    }
    return result;
}

grammar.power.ast = function(result) {
    var fres = flattenResult(result);
    var index = 0;
    var obj;
    var prp;
    while (fres[index+1] && typeof fres[index+1] !== 'undefined' && fres[index+1].type === 'MemberExpression') {
        obj = fres[index];
        prp = fres[index+1];
        prp.object = obj;
        index++;
    }
    return prp || result;
}

grammar.trailer.ast = function(result) {
    var fres = flattenResult(result);
    if (fres[0].v == '.') {
        return {
            type: "MemberExpression",
            object: null,
            property: {type: "Identifier", name: fres[1].v},
            computed: false
        };
    } else if (fres[0].v == '(') {
        console.log("CALL Expression");
    }
    return result;
}

grammar.atom.ast = function(result) {
    var fres = flattenResult(result);
    if (fres.length == 1) {
        switch (fres[0].t) {
            case "NUMBER":
                return {type: "Literal", value: new Number(fres[0].v)};
                // REVISIT deal with wierd python numbers
            case "STRING":
                return {type: "Literal", value: fres[0].v};
            case "NAME":
                return {type: "Identifier", name: fres[0].v};
            default:
                return result;
        }
    } else {
        if (fres[0].t == "STRING") {
            // repeated string
            var str = "";
            for (var i = 0; i < fres.length; i++) {
                str += fres[i].v;
            }
            return {type: "Literal", value: str};
        } else {
            // array/dict
        }
    }
    return result;
}

grammar.entry.ast = function(result) {
    var fres = flattenResult(result);
    var res = [];
    for (var i = 0; i < fres.length; i++) {
        if (typeof fres[i].t === 'undefined') {
            res.push(fres[i]);
        }
    }
    return {
        type: "Program",
        body: res
    };
}

function matchesNode(node, pos, tokenlist) {
    var c_pos = pos;
    // Loop over OR levels
    var match;
    var result;
    for (var i = 0; i < node.expr.length && !match; i++) {
        match = true;
        result = [];
        // Loop over components
        var j;
        var prev = false;
        for (j = 0; j < node.expr[i].length && match; j++) {
            if (tokenlist[c_pos].type == "COMMENT" || tokenlist[c_pos].type == "NL") {
                c_pos++;
                j--;
                continue;
            }
            var c = node.expr[i][j]; // Grammar atom
            var r;
            var m;
            switch (c.type) {
                case "N": // Node
                    r = matchesNode(c.val, c_pos, tokenlist);
                    c_pos = r.p;
                    m = r.m;
                    if (m) {
                        result.push(r);
                        //console.log("node match "+c.name);
                    } else {
                        //console.log("node mismatch "+c.name);
                    }
                    //console.log("Node");
                    break;
                case "L": // Literal
                    m = c.val == tokenlist[c_pos].value;
                    //console.log("Literal");
                    if (m) {
                        result.push({t: 'Literal', v: c.val});
                        c_pos = c_pos + 1;
                        //console.log("consume literal: "+c.val);
                    } else {
                        //console.log("fail literal: "+c.val);
                    }
                    break;
                case "T": // Token
                    m = c.val == tokenlist[c_pos].type;
                    //console.log("Token");
                    if (m) {
                        result.push({t: c.val, v: tokenlist[c_pos].value});
                        c_pos = c_pos + 1;
                        //console.log("consume token: "+c.val+" "+tokenlist[c_pos-1].value);
                    } else {
                        //console.log("fail token: "+c.val+" "+tokenlist[c_pos].type);
                    }
                    break;
                default:
                    console.log("ERROR");
                    break;
            }
            match = c.opt ? true : m; // Some conditions on optional etc.
            if (c.mul && m) {
                j--;
                prev = true;
            } else if (c.mul && !m && prev) {
                // Didn't match again - revert and continue
                prev = false;
                match = true;
            }
        }
    }
    if (match && typeof node.ast === 'function') {
        return {m: match, v: node.ast(result), p: match ? c_pos : pos, s: pos};
    } else {
        // pop something
        return {m: match, v: result, p: match ? c_pos : pos, s: pos};
    }
}

function parse(tokens) {
    var t = [];
    for (token in tokens) {
        t.push(token);
    }
    //console.log(t);
    return matchesNode(grammar.entry, 0, t);
}                                                                                                                                                   
var _tokens = ["ENDMARKER","NAME","NUMBER","STRING","NEWLINE","INDENT","DEDENT","LPAR","RPAR","LSQB","RSQB","COLON","COMMA","SEMI","PLUS","MINUS","STAR","SLASH","VBAR","AMPER","LESS","GREATER","EQUAL","DOT","PERCENT","BACKQUOTE","LBRACE","RBRACE","EQEQUAL","NOTEQUAL","LESSEQUAL","GREATEREQUAL","TILDE","CIRCUMFLEX","LEFTSHIFT","RIGHTSHIFT","DOUBLESTAR","PLUSEQUAL","MINEQUAL","STAREQUAL","SLASHEQUAL","PERCENTEQUAL","AMPEREQUAL","VBAREQUAL","CIRCUMFLEXEQUAL","LEFTSHIFTEQUAL","RIGHTSHIFTEQUAL","DOUBLESTAREQUAL","DOUBLESLASH","DOUBLESLASHEQUAL","AT","OP","ERRORTOKEN","COMMENT","NL","N_TOKENS","NT_OFFSET"];

var tokens = {};
for (var i=0; i<_tokens.length; i++) {
  tokens[_tokens[i]] = _tokens[i];
}

function re_group() {
  var s = '(';
  for (var i=0; i<arguments.length; i++) {
      s += arguments[i];
      if (i != arguments.length-1) {
          s += '|';
      }
  }
  s += ')';
  return s;
}

function re_any() {
  return re_group.apply(this, arguments) + '*';
}

function re_maybe() {
  return re_group.apply(this, arguments) + '?';
}

var re_whitespace = "[ \\f\\t]*";
var re_comment    = "#[^\\r\\n]*";
var re_ignore     = re_whitespace + re_any("\\\\\\r?\\n" + re_whitespace) + re_maybe(re_comment);

var re_name       = "[a-zA-Z_]\\w*";
var re_hexnumber = "0[xX][\\da-fA-F]+[lL]?";
var re_octnumber = "(0[oO][0-7]+)|(0[0-7]*)[lL]?";
var re_binnumber = "0[bB][01]+[lL]?";
var re_decnumber = "[1-9]\\d*[lL]?";
var re_intnumber = re_group(re_hexnumber, re_binnumber, re_octnumber, re_decnumber);
var re_exponent = "[eE][-+]?\\d+";
var re_pointfloat = re_group("\\d+\\.\\d*", "\\.\\d+") + re_maybe(re_exponent);
var re_expfloat = "\\d+" + re_exponent;
var re_floatnumber = re_group(re_pointfloat, re_expfloat);
var re_imagnumber = re_group("\\d+[jJ]", re_floatnumber + "[jJ]");
var re_number = re_group(re_imagnumber, re_floatnumber, re_intnumber);

// Tail end of ' string.
var re_single = "[^'\\\\]*(?:\\\\.[^'\\\\]*)*'";
// Tail end of " string.
var re_double = '[^"\\\\]*(?:\\\\.[^"\\\\]*)*"';
// Tail end of ''' string.
var re_single3 = "[^'\\\\]*(?:(?:\\\\.|'(?!''))[^'\\\\]*)*'''";
// Tail end of """ string.
var re_double3 = '[^"\\\\]*(?:(?:\\\\.|"(?!""))[^"\\\\]*)*"""';

var re_triple = re_group("[uUbB]?[rR]?'''", '[uUbB]?[rR]?"""');
// Single-line ' or " string.
var re_string = re_group("[uUbB]?[rR]?'[^\\n'\\\\]*(?:\\\\.[^\\n'\\\\]*)*'", '[uUbB]?[rR]?"[^\\n"\\\\]*(?:\\\\.[^\\n"\\\\]*)*"');

var re_operator = re_group("\\*\\*=?", ">>=?", "<<=?", "<>", "!=", "//=?", "[+\\-*/%&|^=<>]=?", "~");

var re_bracket = '[\\]\\[(){}]';
var re_special = re_group('\\r?\\n','[:;.,`@]');
var re_funny = re_group(re_operator, re_bracket, re_special);

var re_plainToken = re_group(re_number, re_funny, re_string, re_name);
var re_token = re_ignore + re_plainToken;

// First (or only) line of ' or " string.
var re_contStr = re_group("[uUbB]?[rR]?'[^\\n'\\\\]*(?:\\\\.[^\\n'\\\\]*)*" + re_group("'", '\\\\\\r?\\n'), '[uUbB]?[rR]?"[^\\n"\\\\]*(?:\\\\.[^\\n"\\\\]*)*' + re_group('"', '\\\\\\r?\\n'));
var re_pseudoExtras = re_group('\\\\\\r?\\n|\\Z', re_comment, re_triple);
var re_pseudoToken = re_whitespace + re_group(re_pseudoExtras, re_number, re_funny, re_contStr, re_name);

var tokenProg   = new RegExp(re_token);
var pseudoProg  = new RegExp(re_pseudoToken);
var single3Prog = new RegExp(re_single3);
var double3Prog = new RegExp(re_double3);
var singleProg  = new RegExp(re_single);
var doubleProg  = new RegExp(re_double);

var endProgs = {"'": singleProg,  '"'    : doubleProg,
          "'''"  : single3Prog, '"""'  : double3Prog,
          "r'''" : single3Prog, 'r"""' : double3Prog,
          "u'''" : single3Prog, 'u"""' : double3Prog,
          "ur'''": single3Prog, 'ur"""': double3Prog,
          "R'''" : single3Prog, 'R"""' : double3Prog,
          "U'''" : single3Prog, 'U"""' : double3Prog,
          "uR'''": single3Prog, 'uR"""': double3Prog,
          "Ur'''": single3Prog, 'Ur"""': double3Prog,
          "UR'''": single3Prog, 'UR"""': double3Prog,
          "b'''" : single3Prog, 'b"""' : double3Prog,
          "br'''": single3Prog, 'br"""': double3Prog,
          "B'''" : single3Prog, 'B"""' : double3Prog,
          "bR'''": single3Prog, 'bR"""': double3Prog,
          "Br'''": single3Prog, 'Br"""': double3Prog,
          "BR'''": single3Prog, 'BR"""': double3Prog,
          'r': null, 'R': null, 'u': null, 'U': null,
          'b': null, 'B': null};

var triple_quoted = ["'''", '"""',"r'''", 'r"""', "R'''", 'R"""',"u'''", 'u"""', "U'''", 'U"""',"ur'''", 'ur"""', "Ur'''", 'Ur"""',"uR'''", 'uR"""', "UR'''", 'UR"""',"b'''", 'b"""', "B'''", 'B"""',"br'''", 'br"""', "Br'''", 'Br"""',"bR'''", 'bR"""', "BR'''", 'BR"""'];
var single_quoted = ["'", '"',"r'", 'r"', "R'", 'R"',"u'", 'u"', "U'", 'U"',"ur'", 'ur"', "Ur'", 'Ur"',"uR'", 'uR"', "UR'", 'UR"',"b'", 'b"', "B'", 'B"',"br'", 'br"', "Br'", 'Br"',"bR'", 'bR"', "BR'", 'BR"' ];

var tabsize = 8; // REVISIT - Ugh

// REVISIT - need to adapt acorn format
var TokenError = {type: "TokenError", info: null};
var StopTokenizing = {type: "StopTokenizing", info: null};

function tokenize(input, options) {
  var lnum = 0;
  var parenlev = 0;
  var continued = 0;

  var namechars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
  var numchars = '0123456789';

  var strstart, endprog;
  var contstr = '';
  var needcont = 0;

  var contline = null;
  var indents = [0];

  var keywords = ['class','finally','is','return','None','continue','for','lambda','try','def','from','nonlocal','while','and','del','global','not','with','as','elif','if','or','yield','assert','else','import','pass','break','except','in','raise'];

  var lines = (input+"\n").match(/^.*((\r\n|\n|\r)|$)/gm);
  var index = 0;
  while (true) {
      var line, pos, max, end;
      if (index < lines.length) {
          line = lines[index++];
      } else {
          line = '';
      }
      lnum += 1;
      pos = 0;
      max = line.length;

      // REVISIT temporary debug
      //yield {value: "LINE"+lnum};

      if (contstr) {
          if (line.length == 0) {
              throw "TokenError";
          }
          var endmatch = endprog.exec(line);
          if (endmatch && endmatch.index == 0) {
              end = endmatch[0].length;
              pos = end;
              //yield "STRING"; //{type: tokens.STRING, value: contstr + line.substr(0,end)};
              yield {type: tokens.STRING, value: contstr + line.substr(0,end)};
              contstr = '';
              needcont = 0;
              contline = null;
          } else if (needcont && (line.substr(line.length-2) != '\\\n') && (line.substr(line.length-3) != '\\\r\n')) {
              throw "TokenError"; // REVISIT tokens.ERRORTOKEN or SyntaxError/TokenError?
              contstr = '';
              contline = null;
              continue;
          } else {
              contstr = contstr + line;
              contline = contline + line;
              continue;
          }
          
      } else if (parenlev == 0 && continued == 0) {
          var column;
          if (line == '') { break; }
          column = 0;
          while (pos < max) {
              if (line[pos] == ' ') {
                  column += 1;
              } else if (line[pos] == '\t') {
                  column = (Math.floor(column/tabsize) + 1)*tabsize;
              } else if (line[pos] == '\f') {
                  column = 0;
              } else {
                  break;
              }
              pos += 1;
          }
          if (pos == max) {
              break;
          }

          if ('#\r\n'.indexOf(line[pos]) > -1) {
              // REVISIT need to add back COMMENT/NL once parser can skip them
              if (line[pos] == '#') {
                  var comment_token = line.substr(pos).replace(/[\r\n]+$/, '');
                  var nl_pos = pos + comment_token.length;
                  yield {type: tokens.COMMENT, value: comment_token};
                  yield {type: tokens.NL, value: lnum};
              } else {
                  //yield {type: tokens.NEWLINE, value: lnum};
              }
              continue;
          }

          if (column > indents[indents.length-1]) {
              indents.push(column);
              yield {type: tokens.INDENT, value: column};
          }
          while (column < indents[indents.length-1]) {
              var hasIndent = false;
              for (var i = 0; i < indents.length; i++) {
                  if (indents[i] == column) {
                      hasIndent = true;
                      break;
                  }
              }
              if (!hasIndent) {
                  throw "TokenError";
              }
              indents.pop();
              yield {type: tokens.DEDENT, value: lnum};
          }
      } else {
          if (line.length == 0) {
              throw "TokenError";
          }
          continued = 0;
      }

      while (pos < max) {
          var pseudomatch = pseudoProg.exec(line.substr(pos));
          if (pseudomatch && pseudomatch.index == 0) {
              if (pseudomatch[0][0] != pseudomatch[1][0]) {
                  // REVISIT - this is a hack to skip past unmatched chars at
                  // the start of a token, this ensures that match[1].length
                  // gives the correct end index of the token
                  pos += 1;
                  continue;
              }
              var start, end, token, initial;
              start = pos;
              end = pos+pseudomatch[1].length;
              pos = end;
              if (start == end) {
                  continue;
              }
              token = line.substr(start, pseudomatch[1].length);
              initial = line[start];
              //console.log(initial);

              var inTripleQuoted = false;
              var inSingleQuoted = false;
              var isKeyword = false;
              var singleQuotePos = 0;
              for (var i = 0; i < triple_quoted.length; i++) {
                  if (token == triple_quoted[i]) {
                      inTripleQuoted = true;
                      break;
                  }
              }
              for (var i = 0; i < single_quoted.length; i++) {
                  if (initial == single_quoted[i]) {
                      singleQuotePos = 0;
                      inSingleQuoted = true;
                      break;
                  } else if (token.substr(0,2) == single_quoted[i]) {
                      singleQuotePos = 1;
                      inSingleQuoted = true;
                      break;
                  } else if (token.substr(0,3) == single_quoted[i]) {
                      singleQuotePos = 2;
                      inSingleQuoted = true;
                      break;
                  }
              }
              for (var i = 0; i < keywords.length; i++) {
                  if (token == keywords[i]) {
                      isKeyword = true;
                      break;
                  }
              }

              if (numchars.indexOf(initial) > -1 || (initial == '.' && token != '.')) {
                  yield {type: tokens.NUMBER, value: token};
              } else if ('\r\n'.indexOf(initial) > -1) {
                  var type = parenlev > 0 ? tokens.NL : tokens.NEWLINE;
                  yield {type: type, value: lnum};
              } else if (initial == '#') {
                  yield {type: tokens.COMMENT, value: token};
              } else if (inTripleQuoted) {
                  endprog = endProgs[token];
                  var endmatch = endprog.exec(line.substr(pos))
                  if (endmatch && endmatch.index == 0) {
                      pos = pos+endmatch[0].length;
                      token = line.substr(start, pos);
                      yield {type: tokens.STRING, value: token};
                  } else {
                      strstart = [lnum, start];
                      contstr = line.substr(start);
                      contline = line;
                      break;
                  }
              } else if (inSingleQuoted) {
                  if (token[token.length-1] == '\n') {
                      strstart = [lnum, start];
                      endprog = endProgs[singleQuotePos];
                      contstr = line.substr(start);
                      needcont = 1;
                      contline = line;
                      break;
                  } else {
                      yield {type: tokens.STRING, value: token};
                  }
              } else if (isKeyword) {
                  yield {type: tokens.OP, value: token};
              }else if (namechars.indexOf(initial) > -1) {
                  yield {type: tokens.NAME, value: token};
              } else if (initial == '\\') {
                  continued = 1;
              } else {
                  if ('([{'.indexOf(initial) > -1) {
                      parenlev += 1;
                  } else if (')]}'.indexOf(initial) > -1) {
                      parenlev -= 1;
                  }
                  yield {type: tokens.OP, value: token};
              }
          } else {
              console.log("error");
              yield {type: tokens.ERRORTOKEN, value: [lnum,pos]};
              pos += 1;

          }
          //console.log("END");

          
      }

  }
  for (var i = 1; i < indents.length; i++) {
      yield {type: tokens.DEDENT};
  }
  yield {type: tokens.ENDMARKER}

}
