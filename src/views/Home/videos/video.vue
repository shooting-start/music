<template>
    <div>
        <div class="title catlist">
            <span v-for="(item,index) in videoTagList" :key="index"
                :class="{activex: name==item.name}" @click="name=item.name;id=item.id">
                {{item.name}}
            </span>
        </div>
        <ul class="video-b">
            <li v-for='(item,index) in list' :key="index"  class="video-li buttonfont" @click="govideoinfo(item.data.vid)">
                <el-image style="border-radius:15px" :src="item.data.coverUrl"></el-image>
                <!-- 播放时长 -->
                <span>{{item.playTime}}</span>
                <!-- 描述 -->
                <p class="omitfont">{{ item.data.title || item.data.decription }}</p>
            </li>
        </ul>
    </div>
  
</template>

<script>

import '@/assets/style.css'

export default {
    data(){
        return {
            videoTagList: [],
            name: '现场',
            id: '',
            list: [],

        }
    },
    methods: {
        govideoinfo(vid){
            this.$router.push(`/index/videoinfo?vid=${vid}`);
        },
        async getVideoTagList(){
            await this.$http({
                    url: '/api/video/category/list',
                    method: 'get'
                }).then(res=>{
                    const {data} = res.data;
                    this.videoTagList = data;
                    this.id=this.videoTagList[0].id;
                    console.log(this.id);
                }).catch(err=>{
                    console.log(err);
                })
            this.getVideoList();
        },
        getVideoList(){
            this.$http({
                url: '/api/video/group',
                method: 'get',
                params: {
                    id: this.id
                }
            }).then(res=>{
                this.list = res.data.datas;
                for(let i of this.list){
                    const m = parseInt(i.data.playTime/1000/60);
                    if(m<10){
                        m = '0'+m;
                    }
                    const s = parseInt(i.data.playTime/1000%60);
                    if(s<10){
                        s='0'+s;
                    }
                    i.playTime = `${m}:${s}`;
                }
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    created(){
        this.getVideoTagList();
        // this.getVideoList()
    },
    watch: {
        id(){
            this.getVideoList()
        }
    }
    

}
</script>

<style scoped>
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