<template>
  <div class="greeter"> {{ greeter }}</div>
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
      console.log('发送请求4444444444444')
      this.$http.getApiXxx().then((response) => {
        console.log(response);
      }).catch((response) => {
        console.log(response);
      });
    }
  }
</script>

<style lang="less" src="./index.less"></style>
