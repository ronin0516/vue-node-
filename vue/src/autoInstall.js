/**
 * webpack的require.context(目录, 是否遍历子目录，匹配文件正则)自动注册
 */
import Vue from 'vue';

 const componentsContext = require.context('./components', true, /.vue$/);
 
 componentsContext.keys().forEach(component => {
    const componentConfig = componentsContext(component).default;
    Vue.component(componentConfig.name, componentConfig)
 })