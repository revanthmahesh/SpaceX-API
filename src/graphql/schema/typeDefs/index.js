/*eslint-disable */
const global = require('./global')
const capsule = require('./capsule')
const core = require('./core')
const dragon = require('./dragon')
const history = require('./history')
const info = require('./info')
const landpad = require('./landpad')
const launchpad = require('./launchpad')
const mission = require('./mission')
const roadster = require('./roadster')
const rocket = require('./rocket')
const ship = require('./ship')

const typeDefs = [
  ...global,
  capsule,
  core,
  dragon,
  history,
  info,
  landpad,
  launchpad,
  mission,
  roadster,
  rocket,
  ship
]

module.exports = typeDefs
