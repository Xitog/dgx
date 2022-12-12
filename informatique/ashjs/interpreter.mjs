//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { Expression, Literal, Block, Call, ExpressionList, If, While } from "./parser.mjs"

//-----------------------------------------------------------------------------
// Classes
//-----------------------------------------------------------------------------

class Interpreter
{
    constructor(output_function=null, output_screen=null)
    {
        this.root = {};
        this.output_function = output_function == null ? console.log : output_function;
        this.output_screen = output_screen;
    }

    do(node)
    {
        console.log("    do for node : " + node.constructor.name);
        if (node instanceof Expression)
        {
            if (node.operator.token.is(null, 'affectation') || node.operator.token.is(null, 'combined_affectation'))
            {
                let identifier = node.left.token.getValue();
                let value = this.do(node.right);
                if (identifier in this.root)
                {
                    console.log(`Setting ${identifier} ${node.operator.token.getValue()} ${value}`);
                } else {
                    console.log(`Definition of ${identifier} to ${value}`);
                }
                switch (node.operator.token.getValue())
                {
                    case '=':
                        this.root[identifier] = value;
                        break;
                    case '+=':
                        if (!(identifier in this.root))
                        {
                            throw new Error("Unknown variable : " + identifier);
                        }
                        this.root[identifier] += value;
                        break;
                    case '-=':
                        if (!(identifier in this.root))
                        {
                            throw new Error("Unknown variable : " + identifier);
                        }
                        this.root[identifier] -= value;
                        break;
                    case '*=':
                        if (!(identifier in this.root))
                        {
                            throw new Error("Unknown variable : " + identifier);
                        }
                        this.root[identifier] *= value;
                        break;
                    case '/=':
                        if (!(identifier in this.root))
                        {
                            throw new Error("Unknown variable : " + identifier);
                        }
                        this.root[identifier] /= value;
                        break;
                    case '//=':
                        if (!(identifier in this.root))
                        {
                            throw new Error("Unknown variable : " + identifier);
                        }
                        this.root[identifier] = Math.floor(this.root[identifier] / value);
                        break;
                    case '**=':
                        if (!(identifier in this.root))
                        {
                            throw new Error("Unknown variable : " + identifier);
                        }
                        this.root[identifier] = Math.pow(this.root[identifier], value);
                        break;
                    case '%=':
                        if (!(identifier in this.root))
                        {
                            throw new Error("Unknown variable : " + identifier);
                        }
                        this.root[identifier] %= value;
                        break;
                    default:
                        throw new Error("Not handled affectation operator : " + node.operator.token.getValue());
                }
                return this.root[identifier];
            } else if (node.operator.token.is(null, 'operator')) {
                let left = this.do(node.left);
                let right = this.do(node.right);
                switch (node.operator.token.getValue())
                {
                    case '+':
                        return left + right;
                    case '-':
                        return left - right;
                    case '*':
                        return left * right;
                    case '**':
                        return Math.pow(left, right);
                    case '==':
                        return left === right;
                    case '!=':
                        return left !== right;
                    case '>':
                        return left > right;
                    case '<':
                        return left < right;
                    case '>=':
                        return left >= right;
                    case '<=':
                        return left <= right;
                    case 'and':
                        return left && right;
                    case 'or':
                        return left || right;
                    default:
                        throw new Error("Not handled operator : " + node.operator.token.getValue());
                }
            } else {
                throw new Error(`Expression not handled: ${node.operator.token}`);
            }
        } else if (node instanceof Call) {
            const id = node.identifier.token.getValue();
            let p = null;
            let ctx = this.output_screen.getContext("2d");
            switch(id)
            {
                // Console output
                case 'writeln':
                    p = this.do(node.parameters);
                    return this.output_function(p.concat(["\n"]));
                case 'write':
                    p = this.do(node.parameters);
                    return this.output_function(p);
                // Screen output
                case 'line': // x1, y1, x2, y2
                    p = this.do(node.parameters);
                    ctx.beginPath();
                    ctx.moveTo(p[0], p[1]);
                    ctx.lineTo(p[2], p[3]);
                    ctx.stroke();
                    return null;
                case 'rect': // x, y, w, h
                    p = this.do(node.parameters);
                    ctx.beginPath();
                    ctx.rect(p[0], p[1], p[2], p[3]);
                    ctx.stroke();
                    return null;
                case 'fill': // x, y, w, h
                    p = this.do(node.parameters);
                    ctx.fillRect(p[0], p[1], p[2], p[3]);
                    return null;
                case 'circle': // x, y, rayon
                    p = this.do(node.parameters);
                    ctx.beginPath();
                    ctx.arc(p[0], p[1], p[2], 0, 2 * Math.PI, false);
                    ctx.stroke();
                    return null;
                case 'text': // x, y, text
                    p = this.do(node.parameters);
                    ctx.fillText(p[2], p[0], p[1]);
                    return null;
                case 'set_fill':
                    p = this.do(node.parameters);
                    ctx.fillStyle = p[0];
                    return null;
                case 'set_stroke':
                    p = this.do(node.parameters);
                    ctx.strokeStyle = p[0];
                    return null;
                case 'clear':
                    ctx.clearRect(0, 0, screen.width, screen.height);
                    return null;
                // System
                case 'exit':
                    alert("End of script");
                    return null;
                default:
                    throw new Error("Function unknown: " + id);
            }
        } else if (node instanceof ExpressionList) {
            let res = [];
            let nodes = node.get();
            for (let i = 0; i < nodes.length; i++)
            {
                res.push(this.do(nodes[i]));
            }
            return res;
        } else if (node instanceof Literal) {
            let tok = node.token;
            switch(tok.getType())
            {
                case 'integer':
                    return parseInt(tok.getValue());
                case 'number':
                    return parseFloat(tok.getValue());
                case 'string':
                    return tok.getValue().slice(1, tok.getValue().length - 1); // Remove the "
                case 'identifier':
                    return this.root[tok.getValue()];
                case 'boolean':
                    if (tok.getValue() === "true")
                    {
                        return true;
                    }
                    return false;
                default:
                    throw new Error("Not handled type : " + tok.getType());
            }
        } else if (node instanceof If) {
            let cond = this.do(node.cond);
            if (cond === true)
            {
                return this.do(node.block);
            } else if (node.elseblock !== null) {
                return this.do(node.elseblock);
            } else {
                return null;
            }
        } else if (node instanceof While) {
            let cond = this.do(node.cond);
            let res = null;
            let nb = 0; // debug
            while (cond === true)
            {
                res = this.do(node.block);
                cond = this.do(node.cond);
                console.log(nb, cond);
                nb+=1;
                if (nb > 1000) break;
            }
            return res;
        } else if (node instanceof Block) {
            let last = null;
            for (const statement of node.statements) {
                last = this.do(statement);
            }
            return last;
        } else {
            if (node === undefined || node === null)
            {
                throw new Error("Node is null");
            }
            else
            {
                throw new Error("Not handled Node type : " + node.constructor.name);
            }
        }
    }
}

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

export {Interpreter};
