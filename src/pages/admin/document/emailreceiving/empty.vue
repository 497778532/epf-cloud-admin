<template>

</template>

<script>
export default {
  created () {
    let toPath = this.$route.query.toPath
    if (toPath) {
      this.$router.push({ path: toPath })
    }
  }
}
</script>

<style>
</style>
