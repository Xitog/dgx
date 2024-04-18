//-----------------------------------------------------------------
// Imports
//-----------------------------------------------------------------
import { Lexer, Language } from "./lexer.mjs";
import { Parser } from "./parser.mjs";
import { Interpreter, notAnExpression, VERSION } from "./interpreter.mjs";
import { Transpiler} from "./transpiler.mjs";

//-----------------------------------------------------------------
// Functions
//-----------------------------------------------------------------
function $(element) {
    let obj = document.getElementById(element);
    if (obj === null) {
        let msg = "No element found: " + element;
        alert(msg);
        throw new Error(msg);
    }
    return obj;
}

function clear() {
    $("code_input").value = '';
}

function run(debug = false) {
    console.log(`start of run debug=${debug}`);
    buffer = '';
    let code = $("code_input").value;
    if (code === '') {
        code = $("code_textarea").value;
    }
    if (code === '') {
        alert("No code to process");
        return false;
    }
    let step = 'INIT';
    try {
        code = code.trim();
        if (debug) console.log(`Input code : |code|`)
        step = 'Lexing';
        if (debug) console.log(`${step} :`);
        let lexer = new Lexer('ash', [], debug);
        let tokens = lexer.lex(code);
        if (debug) {
            for (const [index, tok] of tokens.entries()) {
                console.log('    ' + index.toString().padStart(3) + `. ${tok}`);
            }
        }
        step = 'Parsing';
        if (debug) console.log(`${step} :`);
        let root = new Parser().parse(tokens, debug);
        if (debug) console.log('Interpreter :');
        step = 'Executing';
        if (debug) console.log(`${step} :`);
        GlobalInterpreter.setDebug(debug);
        let result = GlobalInterpreter.do(root);
        let output = document.createElement("pre");
        if (debug) console.log('End of execution');
        step = 'Transpiling';
        if (debug) console.log(`${step} :`);
        let transpile = false;
        if (transpile) {
            let codejs = new Transpiler().do(root);
            let resultjs = eval(codejs);
            console.log('Code JS   : ' + codejs);
            console.log('Result JS : ' + resultjs);
        }
        // Graphic output
        if ($("input_ast").checked) {
            let graph = document.createElement("div");
            graph.innerHTML = root.toHTMLTree();
            $("console").prepend(graph);
        }
        // Console output
        let resultLine = '';
        if (result !== notAnExpression) {
            resultLine = '= ' + result;
        }
        output.innerHTML = '<span class="command">&gt;&gt;&gt; ' + lexer.toHTML(tokens, ['blank']) + '</span>\n' + buffer + resultLine;
        $("console").style.display = 'block';
        $("console").prepend(output);
        console.log('Result : ' + result);
        $("code_input").value = '';
    } catch (e) {
        console.log(`[${step}] Error when executing code: ${code}`);
        console.log(`[${step}] ${e.message}`);
        console.trace();
        alert(`[${step}] ${e.message}`);
    }
    console.log(`end of run at ${step}`);
}

function openOrCloseOptions() {
    let elem = $('option_panel');
    if (elem.style.display === "block") {
        elem.style.display = "none";
    } else {
        elem.style.display = "block";
    }
}

function changeInput() {
    if ($('code_textarea').style.display !== 'inline') {
        let code = $("code_input").value;
        $("code_input").value = '';
        $('code_textarea').value = code;
        $("code_input").style.display = 'none';
        $('code_textarea').style.display = 'inline';
    } else {
        let code = $('code_textarea').value;
        $('code_textarea').value = '';
        $("code_input").value = code;
        $("code_input").style.display = 'inline';
        $('code_textarea').style.display = 'none';
    }
}

let buffer = '';
function outputFunction(m) {
    console.log(m);
    buffer += m + '\n';
}

function getScreenFunction() {
    let screen = $("screen");
    let ctx = screen.getContext("2d");
    if (screen.style.display !== 'block') {
        // Setting canvas size
        // CSS size
        screen.style.width = "640px";
        screen.style.height = "480px";
        // HTML size
        let scale = window.devicePixelRatio;
        screen.width = 640 * scale;
        screen.height = 480 * scale;
        ctx.scale(scale, scale);
        // Clear
        ctx.clearRect(0, 0, screen.width, screen.height);
        screen.style.display = 'block';
        // No blur effect
        ctx.imageSmoothingEnabled = false;
    }
    return ctx;
}

function main() {
    console.log('start of main');
    $("version").innerHTML = "Running v" + VERSION;
    GlobalInterpreter = new Interpreter(outputFunction, getScreenFunction);
    $("code_input").addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            console.clear();
            console.log("Enter in input pressed");
            let debug = $("input_debug").checked;
            run(debug);
        }
    });
    $("button_clear").onclick = clear;
    $("button_run").onclick = function() {
        console.clear();
        console.log("Button run pressed");
        let debug = $("input_debug").checked;
        run(debug);
    };
    $("button_run").disabled = false;
    // Options
    $("options_button").onclick = openOrCloseOptions;
    $("input_multilines").onchange = changeInput;
    $("input_multilines").checked = false;
    $("input_debug").checked = false;
    // End
    console.log("end of main");
}

let data;
await fetch('./languages/ash.lang.json').then(response => response.json().then(
    data =>
        Language.readDefinition(data)
));

let GlobalInterpreter;

window.onload = function () { main(); };

function checkActivation() {
    if ($("button_run").disabled) {
        main();
    }
}
setInterval(checkActivation, 1000);
