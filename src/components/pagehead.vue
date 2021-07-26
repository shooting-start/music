<template>
    <div class="pagehead">
        <div class="logo">网易云音乐</div>
        <div class="history">
            <span class="el-icon-back" @click="goback"></span>
            <span class="el-icon-right" @click="gofront"></span>
        </div>
        <div class="search">
            <el-input size="mini" prefix-icon="el-icon-search" v-model="input" placeholder="搜索" @keyup.enter.native="toResult"></el-input>
        </div>
        <div class="user buttonfont">
            <el-image :src='userInfo.avatarUrl' class="u-img"></el-image>
            <span>{{userInfo.nickname}}</span>
            <el-button type="text" class="el-icon-switch-button" @click="quit">退出登录</el-button>
        </div>
    </div>
  
</template>

<script>

import "@/assets/style.css";

export default {
    data(){
        return {
            input: '',
        }
    },
    methods: {
        toResult(){
            console.log('jsdf');
            if(this.input){
                this.$router.push({path: '/index/search',query: {value: this.input}})
            }else{
                this.$message.warning('请输入内容');
            }
        },
        
        goback(){
            this.$router.go(-1)
        },
        gofront(){
            this.$router.go(1)
        },
        quit(){
            this.$confirm('此操作将退出登录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '成功退出账户!'
                });
                if(localStorage.getItem('mytoken')){
                    localStorage.removeItem('mytoken');
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消退出'
                });          
            });
            
        }
    },
    created(){
        this.$store.dispatch('reqUserInfo')
    },
    computed: {
        // 从store中读取数据的方法：在计算属性中返回某个状态，每当 store.state.count 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。
        userInfo(){
            return this.$store.state.userInfo;
        }
    }

}
</script>

<style>
    .pagehead {
        height: 50px;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        align-content: center;
        background-color: #dd001ab2;
    }
    .history>span {
        background-color: rgba(0, 0, 0, 0.1);
        color: #fff;
        cursor: pointer;
        border-radius: 50%;
        padding: 5px;
        margin-right: 10px;
    }
    
    .user>.u-img {
        width: 30px;
        border-radius: 50%;
        vertical-align: middle;
    }
    .user>span {
        padding: 5px;
        cursor: pointer;
    }
    .el-button {
        color: #000;
    }

</style>