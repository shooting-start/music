<template>
    <div>
        <!-- 精品歌单 -->
        <div class="good hover" >
            <div class="left">
                <img :src="good.coverImgUrl" alt="">
            </div>
            <div class="right">
                <p>精品歌单</p>
                <p>{{ good.name }}</p>
                <p class="buttonfont">{{ good.copywriter }}</p>
            </div>
        </div>
        <!-- 分类 -->
        <div class="catlist title" >
            <span v-for='(item,index) in catlists' :key='index'
            :class="{activex:tag==item.name}" @click="tag=item.name"
            >
                {{item.name}}
            </span>
        </div>
        <!-- 歌单列表 -->
        <div>
            <ul  class="playlist buttonfont" >
                <li v-for="(item,index) in list" :key='index' class="hover" @click="goPlaylistmusic(item.id)">
                    <!-- 播放量 -->
                    <span >播放量：{{item.playCount}}</span>
                    <el-image :src="item.coverImgUrl" alt=""></el-image>
                    <p>{{ item.name }}</p>
                </li>
            </ul>
        </div>
        <!-- 分页器 -->
        <!-- 
            total总条数
            current-page当前页
            page-size每页多少条数据
            @current-change页码绑定事件
         -->
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
import '@/assets/style.css'
import api from '@/api/api.js'
export default {
    data() {
        return {
            good: '',//精品歌单
            list: [],//歌单列表
            tag: '全部歌单',
            catlists: [],//歌单分类
            api,
            total: 0,
            page: 1,
        }
    },
    created () {
        this.getGood();
        this.getPlayList();
        this.getCatlist()
    },
    methods: {
        getGood() {
            this.$http({
                url: '/api/top/playlist/highquality',
                method: 'get',
                params: {
                    limit: 1,
                    cat: this.tag
                }
            }).then(res=>{
                const {playlists} = res.data;
                this.good = playlists[0];
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        },
        getCatlist(){
            this.$http({
                url: '/api/playlist/catlist',
                method: 'get'
            }).then(res=>{
                const {data} = res;
                this.catlists = data.sub.slice(0,10);
                this.catlists.unshift(data.all);
            }).catch(err=>{
                console.log(err);
            })
        },
        getPlayList(){
            this.$http({
                url: '/api/top/playlist',
                method: 'get',
                params: {
                    limit:20,
                    cat:this.tag,
                    offset: (this.page-1)*20
                }
            }).then(res=>{
                console.log(res);
                const {playlists} = res.data;
                this.list = playlists;
                this.total = res.data.total;
            }).catch(err=>{
                console.log(err);
            })
        },
        cureentpage(val){
            this.page = val;
            console.log(this.page);
        },
        goPlaylistmusic(id){
            this.$router.push(`/index/find/playlistmusic?id=${id}`)
        }
    },
    watch: {
        tag(newValue, oldValue) {
            this.page = 1;
            this.getPlayList();
            this.getGood()
        },
        page(){
            this.getPlayList();
        }
    },

}
</script>

<style scoped>
.good {
    display: flex;
    padding: 10px;
    cursor: pointer;
    background-color: rgb(139, 146, 238);
    margin: 10px 0;
}
.good>.left>img {
    border-radius: 10%;
    width: 100px;
    margin-right: 10px;
}
.good>.right {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    font-size: 0.9rem;
    font-weight: 300;
}
.good>.right>p:nth-child(1) {
    width: 80px;
    padding: 5px;
    text-align: center;
    color: rgba(255, 230, 0, 0.938);
    border: 1px solid rgba(255, 230, 0, 0.938);
    border-radius: 30px;
    font-weight: 400;

}
.good>.right>p:nth-child(3) {
    margin-top: -15px;
}

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



</style>