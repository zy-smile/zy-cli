const axios = require("axios")
const path = require('path')
const Inquirer = require('inquirer')
const util  = require('util')
const downloadGitRepo = require('download-git-repo')
// 拦截全局请求响应
axios.interceptors.response.use((res) => {
	return res.data
})
/**
 * 获取模板
 * @returns Promise 仓库信息
 */
async function getZhuRongRepo() {
	return axios.get("https://api.github.com/orgs/lgb-cli/repos")
}
/**
 * 
 * 获取仓库下的版本
 * @param {string} repo 模板名称
 * @returns Promise 版本信息
 */
async function getTagsByRepo(repo) {
	return axios.get(`https://api.github.com/repos/lgb-cli/${repo}/tags`)
}
// 获取模板信息及用户最终选择的模板
async function getRepoInfo() {
  // 获取组织下的仓库信息
  let repoList = await getZhuRongRepo();
  // 提取仓库名
  const repos = repoList.map((item) => item.name);
  // 选取模板信息
  let { repo } = await new Inquirer.prompt([
		{
			name: "repo",
			type: "list",
			message: "Please choose a template",
			choices: repos,
		},
  ])
  return repo;
}
// 获取版本信息及用户选择的版本
async function getTagInfo(temp) {
  let tagList = await getTagsByRepo(temp)
  const tags = tagList.map((item) => item.name);
  // 选取模板信息
  let { repo } = await new Inquirer.prompt([
		{
			name: "repo",
			type: "list",
			message: "Please choose a version",
			choices: tags,
		},
  ])
  return repo
}
// 下载模版
async function downLoadTemp(repo,tag,projectName) {
    const url = `lgb-cli/${repo}${tag ? ('#' + tag) : ''}`
    const cwd = process.cwd()
    const target = path.join(cwd,projectName)
    const downloadGitPromise = util.promisify(downloadGitRepo)
    downloadGitPromise(url, target)
}
module.exports = {
	getRepoInfo,
	getTagInfo,
	downLoadTemp
}
