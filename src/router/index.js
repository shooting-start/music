import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/login.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/Home/index.vue'),
    children: [
      {
        path: 'find',
        alias: '/index',
        name: 'find',
        component: () => import('@/views/Home/find/find.vue'),
        children: [
          {
            // 推荐
            path: 'recommend',
            alias: '/index/find',
            name: 'recommend',
            component: () => import('../views/Home/find/recommend.vue')
          },
          {
            // 排行榜
            path: 'top',
            name: 'top',
            component: () => import('../views/Home/find/top.vue')
          },
          {
            // 歌单
            path: 'playlist',
            name: 'playlist',
            component: () => import('../views/Home/find/playlist.vue')
          },
          {
            // 歌手
            path: 'artist',
            name: 'artist',
            component: () => import('../views/Home/find/artist.vue')
          },
          {
            // 新歌上架
            path: 'newest',
            name: 'newest',
            component: () => import('../views/Home/find/newest.vue')
          },
          // 歌单详情/排行榜详情
          {
            path: 'playlistmusic',
            name: 'playlistmusic',
            component: () => import('../views/Home/find/playlistmusic.vue')
          }
        ]
      },
      {
        path: 'videos',
        name: 'videos',
        component: ()=> import('@/views/Home/videos/videos.vue'),
        children: [
          {
            path: 'video',
            name: 'video',
            alias: '/index/videos',
            component: ()=> import('@/views/Home/videos/video.vue')
          },
          {
            path: 'mv',
            name: 'mv',
            component: ()=> import('@/views/Home/videos/mv.vue')
          }
        ]
      },
      // mv详情
      {
        path: 'mvinfo',
        name: 'mvinfo',
        component: ()=> import('@/views/Home/mvinfo.vue')
      },
      // 视频详情
      {
        path: 'videoinfo',
        name: 'videoinfo',
        component: ()=> import('@/views/Home/videoinfo.vue')
      },
      // 独家放送
      {
        path: 'exclusive',
        name: 'exclusive',
        component: ()=>import('@/views/Home/exclusive.vue')
      },
      // 我喜欢的音乐
      {
        path: 'mylike',
        name: 'mylike',
        component: ()=>import('@/views/Home/mylike.vue')
      },
      {
        path: 'search',
        name: 'search',
        component: ()=>import('@/views/Home/search.vue')
      }
      

    ]
    
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

router.beforeEach((to,from,next)=>{
  if(to.path === '/login'){
    next();
  }else{
    const token = localStorage.getItem('mytoken');
    if(!token || token === '' ){
      next('/login');
    }else{
      next();
    }
  }
})

export default router
