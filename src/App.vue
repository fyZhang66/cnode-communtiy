<template>
  <div id="app">
    <Header></Header>
    <div class='main'>
      <router-view name="slide"></router-view>
      <router-view name="main"></router-view> <!-- main对应显哪个组件，这里是Article -->
    </div>   
  </div>
</template>

<script>
import Header from './components/Header'  //首先要引入Header组件
import PostList from './components/PostList'
export default {
  name: 'App',
  components:{     //注入到components里
    Header,
    PostList
  }
}
</script>

<style>
.main{
  width: 80%;
  margin:0 auto;
}
</style>
