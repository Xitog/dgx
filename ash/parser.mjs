// -----------------------------------------------------------
// MIT Licence (Expat License Wording)
// -----------------------------------------------------------
// Copyright © 2020, Damien Gouteux
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
// For more information about my projects see:
// https://xitog.github.io/dgx (in French)

// Trucs intelligents :
// - block demande à ce qu'une expression se termine, pas parseExpression
// - on fait niv1 { left = niv2 if (tok === ce que je veux) { right = niv1 (si y a deux fois le même op)}}
//   lui il fait un while et fait right = niv2
// Il faut maintenant rettaguer les not et - en unaop
// - "not" forécment en unaop
// - "-" uniquement si il est premier ou qu'avant il y a un sep, binop ou unaop

//-------------------------------------------------------------------------------
// Environment & imports
//-------------------------------------------------------------------------------

const FILENAME = "parser.mjs";

const node =
    typeof process !== "undefined" &&
    process !== null &&
    typeof process.version !== "undefined" &&
    process.version !== null &&
    typeof process.version === "string";

const path = node ? await import("path") : null;

const main = (node) ? path.basename(process.argv[1]) === FILENAME : false;

import { Token } from "./lexer.mjs";

//-------------------------------------------------------------------------------
// Classes
//-------------------------------------------------------------------------------

class Node extends Token {
    constructor(type, value = null, start = null, line = null, left = null, right = null) {
        super(type, value, start, line);
        this.left = left;
        this.right = right;
    }

    isLeaf() {
        return this.left === null && this.right === null;
    }

    toString(level = 0, sigil = 'root') {
        let content = '';
        if (['Affectation', 'Identifier', 'Integer', 'Float', 'Boolean', 'BinaryOp', 'UnaryOp'].includes(this.type)) {
            content = ` (${this.value})`;
        }
        let base = '    '.repeat(level) + `${level}. (${sigil}) ${this.type}${content}\n`;
        let value = '';
        let left = '';
        let right = '';
        if (this.value instanceof Node) {
            value = this.value.toString(level + 1, 'V');
        }
        if (this.left !== null) {
            left = this.left.toString(level + 1, 'L');
        }
        if (this.right !== null) {
            right = this.right.toString(level + 1, 'R');
        }
        return `${base}${value}${left}${right}`;
    }

    toHTMLTree(isRoot = true) {
        let cls = "";
        if (isRoot) {
            cls = ' class="tree"';
        }
        let starter = `<ul${cls}><li><code data-type="${this.type}">${this.type}`;
        if (["Integer", "BinaryOp"].includes(this.type)) {
            starter += ` (${this.value})`;
        }
        if (["Integer"].includes(this.type)) {
            starter += '</code></li></ul>';
        } else if (["BinaryOp", "Block"].includes(this.type)) {
            starter += '</code><ul>';
            if (this.left !== null) {
                starter += "<li>" + this.left.toHTMLTree(false) + "</li>";
            }
            if (this.right !== null) {
                starter += "<li>" + this.right.toHTMLTree(false) + "</li>";
            }
            starter += "</ul></li></ul>";
        } else {
            throw new Error(`Unknow node type: ${node.type}`);
        }
        return starter;
    }
}

//-----------------------------------------------------------------------------
// Parser
//-----------------------------------------------------------------------------

let precedence = [
    [','],
    ['=', '+=', '-=', '*=', '/=', '//=', '%='],
    ['and', 'or'],
    ['<', '<=', '>=', '>', '==', '!='],
    ['<<', '>>'],
    ['+', '-'],
    ['*', '/', '//', '%'],
    ['**'], // /!\ Right to left associative
];

class Parser {
    constructor() {
        this.debug = false;
        this.index = 0;
        this.tokens = [];
        this.level = 0;
        this.root = null;
    }

    log(s) {
        if (this.debug) {
            console.log('    '.repeat(this.level) + s);
        }
    }

    uFirst(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    parse(tokens, debug = false) {
        this.debug = debug;
        this.index = 0;
        this.tokens = tokens.filter(x => !x.equals("blank"));
        this.level = 0;
        this.root = this.parseBlock();
        if (this.index < this.tokens.length) {
            this.abort();
        }
        return this.root;
    }

    parseBlock() {
        // if, while, for, break, next, expression, affectation, comment, newline
        this.log(`>>> ${this.level} START parseBlock at ${this.index}: ${this.read()}`);
        let root = null;
        let suite = null;
        this.level += 1;
        while (this.index < this.tokens.length) {
            this.log(`>>> ${this.level} LOOP parseBlock at ${this.index}: ${this.read()}`);
            let res = null;
            let current = this.read();
            // Test
            if (current.equals("newline") || current.equals("comment") || current.equals("blank")) {
                this.advance();
                continue;
            } else if (this.test("keyword", ["end", "loop"])) {
                break;
            } else if (current.equals("keyword", "import")) {
                res = this.parseImport();
            } else if (current.equals("keyword", "if")) {
                res = this.parseIf();
            } else if (current.equals("keyword", "while")) {
                res = this.parseWhile();
            } else if (current.equals("keyword", "for")) {
                res = this.parseFor();
            } else if (current.equals("keyword", ["break", "next"])) {
                res = new Node(this.uFirst(current.getType()), null, current.getStart(), current.getLine());
                this.advance();
            } else if (current.equals("keyword", ["function", "procedure"])) {
                res = this.parseSubProgram();
            } else if (this.test("separator", ["\n", ";"])) {
                this.advance();
            } else {
                res = this.parseExpression();
                if (this.index < this.tokens.length) {
                    if (this.test("separator", [";", ")"]) || this.test("newline", "\n")) {
                        this.advance();
                    } else if (!this.test("keyword", ["end", "loop"])) {
                        throw new Error(`Unfinished Expression at ${this.tokens[this.index]} after ${this.tokens[this.index - 1]}`);
                    }
                }
            }
            // Checking
            if (res === null || res === undefined) {
                throw new Error("Something went wrong in parsing. Aborting.");
            }
            // Chaining
            if (suite === null) {
                suite = new Node("Block");
                root = suite;
            } else {
                suite.right = new Node("Block");
                suite = suite.right;
            }
            suite.left = res;
        }
        this.level -= 1;
        return root;
    }

    parseExpression() {
        this.level += 1;
        this.log(`>>> ${this.level} parseExpression at ${this.index}`);
        let res = this.parseBinaryOp();
        this.level -= 1;
        return res;
    }

    parseBinaryOp(opLevel = 0) {
        if (opLevel === precedence.length) {
            return this.parseUnary();
        }
        this.level += 1;
        let name = precedence[opLevel].map(x => this.uFirst(x)).join(", ");
        let node = null;
        let right = null;
        this.log(`>>> ${this.level} START BinaryOp ${name} (operator ${opLevel + 1}/${precedence.length}) at ${this.index}`);
        node = this.parseBinaryOp(opLevel + 1);
        // On peut faire un while ici pour traiter les suites en chaînant avec expr = new Expression(expr, operator, right);
        if (this.test('operator', precedence[opLevel])) {
            let op = this.advance();
            this.log(`>>> ${this.level} PARSING ${name} (operator ${opLevel + 1}/${precedence.length}) at ${this.index}`);
            right = this.parseBinaryOp(opLevel);
            if (right === null) {
                throw new Error("No expression on the right of a binary operator at " + current.getLine());
            }
            node = new Node('BinaryOp', op.getValue(), op.getStart(), op.getLine(), node, right);
        }
        this.level -= 1;
        return node;
    }

    parseUnary() {
        this.level += 1;
        let node = null;
        if (this.test('operator', ['not', '-'])) {
            let op = this.read();
            this.advance();
            this.log(`>>> ${this.level} PARSING UnaryOperator(${op.getValue()}) at ${this.index}`);
            node = this.parseCall();
            node = new Node('UnaryOp', op.getValue(), op.getStart(), op.getLine(), node);
        } else {
            node = this.parseCall();
        }
        this.level -= 1;
        return node;
    }

    parseCall() {
        this.level += 1;
        let node = this.parseLiteral();
        if (this.test('separator', '(')) {
            this.log(`>>> ${this.level} PARSING Call at ${this.index}`);
            this.advance();
            let par1 = null;
            if (!this.test('separator', ')')) {
                par1 = this.parseExpression();
            }
            if (!this.test('separator', ')')) {
                throw new Error("Unclosed parenthesis");
            }
            node = new Node('Call', node.getValue(), node.getStart(), node.getLine(), node, par1);
        }
        this.level -= 1;
        return node;
    }

    parseLiteral() {
        this.level += 1;
        if (this.test('separator', '(')) {
            this.advance();
            let node = this.parseExpression();
            if (!this.test('separator', ')')) {
                throw new Error("Unclosed (");
            }
            this.advance();
            return node;
        }
        let current = this.read();
        if (current !== null && ['identifier', 'integer', 'float', 'boolean', 'string'].includes(current.type)) {
            this.log(`>>> ${this.level} PARSING literal at ${this.index} : ${current}`);
            this.advance();
            this.level -= 1;
            return new Node(this.uFirst(current.getType()), current.getValue(), current.getStart(), current.getLine());
        }
        this.level -= 1;
        return null;
    }

    parseImport() {
        this.level += 1;
        this.log(`>>> ${this.level} PARSING Import at ${this.index}`);
        let importtoken = this.read('keyword', 'import');
        this.advance();
        let left = this.parseLiteral();
        if (left.type !== 'Identifier' && left.type !== 'String') {
            throw new Error("Can only import string and identifier");
        }
        this.level -= 1;
        return new Node('Import', null, importtoken.getStart(), importtoken.getLine(), left);
    }

    parseWhile() {
        this.level += 1;
        this.log(`>>> ${this.level} PARSING While at ${this.index}`);
        let whiletoken = this.read('keyword', 'while');
        this.advance();
        let condition = this.parseExpression();
        this.read('keyword', 'do');
        this.advance();
        let action = this.parseBlock();
        this.read('keyword', 'loop');
        this.advance();
        this.level -= 1;
        return new Node('While', condition, whiletoken.getStart(), whiletoken.getLine(), action, null);
    }

    parseIf() {
        this.level += 1;
        this.log(`>>> ${this.level} PARSING If at ${this.index}`);
        let iftoken = this.read('keyword', 'if');
        this.advance();
        let condition = this.parseExpression();
        this.read('keyword', 'then');
        this.advance();
        let action = this.parseBlock();
        let actionElse = null;
        if (this.test('keyword', 'else')) {
            this.advance();
            actionElse = this.parseBlock();
        }
        this.read('keyword', 'end');
        this.advance();
        this.level -= 1;
        return new Node('If', condition, iftoken.getStart(), iftoken.getLine(), action, actionElse);
    }

    read(type = null, value = null) {
        const token = (this.index < this.tokens.length) ? this.tokens[this.index] : null;
        // Token check on value and/or type
        if (value !== null) {
            if (token !== null && !token.equals(type, value)) {
                throw new Error(`Parse error: expected |${type},${value}| and got ${token}`);
            } else if (token === null) {
                throw new Error(`Parse error: expected |${type},${value}| and got nothing.`);
            }
        }
        // Length check
        if (this.index >= this.tokens.length) {
            throw new Error(`Parse error: unexpected end of stream of tokens, expected |${type},${value}| @${this.index}.`);
        }
        return token;
    }

    test(type = null, value = null) {
        const token = (this.index < this.tokens.length) ? this.tokens[this.index] : null;
        return token?.equals(type, value);
    }

    advance() {
        let current = this.index < this.tokens.length ? this.tokens[this.index] : null
        this.index += 1;
        return current;
    }

    abort() {
        this.tokens.slice(this.index).forEach(_ => `${this.index}. Unhandled token ${this.read()}`);
    }
}

//-------------------------------------------------------------------------------
// Main
//-------------------------------------------------------------------------------

function nodeMain(debug = true) {
    console.log("No code to run as main");
}

if (node && main) {
    nodeMain();
}

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

export { Parser, Node };
