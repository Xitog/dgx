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

const fs = node ? await import("fs") : null;
const path = node ? await import("path") : null;

const main = (node) ? path.basename(process.argv[1]) === FILENAME : false;

import { Token, lexFile } from "./lexer.mjs";

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
        if (['Affectation', 'Identifier', 'Integer', 'Float', 'Boolean', 'BinaryOp', 'UnaryOp', 'String'].includes(this.type)) {
            content = ` |${this.value}|`;
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
    ['**'], // /!\ Right to left associative (by default)
    // . is the only Left to Right
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
        this.log(`${this.level}. START parseBlock at ${this.index}: ${this.read()}`);
        let root = null;
        let suite = null;
        this.level += 1;
        let doBreak = false;
        while (this.index < this.tokens.length && !doBreak) {
            this.log(`${this.level}. LOOP parseBlock at ${this.index}: ${this.read()}`);
            let res = null;
            let current = this.read();
            // Test
            if (current.equals("newline") || current.equals("comment") || current.equals("blank")) {
                this.advance();
                continue;
            } else if (this.test("keyword", ["end", "loop", "elsif"])) {
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
                res = new Node(this.uFirst(current.getValue()), null, current.getStart(), current.getLine());
                this.advance();
            } else if (current.equals("keyword", ["function", "procedure"])) {
                res = this.parseSubProgram();
            } else if (this.test("separator", ["\n", ";"])) {
                this.advance();
            } else {
                res = this.parseExpression();
                if (this.index < this.tokens.length) {
                    if (this.test("separator", [";", ")", "]"]) || this.test("newline", "\n")) {
                        this.advance();
                    } else if (this.test("keyword", "else")) {
                        // We come from an higher function (parseIf) and we must go back
                        doBreak = true;
                    } else if (!this.test("keyword", ["end", "loop"])) {
                        throw new Error(`Unfinished Expression at ${this.tokens[this.index]} after ${this.tokens[this.index - 1]}`);
                    }
                }
            }
            // if we have else + \n we will have res === null so must protect the code again that
            if (!doBreak) {
                // Checking
                if ((res === null || res === undefined)) {
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
        }
        this.level -= 1;
        return root;
    }

    parseExpression() {
        this.level += 1;
        this.log(`${this.level}. START parseExpression at ${this.index}`);
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
        this.log(`${this.level}. START BinaryOp ${name} (operator ${opLevel + 1}/${precedence.length}) at ${this.index}`);
        node = this.parseBinaryOp(opLevel + 1);
        // On peut faire un while ici pour traiter les suites en chaînant avec expr = new Expression(expr, operator, right);
        if (this.test('operator', precedence[opLevel])) {
            let op = this.advance();
            this.log(`${this.level}. PARSING ${name} (operator ${opLevel + 1}/${precedence.length}) at ${this.index}`);
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
            this.log(`${this.level}. PARSING UnaryOperator(${op.getValue()}) at ${this.index}`);
            node = this.parseAccessOrCall();
            node = new Node('UnaryOp', op.getValue(), op.getStart(), op.getLine(), node);
        } else {
            this.log(`${this.level}. START UnaryOperator at ${this.index}`);
            node = this.parseAccessOrCall();
        }
        this.level -= 1;
        return node;
    }

    parseAccessOrCall() {
        this.level += 1;
        this.log(`${this.level}. START parseAccessOrCall at ${this.index}`);
        let node = this.parseLiteral();
        while (this.test('separator', ['(', '[']) || this.test('operator', '.')) {
            if (this.test('separator', ['(', '['])) {
                let current = this.read('separator');
                let msg = current.value === '(' ? 'Call' : 'BinaryOp';
                let ending = current.value === '(' ? ')' : ']';
                let value = current.value === '(' ? null : 'index';
                this.log(`${this.level}. PARSING ${msg} at ${this.index}`);
                this.advance();
                let par1 = null;
                if (!this.test('separator', ending)) {
                    par1 = this.parseExpression();
                }
                if (!this.test('separator', ending)) {
                    throw new Error("Unclosed parenthesis");
                }
                this.advance(); // Deleted closing ) or ]
                node = new Node(msg, value, node.getStart(), node.getLine(), node, par1);
            } else if (this.test('operator', '.')) {
                this.log(`${this.level}. PARSING . at ${this.index}`);
                this.advance();
                node = this.parseAccess([node]);
            }
        }
        this.level -= 1;
        return node;
    }

    parseAccess(nodesBefore=null) {
        this.level += 1;
        this.log(`${this.level}. START parseAccess at ${this.index}`);
        let node = this.parseLiteral();
        if (this.test('operator', '.')) { // Some more to do
            this.advance();
            if (nodesBefore === null) {
                nodesBefore = [];
            }
            nodesBefore.push(node);
            node = this.parseAccess(nodesBefore);
        } else if (nodesBefore !== null) {
            nodesBefore.push(node);
            let first = nodesBefore.shift();
            let second = nodesBefore.shift();
            node = new Node('BinaryOp', '.', first.getStart(), first.getLine(), first, second);
            while (nodesBefore.length > 0) {
                let next = nodesBefore.shift();
                node = new Node('BinaryOp', '.', next.getStart(), next.getLine(), node, next);
            }
        }
        this.level -= 1;
        return node;
    }

    parseLiteral() {
        this.level += 1;
        if (this.test('separator', ['(', '['])) {
            this.log(`${this.level}. PARSING Structure ( or [ at ${this.index}`);
            let current = this.read('separator');
            let ending = current.value === '(' ? ')' : ']';
            this.advance();
            let root = new Node('List', null, current.getStart(), current.getLine());
            let node = root;
            while (!this.test('separator', ending)) {
                node.left = this.parseExpression();
                node = node.left;
                if (!this.test('separator', ending) && !this.test('separator', ',')) {
                    throw new Error(`[ERROR] ${ending} not found, unclosed structure.`);
                }
            }
            this.advance();
            return root;
        }
        let current = this.read();
        if (current !== null && ['identifier', 'integer', 'float', 'boolean', 'string', 'nil'].includes(current.type)) {
            this.log(`${this.level}. PARSING literal at ${this.index} : ${current}`);
            this.advance();
            this.level -= 1;
            return new Node(this.uFirst(current.getType()), current.getValue(), current.getStart(), current.getLine());
        }
        this.level -= 1;
        return null;
    }

    parseImport() {
        this.level += 1;
        this.log(`${this.level}. PARSING Import at ${this.index}`);
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
        this.log(`${this.level}. PARSING While at ${this.index}`);
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

    parseIf(sub=false) {
        this.level += 1;
        this.log(`${this.level}. PARSING If at ${this.index}`);
        let iftoken = null;
        if (!sub) {
            iftoken = this.read('keyword', 'if');
        } else {
            iftoken = this.read('keyword', 'elsif');
        }
        this.advance();
        let condition = this.parseExpression();
        this.read('keyword', 'then');
        this.advance();
        this.log(`${this.level}. PARSING IfBlock at ${this.index}`);
        let action = this.parseBlock();
        let subnode = null;
        if (this.test('keyword', 'elsif')) {
            subnode = this.parseIf(true);
        } else if (this.test('keyword', 'else')) {
            this.advance();
            subnode = this.parseBlock();
        }
        while (this.test('newline')) {this.advance()}; // handling of newline
        if (!sub) {
            this.read('keyword', 'end');
            this.advance();
        }
        this.level -= 1;
        return new Node('If', condition, iftoken.getStart(), iftoken.getLine(), action, subnode);
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

function nodeMain() {
    console.log(`Running nodeMain of ${FILENAME}`);
    console.log(`Parameters (${process.argv.length}):`);
    process.argv.forEach(x => console.log('    ' + x));
    if (process.argv.length === 3 && fs.existsSync(process.argv[2])) {
        let tokens = lexFile(process.argv[2]);
        let res = new Parser().parse(tokens, true);
        console.log(res.toString());
        return res;
    } else if (process.argv.length > 4) {
        throw new Error(
            `Too many parameters: ${process.argv.length}. The maximum is 4.`
        );
    }
}

if (node && main) {
    nodeMain();
}

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

export { Parser, Node };
