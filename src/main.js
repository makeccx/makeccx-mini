//@ts-check
/// <reference path="../clipcc-extension.d.ts" />

const { Extension, api } = require("clipcc-extension")
const { categories } = require("./merge-categories")

module.exports = class extends Extension {
    onInit() {
        // 启用扩展
        for (const c of categories) {
            // Fix https://github.com/makeccx/makeccx/issues/5
            api.removeCategory(c.id)
            api.addCategory({
                categoryId: c.id,
                messageId: c.id,
                color: c.color,
            })
            api.addBlocks(c.blocks)
        }
    }

    onUninit() {
        // 禁用扩展
        for (const c of categories) {
            api.removeCategory(c.id)
        }
    }

    // beforeProjectLoad(data, extensions) {}

    // beforeProjectSave(data) {}
}
