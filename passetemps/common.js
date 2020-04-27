var has_translated = false;

function getFloat(id) {
    return parseFloat(document.getElementById(id).value);
}

function setFloat(id, val) {
    document.getElementById(id).value = val;
}

function circle(ctx, color, x, y, r) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
}

function line(ctx, color, x1, y1, x2, y2) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function rect(ctx, color, x, y, w, h, fill) {
    if (fill) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    } else {
        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, w, h);
    }
}

function init(id='screen') {
    let screen = document.getElementById(id);
    let context = screen.getContext('2d');
    if (!has_translated) {
        context.translate(0.5, 0.5);
        has_translated = true;
    }
    return { screen, context }
}
