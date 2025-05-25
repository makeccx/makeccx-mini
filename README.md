# makeccx-mini

😎 迷你版 makeccx ，基于 Python 3 实现。

> ✅ 开发环境占用小  
> ✅ 打包速度快  
> ✅ 支持 多个 JS 文件  
> ✅ 支持 语言文件特殊写法  
> ✅ 支持 JSDoc 类型提示  
> ❌ 不支持 node_modules  
> ❌ 不支持 TypeScript（可以用 JSDoc 代替）  
> ❌ 不支持 ES Module 语法  
> ❌ 不支持 语法检查  
> ❌ 不支持 Tree Shaking（会打包所有 JS 文件）  
> ❌ 不支持 Minify（压缩 JS 文件）  
> ❌ 不支持 `makeccx.config.ts`  
> ❌ 不支持 `makeccx.config.js`

## 开始

1. 确保已安装 [Python 3](https://www.python.org)
2. 下载 zip: https://github.com/makeccx/makeccx-mini/archive/refs/heads/main.zip
3. 创建文件夹，例如 `clipcc-extension-example`
4. 解压到文件夹里
5. 使用 [VSCode](https://code.visualstudio.com) 打开文件夹
6. 修改 `src/info.json`
7. 新建终端，运行命令 `./makeccx`

## 升级到标准版

需确保已安装 [Node.js](https://nodejs.org/) 。  

1. 删除以下文件

```
clipcc-extension.d.ts
makeccx
makeccx.bat
```

2. 新建 `package.json` 文件，然后粘贴以下内容，然后保存。

```json
{
  "private": true,
  "scripts": {
    "build": "makeccx build"
  },
  "devDependencies": {
    "clipcc-extension": "^0.2.0",
    "makeccx": "^1.1.3"
  }
}
```

3. 运行命令

```
npm i
npm run build
```
