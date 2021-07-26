import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/axios.js'
import api from '@/api/api.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicUrl: '',
    mvUrl: '',
    uid: '',//账户id
    mytoken: localStorage.getItem('mytoken')?localStorage.getItem('mytoken'):'',
    userInfo: {}
  },
  mutations: {
    playMusic(state,payload){
      state.musicUrl = payload.musicUrl;
    },
    playMV(state,payload){
      state.mvUrl = payload.mvUrl;
    },
    getUserId(state,payload){
      state.uid = payload.uid;
    },
    saveToken(state,payload){
      state.token = payload.mytoken;
      localStorage.setItem('mytoken',state.token);
    },
    getUserInfo(state,payload){
      state.userInfo = payload.profile;
      state.userInfo.createTime = api.dateConver(payload.profile.createTime);
    }
  },
  actions: {
    reqUserInfo({commit,state}){
      axios({
          url: '/api/user/account',
          method: 'get',
          params: {
              uid: state.uid
          }
      }).then(res=>{
          commit('getUserInfo',res.data);
          console.log(res.data.profile,state.userInfo);
      }).catch(err=>{
          console.log(err);
      })
    }
  },
  modules: {
  }
})