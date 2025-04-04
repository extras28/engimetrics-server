import crypto from 'crypto';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';

/**
 *
 * @param {*} str
 * @returns
 */
export function isVietnamese(str) {
    str = _.toString(str).toLowerCase();

    if (/Á|À|Ã|Ạ|Ả|Â|Ấ|Ầ|Ẫ|Ẩ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ|Ẳ/g.test(str)) return true;
    if (/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|ẳ/g.test(str)) return true;
    if (/É|È|Ẽ|Ẹ|Ẻ|Ê|Ế|Ề|Ễ|Ệ|Ể/g.test(str)) return true;
    if (/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g.test(str)) return true;
    if (/Í|Ì|Ĩ|Ị|Ỉ/g.test(str)) return true;
    if (/ì|í|ị|ỉ|ĩ/g.test(str)) return true;
    if (/Ó|Ò|Õ|Ọ|Ỏ|Ô|Ố|Ồ|Ỗ|Ộ|Ổ|Ơ|Ớ|Ờ|Ỡ|Ợ|Ở/g.test(str)) return true;
    if (/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g.test(str)) return true;
    if (/Ú|Ù|Ũ|Ụ|Ủ|Ư|Ứ|Ừ|Ữ|Ự|Ử/g.test(str)) return true;
    if (/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g.test(str)) return true;
    if (/Y|Ý|Ỳ|Ỹ|Ỵ|Ỷ/g.test(str)) return true;
    if (/ỳ|ý|ỵ|ỷ|ỹ/g.test(str)) return true;
    if (/Đ/g.test(str)) return true;
    if (/đ/g.test(str)) return true;
    // Some system encode vietnamese combining accent as individual utf-8 characters
    if (/\u0300|\u0301|\u0303|\u0309|\u0323/g.test(str)) return true; // Huyền sắc hỏi ngã nặng
    if (/\u02C6|\u0306|\u031B/g.test(str)) return true; // Â, Ê, Ă, Ơ, Ư

    return false;
}

/**
 * check if is stringify by JSON.stringify
 * @param {string} str
 * @returns
 */
export function isJSONStringified(str) {
    if (typeof str !== 'string') return false;
    if (this.isValidNumber(str)) return false;

    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/**
 *
 * @param {*} email
 * @returns
 */
export function isValidEmail(email) {
    let regExp = /^\S+@\S+\.\S+$/;

    return regExp.test(email) /* && /[a-zA-Z]/.test(email.split('@')[0]) */;
}

/**
 *
 * @param {*} str
 * @returns
 */
export function hashSHA256(str) {
    str = _.toString(str);
    return crypto.createHash('sha256').update(str, 'utf-8').digest('hex').toString();
}

/**
 *
 * @param {*} size
 * @returns
 */
export function generateRandomStr(size = 20) {
    return crypto.randomBytes(size).toString('hex');
}

/**
 *
 * @returns
 */
export function getCurrentTimestamp() {
    return Math.floor(Date.now() / 1000); // Divide by 1000 to convert milliseconds to seconds
}

/**
 * Check if is number, both in string format (`'5'`) or number format (`5`). Return false if is NaN, empty, null, undefined...
 * @param {*} param
 * @return {param is number}
 */
export function isValidNumber(param) {
    if (
        ((!_.isString(param) || _.isEmpty(param)) && !_.isNumber(param)) ||
        _.isNull(param) ||
        _.isUndefined(param)
    ) {
        return false;
    }
    return !isNaN(param) && isFinite(param);
}

/**
 *
 * @param {*} obj
 * @returns
 */
export function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 *
 * @param {*} obj
 * @returns
 */
export function removeEmptyFields(obj) {
    for (var key in obj) {
        if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
            delete obj[key];
        } else if (typeof obj[key] === 'object') {
            removeEmptyFields(obj[key]);
            if (Object.keys(obj[key]).length === 0) {
                delete obj[key];
            }
        }
    }
    return obj;
}

/**
 *
 * @param {*} str
 * @returns
 */
export function isAllNumbers(str) {
    return str.split('').every((char) => char >= '0' && char <= '9');
}

/**
 * Removes a file from the filesystem.
 * @param {string} filePath - The path to the file to be removed.
 * @returns {Promise<void>}
 */
export async function removeFile(filePath) {
    try {
        // Resolve the full path
        const resolvedPath = path.resolve(filePath);

        // Remove the file
        await fs.unlink(resolvedPath, (err) => console.log());
        console.log(`File removed: ${resolvedPath}`);
    } catch (error) {
        console.error(`Error removing file: ${error.message}`);
        throw error; // Rethrow the error if needed
    }
}

/**
 *
 * @param {*} str
 * @returns
 */
export function normalizeString(str = '') {
    const vietnameseMap = {
        à: 'a',
        á: 'a',
        ả: 'a',
        ã: 'a',
        ạ: 'a',
        ă: 'a',
        ằ: 'a',
        ắ: 'a',
        ẳ: 'a',
        ẵ: 'a',
        ặ: 'a',
        â: 'a',
        ầ: 'a',
        ấ: 'a',
        ẩ: 'a',
        ẫ: 'a',
        ậ: 'a',
        đ: 'd',
        è: 'e',
        é: 'e',
        ẻ: 'e',
        ẽ: 'e',
        ẹ: 'e',
        ê: 'e',
        ề: 'e',
        ế: 'e',
        ể: 'e',
        ễ: 'e',
        ệ: 'e',
        ì: 'i',
        í: 'i',
        ỉ: 'i',
        ĩ: 'i',
        ị: 'i',
        ò: 'o',
        ó: 'o',
        ỏ: 'o',
        õ: 'o',
        ọ: 'o',
        ô: 'o',
        ồ: 'o',
        ố: 'o',
        ổ: 'o',
        ỗ: 'o',
        ộ: 'o',
        ơ: 'o',
        ờ: 'o',
        ớ: 'o',
        ở: 'o',
        ỡ: 'o',
        ợ: 'o',
        ù: 'u',
        ú: 'u',
        ủ: 'u',
        ũ: 'u',
        ụ: 'u',
        ư: 'u',
        ừ: 'u',
        ứ: 'u',
        ử: 'u',
        ữ: 'u',
        ự: 'u',
        ỳ: 'y',
        ý: 'y',
        ỷ: 'y',
        ỹ: 'y',
        ỵ: 'y',
        À: 'A',
        Á: 'A',
        Ả: 'A',
        Ã: 'A',
        Ạ: 'A',
        Ă: 'A',
        Ằ: 'A',
        Ắ: 'A',
        Ẳ: 'A',
        Ẵ: 'A',
        Ặ: 'A',
        Â: 'A',
        Ầ: 'A',
        Ấ: 'A',
        Ẩ: 'A',
        Ẫ: 'A',
        Ậ: 'A',
        Đ: 'D',
        È: 'E',
        É: 'E',
        Ẻ: 'E',
        Ẽ: 'E',
        Ẹ: 'E',
        Ê: 'E',
        Ề: 'E',
        Ế: 'E',
        Ể: 'E',
        Ễ: 'E',
        Ệ: 'E',
        Ì: 'I',
        Í: 'I',
        Ỉ: 'I',
        Ĩ: 'I',
        Ị: 'I',
        Ò: 'O',
        Ó: 'O',
        Ỏ: 'O',
        Õ: 'O',
        Ọ: 'O',
        Ô: 'O',
        Ồ: 'O',
        Ố: 'O',
        Ổ: 'O',
        Ỗ: 'O',
        Ộ: 'O',
        Ơ: 'O',
        Ờ: 'O',
        Ớ: 'O',
        Ở: 'O',
        Ỡ: 'O',
        Ợ: 'O',
        Ù: 'U',
        Ú: 'U',
        Ủ: 'U',
        Ũ: 'U',
        Ụ: 'U',
        Ư: 'U',
        Ừ: 'U',
        Ứ: 'U',
        Ử: 'U',
        Ữ: 'U',
        Ự: 'U',
        Ỳ: 'Y',
        Ý: 'Y',
        Ỷ: 'Y',
        Ỹ: 'Y',
        Ỵ: 'Y',
    };
    return str
        .split('')
        .map((char) => vietnameseMap[char] || char)
        .join('')
        ?.trim() // Remove leading/trailing spaces
        ?.toLowerCase() // Convert to lowercase
        ?.replace(/\s+/g, ''); // Remove all spaces
}
