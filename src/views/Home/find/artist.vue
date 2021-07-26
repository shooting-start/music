<template>
    <div>
        <!-- 选择 -->
        <div class="buttonfont choose">
            <!-- 语种 -->
            <div>
                <span>语种:</span>
                <span :class="{activex: type==-1}" @click="type=-1">全部</span>
                <span :class="{activex: type==7}" @click="type=7">华语</span>
                <span :class="{activex: type==96}" @click="type=96">欧美</span>
                <span :class="{activex: type==8}" @click="type=8">日本</span>
                <span :class="{activex: type==16}" @click="type=16">韩国</span>
                <span :class="{activex: type==0}" @click="type=0">其他</span>

            </div>
            <!-- 分类 -->
            <div>
                <span>分类:</span>
                <span :class="{activex: area==-1}" @click="area=-1">全部</span>
                <span :class="{activex: area==1}" @click="area=1">男歌手</span>
                <span :class="{activex: area==2}" @click="area=2">女歌手</span>
                <span :class="{activex: area==3}" @click="area=3">乐队</span>
            </div>
        </div>
        <!-- 歌手 -->
        <ul  class="playlist buttonfont" >
            <li v-for="(item,index) in artistlist" :key="index">
                <el-image :src='item.picUrl'></el-image>
                <span>{{item.name}}</span>
            </li>
        </ul>
    </div>
     
</template>

<script>

import '@/assets/style.css'

export default {
    data() {
        return {
            type: -1,
            area: -1,
            artistlist: [],
        }
    },
    created () {
        this.getArtistlist();
    },
    methods: {
        getArtistlist() {
            this.$http({
                url: '/api/artist/list',
                method: 'get',
                params: {
                    type: this.type,
                    area: this.area,
                    initial:'b'
                }
            }).then(res=>{
                const {artists} = res.data;
                this.artistlist = artists;
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    watch: {
        type(newValue, oldValue) {
            this.getArtistlist();
        },
        area(){
            this.getArtistlist();
        }
    },

}
</script>

<style scoped>
  .playlist {
      display: flex;
      flex-flow: row wrap;
  }
  .playlist>li {
    box-sizing: border-box;
    padding: 10px;
    width: 20%;
    cursor: pointer;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

    .choose>div {
        margin-bottom: 10px;
    }
    .choose span {
        padding: 0 10px;
        cursor: pointer;
    }

</style>