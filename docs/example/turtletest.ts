window.addEventListener("load", init);

let turtle: Turtle.Turtle;

function init() {
	let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
	let crc = canvas.getContext("2d");
	turtle = new Turtle.Turtle(crc, canvas.width / 2, canvas.height - 30);
	// turtle.moveForward(50);
	// turtle.rotateClockwise(-90);
	// turtle.moveForward(20);

	// for (let i:number = 10; i < 100; i += 5){
	//     turtle.moveForward(i);
	//     turtle.rotateClockwise(70);
	// }
	// traverseTree(6);
	// moveWithLoops();
	// turtle.stepByStep = true;
	createTree(3, 5);
	// circle(100,20);
	// pentagonCircle();
	// spiralOut();
	// spiralIn();
	turtle.moveTo(canvas.width / 2, 200);
	rainbowWheel();
	// rainbowCircle();
	// rainbowCircle2();
	// squares();

	// turtle.showHistory();
	// turtle.reset();
	// turtle.runAll();
	turtle.runStepByStep(50, turtledone);
}

function turtledone() {
	console.log("turtle is done");
}

let degrees: number = 120;
let branches: number = 2;
let rotation: number = degrees / (branches);
let lengthMultiplier: number = 20;

function traverseTree(depth: number) {
	if (depth <= 0) return;
	turtle.moveForward(depth * lengthMultiplier);
	turtle.rotateClockwise(rotation);
	traverseTree(depth - 1);
	turtle.rotateCounterClockwise(rotation * 2);
	traverseTree(depth - 1);
	turtle.rotateClockwise(rotation);
	turtle.moveBackward(depth * lengthMultiplier);
}

function createTree(branches: number, depth: number): void {
	if (depth <= 0) return;
	let rot = (degrees / (branches - 1));
	turtle.setColor(randomColor());
	turtle.moveForward(depth * lengthMultiplier);
	turtle.rotateClockwise(degrees / 2);
	for (let i: number = 0; i < branches; i++) {
		createTree(branches, depth - 1);
		if (i == branches - 1) break;
		turtle.rotateCounterClockwise(rot);
	}
	turtle.rotateClockwise(degrees / 2);
	turtle.moveBackward(depth * lengthMultiplier);

}

function moveWithLoops() {
	turtle.moveForward(60);
	turtle.rotateClockwise(60);
	for (let i = 0; i < 3; i++) {
		turtle.moveForward(40);
		turtle.rotateClockwise(60);
		for (let j = 0; j < 3; j++) {
			turtle.moveForward(20);
			turtle.moveBackward(20);
			turtle.rotateCounterClockwise(60);
		}
		turtle.rotateClockwise(120);
		turtle.moveBackward(40);
		turtle.rotateCounterClockwise(60);
	}
	turtle.rotateClockwise(120);
	turtle.moveBackward(60);
}

function circle(radius: number = 100, steps: number = 360, clockwise: boolean = true) {
	for (let i: number = 0; i < steps; i++) {
		turtle.moveForward(radius * 2 * Math.PI / steps);
		clockwise ? turtle.rotateClockwise(360 / steps) : turtle.rotateCounterClockwise(360 / steps);
	}
}

function pentagonCircle() {
	for (let i: number = 0; i < 10; i++) {
		for (let k: number = 0; k < 5; k++) {
			turtle.moveForward(50);
			turtle.rotateClockwise(360 / 5);
		}
		turtle.rotateClockwise(360 / 10);
	}
}

function spiralOut() {
	turtle.rotateClockwise(90);
	for (let i: number = 0; i < 50; i++) {
		turtle.moveForward(i);
		turtle.rotateClockwise(50 - i);
	}
}

function spiralIn() {
	turtle.rotateClockwise(90);
	let side: number = 5;
	for (let i: number = 0; i < 500; i++) {
		turtle.moveForward(side);
		side *= 0.998;
		turtle.rotateClockwise(2);
	}
}

function rainbowWheel() {
	turtle.savePos();
	turtle.setWidth(20);
	for (let i: number = 0; i < 36; i++) {
		turtle.setColor("hsl(" + 10 * i + ", 100%, 50%)");
		turtle.restorePos();
		turtle.rotateClockwise(10);
		turtle.savePos();
		for (let k: number = 0; k < 36; k++) {
			turtle.moveForward(5);
			turtle.rotateClockwise(3);
		}
	}
	// turtle.hide();
}

function rainbowCircle() {
	turtle.setWidth(5);
	for (let i: number = 0; i < 36; i++) {
		turtle.savePos();
		for (let k: number = 0; k < 20; k++) {
			turtle.setColor("hsl(" + 360 / 20 * k + ", 100%, 50%)");
			turtle.moveForward(10);
			turtle.rotateCounterClockwise(9);
		}
		turtle.restorePos();
		turtle.rotateCounterClockwise(10);
	}
}

function rainbowCircle2() {
	turtle.setWidth(10);
	for (let i: number = 0; i < 36; i++) {
		turtle.savePos();
		for (let k: number = 0; k < 20; k++) {
			turtle.setColor("hsl(" + (i * 10 + k * 9) + ", 100%, 50%)");
			turtle.moveForward(10);
			turtle.rotateCounterClockwise(9);
		}
		turtle.restorePos();
		turtle.rotateCounterClockwise(10);
	}
}

function squares() {
	for (let i: number = 0; i < 500; i++) {
		turtle.setColor(randomColor());
		turtle.moveForward(i);
		turtle.rotateClockwise(91);
	}
}

function randomColor(): string {
	return "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
}