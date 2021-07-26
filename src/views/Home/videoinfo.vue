<template>
    <div>
        <div class="mvinfo-content">
            <!-- 视频播放 -->
            <div class="m-c-l">
                <p class="el-icon-arrow-left title" @click="back">视频详情</p>
                <video :src="url" controls loop autoplay></video>
                <!-- 作者 -->
                <div>
                    <el-image v-if="data.artists" :src="data.avatarUrl" class="m-c-l-artimg"></el-image>
                    <span>{{data.creator.nickname}}</span>
                </div>
                <!-- mv名字 -->
                <p class="title">{{data.name}}</p>
                <!-- 发布信息 -->
                <div class="buttonfont">
                    <span>发布：{{data.publishTime}}</span>
                    <span>播放：{{data.playCount}}</span>
                </div>
                <!-- 简介 -->
                <p class="buttonfont">{{data.title}}</p>

            </div>
            <!-- 相关推荐 -->
            <div class="m-c-r">
                <span>相关推荐</span>
                <ul>
                    <li v-for="(item,index) in relateRideo" :key="index" class="buttonfont" @click="playRideo(item.vid)">
                        <el-image class="m-c-r-relatemvimg" :src="item.coverUrl"></el-image>
                        <!-- 播放量 -->
                        <span>{{item.playCount}}</span>
                        <!-- 时长 -->
                        <span class="s2">{{item.durationms}}</span>
                        <div>
                            <!-- mv名 -->
                            <p class="omitfont">{{item.title}}</p>
                            <!-- 创作者 -->
                            <p v-if="item.creator">by {{item.creator[0].userName}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

import '@/assets/style.css'
import api from '@/api/api.js'

export default {
    data(){
        return {
            api,
            url: '',
            data: {},
            relateRideo: [],
            query: this.$route.query.vid
        }
    },
    created(){
        this.getVideoInfo();
        this.getVideoUrl();
        this.getVideoRelate()
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        playRideo(vid){
            this.query = vid;
            console.log(this.query);
            this.getVideoInfo();
            this.getVideoUrl();
            this.getVideoRelate()
           
        },
        getVideoInfo(){
            this.$http({
                url: '/api/video/detail',
                method: 'get',
                params: {
                    id: this.query,
                }
            }).then(res=>{
                this.data = res.data.data;
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        },
        getVideoUrl(){
            this.$http({
                url: '/api/video/url',
                method: 'get',
                params: {
                    id: this.query
                }
            }).then(res=>{
                this.url = res.data.urls[0].url;
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        },
        getVideoRelate(){
             this.$http({
                url: '/api/related/allvideo',
                method: 'get',
                params: {
                    id: this.query
                }
            }).then(res=>{
                this.relateRideo = res.data.data;
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        }
    },
}
</script>

<style scoped>
.mvinfo-content {
    display: flex;
    justify-content: space-around;
    padding: 10px;
}
.el-icon-arrow-left {
    cursor: pointer;
    display: block;
}
.m-c-l>p,.m-c-l>div {
    padding: 10px;

}
.m-c-l {
    width: 70%;
    padding: 10px;
}
.m-c-l video {
    width: 100%;
}
.m-c-l>div:nth-of-type(2)>span {
    padding-right: 10px;
}
.m-c-l-artimg {
    width: 50px;
    border-radius: 50%;
    vertical-align: middle;
}
.m-c-l>p:last-child() {
    width: 100%;
}

.m-c-r {
    width: 30%;
    padding: 10px;
}

.m-c-r li {
    width: 100%;
    position: relative;
    display: flex;
    margin: 10px 10px 10px 0;
}

.m-c-r-relatemvimg {
    width: 65%;
}
.m-c-r li>div {
    width: 100px;
}
.m-c-r li>div>p {
    width: 100%;
    height: 25px;
}

.m-c-r li>span {
    position: absolute;
    left: 25%;
    color: #fff;
}
.m-c-r li>span:nth-child(1) {
    top: 10px;
}
.m-c-r li>.s2 {
    bottom: 10px;
}


</style>