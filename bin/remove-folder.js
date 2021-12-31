#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "confirm",
      name: "override",
      message: `是否拍平当前文件夹 ${process.cwd()}（递归所有文件到根目录,重名文件将被忽略）？`,
    },
  ])
  .then(() => {
    const base = process.cwd();
    const fileList = [];
    read_each(base, fileList);
    moving(base, fileList);
  })
  .catch((e) => {
    // DO NOTHING
    // TODO
    console.log(e);
  });

/**
 *
 * @param {string} baseDir
 * @param {{fullPath: string; name: string}[]} out
 */
function read_each(baseDir, out) {
  const files = fs.readdirSync(baseDir);
  files.forEach((name) => {
    const fullPath = path.join(baseDir, name);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      read_each(fullPath, out);
    } else {
      out.push({ fullPath, name });
    }
  });
}

/**
 *
 * @param {string} baseDir
 * @param {{fullPath: string; name: string}[]} list
 */
function moving(baseDir, list) {
  const errorFile = [];
  list.forEach((item) => {
    try {
      execSync(`mv ${item.fullPath} ${baseDir}/${item.name}`);
    } catch (error) {
      errorFile.push(item.fullPath);
    }
  });
}
