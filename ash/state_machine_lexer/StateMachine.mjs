import promptSync from 'prompt-sync';
import { writeFileSync } from 'node:fs';

const prompt = promptSync();

function safe(v)
{
    return v.replace(/\n/g, ':NL').replace(/\0/g, ':VOID');
}

class Token
{
    constructor(type, value=null)
    {
        this.type = type;
        this.value = value;
    }

    toString()
    {
        if (this.value !== null && this.value !== '') {
            return `{${this.type}:${safe(this.value)}}`;
        } else {
            return `{${this.type}}`;
        }
    }

    toJson()
    {
        return {'type': this.type, 'value': this.value};
    }
}

class StateMachine
{
    constructor(initial)
    {
        this.states = {};
        this.initial = initial;
        this.states[initial.name] = initial;
        this.actual = null;
        this.iterations = 0;
        this.tokens = [];
        this.wordStack = [];
        this.word = "";
    }

    isOver() {
        return this.actual === null;
    }

    add(s)
    {
        this.states[s.name] = s;
    }

    info()
    {
        console.log('Info on StateMachine');
        let count = 0;
        for (const value of Object.values(this.states)) {
            count += 1;
            console.log(`  ${count}. ${value}`);
        }
        console.log(`Actual is: ${this.actual}`);
    }

    includes(v1, v2) {
        return (v1 === '@' && /^[a-zA-Z]$/.test(v2)
            || v1 === '#' && /^\d$/.test(v2)
            || v1 === '&' && /^[a-zA-Z0-9]$/.test(v2)
            || v1 === v2);
    }

    start(v)
    {
        if (this.actual !== null) {
            throw Exception('Impossible to start an already started StateMachine');
        }
        // Check states: no exit includes another one
        for (const [name, state] of Object.entries(this.states)) {
            if (state.transitions === null) {
                continue;
            }
            for (const event1 of Object.keys(state.transitions)) {
                for (const event2 of Object.keys(state.transitions)) {
                    if (event1 === event2) {
                        continue;
                    }
                    if (this.includes(event1, event2)) {
                        throw new Error(`Ambiguity detected in state ${name} between |${event1}| and |${event2}|`);
                    }
                }
            }
        }
        this.iterations = 0;
        this.tokens = [];
        this.wordStack = [];
        this.word = '';
        this.actual = this.initial;
        console.log(`${this.iterations}: Starting at ${this.actual}`);
    }

    run(v)
    {
        let status = 'Staying on';
        this.iterations += 1;
        if (this.actual == null) {
            throw new Error('Impossible to run an unstarted StateMachine');
        }
        let selectedTrans = this.actual.run(v);
        let name = selectedTrans.getDestination();
        if (name.startsWith('Error-')) {
            throw new Error(`${name} in ${this.word}`);
        }
        if (!(name in this.states)) {
             throw new Error(`Impossible to go to ${name}, state unknown!`);
        }
        if (name !== this.actual.name) {
            this.wordStack.push(this.word);
            this.word = v;
            status = 'Transition to';
        } else {
            this.word += v;
        }
        let action = selectedTrans.getEvent();
        if (action === 'Emit') {
            this.tokens.push(new Token(this.actual.name, this.wordStack.shift()));
        } else if (action.startsWith('Emit')) {
            let types = action.substring(5).split('-'); // Remove Emit-
            console.log(types);
            console.log(this.wordStack);
            let count = 0;
            while (this.wordStack.length > 0) {
                this.tokens.push(new Token(types[count], this.wordStack.shift()));
                count += 1;
            }
        } else if (action === 'Merge') {
            let res = this.wordStack.shift() + this.wordStack.shift();
            this.word = res + v;
        }
        this.actual = this.states[name];
        if (!this.actual.end) {
            let prep = this.wordStack.map((x) => `|${x}|`).join(', ');
            console.log(`    ${this.iterations}: ${status} ${this.actual.name} word=|${this.word}| stack=${prep}}(${this.wordStack.length}) action=${action}`);
        } else {
            console.log(`    ${this.iterations}: Ending on ${this.actual}`);
            this.tokens.push(new Token(this.actual.name));
            this.actual = null;
        }
    }

    lastRunResult(output='display', filter=null)
    {
        if (output === 'display') {
            for (let i = 0; i < this.tokens.length; i++) {
                console.log(`${i}. ${this.tokens[i]}`);
            }
        } else if (output === 'json') {
            return this.tokens.map((x) => x.toJson());
        } else if (output === 'token') {
            if (filter == null) {
                return this.tokens;
            } else {
                return this.tokens.filter((t) => !(t.type in filter));
            }
        }
    }

    toGraphiviz()
    {
        let res = 'digraph StateMachine {\n';
        for (const [name, state] of Object.entries(this.states)) {
            if (state.transitions !== null) {
                for (const trans of state.transitions) {
                    res += `    "${name}" -> "${trans.getDestination()}" [label="|${safe(trans.getCondition())}| / ${trans.getEvent()}"];\n`
                }
            }
        }
        res += '}';
        return res;
    }
}

class Transition
{
    constructor(condition, destination, event='')
    {
        this.condition = condition;
        this.destination = destination;
        this.event = event;
    }

    toString()
    {
        return `|${this.condition}| => ${this.destination} / ${this.event}`;
    }

    test(v)
    {
        let res = false;
        if (this.condition === '@') {
            res = /^[a-zA-Z]$/.test(v);
        } else if (this.condition === '#') {
            res = /^\d$/.test(v);
        } else if (this.condition === '&') {
            res = /^[a-zA-Z0-9]$/.test(v);
        } else {
            res = v === this.condition;
        }
        return res;
    }

    getEvent()
    {
        return this.event;
    }

    getDestination()
    {
        return this.destination;
    }

    getCondition()
    {
        return this.condition;
    }
}

class State
{
    constructor(name, transitions=null)
    {
        this.name = name;
        this.transitions = transitions;
        this.end = transitions === null;
    }

    toString()
    {
        if (this.transitions != null) {
            return this.name + ' : ' + this.transitions.map((t) => `${t}`).join(', ');
        } else {
            return this.name + '.';
        }
    }

    run(v)
    {
        let ok = [];
        for (const t of this.transitions) {
            if (t.test(v)) {
                ok.push(t);
            }
        }
        if (ok.length > 1) {
            throw new Error(`Ambiguity between ${ok.length} transitions:` + ok.map((o) => `${o}`).join(', '));
        } else if (ok.length == 0) {
            throw new Error(`No valid transition for value |${safe(v)}| in state ${this.name}`);
        }
        return ok[0];
    }

}

function t(c, d, e='')
{
    return new Transition(c, d, e);
}

function main()
{
    console.time('Start');
    let start = new State('Start', [
        t('@', 'Identifier', 'Emit'),
        t('#', 'Number', 'Emit'),
        t(' ', 'Space', 'Emit'),
        t('\0', 'End', 'Emit'),
        t('\n', 'Newline', 'Emit'),
    ]);
    let sm = new StateMachine(start);
    sm.add(new State('Identifier', [
        t('&', 'Identifier'),
        t(' ', 'Space', 'Emit'),
        t('\0', 'End', 'Emit'),
        t('\n', 'Newline', 'Emit')
    ]));
    sm.add(new State('Number', [
        t('#', 'Number'),
        t(' ', 'Space', 'Emit'),
        t('\0', 'End', 'Emit'),
        t('@', 'Error-Malformed number'),
        t('.', 'Ambiguity-Dot after number'),
        t('\n', 'Newline', 'Emit')
    ]));
    sm.add(new State('Ambiguity-Dot after number', [
        t('@', 'Identifier', 'Emit-Number-Operator'),
        t('#', 'Float', 'Merge')
    ]));
    sm.add(new State('Float', [
        t('#', 'Float'),
        t(' ', 'Space', 'Emit'),
        t('\0', 'End', 'Emit'),
        t('\n', 'Newline', 'Emit')
    ]));
    sm.add(new State('Space', [
        t(' ', 'Space'),
        t('#', 'Number', 'Emit'),
        t('@', 'Identifier', 'Emit'),
        t('\n', 'Newline', 'Emit'),
        t('\0', 'End', 'Emit')
    ]));
    sm.add(new State('Newline', [
        t('\n', 'Newline', 'Emit'),
        t(' ', 'Space', 'Emit'),
        t('#', 'Number', 'Emit'),
        t('@', 'Identifier', 'Emit'),
        t('\0', 'End', 'Emit')
    ]));
    sm.add(new State('End'));
    sm.info();
    console.log('--------------------');
    sm.start();
    let test = "bonjour 25 123.5 666.hello\na 1\0";
    for (let c of test) {
        console.log(`--> |${c}|`);
        sm.run(c);
    }
    if (!sm.isOver()) {
        throw new Error('State Machine was not terminated correctly');
    }
    console.log(`\nResult for |${safe(test)}|:`);
    sm.lastRunResult();
    console.timeEnd('Start');
    console.log('Writing graph in out.txt');
    writeFileSync("out.txt", sm.toGraphiviz());
    console.log('Writing JSON in tokens.json');
    console.log(sm.lastRunResult('json'));
    writeFileSync("tokens.json", JSON.stringify(sm.lastRunResult('json'), null, '    ').toString());
    console.log('Tokens:');
    console.log(sm.lastRunResult('tokens', ['Space']));
}

main();

const cmd = prompt(">>> ");
console.log(cmd);
