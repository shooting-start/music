<template>
    <div>
        <div class="catlist title">
                <span :class="{activex: tag==0}" @click="tag=0">全部</span>
                <span :class="{activex: tag==7}" @click="tag=7">华语</span>
                <span :class="{activex: tag==96}" @click="tag=96">欧美</span>
                <span :class="{activex: tag==8}" @click="tag=8">日本</span>
                <span :class="{activex: tag==16}" @click="tag=16">韩国</span>
        </div>
        <div class="bottom">
            <div v-for='(item,index) in lists' :key='index' class="li hover buttonfont" @click="api.playmusic(item.id)">
                <div class="l">
                    <!-- 封面 -->
                    <el-image class="simage" :src='item.album.blurPicUrl'></el-image>
                    <!-- 标题 -->
                    <span class="omitfont">{{item.name}}</span>
                </div>
                <div class="r">
                     <!-- 歌手 -->
                    <span>{{item.album.artists[0].name}}</span>
                    <!-- 专辑 -->
                    <span>{{item.album.name}}</span>
                    <!-- 时长 -->
                    <span>{{item.duration}}</span>
                </div>
               
            </div>
        </div>
        
    </div>
</template>

<script>
import '@/assets/style.css'
import api from '@/api/api.js'

export default {
    data() {
        return {
            lists: [],//歌曲列表
            tag: 0,
            api
        }
    },
    created () {
        this.getNewest();
    },
    methods: {
        getNewest() {
            this.$http({
                url: '/api/top/song',
                method: 'get',
                params: {
                    type: this.tag
                }
            }).then(res=>{
                const {data} = res.data;
                this.lists = data;
                for(let i of this.lists){
                    const m = parseInt(i.duration/1000/60);
                    if(m<10){
                        m = '0'+m;
                    }
                    const s = parseInt(i.duration/1000%60);
                    if(s<10){
                        s='0'+s;
                    }
                    i.duration = `${m}:${s}`;
                }
                console.log(data);
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    watch: {
        tag(newValue, oldValue) {
            this.getNewest()
        }
    },

}
</script>

<style scoped>
.li {
    height: 80px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
}

.l {
    width: 30%;
    display: flex;
    align-items: center;
}
.r {
    width:70%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    text-align: center;

}
.r>span {
    width: 33.3%;
}
.simage {
    width: 3rem;
    height: 3rem;
    margin-right: 5px;
}


</style>