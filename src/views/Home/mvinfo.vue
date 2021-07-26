<template>
    <div>
        <div class="mvinfo-content">
            <!-- 视频播放 -->
            <div class="m-c-l">
                <p class="el-icon-arrow-left title" @click="back">MV详情</p>
                <video :src="url" controls loop autoplay></video>
                <!-- 作者 -->
                <div>
                    <el-image v-if="data.artists" :src="data.artists[0].img1v1Url" class="m-c-l-artimg"></el-image>
                    <span>{{data.artistName}}</span>
                </div>
                <!-- mv名字 -->
                <p class="title">{{data.name}}</p>
                <!-- 发布信息 -->
                <div class="buttonfont">
                    <span>发布：{{data.publishTime}}</span>
                    <span>播放：{{data.playCount}}</span>
                </div>
                <!-- 简介 -->
                <p class="buttonfont">{{data.desc}}</p>

            </div>
            <!-- 相关推荐 -->
            <div class="m-c-r">
                <span>相关推荐</span>
                <ul>
                    <li v-for="(item,index) in relateMv" :key="index" class="buttonfont" @click="playmv(item.id)">
                        <el-image class="m-c-r-relatemvimg" :src="item.cover"></el-image>
                        <!-- 播放量 -->
                        <span>{{item.playCount}}</span>
                        <!-- 时长 -->
                        <span class="s2">{{item.duration}}</span>
                        <div>
                            <!-- mv名 -->
                            <p class="omitfont">{{item.name}}</p>
                            <!-- 创作者 -->
                            <p v-if="item.creator">by {{item.artistName}}</p>
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
            relateMv: [],
            query: this.$route.query.mvid
        }
    },
    created(){
        this.getmvInfo();
        this.getMvUrl();
        this.getMvRelate()
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        playmv(vid){
            this.query = vid;
            console.log(this.query);
            this.getmvInfo();
            this.getMvUrl();
            this.getMvRelate()
        },
        getmvInfo(){
            this.$http({
                url: '/api/mv/detail',
                method: 'get',
                params: {
                    mvid: this.query,
                }
            }).then(res=>{
                this.data = res.data.data;
                console.log(this.data);
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        },
        getMvUrl(){
            this.$http({
                url: '/api/mv/url',
                method: 'get',
                params: {
                    id: this.query
                }
            }).then(res=>{
                this.url = res.data.data.url;
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        },
        getMvRelate(){
             this.$http({
                url: '/api/simi/mv',
                method: 'get',
                params: {
                    mvid: this.query
                }
            }).then(res=>{
                this.relateMv = res.data.mvs;
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    watch: {
        '$route':{
            handler(newVal) {
                if(newVal.query.mvid){
                    console.log('hhh');
                }
            }	
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