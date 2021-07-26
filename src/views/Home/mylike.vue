<template>
    <div>
        <div class="m-t">
            <div class="m-t-l">
                <el-image :src='myLikeInfo[0].al.picUrl' class="img1"></el-image>
            </div>
            <div class="m-t-r">
                <div class="m-t-r-1">
                    <span class="buttonfont">歌单</span>
                    <h3>我喜欢的音乐</h3>
                </div>
                <div class="m-t-r-2 buttonfont">
                    <el-image :src='userInfo.avatarUrl' class="img2"></el-image>
                    <span>{{userInfo.nickname}}</span>
                    <span>{{userInfo.createTime}}创建</span>
                </div>
                <div class="m-t-r-3 buttonfont">
                    <span>歌曲：{{ids.length}}</span>
                </div>
            </div>
        </div>
        <div class="m-b">
            <h3>歌曲列表</h3>
            <el-table :data="tracks"  @row-click = "playMusic" stripe style="width: 100%">
                <el-table-column prop="title" label="歌曲标题" width="280"></el-table-column>
                <el-table-column prop="artist" label="歌手" width="160"></el-table-column>
                <el-table-column prop="album" width="290" label="专辑"></el-table-column>
                <el-table-column prop="time" width="160" label="时长"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>

import api from '@/api/api.js'
import '@/assets/style.css'

export default {
    data() {
        return {
            num: 0,
            myLikeInfo: [],//音乐信息
            page: 1,
            total: 0,
            tracks: [],
            ids: [],//音乐id列表
            id: this.$store.state.uid,//用户id
            api,
        }
    },
    created () {
        this.getPlay();
        this.$store.dispatch('reqUserInfo')

    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        }
    },
    methods: {
        playMusic(row){
            this.api.playmusic(row.id);
        },
        getMylike(){
            this.$http({
                url: `/api/song/detail`,
                method: 'get',
                params: {
                    ids:this.ids.join(','),
                }
            }).then(res=>{
                this.myLikeInfo = res.data.songs;
                let i = 0;
                this.myLikeInfo.map(item=>{
                    let obj = {};
                    obj.title = item.name;
                    obj.artist = item.ar[0].name;
                    obj.album = item.al.name;
                    obj.time = api.timeConver(item.dt);
                    obj.id = this.ids[i++];
                    this.tracks.push(obj);
                })
            }).catch(err=>{
                console.log(err);
            })
        },
        cureentpage(val){
            this.page = val;
            console.log(this.page);
        },
        // 获取音乐列表
        async getPlay(){
            await this.$http({
                url: `/api/likelist`,
                method: 'get',
                params: {
                    id:this.id,
                    limit:20,
                    offset: (this.page-1)*20
                }
            }).then(res=>{
                // 所有音乐id
                this.ids = res.data.ids;
            }).catch(err=>{
                console.log(err);
            });
            await this.getMylike();

        },
        
        
    },

}
</script>

<style scoped>
.m-t {
    display: flex;
    padding: 10px;
}
.m-t-l {
    width: 20%;
    margin: 10px;
}
.m-t-r-1,.m-t-r-2,.m-t-r-3 {
    margin: 10px;
}
.m-t-r-1>span {
    padding: 1px 10px;
    border: 1px solid #f00;
}
.m-t-r-1>h3 {
    display: inline-block;
    vertical-align: middle;
}

.m-t-r-2>.img2 {
    width: 50px;
    border-radius: 50%;
    vertical-align: middle;
}
.m-t-r-2>span,.img2 {
    margin-right: 10px;
}

.m-b>h3 {
    margin: 10px;
}


</style>