<template>
  <div>
 {{product}}
  </div>
</template>

<script>
export default {
  name: "listItem",
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>
