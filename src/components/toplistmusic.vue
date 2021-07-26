<template>
    <div>
        <div class="toplistmusic-r hover" 
            v-for='(item,index) in tracks' :key='index' @click="api.playmusic(item.id)">
            <!-- 标题 -->
            <span class="omitfont title">{{item.title}}</span>
                <!-- 歌手 -->
            <span class="buttonfont">{{item.artist}}</span>
        </div>
    </div>
</template>

<script>

import api from '@/api/api.js'
import '@/assets/style.css'

export default {
    data(){
        return {
            tracks: [],
            api,
        }
    },
    props: {
        id: {
            type: [String,Number],
        }
    },
    methods: {
        getTopListMusic(){
            this.$http({
                url: '/api/playlist/detail',
                method: 'get',
                params: {
                    id: this.id,
                    // limit:5,
                }
            }).then(res=>{
                const {playlist} = res.data;
                // this.playlistmusic = playlist;
                playlist.tracks.slice(0,5).map(item=>{
                    let obj = {};
                    obj.id = item.id;
                    obj.title = item.name;
                    obj.artist = item.ar[0].name;
                    this.tracks.push(obj);
                })
                // return this.tracks;
            }).catch(err=>{
                console.log(err);
            });
        },
    },
    created () {
        this.getTopListMusic();
    },

}
</script>

<style>
.toplistmusic-r {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    
}
.toplistmusic-r>span {
    height: 20px;
    line-height: 20px;
    flex: 1;
}
.toplistmusic-r>span:last-child {
    text-align: right;
}

</style>