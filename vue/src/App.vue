<template>
  <div id="app">
    <router-view></router-view>
    <tabbar  :tabbar="tabbar" v-show="isShowTabbar"/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    
  },
  watch: {
    '$route': function(e) {
      this.isShowTabbar = this.tabbar.some(item => item.path.indexOf(e.name) != -1)
      console.log(111111111111,e)
    }
  },
  data(){
    return {
      isShowTabbar: true,
      tabbar: [
        {
          text: '首页',
          path: '/index',
          icon: require('@/assets/images/icon-index.png'),
          selectedIcon: require('@/assets/images/icon-index-selected.png')
        },
        {
          text: '我',
          path: '/mine',
          icon: require('@/assets/images/icon-mine.png'),
          selectedIcon: require('@/assets/images/icon-mine-selected.png')
        },
        // {
        //   text: '首页',
        //   path: '/index',
        //   icon: '@/assets/images/icon-index.png',
        //   selectedIcon: '@/assets/images/icon-index-selected.png'
        // }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  /* margin-top: 60px; */
  
}
body{
  padding: 0;
  margin: 0;
}
</style>
