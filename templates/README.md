### 1、该工程支持直接写js、vue、react方式开发
### 2、运行说明
    (1)首先执行npm install ,安装依赖
    (2)执行npm run dev ,运行项目
    (3)执行npm run build，打包，支持自动压缩成zip文件
### 3、配置文件说明
    (1)webpack.base.conf.js--开发和打包用到的公用配置项，通过webpack-merge 分别使用
    (2)webpack.build.config.js--打包配置
    (3)webpack.dev.config.js--开发配置，生成本地服务，设置访问域名、热替换、代理、端口等信息
    (4)webpack.plugins.js--配置webpack插件
    (5)webpack.rules.js--配置webpack loader，进行文件处理
    (6)postcss.config.js--配置css的处理方式，如自动添加前缀、px自动转rem
    (7).babelc--es6转换规则