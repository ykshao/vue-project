<template>
  <div class="greeter">
    <img src="../../../assets/images/tx2.jpg">
    {{ greeter }}
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      greeter: 'Hello, Vue!'
    }
  },
  created() {
    console.log('发送请求------------>')
    this.$http.getUser().then((response) => {
      console.log(response);
    }).catch((response) => {
      console.log(response);
    });
  }
}
</script>

<style lang="less" src="./index.less"></style>
