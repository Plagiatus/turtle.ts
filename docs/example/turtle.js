var Turtle;
(function (Turtle_1) {
    var Vector2 = Utils.Vector2;
    class Turtle {
        constructor(context, x = 0, y = 0, rotation = 0, penDown = true, penColor = "#000000") {
            this.actions = [];
            this.running = false;
            this.showTurtle = true;
            this.saveImgData = true;
            this.penWidth = 1;
            this.crc = context;
            this.imgData = this.crc.getImageData(0, 0, this.crc.canvas.width, this.crc.canvas.height);
            this.x = x;
            this.y = y;
            this.savedPosition = new Vector2(x, y);
            this.rotation = rotation;
            this.savedRotation = rotation;
            this.pencilDown = penDown;
            this.penColor = penColor;
            this.startPosition = new Vector2(x, y);
            this.startRotation = rotation;
            // this.actions = [];
            this.executing = false;
            this.save();
            this.drawTurtle();
            this.crc.lineCap = "round";
        }
        showHistory() {
            console.log(this.actions);
        }
        runAll() {
            let oldTurtleShow = this.showTurtle;
            let startTime = Date.now();
            this.executing = true;
            this.showTurtle = false;
            this.saveImgData = false;
            for (let i = 0; i < this.actions.length; i++) {
                this.actions[i].action(this.actions[i].param);
            }
            this.showTurtle = oldTurtleShow;
            if (this.showTurtle)
                this.drawTurtle();
            this.executing = false;
            this.saveImgData = true;
            console.debug("[Turtle] Drew all " + this.actions.length + " steps, taking " + (Date.now() - startTime) + " ms. Average time per step: " + ((Date.now() - startTime) / this.actions.length).toPrecision(2) + " ms");
        }
        runStepByStep(stepsPerSecond = 1, callback = null) {
            if (stepsPerSecond <= 0) {
                console.error("[Turtle] Steps per second is smaller than 0. It needs to be bigger than 0. Aborting drawing.");
                return;
            }
            if (this.running) {
                console.error("[Turtle] Turtle is already running, cannot start a new run");
                return;
            }
            this.running = true;
            this.executing = true;
            this.nextStep(stepsPerSecond, 0, callback);
        }
        nextStep(stepsPerSecond, iteration, callback) {
            if (iteration >= this.actions.length) {
                console.debug("[Turtle] Done.");
                this.running = false;
                this.executing = false;
                callback();
                return;
            }
            this.actions[iteration].action(this.actions[iteration].param);
            setTimeout(this.nextStep.bind(this), 1000 / stepsPerSecond, stepsPerSecond, iteration + 1, callback);
        }
        drawTurtle() {
            if (!this.showTurtle)
                return;
            this.restore();
            this.crc.beginPath();
            let v2 = this.convertToRotation(new Vector2(-20, 0));
            this.crc.moveTo(this.x + v2.x, this.y + v2.y);
            v2 = this.convertToRotation(new Vector2(0, -20));
            this.crc.lineTo(this.x + v2.x, this.y + v2.y);
            v2 = this.convertToRotation(new Vector2(20, 0));
            this.crc.lineTo(this.x + v2.x, this.y + v2.y);
            this.crc.closePath();
            this.crc.fillStyle = "#fff";
            this.crc.fill();
            this.crc.lineWidth = 1;
            this.crc.strokeStyle = "#000000";
            this.crc.stroke();
        }
        convertToRotation(old) {
            let x = old.x * Math.cos(this.rotation) - old.y * Math.sin(this.rotation);
            let y = old.x * Math.sin(this.rotation) + old.y * Math.cos(this.rotation);
            return new Vector2(x, y);
        }
        degreeToRadian(d) {
            return d * Math.PI / 180;
        }
        radianToDegree(r) {
            return r * 180 / Math.PI;
        }
        save() {
            if (!this.saveImgData)
                return;
            this.imgData = this.crc.getImageData(0, 0, this.crc.canvas.width, this.crc.canvas.height);
        }
        restore() {
            if (!this.saveImgData)
                return;
            this.crc.putImageData(this.imgData, 0, 0);
        }
        savePos() {
            if (!this.executing) {
                this.actions.push({ action: this.savePos.bind(this), param: null });
                return;
            }
            this.savedPosition = new Vector2(this.x, this.y);
            this.savedRotation = this.rotation;
        }
        restorePos() {
            if (!this.executing) {
                this.actions.push({ action: this.restorePos.bind(this), param: null });
                return;
            }
            this.x = this.savedPosition.x;
            this.y = this.savedPosition.y;
            this.rotation = this.savedRotation;
        }
        reset() {
            this.resetActions();
            this.resetCanvas();
            this.resetTurtle();
        }
        resetCanvas() {
            this.crc.clearRect(0, 0, this.crc.canvas.width, this.crc.canvas.height);
            this.save();
            this.drawTurtle();
        }
        resetTurtle() {
            this.x = this.startPosition.x;
            this.y = this.startPosition.y;
            this.rotation = this.startRotation;
            this.drawTurtle();
        }
        resetActions() {
            this.actions = [];
        }
        moveForward(px) {
            // console.log(px, this.stepByStep);
            if (!this.executing) {
                this.actions.push({ action: this.moveForward.bind(this), param: px });
                return;
            }
            let v2 = this.convertToRotation(new Vector2(0, -px));
            if (this.pencilDown) {
                this.restore();
                this.crc.beginPath();
                this.crc.moveTo(this.x, this.y);
                this.crc.lineTo(this.x + v2.x, this.y + v2.y);
                this.crc.strokeStyle = this.penColor;
                this.crc.lineWidth = this.penWidth;
                this.crc.stroke();
                this.save();
            }
            this.x += v2.x;
            this.y += v2.y;
            this.drawTurtle();
        }
        moveTo(dx, y) {
            if (typeof dx == "number") {
                if (!this.executing) {
                    this.actions.push({ action: this.moveTo.bind(this), param: new Vector2(dx, y) });
                    return;
                }
                this.x = dx;
                this.y = y;
            }
            else {
                if (!this.executing) {
                    this.actions.push({ action: this.moveTo.bind(this), param: dx });
                    return;
                }
                this.x = dx.x;
                this.y = dx.y;
            }
            this.drawTurtle();
        }
        moveBackward(px) {
            // if (!this.stepByStep) this.actions.push({ action: this.moveBackward.bind(this), param: px });
            this.moveForward(px * -1);
            this.drawTurtle();
        }
        rotateClockwise(degree) {
            if (!this.executing) {
                this.actions.push({ action: this.rotateClockwise.bind(this), param: degree });
                return;
            }
            this.rotation += this.degreeToRadian(degree);
            this.drawTurtle();
        }
        rotateCounterClockwise(degree) {
            if (!this.executing) {
                this.actions.push({ action: this.rotateCounterClockwise.bind(this), param: degree });
                return;
            }
            this.rotation -= this.degreeToRadian(degree);
            this.drawTurtle();
        }
        setRotationTo(degree) {
            if (!this.executing) {
                this.actions.push({ action: this.setRotationTo.bind(this), param: degree });
                return;
            }
            this.rotation = this.degreeToRadian(degree);
            this.drawTurtle();
        }
        setPen(down) {
            if (!this.executing) {
                this.actions.push({ action: this.setPen.bind(this), param: down });
                return;
            }
            this.pencilDown = down;
        }
        setColor(color) {
            if (!this.executing) {
                this.actions.push({ action: this.setColor.bind(this), param: color });
                return;
            }
            this.penColor = color;
        }
        setWidth(width) {
            if (!this.executing) {
                this.actions.push({ action: this.setWidth.bind(this), param: width });
                return;
            }
            this.penWidth = width;
        }
        hide() {
            this.showTurtle = false;
            this.restore();
        }
        show() {
            this.showTurtle = true;
            this.drawTurtle();
        }
        getRotation() {
            return this.radianToDegree(this.rotation);
        }
    }
    Turtle_1.Turtle = Turtle;
})(Turtle || (Turtle = {}));
//# sourceMappingURL=turtle.js.map