(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5c860588"],{"204f":function(t,i,n){},"7d05":function(t,i,n){},b8b4:function(t,i,n){"use strict";n.r(i);var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"recommend buttonfont"},[n("div",{staticClass:"banner"},[n("el-carousel",{attrs:{interval:4e3,type:"card",height:"200px"}},t._l(t.banners,(function(i,e){return n("el-carousel-item",{key:e},[n("img",{attrs:{src:i.imageUrl,alt:"",height:"200"},on:{click:function(n){return t.playmisic(i.encodeId)}}})])})),1)],1),n("div",[n("router-link",{staticClass:"title",attrs:{to:"/index/recommend"}},[t._v("推荐歌单")]),n("ul",{staticClass:"personalized"},t._l(t.personalized,(function(i,e){return n("li",{key:e,on:{click:function(n){return t.goPlaylistmusic(i.id)}}},[n("el-image",{attrs:{src:i.picUrl},on:{click:function(n){return t.api.getPlaylistMusic(i.id)}}}),n("p",[t._v(t._s(i.name))])],1)})),0)],1),n("div",[n("router-link",{staticClass:"title",attrs:{to:"/index/exclusive"}},[t._v("独家放送")]),n("ul",{staticClass:"privatelist"},t._l(t.privatelist,(function(i,e){return n("li",{key:e,on:{click:function(n){return t.goMvInfo(i.id)}}},[n("el-image",{attrs:{src:i.sPicUrl}}),n("p",[t._v(t._s(i.name))])],1)})),0)],1),n("div",{staticClass:"bottom"},[n("router-link",{staticClass:"title",attrs:{to:"/index/newest"}},[t._v("最新音乐")]),n("ul",{staticClass:"newest"},t._l(t.newest,(function(i,e){return n("li",{key:e},[n("div",{staticClass:"hover",on:{click:function(n){return t.api.playmusic(i.id)}}},[n("el-image",{staticClass:"simage",attrs:{src:i.picUrl}}),n("div",{staticClass:"wrap"},[n("p",{staticClass:"omitfont"},[t._v(t._s(i.name))]),n("p",{staticClass:"omitfont"},[t._v(t._s(i.song.artists[0].name))])])],1)])})),0)],1)])},s=[],a=(n("7d05"),n("4ec3")),o={data:function(){return{activeName:"first",banners:[],personalized:[],privatelist:[],newest:[],api:a["a"]}},created:function(){this.getBanners(),this.getPersonalized(),this.getPrivatelist(),this.getSongs()},methods:{goMvInfo:function(t){this.$router.push("/index/mvinfo?mvid=".concat(t))},getBanners:function(){var t=this;this.$http.get("/api/banner").then((function(i){var n=i.data.banners;t.banners=n})).catch((function(t){console.log(t)}))},getPersonalized:function(){var t=this;this.$http.get("/api/personalized?limit=10").then((function(i){var n=i.data.result;t.personalized=n,console.log(n)})).catch((function(t){console.log(t)}))},getPrivatelist:function(){var t=this;this.$http.get("/api/personalized/privatecontent/list?limit=3").then((function(i){var n=i.data.result;t.privatelist=n,console.log(i)})).catch((function(t){console.log(t)}))},getSongs:function(){var t=this;this.$http({url:"/api/personalized/newsong",method:"get",params:{limit:12}}).then((function(i){var n=i.data.result;t.newest=n})).catch((function(t){console.log(t)}))},goPlaylistmusic:function(t){this.$router.push({name:"playlistmusic",query:{id:t}})}}},r=o,c=(n("d11a"),n("2877")),l=Object(c["a"])(r,e,s,!1,null,"e7b19b70",null);i["default"]=l.exports},d11a:function(t,i,n){"use strict";n("204f")}}]);
//# sourceMappingURL=chunk-5c860588.f8289c41.js.map