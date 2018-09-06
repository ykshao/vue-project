**1. 安装依赖**
```sh
$ npm install
```

**2. 启动开发**
```sh
$ npm start
```

**3. 部署打包**
```sh
$ npm run build
```

**4. 目录结构**
```
├── assets
│   └── images
├── build
│   ├── common
│   ├── middleware
│   ├── ssl
│   ├── utils
│   └── webpack
├── mock
│   └── get
├── node_modules
├── src
│   ├── common
│   ├── components
│   │   └── layout
│   ├── constant
│   ├── http
│   ├── images
│   ├── router
│   ├── store
│   ├── stylesheet
│   ├── template
│   └── views
│       └── home
└── static
```
    - assets: 打包后此目录里的文件会和dist目录里的文件会合并
    - build: 运行环境支持
    - mock: http数据和page数据
    - node_modules: 项目依赖
    - src: 项目源文件
    - static: 临时的静态服务文件

**5. 重要文件 snail.yml** 
```yml
## 服务器配置
server:
  ## 服务器端口 
  port: ~
  ## 是否启用https
  https: false

## 服务器功能开关配置
onOff:
  ## 静态资源开关
  static: false
  ## mock服务开关
  mock: true
  ## 代理开关，联调时可开启
  proxy: false

## 静态资源配置
static:
  ## 静态资源目录
  dirname: 'static'
  ## 静态资源访问路径
  virtualPath: '/static'

## mock服务配置
mock:
  ## 拦截的请求前缀
  context: /api
  ## jsonp查询key
  callback: callback

## 代理配置
proxy:
  ## 拦截的请求前缀
  context: /api
  options:
    ## API接口地址
    target: http://127.0.0.1:3824
    changeOrigin: true
    secure: false
```


**6. 更新日志** 

 - v1.8.2 remove imagemin-webpack-plugin
 - v1.8.1 fix pxtorem options
 - v1.8.0 Support auto px2rem
 - v1.7.2 fix publish_path; optimize alias
 - v1.7.1 fix rem gen mutil px
 - v1.7.0 Support imagemin
