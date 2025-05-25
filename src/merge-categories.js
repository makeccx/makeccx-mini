//@ts-check
/// <reference path="../clipcc-extension.d.ts" />

const { type } = require('clipcc-extension')
const { appendID } = require('./utils/append-id')
const { id: ccxID } = require("./info.json")

const { category_hello } = require('./categories/hello/hello')
const { category_boolean } = require('./categories/boolean/boolean')
const { logBlockError } = require('./utils/log-block-error')

/** @type {string} */
const globalColor = '#66CCFF'

/** @type {MyCategory[]} */
const input = [
    category_hello,
    category_boolean,
]


// ====================================================

/**
 * @type {{
 *     id: string
 *     color: string
 *     blocks: type.BlockPrototype[]
 * }[]}
 */
module.exports.categories = input.filter((c) => (typeof c === 'object')).map((c) => {

    const cid = appendID(ccxID, c.id)

    let blocks = c.blocks.filter((b) => (typeof b === 'object')).flatMap((myBlock) => {
        const blockID = appendID(cid, myBlock.id)
        /** @type {type.BlockPrototype} */
        const out = {
            opcode: blockID,
            messageId: blockID,
            categoryId: cid,
            type: myBlock.type,
            /**
             * @param {*} args 
             * @param {BlockFuncUtil} util 
             * @returns {any}
             */
            function(args, util) {
                try {
                    return myBlock.function(args, util)
                } catch (e) {
                    logBlockError(e, util)
                }
                return ''
            },
        }
        if (typeof myBlock.option === 'object') {
            out.option = myBlock.option
        }
        if (myBlock.branchCount != null) {
            out.branchCount = myBlock.branchCount
        }
        if (typeof myBlock.param === 'object') {
            out.param = {}
            for (const key in myBlock.param) {
                const item = myBlock.param[key]
                // 将undefined输入给扩展加载器会导致加载错误，
                // 因此需要在加载时忽略undefined。
                if (typeof item !== 'object') continue
                /** @type {type.ParameterPrototype} */
                const outParam = {
                    type: item.type,
                    default: item.defaultValue,
                    field: item.field,
                    shadow: item.shadow,
                }
                if (typeof item.menu === 'object') {
                    if (item.menu.items?.length) {
                        if (item.menu.topID) {
                            // 如果topID存在，会构建为顶层id，
                            // 例如topID是"mymenu"，则构建后的id是"bddjr.makeccx.mymenu"。
                            outParam.menuId = appendID(ccxID, item.menu.topID)
                        } else {
                            // 如果topID不存在，会使用param的key构建相对id，
                            // 例如类别id是"category"，积木id是"block"，param的key是"menu"，
                            // 则构建后的id是"bddjr.makeccx.category.block.menu"。
                            outParam.menuId = appendID(blockID, key)
                        }
                        outParam.menu = item.menu.items.map((v) => ({
                            //@ts-ignore
                            messageId: appendID(outParam.menuId, v.id),
                            value: v.value,
                        }))
                    }
                } else if (typeof item.menu === 'function') {
                    // 动态菜单
                    //@ts-ignore
                    outParam.menu = function (...args) {
                        const out = item.menu(...args)
                        return out?.length ? out : [['', '']]
                    }
                }
                out.param[key] = outParam
            }
        }
        if (myBlock.addCommandAfterThis && myBlock.type !== type.BlockType.COMMAND) {
            const cmdBlock = Object.assign({}, out)
            cmdBlock.type = type.BlockType.COMMAND
            cmdBlock.opcode += '_command'
            return [out, cmdBlock]
        }
        return out
    })

    return {
        id: cid,
        color: c.color || globalColor,
        blocks,
    }
})
