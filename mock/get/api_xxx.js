module.exports = function (req) {
  return {
    'code': '1',
    'data': {
      'method': 'get',
      'list|1-10': [{
        'id|+1': 1
      }]
    },
    'msg': 'ok'
  }
}
