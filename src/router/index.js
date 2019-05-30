import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article'
import PostList from '../components/PostList'
import UserInfo from '../components/UserInfo'
import SlideBar from '../components/SlideBar'


Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'root',
      path:'/',   //接受从postlist里面传递出来的id
      components:{
        main:PostList      //path指向的组件
      }
    }
    ,
    {
      name:'post_content',
      path:'/topic/:id&author=:name',   //接受从postlist里面传递出来的id
      components:{
        main:Article,     //path指向的组件  ,这时渲染连个组件
        slide:SlideBar
      }
    },
    {
      name:'user_info',
      path:'/user_info/:name',
      components:{
        main:UserInfo
      }
    }
  ]
})
