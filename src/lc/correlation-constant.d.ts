export declare class CorrelationConstant {
    value: number;
    name: string;
    constructor(value: number, name: string);
}
export declare function getCorrelationConstant(id: string): CorrelationConstant;
export declare function getCorrelationConstant(id: number): CorrelationConstant;
