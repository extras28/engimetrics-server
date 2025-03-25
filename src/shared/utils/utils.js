import _ from "lodash";

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
