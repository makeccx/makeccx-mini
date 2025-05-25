//@ts-check
/// <reference path="../../../clipcc-extension.d.ts" />
/// <reference path="../../global.d.ts" />

const { type } = require("clipcc-extension")
const { toScratchBoolean } = require("../../utils/to-scratch-boolean")
const defineBlock = require("../../utils/define-block")

/** @type {string} */
const categoryID = 'boolean'

/** @type {string} */
const color = '#59C059'


/** @type {MyBlock<BlockParams>[]} */
const blocks = [
    defineBlock({
        id: 'boolean',
        type: type.BlockType.BOOLEAN,
        param: {
            a: {
                type: type.ParameterType.STRING,
                defaultValue: '0'
            },
        },
        /** @returns {boolean} */
        function(args, util) {
            return toScratchBoolean(args.a)
        }
    }),
    defineBlock({
        id: 'equal',
        type: type.BlockType.BOOLEAN,
        param: {
            a: {
                type: type.ParameterType.STRING,
                defaultValue: 'a'
            },
            b: {
                type: type.ParameterType.STRING,
                defaultValue: 'A'
            },
        },
        /** @returns {boolean} */
        function(args, util) {
            return args.a == args.b
        }
    })
]


/** @type {MyCategory} */
module.exports.category_boolean = {
    id: categoryID,
    color,
    blocks,
}
