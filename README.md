# eleme

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# serve with hot reload at ip
npm run dev --host 0.0.0.0

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# references
css reset: http://html5reset.org/
html font-size: https://segmentfault.com/a/1190000010211016

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# keng
1.【scoped：样式只提供给当前组件使用】
如果要覆盖组件中引入的插件的样式，则要在style面把scoped属性去掉，因为scoped属性会将style里面的样式加上唯一标识符，导致无法修改插件的样式

# todos
本地如何用手机访问
适配不同宽度（不同分辨率下，一行显示的文字数量一样，这不应该呀）
加loading
加墓碑效果
要不要加入layout.vue
header放在layout里面？还是每个页面都引用header,再通过slot传递不同的内容
登录/注册功能为一体
路由const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
使用keep-alive缓存组件

