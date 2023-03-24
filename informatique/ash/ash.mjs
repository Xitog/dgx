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
// Imports
//-------------------------------------------------------------------------------

const node =
	typeof process !== "undefined" &&
	process !== null &&
	typeof process.version !== "undefined" &&
	process.version !== null &&
	typeof process.version === "string";

//-----------------------------------------------------------------------------
// Classes
//-----------------------------------------------------------------------------

class NodeList {
	constructor() {
		this.nodes = [];
	}
	unshift(n) {
		this.nodes.unshift(n);
	}
	push(n) {
		this.nodes.push(n);
	}
	get(i) {
		return this.nodes[i];
	}
	getList() {
		return this.nodes;
	}
	getSize() {
		return this.nodes.length;
	}
	toString() {
		return `NodeList of ${this.nodes.length} elements`;
	}
}

class Token {
	constructor(type, value, line) {
		this.type = type;
		this.value = value;
		this.line = line;
	}

	// equals("keyword", "if") or equals("keyword", ["if", "while"])
	equals(t, v) {
		if (Array.isArray(v)) {
			return this.type === t && v.includes(this.value);
		}
		return this.type === t && this.value === v;
	}

	toString() {
		let val = this.value !== "\n" ? this.value : "\\n";
		return `Token(t=${this.type}, v=${val}, @${this.line})`;
	}

	toHTML() {
		return `${this.value}<sub>${this.type}</sub>`;
	}

	toHTMLTree(isRoot = false) {
		if (isRoot) {
			return `<ul class="monotree"><li data-type="${this.type}"><code>${this.value}</code><ul>`;
		} else {
			return `<code data-type="${this.type}">${this.value}</code>`;
		}
	}
}

class Node extends Token {
	constructor(type, value, left = null, right = null) {
		super(type, value, 0);
		this.left = left;
		this.right = right;
	}

	toString() {
		let val = "";
		let left = "";
		let right = "";
		if (this.val !== undefined && this.val !== null) {
			val = this.value !== "\n" ? this.value : "\\n";
			val = `, v=${val}`;
		}
		if (this.left !== undefined && this.left !== null) {
			left = `, l=${this.left}`;
		}
		if (this.right !== undefined && this.right !== null) {
			right = `, r=${this.right}`;
		}
		return `Node(t=${this.type}${val}${left}${right})`;
	}

	toHTMLTree(isRoot = false) {
		let cls = "";
		if (isRoot) {
			cls = ' class="tree"';
		}
		let val = "";
		if (this.type === "expr") {
			val = this.value.value;
		} else if (["function", "procedure"].includes(this.type)) {
			val = `${this.type} <b>${this.value.value}</b>`;
		} else {
			val = this.type;
		}
		let type = this.type;
		if (
			["import", "while", "if", "function", "procedure"].includes(
				this.type
			)
		) {
			type = "keyword";
		}
		let s = `<ul ${cls}><li><code data-type="${type}">${val}</code><ul>`;
		if (["import", "while", "if"].includes(this.type)) {
			s += "<li>" + this.value.toHTMLTree() + "</li>";
		}
		if (this.left !== null) {
			// only during the time that functions don't have parameter
			s += "<li>" + this.left.toHTMLTree() + "</li>";
		}
		if (this.right !== null) {
			s += "<li>" + this.right.toHTMLTree() + "</li>";
		}
		s += "</ul></li></ul>";
		return s;
	}
}

//-----------------------------------------------------------------
// Classes for execution
//-----------------------------------------------------------------

class NilClass {
	toString() {
		return "nil";
	}
}

class AshParameter {
	constructor(name, type = "any", def = nil) {
		this.name = name;
		this.type = type;
		this.def = def;
	}

	toString() {
		let extra = "";
		if (this.def !== nil) {
			extra = ` = ${this.def}`;
		}
		return `${this.name} : ${this.type}${extra}`;
	}
}

let GlobalInterpreter = null;

class AshFunction {
	constructor(name, paramList, code) {
		this.name = name;
		this.paramList = paramList;
		this.code = code;
	}

	toString() {
		return (
			`function ${this.name} (` +
			this.paramList.map((x) => x.toString()).join(", ") +
			")"
		);
	}

	call(argList) {
		if (!(argList instanceof NodeList)) {
			throw new Error(
				`Parameters should be a NodeList and is a ${typeof argList}`
			);
		}
		if (argList.getSize() > this.paramList.length) {
			throw new Error(
				`Too many parameters: maximum expected is ${this.paramList.length} and ${argList.length} were provided.`
			);
		}
		for (let index = 0; index < this.paramList.length; index++) {
			let param = this.paramList[index];
			if (index < argList.getSize()) {
				let arg = argList.get(index);
				if (param.type !== "any") {
					if (param.type === "int") {
						if (
							!(arg instanceof Number) ||
							!Number.isInteger(left)
						) {
							throw new Error(
								`Parameter ${index} should be an integer.`
							);
						}
					} else if (param.type === "flt") {
						if (typeof arg !== "number") {
							throw new Error(
								`Parameter ${arg} at ${index} should be a number and is a ${typeof arg}.`
							);
						}
					} else if (param.type === "bool") {
						if (!(arg instanceof Boolean)) {
							throw new Error(
								`Parameter ${index} should be an boolean.`
							);
						}
					} else if (param.type === "str") {
						if (!(arg instanceof String)) {
							throw new Error(
								`Parameter ${index} should be a string.`
							);
						}
					}
				}
			} else {
				if (param.def === nil) {
					throw new Error(
						`Not enough parameter: ${this} requires ${
							this.paramList.length
						} parameters and ${argList.getSize()} were given.`
					);
				}
			}
		}
		if (typeof this.code === "function") {
			return this.code(argList);
		} else {
			// TODO: parameters
			return GlobalInterpreter.execute(this.code);
		}
	}
}

class AshInstrument {
	constructor(debug = false) {
		this.debug = debug;
	}

	log(s) {
		if (this.debug) {
			console.log(s);
		}
	}
}

class AshLexer extends AshInstrument {
	constructor(debug = false) {
		super(debug);
	}
	lex(code) {
		let nodes = [];
		let word = "";
		let matches = [];
		let old_matches = [];
		let line = 1;
		for (let index = 0; index < code.length; index += 1) {
			this.log(index);
			if (index > 200) {
				throw new Error("too much");
			}
			let c = code[index];
			word += c;
			let safeWord = word.replace(/\n/g, "\\n");
			this.log(`Word is |${safeWord}|`);
			matches = [];
			for (const [t, elems] of Object.entries(language.tokens)) {
				for (const e of elems) {
					if (e instanceof RegExp) {
						if (e.test(word)) {
							this.log(`matched ${t} with ${e} for ${safeWord}`);
							matches.push(new Token(t, word, line));
							break;
						}
					} else if (e === word) {
						this.log(`matched ${t}`);
						matches.push(new Token(t, word, line));
						break;
					}
				}
			}
			this.log(
				`Matches: ${matches.length} and old: ${old_matches.length}`
			);
			if (matches.length === 0 && old_matches.length > 0) {
				this.log(`Adding node! ${old_matches[0]}`);
				nodes.push(old_matches[0]);
				word = "";
				index -= 1;
			}
			old_matches = matches;
			if (c === "\n") {
				line += 1;
			}
		}
		this.log(`Matches: ${matches.length} and old: ${old_matches.length}`);
		if (word.length > 0) {
			if (old_matches.length > 0) {
				nodes.push(old_matches[0]);
			} else {
				throw new Error(`Unlexed string: |${word}|`);
			}
		}
		// filter blanks & comments
		let nn = [];
		for (const n of nodes) {
			if (n.type !== "blank" && n.type !== "comment") {
				nn.push(n);
			}
		}
		nodes = nn;
		// retag nodes
		for (const [i, n] of nodes.entries()) {
			if (n.type === "op") {
				n.type = "binop";
				if (n.value === "not") {
					n.type = "unaop";
				} else if (n.value === "-") {
					if (i == 0) {
						n.type = "unaop";
						n.value = "una-";
					} else if (i - 1 >= 0) {
						if (
							["sep", "binop", "unaop"].includes(
								nodes[i - 1].type
							)
						) {
							n.type = "unaop";
							n.value = "una-";
						}
					}
				}
			} else if (n.type === "sep" && n.value === "(") {
				if (i - 1 >= 0) {
					if (nodes[i - 1].type === "id") {
						n.type = "binop";
					}
				}
			}
		}
		this.log("End of lexing", code);
		return nodes;
	}
}

class Result {
	constructor() {
		this.end = null;
		this.then = null;
		this.do = null;
	}
}

class AshParser extends AshInstrument {
	constructor(debug = false) {
		super(debug);
		this.index = 0;
		this.nodes = [];
		this.current = null;
		this.level = 0;
	}

	shift() {
		this.level += 1;
		let res = this.nodes[this.index];
		this.log(`>>> shift ${res} @${this.index}`);
		this.index += 1;
		if (this.index < this.nodes.length) {
			this.current = this.nodes[this.index];
		} else {
			this.current = null;
		}
		this.level -= 1;
		return res;
	}

	shiftTo(until) {
		if (until === undefined || until === null || isNaN(until)) {
			throw new Error("Can't shift to undefined position.");
		}
		this.level += 1;
		this.log(`>>> shift until ${until}`);
		this.index = until;
		if (this.index < this.nodes.length) {
			this.current = this.nodes[this.index];
		} else {
			this.current = null;
		}
		this.level -= 1;
		let res = null;
		if (this.current !== null) {
			res = this.nodes[this.index - 1];
		}
		return res;
	}

	delimiteIf(until) {
		this.level += 1;
		this.log(`>>> delimiteIf from=${this.index} max=${until}`);
		let levels = ["if"];
		let results = new Result();
		for (let i = this.index + 1; i < until; i++) {
			let n = this.nodes[i];
			if (n.equals("keyword", "then") && levels.length === 1) {
				results.then = i;
			} else if (n.equals("keyword", "if")) {
				levels.push("if");
			} else if (n.equals("keyword", "end")) {
				levels.pop();
			}
			if (levels.length === 0) {
				results.end = i;
				break;
			}
		}
		if (results.then === null || results.end === null) {
			throw new Error(`Wrong if detected: ${results}`);
		}
		this.level -= 1;
		return results;
	}

	delimiteLoop(until) {
		this.level += 1;
		this.log(`>>> delimiteLoop from=${this.index} max=${until}`);
		let levels = ["while"];
		let results = new Result();
		for (let i = this.index + 1; i < until; i++) {
			let n = this.nodes[i];
			if (n.equals("keyword", "do") && levels.length === 1) {
				results.do = i;
			} else if (n.equals("keyword", "while")) {
				levels.push("while");
			} else if (n.equals("keyword", "loop")) {
				levels.pop();
			}
			if (levels.length === 0) {
				results.end = i;
				break;
			}
		}
		if (results.do === null) {
			throw new Error("No do for this loop");
		} else if (results.end === null) {
			throw new Error(`No end for this loop`);
		}
		this.level -= 1;
		return results;
	}

	delimiteSubProgram(until) {
		this.level += 1;
		let levels = ["sub"];
		this.log(`>>> delimiteSubProgram from=${this.index} max=${until}`);
		let results = new Result();
		for (let i = this.index; i < until; i++) {
			let n = this.nodes[i];
			if (n.equals("keyword", "if")) {
				levels.push("if");
			} else if (n.equals("keyword", "end")) {
				levels.pop();
			}
			if (levels.length === 0) {
				results.end = i;
				break;
			}
		}
		return results;
	}

	delimiteExpr(until) {
		this.level += 1;
		this.log(`>>> delimiteExpr from=${this.index} max=${until}`);
		let results = new Result();
		for (let i = this.index; i < until; i++) {
			let n = this.nodes[i];
			if (
				n.equals("sep", [";", "\n"]) ||
				n.equals("keyword", ["end", "loop"])
			) {
				results.end = i;
				break;
			} else if (i === until - 1) {
				results.end = until; // We must take the last
			}
		}
		if (results.end === null) {
			throw new Error(`No ending for expression detected.`);
		}
		this.level -= 1;
		return results;
	}

	log(s) {
		if (this.debug) {
			if (Array.isArray(s)) {
				this.log("Affichage liste :");
				for (const [i, e] of s.entries()) {
					this.log(`    ${i}. ${e}`);
				}
			} else {
				console.log("    ".repeat(this.level) + s);
			}
		}
	}

	parse(nodes, debug = null) {
		this.index = 0;
		this.nodes = nodes;
		if (debug !== null) {
			this.debug = debug;
		}
		this.current = this.nodes[this.index];
		this.level = 0;
		this.log(nodes);
		return this.parseStart();
	}

	parseStart(until = null) {
		this.level += 1;
		until = until === null ? this.nodes.length : until;
		this.log(`>>> parseStart from ${this.index} max ${until}`);
		let root = null;
		let suite = null;
		while (this.index < until) {
			let res = null;
			if (this.current.equals("sep", "\n")) {
				this.shift();
				continue;
			}
			if (this.current.equals("keyword", "if")) {
				res = this.parseIf(until);
			} else if (this.current.equals("keyword", "while")) {
				res = this.parseWhile(until);
			} else if (this.current.equals("keyword", "import")) {
				res = this.parseImport(until);
			} else if (
				this.current.equals("keyword", ["function", "procedure"])
			) {
				res = this.parseSubProgram(until);
			} else {
				res = this.parseExpression(until);
			}
			// Check
			if (res === null || res === undefined) {
				throw new Error("Something went wrong in parsing. Aborting.");
			}
			if (suite === null) {
				suite = new Node("suite");
				root = suite;
			} else {
				suite.right = new Node("suite");
				suite = suite.right;
			}
			suite.left = res;
		}
		this.level -= 1;
		return root;
	}

	parseIf(until) {
		this.level += 1;
		let res = this.delimiteIf(until);
		this.log(
			`>>> parseIf from ${this.index} to ${res.end}, then at=${res.then} (max=${until})`
		);
		this.shift(); // remove if
		let condition = this.parseExpression(res.then);
		this.shiftTo(res.then + 1); // remove then
		let action = this.parseStart(res.end - 1);
		this.shiftTo(res.end + 1); // remove end
		this.level -= 1;
		return new Node("if", condition, action); // Promoting node from keyword to if
	}

	parseWhile(until) {
		this.level += 1;
		let res = this.delimiteLoop(until);
		this.log(
			`>>> parseWhile from ${this.index} to ${res.end}, do at=${res.do} (max=${until})`
		);
		this.shift(); // remove while
		let condition = this.parseExpression(res.do);
		this.shiftTo(res.do + 1); // remove do
		let action = this.parseStart(res.end - 1); // Don't include loop
		this.shiftTo(res.end + 1); // remove loop
		this.level -= 1;
		return new Node("while", condition, action); // Promoting node from keyword to while
	}

	parseSubProgram(until) {
		this.level += 1;
		let res = this.delimiteSubProgram(until);
		this.log(
			`>>> parseSubProgram from ${this.index} to ${res.end} (max=${until})`
		);
		let type = this.shift().value; // remove function or procedure
		let name = this.shift(); // remove name
		let action = this.parseStart(res.end - 1); // don't take the "end"
		this.shiftTo(res.end + 1); // remove end
		this.level -= 1;
		return new Node(type, name, null, action);
	}

	parseImport(until) {
		this.level += 1;
		this.log(`>>> parseImport from ${this.index} to ${until}`);
		this.shift(); // remove import
		let name = this.shift();
		this.level -= 1;
		return new Node("import", name, null, null);
	}

	parseExpression(until) {
		this.level += 1;
		let res = this.delimiteExpr(until);
		// make a local shallow copy
		let nodes = Array.from(this.nodes.slice(this.index, res.end)); // take also the last element
		this.log(`>>> parseExpression from ${this.index} to ${res.end}`);
		this.log(nodes);
		// in advance, we set the index to the end
		this.shiftTo(res.end);
		let security = 100;
		while (nodes.length > 1 && security > 0) {
			security -= 1;
			let max = 0;
			let index = null;
			let current_level = 1;
			for (const [i, n] of nodes.entries()) {
				// Selection of the most prioritary operator
				if (
					["binop", "unaop"].includes(n.type) &&
					n.value in language.precedences
				) {
					this.log(
						`Test on ${n} with lvl=${current_level} got ${
							language.precedences[n.value] * current_level
						} and max=${max}`
					);
					// En cas d'égalité on prend le plus à gauche
					// c'est obligatoire pour les opérateurs unaires
					if (language.precedences[n.value] * current_level >= max) {
						this.log("Taken");
						index = i;
						max = language.precedences[n.value] * current_level;
					}
				}
				// Level of ( ). Warning: ( can be a sep OR a binop for call
				// ( add to current level but must be counted as outside
				if (n.value === "(") {
					current_level *= 10;
				} else if (n.value === ")") {
					current_level /= 10;
				}
			}
			if (current_level !== 1) {
				throw new Error(`Mismatched parenthesis: ${current_level}`);
			}

			if (max !== 0) {
				this.log(
					`Index node chosen @${index} ${nodes[index]} with max=${max}`
				);
			}
			if (max === 0) {
				this.log("ERROR");
				this.log(nodes.join(", "));
				throw new Error(`No operator found`);
			}
			// Perimeter
			let current = nodes[index];
			let left,
				right,
				startDeleteAt,
				deleteLength = null;
			if (["binop", "expr"].includes(current.type)) {
				left = nodes[index - 1];
				right = nodes[index + 1];
				startDeleteAt = index - 1;
				deleteLength = 3;
			} else if (current.type === "unaop") {
				left = nodes[index + 1];
				startDeleteAt = index;
				deleteLength = 2;
			} else {
				throw new Error(`Unexpected type: ${current.type}`);
			}
			// Deletion of sep ( )
			if (
				index - 2 >= 0 &&
				nodes[index - 2].value === "(" &&
				nodes[index - 2].type === "sep" && // don't delete ( in function call !
				index + 2 < nodes.length &&
				nodes[index + 2].value === ")"
			) {
				startDeleteAt = index - 2;
				deleteLength += 2;
			}
			// Deletation of sep ) after a calling (
			if (current.type === "binop" && current.value === "(") {
				if (
					index + 1 < nodes.length &&
					nodes[index + 1].equals("sep", ")")
				) {
					// Call without parameter
					// Do nothing
					right = null; // delete ")"
				} else if (
					index + 2 >= nodes.length ||
					nodes[index + 2].type !== "sep" ||
					nodes[index + 2].value !== ")"
				) {
					throw new Error(
						"Calling opening parenthesis not matched" // Should never be called due to Mismatched parenthesis error before
					);
				} else {
					// Call with one parameter (a NodeList)
					// Extend deletion
					deleteLength += 1;
				}
			}
			if (this.debug) {
				this.log(
					`Splicing from ${startDeleteAt} with length ${deleteLength}`
				);
			}
			nodes.splice(
				startDeleteAt,
				deleteLength,
				new Node("expr", current, left, right)
			);
			if (this.debug) {
				this.log(nodes);
			}
		}
		if (security === 0) {
			throw new Error("Infinite parsing loop, aborting.");
		}
		if (this.debug) {
			this.log("<<< ret Ending parseExpression");
		}
		this.level -= 1;
		return nodes[0];
	}
}

class AshInterpreter extends AshInstrument {
	constructor(debug = false, info = console.log, error = console.log) {
		super(debug);
		GlobalInterpreter = this;
		if (info !== null) {
			this.info = info;
		} else {
			this.info = console.log;
			info = console.log;
		}
		if (error !== null) {
			this.error = error;
		} else {
			this.error = console.log;
			// Code non utilisé : error = console.log;
		}
		this.scope = {
			a: 5,
			b: 2,
			t: true,
			f: false,
			log: new AshFunction(
				"log",
				[new AshParameter("x", "any")],
				function (args) {
					let arg = args.get(0);
					if (info != console.log) {
						console.log(arg);
					}
					info(arg);
					return arg;
				}
			),
			noarg: function () {
				console.log("fonction sans arg");
				return nil;
			},
			add: new AshFunction(
				"add",
				[new AshParameter("x", "flt"), new AshParameter("y", "flt")],
				function (args) {
					let arg1 = args.get(0);
					let arg2 = args.get(1);
					return arg1 + arg2;
				}
			),
			circle: function (args) {
				console.log("function circle", args);
				// x, y, r, color, full
				if (!(args instanceof NodeList)) {
					throw new Error("Parameters should be a NodeList");
				}
				if (args.getSize() !== 5) {
					throw new Error("Circle takes 5 parameters");
				}
				let centerX = args.get(0);
				let centerY = args.get(1);
				let radius = args.get(2);
				let color = args.get(3);
				let full = args.get(4);
				let canvas = document.getElementById("screen");
				let context = canvas.getContext("2d");
				context.beginPath();
				context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
				if (full) {
					context.fillStyle = color;
					context.fill();
				} else {
					context.strokeStyle = color;
					context.stroke();
				}
				return nil;
			},
			rect: function (args) {
				// x y w h color full
				console.log("function rect", args);
				let canvas = document.getElementById("screen");
				let context = canvas.getContext("2d");
				context.fillStyle = args.get(4);
				context.strokeStyle = args.get(4);
				console.log(context.fillStyle);
				if (args.get(5)) {
					context.fillRect(
						args.get(0),
						args.get(1),
						args.get(2),
						args.get(3)
					);
				} else {
					context.strokeRect(
						args.get(0),
						args.get(1),
						args.get(2),
						args.get(3)
					);
				}
			},
			clear: function (args) {
				console.log("function clear", args);
				let canvas = document.getElementById("screen");
				let context = canvas.getContext("2d");
				context.clearRect(0, 0, 640, 480);
			},
			line: function (args) {
				console.log("function line", args);
				let canvas = document.getElementById("screen");
				let context = canvas.getContext("2d");
				let x1 = args.get(0);
				let y1 = args.get(1);
				let x2 = args.get(2);
				let y2 = args.get(3);
				context.lineWidth = args.get(4);
				context.strokeStyle = args.get(5);
				context.beginPath();
				context.moveTo(x1, y1);
				context.lineTo(x2, y2);
				context.stroke();
			},
			draw: function (args) {
				console.log("function draw", args);
				let canvas = document.getElementById("screen");
				let context = canvas.getContext("2d");
				let x = args.get(1);
				let y = args.get(2);
				let i = args.get(0);
				if (typeof i === "string") {
					let img;
					if (i in resources) {
						img = resources[i];
						context.drawImage(img, x, y);
					} else {
						img = new Image(32, 32);
						img.onload = function () {
							context.drawImage(img, x, y);
						};
						img.src = i;
						resources[i] = img;
					}
				}
			},
		};
	}
	execute(node, symbol = false) {
		this.log(`executing ${node}`);
		let r = this.execute_core(node, symbol);
		this.log(`result is ${r}`);
		return r;
	}
	execute_core(node, symbol = false, debug = false) {
		if (node.type === "suite") {
			if (node.right === null) {
				return this.execute(node.left);
			} else {
				this.execute(node.left);
				return this.execute(node.right);
			}
		} else if (node.type === "function" || node.type === "procedure") {
			this.scope[node.value.value] = new AshFunction(
				node.value.value,
				[],
				node.right
			);
			return nil;
		} else if (node.type === "int") {
			return parseInt(node.value);
		} else if (node.type === "float") {
			return parseFloat(node.value);
		} else if (node.type === "bool") {
			return node.value === "true";
		} else if (node.type === "id") {
			if (!symbol) {
				// Function call without parameters
				if (this.scope[node.value] instanceof Function) {
					// Todo Unifier avec AshFunction !
					let val = this.scope[node.value]();
					if (val === undefined || val === null) {
						return "nil"; // replace by nil object
					}
					return val;
				}
				if (node.value in this.scope) {
					return this.scope[node.value];
				} else {
					throw new Error(
						`Variable ${node.value} unknown in current scope.`
					);
				}
			} else {
				return node.value;
			}
		} else if (node.type === "string") {
			return node.value.substring(1, node.value.length - 1);
		} else if (node.type === "expr") {
			let op = node.value.value;
			// Reorganize a += 5 as a = a + 5
			if (["*=", "**=", "/=", "//=", "+=", "-=", "%="].includes(op)) {
				let new_node = new Node(
					"expr",
					new Node("binop", "="),
					node.left,
					new Node(
						"expr",
						new Node("binop", op.replace("=", "")),
						node.left,
						node.right
					)
				);
				return this.execute_core(new_node);
			}
			let right =
				node.right === null
					? null
					: this.execute(node.right, op === ".");
			// Handling of affectation
			if (op === "=") {
				let symbol = this.execute(node.left, true);
				if (typeof symbol !== "string") {
					throw new Error(
						"Left part of an affectation should be an identifer"
					);
				}
				this.scope[symbol] = right;
				return right;
			}
			// Handling of calling
			if (op === "(") {
				let symbol = this.execute(node.left, true);
				if (typeof symbol !== "string") {
					throw new Error(
						"Left part of a calling should be an identifer"
					);
				}
				if (right === null) {
					right = new NodeList();
				} else if (!(right instanceof NodeList)) {
					let nx = new NodeList();
					nx.unshift(right);
					right = nx;
				}
				if (this.scope[symbol] instanceof AshFunction) {
					return this.scope[symbol].call(right);
				} else if (this.scope[symbol] instanceof Function) {
					return this.scope[symbol](right);
				} else {
					Object.entries(this.scope).forEach(function (key, val) {
						console.log(key, ":", val);
					});
					throw new Error(
						`${symbol} is not a function but a ${typeof this.scope[
							symbol
						]}.`
					);
				}
			}
			let left = this.execute(node.left);
			// Handling of list
			if (op === ",") {
				if (right instanceof NodeList) {
					right.unshift(left);
					this.log("Adding to NodeList", right);
				} else {
					let nx = new NodeList();
					nx.unshift(right);
					nx.unshift(left);
					right = nx;
					this.log("Creating new NodeList", right);
				}
				return right;
			}
			// String ---------------------------------------
			if (typeof left === "string") {
				if (op === "+") {
					if (typeof right !== "string") {
						throw new Error("Can only add a string to a string");
					}
					return left + right;
				} else if (op === "*") {
					if (typeof right !== "number") {
						throw new Error("Can only repeat a string by a number");
					}
					return left.repeat(Math.floor(right));
				} else {
					throw new Error(`Unsupported operator ${op} for string`);
				}
			} else if (typeof left === "number") {
				if (op === "+") {
					return left + right;
				} else if (op === "-") {
					return left - right;
				} else if (op === "*") {
					return left * right;
				} else if (op === "/") {
					return left / right;
				} else if (op === "//") {
					return Math.floor(left / right);
				} else if (op === "**") {
					return Math.pow(left, right);
				} else if (op === "%") {
					return left % right;
				} else if (op === "<") {
					return left < right;
				} else if (op === "<=") {
					return left <= right;
				} else if (op === ">") {
					return left > right;
				} else if (op === ">=") {
					return left >= right;
				} else if (op === "==") {
					return left === right;
				} else if (op === "!=") {
					return left !== right;
				} else if (op === "una-") {
					return -left;
				} else {
					let type = Number.isInteger(left) ? "integer" : "float";
					throw new Error(`Unsupported operator ${op} for ${type}`);
				}
			} else if (typeof left === "boolean") {
				if (op === "not") {
					return !left;
				} else if (op === "and") {
					return left && right;
				} else if (op === "or") {
					return left || right;
				} else {
					throw new Error(`Unsupported operator ${op} for boolean`);
				}
			} else if (typeof left === "object") {
				if (op === ".") {
					if (typeof right === "string") {
						if (!symbol) {
							// Function call without parameters
							if (left[right] instanceof AshFunction) {
								let val = left[right].call(new NodeList()); // TODO
								if (val === undefined || val === null) {
									return "nil";
								}
								return val;
							}
							if (right in left) {
								return left[right];
							} else {
								throw new Error(
									`${right} unknown member in ${left}.`
								);
							}
						} else {
							return node.value;
						}
					}
				}
				throw new Error(
					`Unsupported operator ${op} for object with right ${right}`
				);
			} else {
				throw new Error(`Unsupported type: ${typeof left}`);
			}
		} else if (node.type === "if") {
			let condition = this.execute(node.value);
			if (condition === true) {
				return this.execute(node.left);
			} else {
				return nil;
			}
		} else if (node.type === "while") {
			let condition = this.execute(node.value);
			let last = nil;
			let security = 16384;
			while (condition === true && security > 0) {
				try {
					last = this.execute(node.left);
				} catch (e) {
					if (e.message === "break") {
						break;
					} else {
						throw e;
					}
				}
				condition = this.execute(node.value);
				security -= 1;
			}
			return last;
		} else if (node.type === "import") {
			let name = node.value.value;
			console.log(`Importing ${name}`);
			if (name === "io") {
				this.scope["io"] = {
					read: new AshFunction("read", [], function (args) {
						return reader.question("AAAA:");
					}),
				};
			}
			return nil;
		} else if (node.type === "keyword") {
			if (node.value === "break") {
				throw new Error("break");
			} else {
				throw new Error(
					`Don't know what to do with keyword node ${node.value}`
				);
			}
		} else {
			this.log(node, typeof node);
			this.log(node.type, typeof node.type);
			this.log(node.value, typeof node.value);
			throw new Error(
				`Unknown node type |${node.type}| for node ${node}`
			);
		}
	}
}
//-----------------------------------------------------------------
// Globals
//-----------------------------------------------------------------

let language = {
	tokens: {
		op: [
			// Maths
			"+",
			"-",
			"*",
			"/",
			"//",
			"**",
			"%",
			// Booleans
			"not",
			"and",
			"or",
			// Affectation
			"=",
			"*=",
			"/=",
			"//=",
			"**=",
			"%=",
			"+=",
			"-=",
			// Comparisons
			"==",
			"!=",
			"<",
			"<=",
			">=",
			">",
			// List
			",",
			// Access
			".",
		],
		/*
        "%",
        // Specials
        "<<",
        "#",
        "$",
        // Booleans
        "not",
        "in",
        "is",
    ],*/
		sep: ["(", ")", "[", "]", ";", "\n"],
		int: [/^[1-9]\d*$/, "0"],
		float: [/^[1-9]\d*\.\d+$/],
		wrong_float: [/^[1-9]\d*\.$/],
		bool: ["true", "false"],
		keyword: [
			"if",
			"then",
			"end",
			"while",
			"do",
			"loop",
			"function",
			"procedure",
			"break",
			"import",
		],
		id: [/^[a-zA-Z_]\w*$/],
		string: [/^"[\w:/\.\- !?#]*"$/],
		blank: [" ", "\t"],
		comment: [/^--[^\n]*\n$/],
		wrong_string: [/^"[\w:/\.\- !?#]*$/],
		wrong_comment: [/^--[^\n]*$/],
	},
	precedences: {
		".": 9.5,
		"(": 9,
		"una-": 8,
		"*": 7,
		"/": 7,
		"//": 7,
		"**": 7,
		"%": 7,
		"+": 6,
		"-": 6,
		">": 5,
		"<": 5,
		">=": 5,
		"<=": 5,
		"==": 5,
		"!=": 5,
		not: 4,
		and: 3,
		or: 3,
		",": 2,
		"*=": 1,
		"/=": 1,
		"//=": 1,
		"**=": 1,
		"%=": 1,
		"+=": 1,
		"-=": 1,
		"=": 1,
	},
};

const nil = new NilClass();

let resources = {};

//-----------------------------------------------------------------
// Functions
//-----------------------------------------------------------------

function log(s) {
	console.log(s);
}

function AshLex(code, debug_lex = false) {
	log(`Lexing ${debug_lex}`);
	return new AshLexer(debug_lex).lex(code);
}

function AshParse(nodes, debug_parse = false) {
	log(`Parsing ${debug_parse}`);
	return new AshParser(debug_parse).parse(nodes);
}

function AshExecute(root, debug_execute = false, info = null, error = null) {
	log(`Executing ${debug_execute}`);
	return new AshInterpreter(debug_execute, info, error).execute(root, false);
}

function AshProcess(
	code,
	debug_lex = false,
	debug_parse = false,
	debug_execute = false
) {
	let nodes = AshLex(code, debug_lex);
	let root = AshParse(nodes, debug_parse);
	let result = AshExecute(root, debug_execute);
	return result;
}

function AshTests(debug = false) {
	let tests = {
		"Test 1": ["2 + 3 * 5", 17],
		"Test 2": ["(2 + 3) * 5", 25],
		"Test 3": ["2 - 5", -3],
		"Test 4": ["9 / 2", 4.5],
		"Test 5": ["9 // 2", 4],
		"Test 6": ["not false and true", true],
		"Test 7": ["a + 0", 5],
		"Test 8": ["4.2", 4.2],
		"Test 9": ['"abc" + "def"', "abcdef"],
	};
	for (const [name, content] of Object.entries(tests)) {
		let cmd = content[0];
		let expected = content[1];
		if (debug) {
			log("===================================");
			log(`${name}: ${cmd}. Expected: ${expected}`);
			log("===================================");
		}
		let result = test(name, cmd, false, false, false);
		if (result[0] !== expected) {
			throw new Error(
				`Test error. Expected: ${expected} vs ${result[0]}`
			);
		}
	}
}

//-------------------------------------------------------------------------------
// Main
//-------------------------------------------------------------------------------

function main() {
	console.log("Running main function");
	process.argv.push("./tests/read_line.ash");
	if (process.argv.length === 2) {
		// Run only with node.exe and the script
	} else {
		// Run with script name
		let filename = process.argv[2];
		let debug = false;
		if (process.argv.length > 3) {
			if (process.argv[3] === "d") {
				debug = true;
			}
		}
		//try {
		let data = fs.readFileSync(filename, "utf-8");
		data = data.replace(/\r\n/g, "\n");
		console.log(`Data read from file: ${filename}`);
		// Lex
		let tokens = AshLex(data, debug);
		for (const [i, tok] of tokens.entries()) {
			console.log(`    ${i}. ${tok}`);
		}
		// Parse
		let root = AshParse(tokens);
		console.log(`    ${root}`);
		// Execute
		AshProcess(data, false, false, false);
		//} catch (e) {
		//	console.log(`Error when reading file: ${filename}`);
		//	console.log(e.message);
		//	console.trace();
		//}
	}
}

const fs = node ? await import("fs") : null;
const reader = node ? await import("readline-sync") : null;

if (node) {
	main();
}

//-------------------------------------------------------------------------------
// Exports
//-------------------------------------------------------------------------------

export { AshLex, AshParse, AshExecute, AshProcess, AshTests };
