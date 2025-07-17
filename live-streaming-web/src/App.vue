<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->


  <el-container style="height: 100vh">
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!-- 侧边栏 -->
    <el-aside width="200px" style="background-color: #f2f2f2">
      <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical-demo"
          @select="handleSelect"
      >
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/about">关于我们</el-menu-item>
        <el-menu-item index="/contact">联系我们</el-menu-item>
        <el-menu-item index="/RTMP_HttpFlv_Pull">RTMP_HttpFlv_Pull</el-menu-item>
        <el-menu-item index="/RTMP_Push">RTMP_Push</el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主内容区域 -->
    <el-main>
      <router-view />
    </el-main>
  </el-container>



</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'


export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeMenu = ref(route.path)

    watch(() => route.path, (newPath) => {
      activeMenu.value = newPath
    })

    function handleSelect(index) {
      router.push(index)
    }

    return {
      activeMenu,
      handleSelect,
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
