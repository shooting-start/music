<template>
    <div>
        <div  v-for="(item,index) in toplist" :key="index" class="top-content">
            <div class="top-left" @click="goPlaylistmusic(item.id)">
                <el-image class="top-img" :src='item.coverImgUrl'></el-image>
            </div>
            <div class="top-right">
                <toplistmusic :id='item.id'></toplistmusic>
            </div>
        </div>
    </div>
</template>

<script>

import toplistmusic from '@/components/toplistmusic'

export default {
    data() {
        return {
            toplist: [],
            tracks: [],
            tracksFew: [],
            ids: []
        }
    },
    methods: {
        goPlaylistmusic(id){
            this.$router.push({name:'playlistmusic',query: {id}})
        },
        async getTopList(){
            await this.$http({
                    url: '/api/toplist',
                    method: 'get',
                }).then(res=>{
                    const {list} = res.data;
                    this.toplist = list;
                });
        },
        
    },
    created () {
        this.getTopList();
    },
    components: {
        toplistmusic,
    },

}
</script>

<style scoped>
.top-content {
    display: flex;
    justify-content: flex-start;
    position:relative;
}

.top-content>.top-left {
    width: 200px;
    padding: 10px;
    margin-right: 10px;
}
.top-left>.top-img {
    border-radius: 20px;
}
.top-content>.top-left>span {
    position: absolute;
    top: 50%;
    left: 10%;
}
.top-content>.top-right {
    padding: 10px;
    width: 70%;
}

</style>