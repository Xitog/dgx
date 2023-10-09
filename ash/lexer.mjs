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

const node =
	typeof process !== "undefined" &&
	process !== null &&
	typeof process.version !== "undefined" &&
	process.version !== null &&
	typeof process.version === "string";

const fs = node ? await import("fs") : null;
const path = node ? await import("path") : null;

const main = (node) ? path.basename(process.argv[1]) === 'lexer.mjs': false;

//-------------------------------------------------------------------------------
// Classes
//-------------------------------------------------------------------------------

class Token
{
    constructor(type, value, start, line)
    {
        this.type = type;
        this.value = value;
        this.start = start;
        this.line = line;
    }

	// equals("keyword", "if") or equals("keyword", ["if", "while"])
    equals(type, value=null, start=null)
    {
        let ok_type  = this.type  === type;
        let ok_value = (value === null ? true : this.value === value);
        if (value !== null && Array.isArray(value)) {
            ok_value = value.includes(this.value);
        }
        let ok_start = (start === null ? true : this.start === start);
        return ok_value && ok_type && ok_start;
    }

    toHTML(lang, raw=false, debug=false)
    {
        let val = this.getValue();
        if (!raw) {
            val = val.replace('&', '&amp;');
            val = val.replace('>', '&gt;');
            val = val.replace('<', '&lt;');
            if (debug) {
                return `${val}<sub>${this.type}</sub>`;
            } else {
                return `<span class=${lang}-${this.type}>${val}</span>`
            }
        } else {
            return val;
        }
    }

	toHTMLTree(isRoot = false) {
        let val = this.getValue();
        val = val.replace('&', '&amp;');
        val = val.replace('>', '&gt;');
        val = val.replace('<', '&lt;');
		if (isRoot) {
			return `<ul class="monotree"><li data-type="${this.type}"><code>${val}</code><ul>`;
		} else {
			return `<code data-type="${this.type}">${val}</code>`;
		}
	}

    getType()
    {
        return this.type;
    }

    getValue()
    {
        return this.value;
    }

    getStart()
    {
        return this.start;
    }

    getLine()
    {
        return this.line;
    }

    toString(pad=null)
    {
        let val = this.value.replace(/\n/g, '\\n');
        if (pad === null) {
            return `{${this.type} |${val}|(${this.value.length}) @${this.start},L${this.line}}`;
        } else {
            return `{Token ${this.type.padEnd(pad)} |${(val + '|').padEnd(pad*2)}(${this.value.length}) @${this.start},L${this.line}`;
        }
    }

    toJSON()
    {
        return {'type': this.type, 'value': this.value, 'start': this.start, 'line': this.line};
    }
}

class Language
{
    static LANGUAGES = [];

    static readDefinition(raw=null)
    {
        if (fs !== null) {
            return fs.readdirSync('languages').map(fileName => {
                let raw = JSON.parse(fs.readFileSync(path.join('languages', fileName), 'utf8'));
                let wrong = [];
                if ('wrong' in raw) {
                    wrong = raw['wrong'];
                }
                Language.LANGUAGES[raw['name']] = new Language(raw['name'], raw['definitions'], wrong);
                return Language.LANGUAGES[raw['name']];
            });
        } else if (raw !== null) {
            let wrong = [];
            if ('wrong' in raw) {
                wrong = raw['wrong'];
            }
            Language.LANGUAGES[raw['name']] = new Language(raw['name'], raw['definitions'], wrong);
            return Language.LANGUAGES[raw['name']];
        }
    }

    constructor(name, definitions, wrong=[])
    {
        this.name = name;
        if (typeof definitions !== 'object')
        {
            throw new Error(`For lang |${name}|, definitions should be an object and it is a ` + typeof definitions);
        }
        this.definitions = definitions;
        for (const [type, patterns] of Object.entries(definitions))
        {
            if (patterns === null || patterns === undefined)
            {
                throw new Error(`No variants for ${type} in language ${name}`);
            }
        }
        // In order to match the entire string we put ^ and $ at the start of each regex
        for (const patterns of Object.values(definitions))
        {
            for (let index of Object.keys(patterns))
            {
                if (typeof patterns[index] !==  "object")
                {
                    let pattern = patterns[index];
                    if (pattern[0] !== '^') { pattern = '^' + pattern;}
                    if (pattern[pattern.length-1] !== '$') { pattern += '$'}
                    if (pattern.includes('[\\s\\S]'))
                    {
                        patterns[index] = new RegExp(pattern, 'm');
                    } else {
                        patterns[index] = new RegExp(pattern);
                    }
                }
            }
        }
        this.wrong = wrong;
    }

    isWrong(type)
    {
        return this.wrong.includes(type);
    }

    getName()
    {
        return this.name;
    }

    getTypeDefinitions()
    {
        return Object.entries(this.definitions);
    }

    getNumberOfTypes()
    {
        return Object.keys(this.definitions).length;
    }

    getNumberOfRegex()
    {
        let sum = 0;
        for (const patterns of Object.values(this.definitions))
        {
            sum += patterns.length;
        }
        return sum;
    }

    toString()
    {
        return `Language ${this.getName()} with ${this.getNumberOfTypes()} types and ${this.getNumberOfRegex()} regex`;
    }
}

class Match
{
    constructor(type, elem, start, line)
    {
        this.type = type;
        this.elem = elem;
        this.start = start;
        this.line = line;
    }

    toString()
    {
        return `Match type=${this.type} elem=${this.elem} start=${this.start} line=${this.line}`;
    }
}

class Lexer
{
    constructor(lang, discards=[], debug=false)
    {
        if (typeof lang === "string")
        {
            this.lang = Language.LANGUAGES[lang];
        } else if (typeof lang === "object" && lang instanceof Language) {
            this.lang = lang;
        } else {
            throw new Error(`Lang |${lang}| must be a recognized language or an instance of Language`);
        }
        this.discards = discards;
        this.debug = debug;
    }

    getLanguage()
    {
        return this.lang;
    }

    match(start, line, word, debug=false)
    {
        let matches = [];
        let safeWord = word.replace(/\n/g, "\\n");
        for (const [type, patterns] of this.lang.getTypeDefinitions())
        {
            for (let elem of patterns)
            {
                if (elem.test(word))
                {
                    this.log(`    Match: ${type} with ${elem} for ${safeWord}`);
                    matches.push(new Match(type, elem, start, line));
                }
            }
        }
        return matches;
    }

    log(s)
    {
        if (this.debug) {
            console.log(s);
        }
    }

    lex(text, discards=null, json=false, debug=false)
    {
        this.debug = debug;
        discards = discards === null ? this.discards : discards;
        let word = '';
        let matches = [];
        let oldMatches = [];
        let tokens = [];
        let start = 0;
        let line = 1;
        let index = 0;
        while (index < text.length)
        {
            word += text[index];
            let safeWord = word.replace(/\n/g, "\\n");
            this.log(`${index}. Word is |${safeWord}|`);
            matches = this.match(start, line, word, debug);
            if (text[index] === '\n') {
                line += 1;
            }

            if (matches.length === 0) {
                this.log('    No match this turn');
                if (oldMatches === null || oldMatches.length === 0) {
                    // Nothing, we try to add the maximum
                    //throw new Error("Impossible to map the language.");
                } else {
                    // Visions: trying to see if there is something after
                    if (index + 1 < text.length)
                    {
                        let future_index = index + 1;
                        let future_word = word + text[future_index];
                        matches = this.match(start, line, future_word, debug);
                        if (debug && matches.length > 0)
                        {
                            console.log('    Vision of the future OK');
                        }
                    }
                    // Si et seulement si dans le futur on n'aura rien on fait un jeton, sinon on continue
                    if (matches.length === 0)
                    {
                        let content =  word.substring(0, word.length-1);
                        this.log(`pour le mot |${content}| nous avons : ${oldMatches.map(x => x.toString()).join("\n")}`);
                        if (this.lang.isWrong(oldMatches[0].type))
                        {
                            throw new Error(`A wrong token definition ${oldMatches[0].type} : ${oldMatches[0].elem} has been validated by the lexer: ${content}`);
                        }
                        if (!discards.includes(oldMatches[0].type))
                        {
                            tokens.push(new Token(oldMatches[0].type, content, oldMatches[0].start, oldMatches[0].line));
                        }
                        word = '';
                        index -= 1;
                        start = oldMatches[0].start + content.length;
                    }
                }
            }
            oldMatches = matches;
            index += 1;
        }
        if (oldMatches !== null && oldMatches.length > 0)
        {
            let content =  word;
            this.log(`pour le mot |${content}| nous avons : ${oldMatches.map(x => x.toString()).join("\n")}`);
            if (this.lang.isWrong(oldMatches[0].type))
            {
                throw new Error(`A wrong token definition (${oldMatches[0].type} : ${oldMatches[0].elem}) has been validated by the lexer: ${content}`);
            }
            if (!discards.includes(oldMatches[0].type))
            {
                tokens.push(new Token(oldMatches[0].type, content, oldMatches[0].start, oldMatches[0].line));
            }
        } else if (word.length > 0)
        {
            console.log(tokens);
            console.log(word.charCodeAt(0));
            throw new Error(`Text not lexed at the end: |${word}|`);
        }
        if (json) {
            return tokens.map(tok => tok.toJSON());
        }
        return tokens;
    }

    toHTML(tokens, raws=[], debug=false)
    {
        let html = tokens.map(tok => tok.toHTML(this.lang.getName(), raws.includes(tok.getType()), debug));
        return html.join('');
    }
}

//-------------------------------------------------------------------------------
// Globals and constants
//-------------------------------------------------------------------------------

// Shared definitions
const PATTERNS = {
    'IDENTIFIER'    : ['[a-zA-Z]\\w*'],
    'INTEGER'       : ['\\d+'],
    'INTEGER_HEXA'  : ['0[xX][\\dABCDEFabcdef]+'],
    'INTEGER_BIN'   : ['0[bB][01]+'],
    'WRONG_INTEGER' : ['\\d+\\w+'],
    'FLOAT'         : ['\\d+\\.\\d+', '\\d+[eE]-\\d+', '\\d+\\.\\d+[eE]-?\\d+'],
    'WRONG_FLOAT'   : ['\\d+\\.'],
    'BLANKS'        : ['[ \u00A0\\t]+'],
    'NEWLINES'      : ['\n', '\n\r', '\r\n'],
    'OPERATORS'     : ['==', '=', '\\.'],
    'STRINGS'       : ["'([^\\\\']|\\\\['nt])*'", '"([^\\\\"]|\\\\["nt])*"'],
    'SEPARATORS'    : ['\\(', '\\)']
};

const SHORTCUTS = {
    'keyword': 'kw',
    'special': 'spe',
    'identifier': 'id',
    'affectation': 'aff',
    'combined_affectation': 'aff',
    'separator': 'sep',
    'operator': 'op',
    'comment': 'com',
    // Types
    'boolean': 'bool',
    'integer': 'int',
    'number': 'num',
    'float': 'flt',
    'string': 'str',
}

export {Token, Language, Lexer};
