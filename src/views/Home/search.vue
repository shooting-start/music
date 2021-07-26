<template>
    <div class="search">
        <span> {{val}}</span>
        <span class="buttonfont">找到{{total}}首单曲</span>
        <!-- 标签 -->
        <div class="r_top">
            <ul>
                <li class="s-t" v-for="(item,index) in types" :key="index" :class="{activetitle: type==item.id}" @click="type = item.id" >
                    {{item.name}}
                </li>
            </ul>
        </div>
        <!-- 列表 -->
        <div v-if="type===1">
            <el-table :data="tracks"  @row-click = "playMusic" stripe style="width: 100%">
                <el-table-column prop="title" label="歌曲标题" width="280"></el-table-column>
                <el-table-column prop="artist" label="歌手" width="160"></el-table-column>
                <el-table-column prop="album" width="290" label="专辑"></el-table-column>
                <el-table-column prop="time" width="160" label="时长"></el-table-column>
            </el-table>
        </div>
        <div v-else-if="type===1000">
            <ul  class="playlist buttonfont" >
                <li v-for="(item,index) in list" :key='index' class="hover" @click="goPlaylistmusic(item.id)">
                    <!-- 播放量 -->
                    <span >播放量：{{item.playCount}}</span>
                    <el-image :src="item.coverImgUrl" alt=""></el-image>
                    <p>{{ item.name }}</p>
                </li>
            </ul>
        </div>
        <div v-else-if="type===1004" class="mv-bottom">
            <ul>
                <li v-for="(item,index) in list" :key="index" class="buttonfont" @click="gomvinfo(item.id)">
                    <el-image style="border-radius:15px" :src="item.cover"></el-image>
                    <!-- 播放量 -->
                    <p>{{item.playCount}}</p>
                    <!-- 名字 -->
                    <p class="omitfont">{{ item.name }}</p>
                    <!-- 作者 -->
                    <p>{{item.artistName}}</p>
                    <!-- mvid: item.id -->
                </li>
            </ul>
        </div>
        <div v-else-if="type===1014">
            <ul class="video-b">
                <li v-for='(item,index) in list' :key="index"  class="video-li buttonfont" @click="govideoinfo(item.vid)">
                    <el-image style="border-radius:15px" :src="item.coverUrl"></el-image>
                    <!-- 播放时长 -->
                    <span>{{item.playTime}}</span>
                    <!-- 描述 -->
                    <p class="omitfont">{{ item.title }}</p>
                </li>
            </ul>
        </div>
        <div class="bottom">
            <el-pagination background layout="prev, pager, next"
            @current-change="changePage"
            :current-page="page"
            :total="total">
            </el-pagination>
        </div>
       
    </div>
</template>

<script>

import '@/assets/style.css'
import api from '@/api/api.js'

export default {
    data(){
        return {
            tracks: [],
            val: this.$route.query.value,//搜索框输入的内容
            limit: 15,
            page: 1,
            list: [],//所有信息
            total: 0,
            type: 1,//搜索类型 1: 单曲, 1000: 歌单，1004: MV，1014: 视频,
            api,
            types: [
                {
                    id: 1,
                    name: "单曲"
                },
                {
                    id: 1000,
                    name: "歌单",
                },
                {
                    id: 1004,
                    name: "MV",
                },{
                    id: 1014,
                    name: "视频"
                }
            ]
        }
    },
    methods: {
        changePage(val){
            this.page = val;
            this.getSearch();
        },
        playMusic(row){
            this.api.playmusic(row.id);
        },
        getSearch(){
            this.$http({
                url: '/api/cloudsearch',
                params: {
                    keywords: this.val,
                    limit: this.limit,
                    offset: (this.page-1)*this.limit,
                    type:this.type
                }
            }).then(res=>{
                this.list = [];
                if(this.type === 1){
                    this.list = res.data.result.songs;
                    // list需要多次使用，使用前需要清空数组
                    this.list.map((item,i)=>{
                        let obj = {};
                        obj.title = item.name;
                        obj.artist = item.ar[0].name;
                        obj.album = item.al.name;
                        obj.time = api.timeConver(item.dt);
                        obj.id = item.id;
                        this.tracks.push(obj);
                    })
                    this.total = res.data.result.songCount;
                }else if(this.type === 1000){
                    this.list = res.data.result.playlists;
                    this.total = res.data.result.playlistCount;
                }else if(this.type === 1004){
                    this.list = res.data.result.mvs;
                    // 接口问题：只有第一页返回的数据才有count
                    if(res.data.result.mvCount){
                        this.total = res.data.result.mvCount;
                    }
                    this.list.map(item=>{
                        if(item.playCount>10000){
                            item.playCount = parseInt(item.playCount/10000) + '万';
                        }
                    })
                }else if(this.type === 1014){
                    this.list = res.data.result.videos;
                    this.total = res.data.result.videoCount;
                    this.list.map(item=>{
                        item.playTime = api.timeConver(item.playTime);
                    })
                }
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        },
        goPlaylistmusic(id){
            this.$router.push(`/index/find/playlistmusic?id=${id}`)
        },
        gomvinfo(id){
            this.$router.push(`/index/mvinfo?mvid=${id}`)
        },
        govideoinfo(vid){
            this.$router.push(`/index/videoinfo?vid=${vid}`);
        },
        

    },
    created(){
        this.getSearch();
    },
    watch: {
        // 路由参数变化重新请求数据
        $route(to,from){
            this.val = to.query.value;
            this.getSearch()
        },
        type(){
            this.getSearch()
        }
    }
        
}
</script>

<style scoped>
.search>span {
    display: inline-block;
    margin: 10px;
}
.s-t {
    cursor: pointer;
}
/* 歌单 */
.playlist {
    display: flex;
    flex-flow: row wrap;
}
.playlist>li {
    box-sizing: border-box;
    padding: 10px;
    width: 20%;
    position: relative;
    cursor: pointer;
}
.playlist>li>span {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 4;
    font-weight: 400;
}
/* mv */
.mv-bottom>ul {
    display: flex;
    flex-flow: row wrap;

}
.mv-bottom>ul>li {
    width: 33%;
    box-sizing: border-box;
    padding: 10px;
    position: relative;
}
.mv-bottom>ul>li>p:nth-of-type(1) {
    position: absolute;
    right: 20px;
    top: 15px;
    color: #fff;
}


/* video */
.video-b {
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;
}
.video-b>.video-li {
    width: 33%;
    box-sizing: border-box;
    padding: 10px;
    position: relative;
}
.video-li>span:nth-of-type(1) {
    position: absolute;
    right: 20px;
    bottom: 30px;
    color: #fff;
}

</style>