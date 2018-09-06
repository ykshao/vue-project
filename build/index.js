const { env } = require('./config')
require(`./${env.isProd ? 'prod' : 'dev'}`)()
