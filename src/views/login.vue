<template>
  <div class="login">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini ">
      <el-form-item label="手机号" prop="phone">
        <el-col :span="12">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密 码" prop="password">
        <el-col :span="12">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
    
</template>

<script scoped>
export default {
    data() {
    return {
      userTokens: '',
      ruleForm: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { len: 11, message: '长度为11个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    login(user){
        this.$http({
            method: 'post',
            url: '/api/login/cellphone',
            data: {
                phone: this.ruleForm.phone,
                password: this.ruleForm.password
            }
        }).then(res=>{
          const code = res.data.code;
          if(code === 200){
            this.$store.commit('getUserId',{uid: res.data.account.id});
            // 将token保存到vuex中
            this.userTokens = res.data.token;
            this.$store.commit('saveToken',{mytoken:this.userTokens});
            this.$store.commit('getUserId',res.data.account);
            
            this.$router.push('/index')
          }else {
              this.$alert('请重新登录', '用户名或密码错误', {
                confirmButtonText: '确定',
              }).then(()=>{
                location.reload();
              });
          }
          console.log(res);
          }).catch(err=>{
              console.log(err);
          })
    }
  }
}
</script>

<style>


</style>