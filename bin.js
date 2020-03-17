#!/usr/bin/env node

const program = require('commander')
  .version(require('./package.json').version)
  .usage('[options] <files>')
  .parse(process.argv)

const globby = require('globby')
const chalk = require('chalk')
const fs = require('fs')

const files = globby.sync(program.args)

files.forEach(file => {
  const str = fs.readFileSync(file, 'utf8')
  try {
    JSON.parse(str)
    console.log(chalk.green(`✓ ${file}`))
  } catch (_) {
    process.exitCode = 1
    console.error(chalk.red(`✕ ${file}`))
  }
})
