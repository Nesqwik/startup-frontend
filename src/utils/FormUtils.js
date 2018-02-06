// @flow
import * as StringUtils from "./StringUtils";

/**
 * check if input string is composed by A-z char and spaces only
 * @param input string
 * @returns true if it is, false otherwise
 */
export function isAlpha(input: string): boolean {
    if (typeof input !== 'string') return false;
    return matchRegex(/^[A-Za-z ]*$/, input);
}

/**
 * Check if the input is alpha numeric
 * @param input (string or number)
 * @returns true if it is, false otherwise
 */
export function isAlphaNum(input: any): boolean {
    return matchRegex(/^[a-zA-Z0-9\-_ ']*$/, input);
}

/**
 * Check if the input is alpha numeric without space
 * @param input (string or number)
 * @returns true if it is, false otherwise
 */
export function isAlphaNumNoSpace(input: any): boolean {
    return matchRegex(/^[a-zA-Z0-9\-_']*$/, input);
}

/**
 * Check if the input is an email
 * @param input (string)
 * @returns true if it is, false otherwise
 */
export function isEmail(input: string): boolean {
    return matchRegex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, input);
}

/**
 * Check if the input is equal to input2
 * @param input (string), input2 (string)
 * @returns true if it is, false otherwise
 */
export function isEqual(input: string, input2: string): boolean {
    return input=== input2;
}


/**
 * Check if input match the regex.
 * @param regex
 * @param input to test
 * @returns true if it is, false otherwise
 */
export function matchRegex(regex: any, input: any): boolean {
    if (typeof input !== 'string' && typeof input !== 'number') return false;
    let clearedString = StringUtils.removeDiacritics(input + "");
    return regex.test(clearedString);
}

/**
 * Check if the input is empty.
 * An empty string is "".
 * An empty number does not exists.
 * An empty object is {}.
 * An empty array is [].
 * Null or undefined is considered as empty.
 * @param input (any type)
 * @returns true if it is, false otherwise
 */
export function isEmpty(input: any): boolean {
    if (typeof input === "number") return false;
    if (typeof input === "object") {
        if (!input) return true;

        if (input instanceof Date) {
            return false;
        }

        return Object.keys(input).length === 0;
    }
    return !input;
}

/**
 * Check if the input is numeric.
 * A string with value "1337" is numeric.
 * Any number is numeric.
 * @param input
 * @returns true if it is, false otherwise
 */
export function isNumeric(input: any): boolean {
    return matchRegex(/^[0-9 ]*$/, input)
}