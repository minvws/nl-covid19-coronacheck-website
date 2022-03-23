<template>
  <div class="camera-flashlight">
    <input
      type="checkbox"
      :checked="enabled"
      @change="$emit('input', !enabled)"
    />
    flash
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        enabled: {
            type: Boolean,
            required: true
        }
    }
})
</script>
