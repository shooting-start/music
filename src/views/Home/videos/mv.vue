<template>
    <div>
        <div class="mv-top">
            <ul>
                <li>
                    <span>地区：</span>
                    <span :class="{activex: area=='全部'}" @click="area='全部'">全部</span>
                    <span :class="{activex: area=='内地'}" @click="area='内地'">内地</span>
                    <span :class="{activex: area=='港台'}" @click="area='港台'">港台</span>
                    <span :class="{activex: area=='欧美'}" @click="area='欧美'">欧美</span>
                    <span :class="{activex: area=='韩国'}" @click="area='韩国'">韩国</span>
                    <span :class="{activex: area=='日本'}" @click="area='日本'">日本</span>
                </li>
                <li>
                    <span>类型：</span>
                    <span :class="{activex: type=='全部'}" @click="type='全部'">全部</span>
                    <span :class="{activex: type=='官方版'}" @click="type='官方版'">官方版</span>
                    <span :class="{activex: type=='原生'}" @click="type='原生'">原生</span>
                    <span :class="{activex: type=='现场版'}" @click="type='现场版'">现场版</span>
                    <span :class="{activex: type=='网易出品'}" @click="type='网易出品'">网易出品</span>
                </li>
                <li>
                    <span>排序：</span>
                    <span :class="{activex: order=='上升最快'}" @click="order='上升最快'">上升最快</span>
                    <span :class="{activex: order=='最热'}" @click="order='最热'">最热</span>
                    <span :class="{activex: order=='最新'}" @click="order='最新'">最新</span>
                </li>
            </ul>
        </div>
        <div class="mv-bottom">
            <ul>
                <li v-for="(item,index) in mvList" :key="index" class="buttonfont" @click="gomvinfo(item.id)">
                    <el-image style="border-radius:15px" :src="item.cover"></el-image>
                    <!-- 播放量 -->
                    <p>{{item.playCount}}</p>
                    <!-- 名字 -->
                    <p class="omitfont">{{ item.name }}</p>
                    <!-- 作者 -->
                    <p>{{item.artistName}}</p>
                    <!-- mvid: item.id -->
                </li>
            </ul>
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

import '@/assets/style.css'

export default {
    data(){
        return {
            total: 0,
            area: '全部',
            type: '全部',
            order: '上升最快',
            limit: 21,
            page: 1,
            mvList: []
        }
    },
    methods: {
        gomvinfo(id){
            this.$router.push(`/index/mvinfo?mvid=${id}`)
        },
        cureentpage(val){
            this.page = val;
            console.log(this.page);
        },
        getmvList(){
            this.$http({
                url: '/api/mv/all',
                method: 'get',
                params: {
                    area: this.area,
                    type: this.type,
                    order: this.order,
                    limit: this.limit,
                    offset: (this.page-1)*this.limit
                }
            }).then(res=>{
                console.log(res);
                this.mvList = res.data.data;
                // 接口问题：只有第一页返回的数据才有count
                if(res.data.count){
                    this.total = res.data.count;
                }
                this.mvList.map(item=>{
                    if(item.playCount>10000){
                        item.playCount = parseInt(item.playCount/10000) + '万';
                    }
                })
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        }
        
    },
    created(){
        this.getmvList()
    },
    watch: {
        type(newValue, oldValue) {
            this.page = 1;
            this.getmvList();
        },
        order(newValue, oldValue) {
            this.page = 1;
            this.getmvList();
        },
        area(newValue, oldValue) {
            this.page = 1;
            this.getmvList();
        },
        page(){
            this.getmvList();
        }
    }
    

}
</script>

<style scoped>
.mv-top>ul>li>span {
    display: inline-block;
    width: 80px;
    text-align: center;
    font-weight: 100;
    font-size: 0.5rem;
}
.mv-top>ul>li>span:not(:first-child) {
    cursor: pointer;
}


.mv-bottom>ul {
    display: flex;
    flex-flow: row wrap;

}
.mv-bottom>ul>li {
    width: 33%;
    box-sizing: border-box;
    padding: 10px;
    position: relative;
}
.mv-bottom>ul>li>p:nth-of-type(1) {
    position: absolute;
    right: 20px;
    top: 15px;
    color: #fff;
}
</style>