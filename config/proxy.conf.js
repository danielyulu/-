/**
 * 接口代理
 */

module.exports = {
  // 本地环境
  local: {
    '/ReportIndexSvc': {
      target: 'http://10.0.31.18:7575'
    },'/base/frontend': {
      target: 'http://10.0.31.72:8080'
    },'/MemberService.svc': {
      target: 'http://10.0.31.18:8001'
    },'/api/V2': {
      target: 'http://10.0.31.18:8760'
    },
  },

  // 开发环境
  dev: {
    '/ReportIndexSvc': {
      target: 'http://10.0.31.18:7575'
    },'/ueditor': {
      target: 'http://10.0.31.18:7575'
    }
  },

  // 测试环境
  test: {
    '/ReportIndexSvc': {
      target: 'http://10.0.31.242:8300'
    },'/base/frontend': {
      target: 'http://10.0.31.75:8080'
    },'/MemberService.svc': {
      target: 'http://10.0.31.242:8030'
    },'/api/V2': {
      target: 'http://10.0.31.242:8100'
    },'/api/baseSvc/': {
      target: 'http://10.0.31.81:8762'
    }
  },

  // 生产环境
  prod: {
    '/ReportIndexSvc': {
      target: 'http://10.0.11.194:8099'
    },'/ueditor': {
      target: 'http://10.0.31.18:7575'
    }
  }
}
