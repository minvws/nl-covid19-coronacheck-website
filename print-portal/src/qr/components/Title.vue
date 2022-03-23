<template>
  <h2 class="title" :class="{ visible }">
    {{ $t(id) }}
  </h2>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        id: {
            type: String,
            required: true
        },
        visible: {
            type: Boolean,
            required: false,
            default: true
        }
    }
})
</script>
<style lang="scss" scoped>
.title {
  opacity: 0;
  transition: opacity 0.3s;

  &.visible {
    opacity: 1;
  }
}
</style>
