export declare class DataBaseError extends Error {
    readonly message: string;
    readonly code: number;
    constructor(message: string, code: number);
}
