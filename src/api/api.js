import axios from 'axios'
import store from '../store';

export default {
    // 播放音乐
    playmusic(id){
        axios({
            url: '/api/song/url',
            method: 'get',
            params: {
                id
            }
        }).then(res=>{
            const { url } = res.data.data[0];
            store.commit('playMusic',{
                musicUrl: url
            })
            console.log('hhh');
        }).catch(err=>{
            console.log(err);
        })
    },
    // 年月日转换
    dateConver(time){
        if(time){
            const dt = new Date(time);
            let year = dt.getFullYear();
            let month = dt.getMonth()+1;
            let date = dt.getDate();
            if(month<10){
                month = '0'+month;
            }
            if(date<10){
                date = '0'+date;
            }
            return `${year}-${month}-${date}`;
        }
    },
    // 时长转换
    timeConver(time){
        let m = parseInt(time/1000/60);
        if(m<10){
            m = '0'+m;
        }
        let s = parseInt(time/1000%60);
        if(s<10){
            s='0'+s;
        }
        return `${m}:${s}`;
    },
    // 获取音乐详情
    
}
