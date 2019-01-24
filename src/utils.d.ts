declare module Utils {
    function RandomRange(min: number, max: number): number;
    function RandomColor(includeAlpha?: boolean): string;
    class Vector2 {
        x: number;
        y: number;
        constructor(x: number, y?: number);
        equals(obj: Vector2): boolean;
    }
}
//# sourceMappingURL=utils.d.ts.map