declare module Turtle {
    import Vector2 = Utils.Vector2;
    class Turtle {
        private crc;
        private x;
        private y;
        private rotation;
        private pencilDown;
        private penColor;
        private imgData;
        private startPosition;
        private startRotation;
        private actions;
        private executing;
        private running;
        private showTurtle;
        private saveImgData;
        private penWidth;
        private savedPosition;
        private savedRotation;
        constructor(context: CanvasRenderingContext2D, x?: number, y?: number, rotation?: number, penDown?: boolean, penColor?: string);
        showHistory(): void;
        runAll(): void;
        runStepByStep(stepsPerSecond?: number, callback?: Function): void;
        private nextStep;
        private drawTurtle;
        private convertToRotation;
        private degreeToRadian;
        private radianToDegree;
        private save;
        private restore;
        savePos(): void;
        restorePos(): void;
        reset(): void;
        resetCanvas(): void;
        resetTurtle(): void;
        resetActions(): void;
        moveForward(px: number): void;
        moveTo(x: number, y: number): void;
        moveTo(d: Vector2): void;
        moveBackward(px: number): void;
        rotateClockwise(degree: number): void;
        rotateCounterClockwise(degree: number): void;
        setRotationTo(degree: number): void;
        setPen(down: boolean): void;
        setColor(color: string): void;
        setWidth(width: number): void;
        hide(): void;
        show(): void;
        getRotation(): number;
    }
}
//# sourceMappingURL=turtle.d.ts.map