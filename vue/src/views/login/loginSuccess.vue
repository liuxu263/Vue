<template>
  <div>
    <h1>Welcome：{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "success",
  data() {
    return {
      msg: null
    };
  },
  created() {
    this.msg = this.$route.query.message;
  }
}
</script>

<style scoped>

</style>