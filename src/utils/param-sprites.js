//@ts-check
/// <reference path="../../clipcc-extension.d.ts" />
/// <reference path="../global.d.ts" />

const { type } = require("clipcc-extension")
const { menuSprites } = require("./menu-sprites")

/** @type {MyParam} */
module.exports.paramSprites = {
    type: type.ParameterType.STRING,
    //@ts-ignore
    defaultValue: undefined,
    menu: menuSprites,
}