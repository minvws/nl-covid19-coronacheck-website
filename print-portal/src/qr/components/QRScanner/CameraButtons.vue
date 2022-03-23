<template>
  <div class="camera-buttons">
    <button
      v-if="!isStarted && !isAutoStart"
      :disabled="isStartPending"
      @click="$emit('start')"
    >
      {{ $t('qr.camera.start') }}
    </button>
    <button v-if="isStarted" :disabled="isStopPending" @click="$emit('stop')">
      {{ $t('qr.camera.stop') }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        isAutoStart: {
            type: Boolean,
            required: true
        },
        isStartPending: {
            type: Boolean,
            required: true
        },
        isStopPending: {
            type: Boolean,
            required: true
        },
        isStarted: {
            type: Boolean,
            required: true
        }
    }
})
</script>
