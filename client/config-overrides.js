const { alias, configPaths } = require('react-app-rewire-alias')

module.exports = function override(config) {
    const aliases = configPaths('./tsconfig.base.json')
    const newConfig = alias(aliases)(config)

    return newConfig
}