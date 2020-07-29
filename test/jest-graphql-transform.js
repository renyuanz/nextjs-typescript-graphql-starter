const gql = require('graphql-tag')

module.exports = {
  process: function (src) {
    var str = JSON.stringify(gql(src))
    return 'module.exports=' + str + ';module.exports.default=module.exports;'
  },
}
