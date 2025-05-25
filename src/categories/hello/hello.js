//@ts-check
/// <reference path="../../../clipcc-extension.d.ts" />
/// <reference path="../../global.d.ts" />

const { type } = require("clipcc-extension")
const defineBlock = require("../../utils/define-block")
const { myConfirm } = require("../../utils/my-confirm")
const { paramSprites } = require("../../utils/param-sprites")

/** @type {string} */
const categoryID = 'hello'

/** @type {string} */
const color = '' // Use global color


/** @type {MyBlock<BlockParams>[]} */
const blocks = [
    defineBlock({
        id: 'github',
        //@ts-ignore
        type: undefined,
        async function(args, util) {
            const url = "https://github.com/bddjr/makeccx"
            if (await myConfirm('', url))
                open(url)
        }
    }),
    defineBlock({
        id: 'hello',
        type: type.BlockType.REPORTER,
        function(args, util) {
            return "Hello, ClipCC!"
        }
    }),
    defineBlock({
        id: 'log',
        type: type.BlockType.COMMAND,
        function(args, util) {
            console.log("Hello, ClipCC!")
        }
    }),
    defineBlock({
        id: 'abc',
        type: type.BlockType.REPORTER,
        param: {
            a: {
                type: type.ParameterType.STRING,
                defaultValue: '1',
                menu: {
                    items: [{
                        id: 'item1',
                        value: '1'
                    }, {
                        id: 'item2',
                        value: '2'
                    }, {
                        id: 'item3',
                        value: '3'
                    }],
                }
            },
        },
        function(args, util) {
            return args.a
        }
    }),
    defineBlock({
        id: 'typeof',
        type: type.BlockType.REPORTER,
        param: {
            a: {
                type: type.ParameterType.STRING,
                defaultValue: '0'
            },
        },
        function(args, util) {
            return typeof args.a
        }
    }),
    defineBlock({
        id: 'sprite_name',
        type: type.BlockType.REPORTER,
        param: {
            a: paramSprites,
        },
        function(args, util) {
            return args.a
        }
    }),
]


/** @type {MyCategory} */
module.exports.category_hello = {
    id: categoryID,
    color,
    blocks,
}
