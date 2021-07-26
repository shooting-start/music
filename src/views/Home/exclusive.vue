<template>
    <div>
        <h3>独家放送</h3>
         <div>
            <ul class="datas">
                <li v-for='(item,index) in datas' :key="index" @click="goMvInfo(item.id)">
                    <el-image  :src="item.sPicUrl"></el-image>
                    <p class="buttonfont">{{ item.name }}</p>
                </li>
            </ul>
        </div>
         <div class="bottom">
             <el-pagination
                @current-change="currentpage"
                background
                layout="prev, pager, next"
                :page-size="limit"
                :current-page='page'
                :total="total">
            </el-pagination>
         </div>
    </div>
</template>

<script>

import '@/assets/style.css'

export default {
    data() {
        return {
            datas: [],
            page: 1,
            total: 60,
            limit: 12
        }
    },
    methods: {
        goMvInfo(id){
            this.$router.push(`/index/mvinfo?mvid=${id}`);
        },
        currentpage(val){
            this.page = val;
            this.getDatas();
        },
        getDatas(){
            this.$http({
                url: '/api/personalized/privatecontent/list',
                method: 'get',
                params: {
                    limit: this.limit,
                    offset: (this.page-1)*this.limit
                },
            }).then(res=>{
                this.datas = res.data.result;
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    created(){
        this.getDatas();
    }

}
</script>

<style scoped>
.datas {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.datas>li {
    width: 30%;
}
h3 {
    padding: 10px;
}

</style>