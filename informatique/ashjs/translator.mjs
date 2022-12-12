//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

// Not used: , Call, ExpressionList, If, While
import { Expression, Literal, Block } from "./parser.mjs"

//-----------------------------------------------------------------------------
// Classes
//-----------------------------------------------------------------------------

class Translator
{
    constructor()
    {
        this.root = {};
    }

    do(node)
    {
        let output = "";
        console.log("    do for node : " + node.constructor.name);
        if (node instanceof Expression)
        {
            let left = node.left.token.getValue();
            let right = this.do(node.right);
            let operator = node.operator.token.getValue();
            switch (operator)
            {
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
                    throw new Error("Not handled operator : " + node.operator.token.getValue());
            }
            return output;
        } else if (node instanceof Literal) {
            let tok = node.token;
            switch(tok.getType())
            {
                case 'integer':
                case 'number':
                case 'boolean':
                    return tok.getValue();
                case 'string':
                    return '"' + tok.getValue().slice(1, tok.getValue().length - 1) + '"'; // Remove the "
                case 'identifier':
                    return tok.getValue();
                default:
                    throw new Error("Not handled type : |" + tok.getType() + "|");
            }
        } else if (node instanceof Block) {
            let last = "";
            for (const statement of node.statements) {
                last += this.do(statement) + "\n";
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

export {Translator};