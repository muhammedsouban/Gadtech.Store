(function () {
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window
            .mozRequestAnimationFrame ||
            window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function Node(x, y, radius, blur, speed) {
        speed /= 2;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.blur = blur;
        this.a = Math.random() * Math.PI * 2;
        this.speed = Math.random() * speed + speed;
    }

    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        width = window.innerWidth,
        height = window.innerHeight,
        backGroundGradient,
        overlayGradient,
        canvasCenterX,
        canvasCenterY,
        nodes = [],
        i = 0,
        radius,
        fakeBlur;

    function redraw() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvasCenterX = width / 2;
        canvasCenterY = height / 2;

        canvas.width = width;
        canvas.height = height;

        backGroundGradient = context.createRadialGradient(canvasCenterX, canvasCenterY, 0, canvasCenterX,
            canvasCenterY, canvasCenterX);
        backGroundGradient.addColorStop(0, "#666");
        backGroundGradient.addColorStop(1, "#000");

        overlayGradient = context.createLinearGradient(0, height, width, 0);
        overlayGradient.addColorStop(0.25, "teal");
        overlayGradient.addColorStop(0.75, "orange");
    }

    function render() {
        requestAnimFrame(render);
        context.fillStyle = backGroundGradient;
        context.fillRect(0, 0, width, height);

        var i = 0,
            len = nodes.length,
            node;
        for (; i < len; i++) {
            node = nodes[i];

            var dx = Math.cos(node.a) * node.speed, //
                dy = Math.sin(node.a) * node.speed;

            node.x += dx;
            node.y += dy;

            if (node.x < -node.radius * 2 && dx < 0) {
                node.x = width + node.radius * 2;
            } else if (node.x > width + node.radius && dx > 0) {
                node.x = -node.radius;
            }

            if (node.y < -node.radius && dy < 0) {
                node.y = height + node.radius * 2;
            } else if (node.y > height + node.radius && dy > 0) {
                node.y = -node.radius;
            }

            gradient = context.createRadialGradient(0, 0, 0, 0, 0, node.radius);
            gradient.addColorStop(0, "rgba(255,255,255,0.5");
            gradient.addColorStop(node.blur, "rgba(255,255,255,0.5)");
            gradient.addColorStop(1, "rgba(255,255,255,0.0");
            context.fillStyle = gradient;
            context.save();
            context.translate(node.x, node.y);
            context.beginPath();
            context.arc(0, 0, node.radius, 0, Math.PI * 2, true);
            context.fill();
            context.restore();
        }

        context.save();
        context.globalCompositeOperation = "overlay";
        context.fillStyle = overlayGradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();
    }

    for (; i < 100; i++) {
        radius = Math.random() * 32 + 32;
        fakeBlur = Math.random() * 0.3 + 0.7;
        x = Math.random() * width;
        y = Math.random() * height;
        nodes.push(new Node(x, y, radius, fakeBlur, 1));
    }

    document.getElementById('sidebarEffect').appendChild(canvas)
    window.addEventListener("resize", redraw, false);
    redraw();
    render();
})();