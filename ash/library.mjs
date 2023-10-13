//-----------------------------------------------------------------------------
// Function
//-----------------------------------------------------------------------------

function typeJStoAsh(value) {
    let typeValue = typeof value;
    let typeAsh = null;
    if (typeValue === 'boolean') {
        typeAsh = 'bool';
    } else if (typeValue === 'number') {
        typeAsh = Number.isInteger(value) ? 'int' : 'num';
        typeAsh = (typeAsh === 'int' && value >= 0) ? 'nat' : 'int';
    } else if (typeValue === 'string') {
        typeAsh = 'str';
    }
    return typeAsh;
}

function kindOf(t1, t2) {
    return (
        (t2 === 'int' && t1 === 'nat') // int inclut nat
        || (t2 === 'num' && ['int', 'nat'].includes(t2)) // num inclut int & nat
        || (t1 === t2)
    );
}
//-----------------------------------------------------------------------------
// Classes
//-----------------------------------------------------------------------------

class NilClass {
    toString() {
        return "nil";
    }
}
const nil = new NilClass();

class Value {
    constructor(identifier, type, value) {
        this.identifier = identifier;
        this.type = type;
        this.value = value;
    }

    setValue(value) {
        console.log(typeof value);
        console.log(Number.isInteger(value));
        if (
            (this.type === "boolean" && typeof value !== "boolean")
            || (this.type === "integer" && (typeof value !== "number" || !Number.isInteger(value)))
            || (this.type === "float" && typeof value !== "number")
            || (this.type === "string" && typeof value !== "string")
        ) {
            let expectedType = typeof value;
            if (expectedType === "number") {
                expectedType = Number.isInteger(value) ? "integer" : "float";
            }
            throw new Error(`[ERROR] Variable ${this.identifier} is of type ${this.type} cannot set to ${value} of type ${expectedType}`);
        }
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    getType() {
        return this.type;
    }
}

class Parameter {
    /**
     * Il y a une subtilité dans le defaultValue.
     * Si sa valeur est à "nil" à la création de l'instance (et pas null)
     * c'est qu'on autorise à ne pas donner de valeur à l'argument
     * @param {*} name
     * @param {*} type
     * @param {*} defaultValue
     */
    constructor(name, type, defaultValue = null) {
        this.name = name;
        this.type = type;
        this.defaultValue = defaultValue;
    }

    hasDefault() {
        return this.defaultValue !== null;
    }

    getDefault() {
        if (this.hasDefault()) {
            return this.defaultValue;
        }
        throw new Error(`Not default defined for parameter ${this}`);
    }

    getType() {
        return this.type;
    }

    toString() {
        let def = this.defaultValue !== null ? ` = ${this.defaultValue}` : "";
        return `${this.name} : ${this.type}${def}`;
    }
}

class Function extends Value {
    constructor(identifier, type, value, parameters, code) {
        // value is only "procedure" or "function"
        // type is its return type
        super(identifier, type, value);
        this.parameters = parameters;
        this.code = code;
    }

    toString() {
        return (
            `function ${this.identifier} (` +
            this.parameters.map((x) => x.toString()).join(", ") +
            ")"
        );
    }

    isProcedure() {
        return this.value === 'procedure';
    }

    call(args) {
        if (!Array.isArray(args)) {
            throw new Error(`Args should be a list, not ${typeof args}`);
        }
        for (let i = 0; i < this.parameters.length; i++) {
            // On a moins d'arguments que de paramètres
            if (i >= args.length) {
                for (let j = i; j < this.parameters.length; j++) {
                    if (!this.parameters[j].hasDefault()) {
                        throw new Error(`Missing parameter #${j}: ${this.parameters[j]}`);
                    }
                    args.push(this.parameters[j].getDefault());
                }
            } else if (!kindOf(typeJStoAsh(args[i]), this.parameters[i].getType())) {
                throw new Error(`Wrong parameter type at #${i}: ${this.parameters[i]} expected vs ${args[i]} : ${typeJStoAsh(args[i])}`);
            }
        }
        return this.code(args);
    }
}

class Library {
    static GlobalInterpreter;

    static init(globalInterpreter) {
        Library.GlobalInterpreter = globalInterpreter;
    }

    static call(idFun, args) {
        if (idFun in table) {
            return table[idFun].call(args);
        }
        throw new Error(`[ERROR] Unknown function ${idFun}`);
    }

    //-------------------------------------------------------------------------
    // Console functions
    //-------------------------------------------------------------------------

    static log (args) {
        Library.GlobalInterpreter.output_function(args.join(' '));
        return nil;
    }

    //-------------------------------------------------------------------------
    // Graphic functions
    //-------------------------------------------------------------------------

    static clear(args) {
        let context = Library.GlobalInterpreter.getContext();
        if (context !== null) {
            context.clearRect(0, 0, 640, 480);
        }
        return nil;
    }

    static line(args) {
        let context = Library.GlobalInterpreter.getContext();
        if (context !== null) {
            let x1 = args[0];
            let y1 = args[1];
            let x2 = args[2];
            let y2 = args[3];
            context.lineWidth = args[4];
            context.strokeStyle = args[5];
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();
        }
        return nil;
    }

    static circle(args) {
        let context = Library.GlobalInterpreter.getContext();
        if (context !== null) {
            let centerX = args[0];
            let centerY = args[1];
            let radius = args[2];
            let color = args[3];
            let full = args[4];
            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            if (full) {
                if (color !== nil) context.fillStyle = color;
                context.fill();
            } else {
                if (color !== nil) context.strokeStyle = color;
                context.stroke();
            }
        }
        return nil;
    }

    static rect(args) {
        let context = Library.GlobalInterpreter.getContext();
        if (context !== null) {
            if (args[5]) {
                if (args[4] !== nil) context.fillStyle = args[4];
                context.fillRect(
                    args[0],
                    args[1],
                    args[2],
                    args[3]
                );
            } else {
                if (args[4] !== nil) context.strokeStyle = args[4];
                context.strokeRect(
                    args[0],
                    args[1],
                    args[2],
                    args[3]
                );
            }
        }
        return nil;
    }

    static draw(args) {
        let context = Library.GlobalInterpreter.getContext();
        if (context !== null) {
            context.drawImage(args[2], args[0], args[1]);
        }
        return nil;
    }

    static text(args) {
        let context = Library.GlobalInterpreter.getContext();
        if (context !== null) {
            ctx.fillText(args[0], args[1], args[2]);
        }
        return nil;
    }

    static setFont(args) {
        let context = Library.GlobalInterpreter.getContext();
        context.font = `${args[1]}px ${args[0]}`;
    }

    static setFill(args) {
        let context = Library.GlobalInterpreter.getContext();
        if (context !== null) {
            context.fillStyle = args[0];
        }
    }

    static setStrokeStyle(args) {
        let context = Library.GlobalInterpreter.getContext();
        if (context !== null) {
            context.strokeStyle = args[0];
        }
    }
}

//-----------------------------------------------------------------------------
// Function descriptions
//-----------------------------------------------------------------------------

const table = {
    'log': new Function(
        'log',
        nil,
        'procedure',
        [
            new Parameter('o', 'any')
        ],
        Library.log
    ),
    'clear': new Function(
        'clear',
        nil,
        'procedure',
        [],
        Library.clear
    ),
    'line': new Function(
        'line',
        nil,
        'procedure',
        [
            new Parameter('x1', 'nat'),
            new Parameter('y1', 'nat'),
            new Parameter('x2', 'nat'),
            new Parameter('y2', 'nat'),
            new Parameter('color', 'str', nil)
        ],
        Library.line
    ),
    'circle': new Function(
        'circle',
        nil,
        'procedure',
        [
            new Parameter('x', 'nat'),
            new Parameter('y', 'nat'),
            new Parameter('r', 'nat'),
            new Parameter('color', 'str', nil),
            new Parameter('fill', 'bool', false)
        ],
        Library.circle
    ),
    'rect': new Function(
        'rect',
        nil,
        'procedure',
        [
            new Parameter('x', 'nat'),
            new Parameter('y', 'nat'),
            new Parameter('width', 'nat'),
            new Parameter('height', 'nat'),
            new Parameter('color', 'str', nil),
            new Parameter('fill', 'bool', false)
        ],
        Library.rect
    ),
    'draw': new Function(
        'draw',
        nil,
        'procedure',
        [
            new Parameter('x', 'nat'),
            new Parameter('y', 'nat'),
            new Parameter('image', 'str')
        ],
        Library.draw
    ),
    'text': new Function(
        'text',
        nil,
        'procedure',
        [
            new Parameter('x', 'nat'),
            new Parameter('y', 'nat'),
            new Parameter('s', 'str')
        ],
        Library.text
    ),
    'set_font': new Function(
        'set_font',
        nil,
        'procedure',
        [
            new Parameter('police', 'str'),
            new Parameter('size', 'nat')
        ],
        Library.setFont
    ),
    'set_fill': new Function(
        'set_fill',
        nil,
        'procedure',
        [
            new Parameter('c', 'str')
        ],
        Library.setFill
    ),
    'set_stroke': new Function(
        'set_stroke',
        nil,
        'procedure',
        [
            new Parameter('c', 'str')
        ],
        Library.setStrokeStyle
    )
};

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

export { Library, Function, Value, nil };
