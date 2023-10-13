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

//-------------------------------------------------------------------------------
// Environment & imports
//-------------------------------------------------------------------------------

const FILENAME = "translator.mjs";

const node =
    typeof process !== "undefined" &&
    process !== null &&
    typeof process.version !== "undefined" &&
    process.version !== null &&
    typeof process.version === "string";

const path = node ? await import("path") : null;

const main = (node) ? path.basename(process.argv[1]) === FILENAME : false;

import { Lexer, Language } from "./lexer.mjs";
import { Parser, Node } from "./parser.mjs";
import { Interpreter, nil } from "./interpreter.mjs";

Language.readDefinition();

//-----------------------------------------------------------------------------
// Classes
//-----------------------------------------------------------------------------

class Translator {
    constructor() {
        this.root = {};
    }

    execute(code, debugLex = false, debugParse = false, debugExecute = false) {
        let tokens = new Lexer('ash').lex(code, null, false, debugLex);
        let node = new Parser().parse(tokens, debugParse);
        this.debug = debugExecute; // Ne sert à rien pour l'instant
        return this.do(node);
    }

    do(node) {
        if (!(node instanceof Node)) {
            throw new Error(`[ERROR] node must be of type Node and found: ${typeof node}.`);
        }
        let output = "";
        let left = null;
        let right = null;
        switch (node.getType()) {
            case 'UnaryOp':
                left = this.do(node.left);
                let unaop = node.getValue();
                switch(unaop) {
                    case '-':
                        output = `-${left}`;
                        break;
                    case 'not':
                        output = `!${left}`;
                        break;
                    default:
                        throw new Error("Not handled unary operator : " + unaop);
                }
                return output;
            case 'BinaryOp':
                left = this.do(node.left);
                right = this.do(node.right);
                let operator = node.getValue();
                switch (operator) {
                    case '+':
                    case '-':
                    case '*':
                    case '/':
                    case '>':
                    case '>=':
                    case '<':
                    case '<=':
                    case '=':
                    case '+=':
                    case '-=':
                    case '*=':
                    case '/=':
                        output = `${left} ${operator} ${right}`;
                        break;
                    case '**':
                        output = `Math.pow(${left}, ${right}) `;
                        break;
                    case '**=':
                        output = `${left} = Math.pow(${left}, ${right})`;
                        break;
                    case '==':
                        output = `${left} === ${right}`;
                        break;
                    case '!=':
                        output = `${left} !== ${right}`;
                        break;
                    case 'and':
                        output = `${left} && ${right}`;
                        break;
                    case 'or':
                        output = `${left} || ${right}`;
                        break;
                    default:
                        throw new Error("Not handled binary operator : " + operator);
                }
                return output;
            case 'Call':
                return nil;
            case 'Integer':
            case 'Float':
            case 'Boolean':
            case 'Identifier':
                return node.getValue();
            case 'String':
                return '"' + node.getValue() + '"';
            case 'Block':
                left = this.do(node.left);
                if (node.right === null || node.right === undefined) {
                    return left;
                }
                return this.do(node.right);
            case undefined:
            case null:
                throw new Error("Node is null");
            default:
                throw new Error("Not handled Node type : " + node.getType());
        }
    }
}

//-------------------------------------------------------------------------------
// Tests
//-------------------------------------------------------------------------------

function testsMain(debug) {
    console.log("----------------------------------------------------");
    console.log("Running tests");
    console.log("----------------------------------------------------");

    const tests = [
        ["5", 5],
        ["2 + 3", 5],
        ["rect(10, 10, 100, 100, 'red', true)", nil]
    ];

    let interpreter = new Interpreter();
    console.log(`Running nodeMain of ${FILENAME}`);
    let translator = new Translator();

    for (let i = 0; i < tests.length; i++) {
        let cmd = tests[i][0];
        let expected = tests[i][1];
        if (debug) {
            console.log("===================================");
            console.log(`Test ${i}. |${cmd}| Expected: ${expected}`);
            console.log("===================================");
            let result = interpreter.execute(cmd);
            let codejs = translator.execute(cmd);
            let resultjs = eval(codejs);
            console.log("Code Ash : " + cmd);
            console.log("Code JS  : " + codejs);
            console.log("Result Ash : " + result);
            console.log("Result JS  : " + resultjs);
            if (expected === result && result === resultjs) {
                console.log(`[SUCCESS] ${i}. cmd=|${cmd}| got ${result}`);
            } else if (expected !== result) {
                throw new Error(`[ERROR] ${i}. cmd=|${cmd}| expected ${expected} got ${result}`);
            } else if (result !== resultjs) {
                throw new Error(`[ERROR] ${i}. Not same the result with JavaScript`);
            }
        }
    }
}

//-------------------------------------------------------------------------------
// Main
//-------------------------------------------------------------------------------

function nodeMain(debug = true) {
    testsMain(debug);
}

if (node && main) {
    nodeMain();
}

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

export { Translator };
