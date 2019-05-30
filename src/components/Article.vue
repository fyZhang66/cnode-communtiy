<template>
  <div class="article">
    <!-- 如果正在加载显示此div -->
    <div class="loading" v-if="isLoading">
       <img src="../assets/loading.gif">
    </div>
    <div v-else>
      <div class="topic_header">
        <div class="topic_title">{{post.title}}</div>
        <ul>
          <li>*发布与:{{post.created_at | formatDate}}</li>
          <li>*作者:{{post.author.loginname}}</li>
          <li>*{{post.visit_count}}次浏览</li>
          <li>*来自{{post | tabFormatter}}</li>
        </ul>
        <div v-html="post.content" class="topic_content"></div>
      </div>
      <div>
        <div id="reply">
          <div class="topbar">回复</div>
          <div v-for="(reply,index) in post.replies" :key="index" class="replySec">
            <div class="replyUp">
              <router-link :to="{
                name:'user_info',
                params:{
                  name:reply.author.loginname
                }
              }">
                <img :src="reply.author.avatar_url">
              </router-link>
              <router-link :to="{
                name:'user_info',
                params:{
                  name:reply.author.loginname
                }
              }">
                <span>{{reply.author.loginname}}</span>
              </router-link>
              <span>{{index+1}}楼</span>
              <span v-if="reply.ups.length>0">👍{{reply.ups.length}}</span>
              <span v-else></span>
              <p v-html="reply.content"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      isLoading: false, //是否正在加载
      post: {} //代表当前文章页的所有内容
    };
  },
  methods: {
    getArticleData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`) //接收<router-link>里面传递出来的数据作为查询参数
        .then(res => {
          this.isLoading = false;
          if (res.data.success === true) {
            this.post = res.data.data;
            console.log(this.post);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getArticleData();
  },
  /* watch:{
    '$route'(to,from){
      this.getArticleData()
    }
  } */
  beforeRouteUpdate(to,from,next){
    this.getArticleData()
    next()                 //当路由改变但是该组件被复用时调用
                           //例如带有动态参数的路径/foo:id 在/foo/1和/foo/2之间跳转
  }                        //由于会渲染同样的Foo组件，因此会被复用。而这个钩子函数在这个情况下被调用
};                         //可以访问组件实例this
</script>

<style>
@import url("../assets/markdown-github.css");
.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  height: 16px;
  font-size: 12px;
  margin-top: 10px;
}

.article:not(:first-child) {
  margin-right: 340px;
  margin-top: 15px;
}

#reply,
.topic_header {
  background-color: #fff;
}

#reply {
  margin-top: 15px;
}

#reply img {
  width: 30px;
  height: 30px;
  position: relative;
  bottom: -9px;
}

#reply a,
#reply span {
  font-size: 13px;
  color: #666;
  text-decoration: none;
}
.replySec {
  border-bottom: 1px solid #e5e5e5;
  padding: 0 10px;
}

.loading {
  text-align: center;
  padding-top: 300px;
}
.replyUp img {
  width: 30px;
  height: 30px;
  position: relative;
  bottom: -9px;
}
.replyUp a:nth-of-type(2) {
  margin-left: 0px;
  display: inline-block;
}

.topic_header {
  padding: 10px;
}

.topic_title {
  font-size: 20px;
  font-weight: bold;
  padding-top: 8px;
}

.topic_header ul {
  list-style: none;
  padding: 0px 0px;
  margin: 6px 0px;
}

.topic_header li {
  display: inline-block;
  font-size: 12px;
  color: #838383;
}

.topic_content {
  border-top: 1px solid #e5e5e5;
  padding: 0 10px;
}

.markdown-text img {
  width: 92% !important;
}
</style>

