(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51e2d750"],{"34ce":function(t,a,s){},"7d05":function(t,a,s){},"8aa2":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("div",{staticClass:"mvinfo-content"},[s("div",{staticClass:"m-c-l"},[s("p",{staticClass:"el-icon-arrow-left title",on:{click:t.back}},[t._v("MV详情")]),s("video",{attrs:{src:t.url,controls:"",loop:"",autoplay:""}}),s("div",[t.data.artists?s("el-image",{staticClass:"m-c-l-artimg",attrs:{src:t.data.artists[0].img1v1Url}}):t._e(),s("span",[t._v(t._s(t.data.artistName))])],1),s("p",{staticClass:"title"},[t._v(t._s(t.data.name))]),s("div",{staticClass:"buttonfont"},[s("span",[t._v("发布："+t._s(t.data.publishTime))]),s("span",[t._v("播放："+t._s(t.data.playCount))])]),s("p",{staticClass:"buttonfont"},[t._v(t._s(t.data.desc))])]),s("div",{staticClass:"m-c-r"},[s("span",[t._v("相关推荐")]),s("ul",t._l(t.relateMv,(function(a,e){return s("li",{key:e,staticClass:"buttonfont",on:{click:function(s){return t.playmv(a.id)}}},[s("el-image",{staticClass:"m-c-r-relatemvimg",attrs:{src:a.cover}}),s("span",[t._v(t._s(a.playCount))]),s("span",{staticClass:"s2"},[t._v(t._s(a.duration))]),s("div",[s("p",{staticClass:"omitfont"},[t._v(t._s(a.name))]),a.creator?s("p",[t._v("by "+t._s(a.artistName))]):t._e()])],1)})),0)])])])},i=[],n=(s("7d05"),s("4ec3")),o={data:function(){return{api:n["a"],url:"",data:{},relateMv:[],query:this.$route.query.mvid}},created:function(){this.getmvInfo(),this.getMvUrl(),this.getMvRelate()},methods:{back:function(){this.$router.go(-1)},playmv:function(t){this.query=t,console.log(this.query),this.getmvInfo(),this.getMvUrl(),this.getMvRelate()},getmvInfo:function(){var t=this;this.$http({url:"/api/mv/detail",method:"get",params:{mvid:this.query}}).then((function(a){t.data=a.data.data,console.log(t.data),console.log(a)})).catch((function(t){console.log(t)}))},getMvUrl:function(){var t=this;this.$http({url:"/api/mv/url",method:"get",params:{id:this.query}}).then((function(a){t.url=a.data.data.url,console.log(a)})).catch((function(t){console.log(t)}))},getMvRelate:function(){var t=this;this.$http({url:"/api/simi/mv",method:"get",params:{mvid:this.query}}).then((function(a){t.relateMv=a.data.mvs,console.log(a)})).catch((function(t){console.log(t)}))}},watch:{$route:{handler:function(t){t.query.mvid&&console.log("hhh")}}}},c=o,l=(s("b761"),s("2877")),r=Object(l["a"])(c,e,i,!1,null,"1db65901",null);a["default"]=r.exports},b761:function(t,a,s){"use strict";s("34ce")}}]);
//# sourceMappingURL=chunk-51e2d750.b6d64fef.js.map