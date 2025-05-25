//@ts-check
/// <reference path="../../clipcc-extension.d.ts" />
/// <reference path="../global.d.ts" />

/**
 * @param {*} a 
 * @returns {boolean}
 */
module.exports.toScratchBoolean = (a) => {
    return !!a && (
        typeof a !== "string" || !/^(0|false)$/i.test(a)
    )
}