<template>
    <div>
        
            <div ref="lis"  class="r_top" >
                <router-link :class="{activetitle: name=='recommend'}"  to="/index/find/recommend">推荐</router-link>
                <router-link :class="{activetitle: name=='top'}"  to="/index/find/top">排行榜</router-link>
                <router-link :class="{activetitle: name=='playlist'}" to="/index/find/playlist">歌单</router-link>
                <router-link :class="{activetitle: name=='artist'}"  to="/index/find/artist">歌手</router-link>
                <router-link :class="{activetitle: name=='newest'}"  to="/index/find/newest">新歌上架</router-link>
            </div>
            <div class="r-main">
                <router-view></router-view>
            </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            oldli: {},
            name: ''
        }
    },
    created(){
        this.name = this.$route.name;
    },
    methods: {
    },
    // 通过路由的名字来确定当前需要加下划线的标题
    watch: {
        $route(newValue, oldValue) {
            this.name = newValue.name;
        }
    },
    
}
import '@/assets/style.css'
</script>

<style scoped>

  
</style>