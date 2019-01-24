# turtle.ts
An open source typescript and htmlcanvas based turtle. For educational and other purposes.

This is currently under construction, but feel free to test, suggest changes, submit pull requests, etc.

Docs are in the works and will be available on plagiatus.github.io/turtle.ts. for now there is only an example page and the short explanation below.

### how to use
_This is just a quick explanation, in-depth explanation will be in the docs_

1. Download the turle.js and turtle.d.ts as well as the utils.js and utils.d.ts files from the src folder in this repository and put them into your project.  
2. Create a html file with a canvas (and include utils.js, turtle.js as well as your own js file(s))  
3. Initialize a turtle Object of the Module `Turtle` and the Type `Turtle`: 
```typescript
let turtle: Turtle.Turtle;
```  
4. call the constructor of the turtle. make sure to give the turtle the 2d rendering context of your Canvas. The next two parameters are optional and describe the starting position of the turtle. Example to put the turtle into the middle of the canvas:
```typescript
let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
let crc = canvas.getContext("2d");
turtle = new Turtle.Turtle(crc, canvas.width / 2, canvas.height / 2);
```  
5. That's it, now you can tell the turtle what ways to move.  
available movement commands are:  
```typescript
moveForward(pixel: number);
moveBackward(pixel: number);
moveTo(xPosition: number, yPosition: number);
rotateClockwise(degree: number);
rotateCounterClockwise(degree: number);
setRotationTo(degree: number);
savePos(); //saves the turtles current position and rotation
restorePos(); //restores the turtles saved position and rotation 
```  
available pen modification commands are:
```typescript
setPen(down: boolean); //true to make the Turtle draw while moving, false to stop it from drawing
setColor(color: string); //color in the same format as CSS colors
setWidth(width: number); //width in pixels
```  
other commands:
```typescript
hide(); //hides the turtle itself from the canvas
show(); //makes the turtle visible on the canvas
resetCanvas(); //clears the canvas and redraws the turtle at it's current position
resetTurtle(); //sets the turtle to its starting positon and deletes all recorded commands
reset(); //runs both resetTurtle() and resetCanvas()
```  
6. **Important!** The turtle will only record your instructions and will not immediately follow them (except for the ones in the "other commands" section). There are two ways to make the turtle execute your saved commands:  
	1. let the turtle draw all of them at once by running  
	```typescript
	runAll();
	```  
	2. let the turtle draw them step by step by running
	```typescript
	runStepByStep(stepsPerSecond?: number, callback?: Function);
	```  
	The first argument (optional) is how many steps per second the turtle should try to perform, the default is 1. The second argument (optional) is a function without parameters that the turtle will call when it's done with drawing the recorded commands. The turtle will throw an Error if you're trying to make it run another stepbystep walk while it hasn't finished the previous one.