# zy-cli
前端脚手架学习
## 前端脚手架学习目的

平常在写项目的时候，可以直接用vue-cli来创建项目，创建完项目随着功能不断地完善，可能会有一些公共的文件，在创建别的项目的时候，这个时候就需要复制一份出来，在这个基础上进行修改，如果项目比较多的话就需要不停地手动去复制粘贴，比较麻烦， 所以学习前端脚手架的目的是为了减少重复的复制粘贴，通过命令的形式来下载封装好的项目模版，包含公共方法、字体文件、组件、插件等，不用再重复操作。

##  流程描述

创建脚手架的第一步需要注册脚手架名称和执行指令，通过执行指令拿到交互操作获取的信息来下载对应的模版文件

 - commander 注册命令的库
 - inquirer 用来交互操作，并拿到交互信息
 - download-git-repo   根据拿到的信息通过git下载文件

## 脚手架的初始化


1. 创建一个脚手架，首先创建一个文件夹，给这个文件夹命名demo, 通过`npm init -y`初始化文件夹生成package.json文件

2. 在demo文件下面创建一个bin文件夹，在bin里面创建一个入口文件`zy-cli`,可以自定义

3. zy-cli文件里面的头部需要加上`#! /usr/bin/env node`,用来指定脚本的解释程序

4. 通过`npm link`把命令挂载到全局，可以临时在本地全局使用命令

## 给脚手架创建命令

  

给脚手架创建执行命令需要用到node的commander第三方库

下载`npm install commander`

  

假如要创建一个zy-cli脚手架，在初始化项目模版的时候可以这样执行命令`zy-cli create projectname`

表示创建一个文件夹名为projectname的项目，这里就需要用commander来注册create命令，来执行相对应的操作

  
  

1. 首先在zy-cli入口文件里面引入commander，并初始化实例

  ```js
const { Command } = require("commander")
const program = new Command()
```

2. 注册命令名称和一些描述信息

```js
program.name("zy-cli")
.description("create a vue template")
.version("1.0.0")
```
3. 注册执行命令的操作,并在执行命令后执行对应的操作

```js
program

.command("create <project-name>")

.description("create a new project")

.action((str, options) => {

console.log(str, options)

require('../commands/create')(str,options)

})
```
在action函数里面可以拿到create 命令后面的项目名称来创建文件夹


通过调用github官方的api来获取仓库里面的模版信息和标签信息，然后通过下载接口把模版下载到本地。


到这里，一个简易的前端脚手架就完成了，还可以通过一些第三方库做一下加载优化，交互优化和样式美化，以后继续完善。
