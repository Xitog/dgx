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

const VERSION = 0.1;

const FILENAME = "interpreter.mjs";

const node =
    typeof process !== "undefined" &&
    process !== null &&
    typeof process.version !== "undefined" &&
    process.version !== null &&
    typeof process.version === "string";

const fs = node ? await import("fs") : null;
const path = node ? await import("path") : null;
const reader = node ? await import("readline-sync") : null;

const main = (node) ? path.basename(process.argv[1]) === FILENAME : false;

import { Lexer, Language } from "./lexer.mjs";
import { Parser, Node } from "./parser.mjs";
import {
    Library, Value, nil, notAnExpression, BoundedFunction,
    AshObject, AshInteger, AshFloat, AshBoolean, AshString, AshList
} from "./library.mjs";

Language.readDefinition();

//-----------------------------------------------------------------------------
// Classes
//-----------------------------------------------------------------------------

let GlobalInterpreter = null;

class BreakException extends Error { }
class NextException extends Error { }

class Interpreter {
    constructor(output_function = null, output_screen = null, input_function = null, debug = false) {
        this.root = {};
        this.output_function = output_function == null ? console.log : output_function;
        this.output_screen = output_screen;
        this.input_function = input_function == null ? reader.question : input_function;
        this.scope = {};
        this.debug = debug;
        GlobalInterpreter = this;
        Library.init(GlobalInterpreter);
    }

    getContext() {
        if (this.output_screen !== null) {
            return this.output_screen();
        }
        return null;
    }

    setDebug(debug) {
        this.debug = debug;
    }

    getDebug() {
        return this.debug;
    }

    log(s, level) {
        if (this.debug) {
            console.log('    '.repeat(level) + s);
        }
    }

    execute(code, debugLex = false, debugParse = false, debugExecute = false) {
        let tokens = new Lexer('ash').lex(code, null, false, debugLex);
        let node = new Parser().parse(tokens, debugParse);
        this.debug = debugExecute; // Ne sert à rien pour l'instant
        return this.do(node);
    }

    do(node, level = 0, evalId = true) {
        if (node === undefined) {
            throw new Error(`[ERROR] node is undefined.`);
        }
        if (!(node instanceof Node)) {
            throw new Error(`[ERROR] node must be of type Node and found: ${typeof node}.`);
        }
        if (node.type === 'Block') {
            let val = this.do(node.left, level + 1);
            if (node.right !== null) {
                val = this.do(node.right, level + 1);
            }
            if (val !== notAnExpression) {
                this.log(`Block ${val} of type ${Library.getTypeJS(val)}`, level);
            } else {
                this.log(`Block ${val} notAnExpression`, level);
            }
            return val;
        } else if (node.type === 'Import') {
            this.log('Importing: ' + this.do(node.left, level + 1, false), level);
            return nil;
        } else if (node.type === 'Call') {
            let boundFunction = this.do(node.left, level + 1, false);
            let args = [];
            if (node.right !== null) {
                args = this.do(node.right, level + 1);
                if (!Array.isArray(args)) {
                    args = [args];
                }
            }
            let res;
            if (boundFunction instanceof BoundedFunction) {
                res = boundFunction.do(args);
            } else if (typeof boundFunction === "string") {
                res = this.library(boundFunction, args);
            }
            if (res !== notAnExpression && !(res instanceof AshObject)) {
                throw new Error(`Out of Ash World\n    function ${boundFunction}\n    returned ${res} of type ${typeof res}`);
            }
            return res;
        } else if (node.type === 'Break') {
            throw new BreakException();
        } else if (node.type === 'Next') {
            throw new NextException();
        } else if (node.type === 'While') {
            let cond = this.do(node.value, level + 1);
            let security = 1000000000;
            while (cond === true) {
                try {
                    this.do(node.left, level + 1);
                } catch (err) {
                    if (err instanceof BreakException) break;
                    else if (!(err instanceof NextException)) throw err;
                }
                cond = this.do(node.value, level + 1);
                security -= 1;
                if (security === 0) {
                    throw new Error("Infinite loop detected");
                }
            }
            return notAnExpression;
        } else if (node.type === 'If') {
            let cond = this.do(node.value, level + 1);
            if (cond === true) {
                this.do(node.left, level + 1);
            } else if (node.right !== null) {
                this.do(node.right, level + 1);
            }
            return notAnExpression;
        } else if (node.type === 'UnaryOp') {
            if (node.value === '-') {
                let val = -this.do(node.left, level + 1);
                this.log(`UnaryOp(${node.value}) ${val}`, level);
                return val;
            } else if (node.value === 'not') {
                let val = this.do(node.left, level + 1);
                if (typeof val !== "boolean") {
                    throw new Error(`[ERROR] Unsupported unary operator ${node.value} for ${typeof val}`);
                }
                val = !val;
                this.log(`UnaryOp(${node.value}) ${val}`, level);
                return val;
            } else {
                throw new Error(`[ERROR] Unknown Unary Op: ${node}`)
            }
        } else if (node.type === 'BinaryOp') {
            if (node.value === '.') {
                let left = this.do(node.left, level + 1);
                let right = this.do(node.right, level + 1, false);
                if (!(right in left)) {
                    throw new Error(`[ERROR] unknown method or attribute ${right} in ${left}`);
                }
                return new BoundedFunction(left, left[right]);
            } else if (node.value === ',') {
                let left = this.do(node.left, level + 1);
                let right = this.do(node.right, level + 1);
                if (Array.isArray(right)) {
                    right.unshift(left);
                } else {
                    right = [left, right];
                }
                return right;
            } else if (['=', '+=', '-=', '*=', '/=', '//=', '**=', '%='].includes(node.value)) {
                // Left side
                let identifier = this.do(node.left, level + 1, false);
                if (typeof identifier !== 'string') {
                    throw new Error(
                        "[ERROR] Left part of an affectation should be an identifer"
                    );
                }
                let val = this.do(node.right, level + 1);
                if (node.value !== '=' && !(identifier in this.scope)) {
                    throw new Error(`Unknown variable ${identifier} in current scope`);
                } else if (!(identifier in this.scope)) {
                    this.log(`Declaration ${identifier} ${node.value} ${val}`, level);
                } else {
                    this.log(`Affectation ${identifier} ${node.value} ${val}`, level);
                }
                if (node.value === '=') {
                    if (!(identifier in this.scope)) {
                        let type = Library.typeJStoAsh(val);
                        this.scope[identifier] = new Value(identifier, type, val);
                    } else {
                        this.scope[identifier].setValue(val);
                    }
                } else if (node.value === '+=') {
                    this.scope[identifier].setValue(this.scope[identifier].getValue() + val);
                } else if (node.value === '-=') {
                    this.scope[identifier].setValue(this.scope[identifier].getValue() - val);
                } else if (node.value === '*=') {
                    this.scope[identifier].setValue(this.scope[identifier].getValue() * val);
                } else if (node.value === '/=') {
                    this.scope[identifier].setValue(this.scope[identifier].getValue() / val);
                } else if (node.value === '**=') {
                    this.scope[identifier].setValue(Math.pow(scope[identifier].getValue(), val));
                } else if (node.value === '//=') {
                    this.scope[identifier].setValue(Math.floor(scope[identifier].getValue(), val));
                } else if (node.value === '%=') {
                    this.scope[identifier].setValue(this.scope[identifier].getValue() % val);
                }
                this.log(`Affectation combined ${identifier} ${node.value} ${val}`, level);
                return this.scope[identifier].getValue();
            } else {
                let left = this.do(node.left, level + 1);
                let right = this.do(node.right, level + 1);
                let res = null;
                if (typeof left === "object" && left instanceof AshObject) {
                    switch (node.value) {
                        case 'and':
                            res = left.__and__(right);
                            break;
                        case 'or':
                            res = left.__or__(right);
                            break;
                        case '+':
                            res = left.__add__(right);
                            break;
                        case '-':
                            res = left.__sub__(right);
                            break;
                        case '*':
                            res = left.__mul__(right);
                            break;
                        case '/':
                            res = left.__div__(right);
                            break;
                        case '//':
                            res = left.__intdiv__(right);
                            break;
                        case '**':
                            res = left.__pow__(right);
                            break;
                        case '%':
                            res = left.__mod__(right);
                            break;
                        case '>':
                            res = left.__gt__(right);
                            break;
                        case '>=':
                            res = left.__ge__(right);
                            break;
                        case '<':
                            res = left.__lt__(right);
                            break;
                        case '<=':
                            res = left.__le__(right);
                            break;
                        case '==':
                            res = left.__eq__(right);
                            break;
                        case '!=':
                            res = left.__eq__(right).__not__();
                            break;
                        case 'index':
                            res = left.at(right);
                            break;
                        default:
                            throw new Error(`[ERROR] Unsupported binary operator ${node.value} for ${left.constructor.name}`);
                    }
                } else {
                    throw new Error(`[ERROR] Unsupported type : ${typeof left}`);
                }
                this.log(`Binaryop(${node.value}) ${res}`, level);
                return res;
            }
        } else if (node.type === 'List') {
            let res = new AshList();
            if (node.left !== null) {
                let elem = this.do(node.left, level + 1);
                if (Array.isArray(elem)) {
                    elem.forEach(e => res.push(e));
                } else {
                    res.push(elem);
                }
            }
            return res;
        } else if (node.type === 'Integer') {
            let val = parseInt(node.value);
            this.log(`Integer ${val}`, level);
            return new AshInteger(val);
        } else if (node.type === 'Float') {
            let val = parseFloat(node.value);
            this.log(`Float ${val}`, level)
            return new AshFloat(val);
        } else if (node.type === 'Boolean') {
            let val = node.value === 'true';
            this.log(`Boolean ${val}`, level);
            return new AshBoolean(val);
        } else if (node.type === 'Nil') {
            this.log('NilClass nil', level);
            return nil;
        } else if (node.type === 'Identifier') {
            if (evalId) {
                if (!(node.value in this.scope)) {
                    console.log('ERROR Scope = ');
                    console.log(this.scope);
                    throw new Error(`Unknown identifier |${node.value}| in current scope`);
                }
                this.log(`Identifier ${node.value} as value  ${this.scope[node.value].getValue()}`, level);
                return this.scope[node.value].getValue();
            } else {
                this.log(`Identifier ${node.value} as identifier`, level);
                return node.value;
            }
        } else if (node.type === 'String') {
            this.log(`String ${node.value}`, level);
            return new AshString(node.value.slice(1, node.value.length - 1));
        } else {
            console.log('Node:', node, typeof node);
            console.log('Type:', node.type, typeof node.type);
            console.log('Value:', node.value, typeof node.value);
            throw new Error(`[ERROR] Not handled node type |${node.type}| for node: ${node}`);
        }
    }

    library(idFun, args = []) {
        return Library.sendMessage(null, idFun, args);
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
        ["5 + 2 * 3", 11],
        ["2 * 4 + 6", 14],
        ["2 + 3 * 5", 17],
        ["true and false", false],
        ["true or false", true],
        ["5 > 2", true],
        ["a = 5", 5],
        ["a + 2", 7],
        ["b = true or false and true", true],
        ["2 ** 3 ** 2", 512],
        ["(5 + 2) * 3", 21],
        ["5 * (2 + 4)", 30],
        ["(2 + 3) * 5", 25],
        ["2 - 5", -3],
        ["9 / 2", 4.5],
        ["9 // 2", 4],
        ["4.2", 4.2],
        ['"abc" + "def"', "abcdef"],
        ["2 + 5 ; 4 + 8", 12],
        ["not false and true", true]
    ];

    for (let i = 0; i < tests.length; i++) {
        let cmd = tests[i][0];
        let expected = tests[i][1];
        if (debug) {
            console.log("===================================");
            console.log(`${i}: ${cmd}. Expected: ${expected}`);
            console.log("===================================");
            let result = GlobalInterpreter.execute(cmd);
            if (expected === result) {
                console.log(`[SUCCESS] ${i}. cmd=|${cmd}| got ${result}`);
            } else {
                throw new Error(`[ERROR] ${i}. cmd=|${cmd}| expected ${expected} got ${result}`);
            }
        }
    }
}

//-------------------------------------------------------------------------------
// Main
//-------------------------------------------------------------------------------

// Sonarlint complains about ${token}: it does not recognize the .toString()
class XToken {
    constructor(tok) {
        this.tok = tok;
    }
    toString() {
        return this.tok.toString();
    }
}

function execute(text, doExecute = true) {
    let tokens = new Lexer('ash', [], GlobalInterpreter.getDebug()).lex(text);
    if (GlobalInterpreter.getDebug()) {
        console.log('Tokens:');
        let cpt = 0;
        for (let token of tokens) {
            if (!token.equals("blank")) {
                console.log(`    ${cpt}. ${new XToken(token)}`);
                cpt += 1;
            }
        }
    }
    let res = new Parser().parse(tokens, GlobalInterpreter.getDebug());
    if (GlobalInterpreter.getDebug()) {
        console.log(text);
        console.log('AST:');
        console.log(res.toString());
        console.log('Result:');
    }
    if (doExecute) {
        let finalRes = GlobalInterpreter.do(res);
        return finalRes;
    }
    return notAnExpression;
}

function nodeMain(debug = true) {
    GlobalInterpreter = new Interpreter();
    console.log(`Running nodeMain of ${FILENAME}`);
    console.log(`Parameters (${process.argv.length}):`);
    process.argv.forEach(x => console.log('    ' + x));
    // 1: node.exe
    // 2: filename.mjs
    if (process.argv.length === 3 && process.argv[2] === 'doc') {
        Library.produceDocumentation();
    } else if (process.argv.length === 3 && process.argv[2] === 'tests') {
        testsMain(debug);
    } else if (process.argv.length === 4 && process.argv[2] === 'build') {
        let appPath = process.argv[3];
        // find the app
        if (!fs.existsSync(appPath)) {
            throw new Error(`Impossible to find a valid ash file at ${path.join(process.cwd(), appPath)}`);
        }
        let appName = path.basename(appPath);
        let appDirectory = path.dirname(appPath);
        let appBuildDirectory = path.join(appDirectory, 'build');
        console.log(`Building ${appName} application in directory ${appDirectory}`);
        if (!fs.existsSync(appBuildDirectory)) {
            fs.mkdirSync(appBuildDirectory);
        }
        let data = fs.readFileSync("template.html", "utf-8");
        data = data.replace(/%AppName%/g, appName);
        let code = fs.readFileSync(appPath, "utf-8");
        data = data.replace('//%code%', code);
        fs.writeFileSync(path.join(appBuildDirectory, "index.html"), data);
    } else if (process.argv.length === 3 && fs.existsSync(process.argv[2])) {
        let filename = process.argv[2];
        console.log(`Running file ${filename}`);
        let data = fs.readFileSync(filename, "utf-8");
        data = data.replace(/\r\n/g, "\n").replace(/\n\r/g, "\n");
        if (debug) {
            console.log(`Data read from file: ${filename}`);
            console.log(data);
        }
        let res = execute(data);
        if (res !== notAnExpression) {
            console.log("Final Res: " + res);
        }
    } else if (process.argv.length > 4) {
        throw new Error(
            `Too many parameters: ${process.argv.length}. The maximum is 4.`
        );
    } else {
        console.log('Running REPL:');
        let cmd = "";
        let buffer = "";
        let prompt = 'ash> ';
        let doExecute = true;
        while (cmd !== "exit") {
            cmd = reader.question(prompt).trim();
            if (cmd.endsWith("\\")) {
                buffer += cmd.substring(0, cmd.length - 1) + "\n";
                prompt = '...> ';
            } else if (cmd === 'exit') {
                console.log('Exiting...');
            } else if (cmd === 'vars') {
                if (Object.keys(GlobalInterpreter.scope).length > 0) {
                    for (let [key, val] of Object.entries(GlobalInterpreter.scope)) {
                        console.log(`${key} : ${val.getType()} = ${val.getValue()}`);
                    }
                } else {
                    console.log("No variables");
                }
            } else if (cmd === 'debug') {
                GlobalInterpreter.setDebug(!GlobalInterpreter.getDebug());
                let s = GlobalInterpreter.getDebug() ? 'on' : 'off';
                console.log(`Debug is now ${s}`);
            } else if (cmd === 'exec') {
                doExecute = !doExecute;
                console.log(`Execute is now ${doExecute}`);
            } else {
                if (buffer.length > 0) {
                    buffer += cmd;
                    cmd = buffer;
                    buffer = "";
                    prompt = 'ash> ';
                }
                let result = execute(cmd, doExecute);
                if (result === null) {
                    throw new Error("Should not return null.");
                } else if (result !== notAnExpression) {
                    console.log(result.toString());
                }
            }
        }
    }
}

if (node && main) {
    nodeMain();
}

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

export { Interpreter, nil, notAnExpression, VERSION };
