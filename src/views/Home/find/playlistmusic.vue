<template>
    <div class="content">
        <div class="top buttonfont buttonfont">
            <div class="playlistmusicleft">
                <el-image :src='playlistmusic.coverImgUrl' class="img1"></el-image>
            </div>
            <div class="playlistmusicright">
                <!-- 标题 -->
                <span>{{playlistmusic.name}}</span>
                <div>
                    <!-- 头像 -->
                    <el-image :src='playlistmusic.creator.avatarUrl' class="img2"></el-image>
                    <span>{{playlistmusic.creator.nickname}}</span>
                    <span>{{playlistmusic.createTime}}创建</span>
                </div>
                <div>
                    <span>标签：</span>
                    <span v-for="(item,index) in playlistmusic.tags" :key="index">
                        {{item}}
                    </span>
                </div>
                <!-- 简介 -->
                <div class="info">简介：{{playlistmusic.description}}</div>
            </div>

        </div>
        <div>
            <div class="playlistmusic-content-top">
                <span>歌曲标题</span>
                <span>歌手</span>
                <span>专辑</span>
                <span>时长</span>
            </div>
            <div v-for='(item,index) in tracks' :key='index' class="li hover buttonfont" @click="api.playmusic(item.id)">
                <div class="playlistmusic-content-bottom">
                    <!-- 标题 -->
                    <span>{{item.title}}</span>
                     <!-- 歌手 -->
                    <span>{{item.artist}}</span>
                    <!-- 专辑 -->
                    <span>{{item.album}}</span>
                    <!-- 时长 -->
                    <span>{{item.time}}</span>
                </div>
            </div>
        </div>
        <div class="bottom">
             <el-pagination
            @current-change='cureentpage'
                background
                layout="prev, pager, next"
                :page-size="20"
                :current-page='page'
                :total="total">
            </el-pagination>
         </div>
    </div>
</template>

<script>

import api from '@/api/api.js'
import '@/assets/style.css'

export default {
    data() {
        return {
            playlistmusic: {},//歌单详情
            page: 1,//当前页
            total: 0,//总页数
            tracks: [],//存放该歌单的歌曲信息
            id: this.$route.query.id,//歌单id
            api
        }
    },
    created () {
        this.getPlay();
    },
    methods: {
        cureentpage(val){
            this.page = val;
            console.log(this.page);
        },
        // 获取歌单列表
        async getPlay(){
            await this.$http({
                url: `/api/playlist/detail`,
                method: 'get',
                params: {
                    id:this.id,
                    limit:20,
                    offset: (this.page-1)*20
                }
            }).then(res=>{
                const {playlist} = res.data;
                this.playlistmusic = playlist;
                this.playlistmusic.createTime = api.dateConver(playlist.createTime)
                // 将所有的音乐id放在数组ids中，
                playlist.tracks.map(item=>{
                    let obj = {};
                    obj.id = item.id;
                    obj.title = item.name;
                    obj.artist = item.ar[0].name;
                    obj.album = item.al.name;
                    obj.time = api.timeConver(item.dt);
                    this.tracks.push(obj);
                })
                console.log(res);

            }).catch(err=>{
                console.log(err);
            });

        },
        
        
    },
    watch: {
        page(){
            this.getPlaylistMusic();
        }
    },

}
</script>

<style scoped>
.top {
    display: flex;
    padding: 10px;
    cursor: pointer;
    margin: 10px 0;
   
    display: flex;
    justify-content: flex-start;
}
.playlistmusicleft {
    width: 200px;
    padding: 10px;

}
.playlistmusicleft>.img1 {
    border-radius: 20px;
}
.playlistmusicright {
    height: 200px;
    width: 50%;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
}
.img2 {
    width: 50px;
    border-radius: 50px;
    vertical-align: middle;
}
th {
    padding: 20px;
}
.playlistmusic-content-top {
    display: flex;
    justify-content: space-around;
}
.playlistmusic-content-top>span {
    width: 180px;
    
}
.playlistmusic-content-bottom {
    height: 50px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
}

.playlistmusic-content-bottom>span {
    width: 180px;

}


</style>