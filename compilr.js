'use strict'

// require modules
const config = require('./config')
const exec = require('child-process-promise').exec

const compilr = {}

compilr.init = (logger) => {
  if (logger) {
    this.logger = logger
  } else {
    this.logger = require('winston')
  }
}

compilr.compile = async (dirname) => {
  try {
    // compile and run
    const result = await exec(`ulimit -t ${config.TIMEOUT};node ${dirname}/tmp.js`)

    return {
      success: true,
      output: result.stdout
    }
  } catch (err) {
    return {
      success: false,
      output: err.stdout + err.stderr
    }
  }
}

module.exports = compilr
