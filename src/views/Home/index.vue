<template>
    <div class="main">
        <!-- 头部 -->
        <pagehead></pagehead>
        <!-- 主体部分 -->
        <div class="content">
            <!-- 侧边导航栏 -->
            <div class="left">
                <el-row class="tac">
                    <el-col :span="12">
                        <el-menu
                            class="el-menu-vertical-demo">
                            <el-menu-item index="1">
                                <router-link to="/index/find">发现音乐</router-link>
                            </el-menu-item>
                            <el-menu-item index="2">
                                <router-link to="/index/videos">视频</router-link>
                            </el-menu-item>
                            <el-menu-item index="3">
                                <router-link to="/index/mylike">我的喜欢</router-link>
                            </el-menu-item>
                            <el-menu-item index="4">
                                <router-link to="/index/exclusive">独家放送</router-link>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </div>
            <!-- 右边内容 -->
            <div class="right">
                <router-view></router-view>
            </div>
        </div>
        <!-- 播放器 -->
        <div class="player" >
            <div class="coverimg"></div>
            <audio :src="musicUrl" controls autoplay></audio>
            <div class="r"></div>
        </div>
    </div>

</template>

<script>
import pagehead from '@/components/pagehead'
import '@/assets/style.css'

export default {
    data(){
        return {
            
        }
    },
    computed: {
        musicUrl() {
            return this.$store.state.musicUrl;
        }
    },
    components: {
        pagehead
    }
}

</script>

<style lang="css" scoped>
    
    .content {
        display: flex;
        margin-bottom: 50px;
    }
    .left {
        width: 20%;
        margin-right: -9%;
    }
    .right {
        width: 94%;
        height: 500px;
        overflow: auto;
    }
    .el-row::after, .el-row::before {
        display: none;
    }
    .player {
        width: 77%;
        border-top: 1px solid #bbb;
        height: 50px;
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: space-around;
    }
    
</style>