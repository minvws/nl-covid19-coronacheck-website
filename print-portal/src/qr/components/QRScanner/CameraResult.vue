<template>
  <div class="camera-result">
    {{ result || '&nbsp;' }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        result: {
            type: [String, Array],
            required: false
        }
    }
})
</script>

<style lang="scss" scoped></style>
