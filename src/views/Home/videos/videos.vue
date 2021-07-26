<template>
    <div>
        <div class="r_top" >
                <router-link :class="{activetitle:name=='video'}" to="/index/videos/video">视频</router-link>
                <router-link :class="{activetitle:name=='mv'}" to="/index/videos/mv">MV</router-link>
        </div>
        <div class="r-main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import '@/assets/style.css'

export default {
    data() {
        return {
            name: ''
        }
    },
    created () {
        ;
    },
    created(){
        this.name = this.$route.name;
    },
    watch: {
        $route(newValue, oldValue) {
            this.name = newValue.name;
        }
    },

}
</script>

<style scoped>

</style>