export declare const operatorPrecedence: {
    '||': number;
    '&&': number;
};
export declare const operators: string[];
export declare const nonInputs: string[];
/**
 * Takes an array of infix tokens and transforms it to postfix (removing parens)
 */
export default function shuntingYard(tokens: string[]): string[];
