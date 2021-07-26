<template>
    <div class="recommend buttonfont" >
        <!-- 轮播图 -->
        <div class="banner">
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="(item,index) in banners" :key="index">
                    <img @click='playmisic(item.encodeId)' :src="item.imageUrl" alt="" height="200">
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 推荐歌单 -->
        <div>
            <router-link to="/index/recommend" class="title">推荐歌单</router-link>
            <ul  class="personalized">
                <li v-for="(item,index) in personalized" :key='index' @click="goPlaylistmusic(item.id)">
                    <el-image  @click='api.getPlaylistMusic(item.id)' :src="item.picUrl" ></el-image>
                    <p>{{ item.name }}</p>
                </li>
            </ul>
        </div>
        <!-- 独家放送 -->
        <div>
            <router-link to="/index/exclusive" class="title">独家放送</router-link>
            <ul class="privatelist">
                <li v-for='(item,index) in privatelist' :key="index" @click="goMvInfo(item.id)">
                    <el-image  :src="item.sPicUrl"></el-image>
                    <p>{{ item.name }}</p>
                </li>
            </ul>
        </div>
        <!-- 最新音乐 -->
        <div class="bottom">
            <router-link to="/index/newest" class="title">最新音乐</router-link>
            <ul class="newest">
                <li v-for='(item,index) in newest' :key='index'>
                    <div class="hover" @click='api.playmusic(item.id)'>
                        <el-image class="simage" :src="item.picUrl"></el-image>
                        <div class="wrap">
                            <p class="omitfont">{{item.name}}</p>
                            <p class="omitfont">{{item.song.artists[0].name}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import '@/assets/style.css'
import api from '@/api/api.js'

export default {
    data() {
        return {
            activeName: 'first',
            banners: [],
            personalized: [],//推荐歌单
            privatelist: [],//独家放送
            newest: [],//最新歌曲
            api,
        }
    },
    created () {
        this.getBanners();
        this.getPersonalized();
        this.getPrivatelist(),
        this.getSongs()
    },
    methods: {
        goMvInfo(id){
            this.$router.push(`/index/mvinfo?mvid=${id}`);
        },
        getBanners(){
            this.$http.get('/api/banner').then(res=>{
                const { banners } = res.data;
                this.banners = banners;
            }).catch(err=>{
                console.log(err);
            })
        },
        getPersonalized(){
            this.$http.get('/api/personalized?limit=10').then(res=>{
                const { result } = res.data;
                this.personalized = result;
                console.log(result);
            }).catch(err=>{
                console.log(err);
            })
        },
        getPrivatelist(){
            this.$http.get('/api/personalized/privatecontent/list?limit=3').then(res=>{
                const { result } = res.data;
                this.privatelist = result;
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        },
        getSongs(){
            this.$http({
                url: '/api/personalized/newsong',
                method: 'get',
                params: {
                    limit: 12
                }
            }).then(res=>{
                const { result } = res.data;
                this.newest = result;
                // console.log(result);
            }).catch(err=>{
                console.log(err);
            })
        },
        goPlaylistmusic(id){
            this.$router.push({name:'playlistmusic',query: {id}})
        }
    }
}
</script>

<style scoped>
    .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .personalized, .privatelist,.newest {
      display: flex;
      flex-flow: row wrap;
  }
  .personalized>li,.privatelist>li {
    box-sizing: border-box;
    padding: 10px;
  }
  .personalized>li {
      width: 20%;
  }

  .privatelist>li {
    flex: 1;
  }
  .newest>li {
      width: 33%;
      padding: 10px;
      box-sizing: border-box;
  }
  .newest>li>div {
      display: flex;
      
  }
  
  .simage {
      width: 3rem;
      height: 3rem;
      margin-right: 5px;
  }
  .wrap {
      width: 80%;
      height: 3rem;
      display: flex;
      flex-flow: column wrap;
      justify-content: space-around;
  }
  .bottom {
      margin-bottom: 50px;
  }
  li {
      cursor: pointer;
  }
</style>