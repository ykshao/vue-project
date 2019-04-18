<template>
  <div class="greeter"> {{ greeter }}</div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        greeter: 'Hello, login!'
      }
    },
    created() {

    }
  }
</script>

<style lang="less" src="./index.less"></style>
