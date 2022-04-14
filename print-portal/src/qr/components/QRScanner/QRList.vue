<template>
  <div>
    <p v-if="label" class="label" :class="{ hidden: !captures.length }">
      {{ label }}
    </p>
    <transition-group tag="div" class="camera-captures" appear name="capture">
      <CameraFrame class="frame" v-for="({ src }, i) in captures" :key="src">
        <div
          class="image"
          :style="{
            paddingBottom: `${ratio * 100}%`,
            backgroundImage: `url(${src})`
          }"
        />
        <img
          @click="onRemoveCapture(captures[i])"
          class="close"
          src="@/qr/assets/icons/close.svg"
        />
      </CameraFrame>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CameraFrame from '@/qr/components/QRScanner/CameraFrame.vue'
import qrResultMixin from '@/qr/mixins/qr-result-mixin'

export default Vue.extend({
    mixins: [qrResultMixin],
    components: {
        CameraFrame,
    },
    props: {
        label: {
            type: String,
            required: false
        },
        renderer: {
            type: HTMLVideoElement,
            required: false
        },
        ratio: {
            type: Number,
            required: false,
            default: 0.7
        },
        result: {
            type: Array as () => { result: string; src: string }[],
            required: false
        }
    },
    methods: {
        onRemoveCapture(qr: { result: string; src: string }) {
            this.$emit('remove', qr)
            this.$emit('clear')
        }
    }
})
</script>

<style lang="scss" scoped>
$duration: 0.3s;

.camera-captures {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.label {
  opacity: 1;
  transition: opacity $duration;

  &.hidden {
    opacity: 0;
  }
}
.frame {
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.12);
  width: 30vw;
  margin: 16px 16px 16px 0;

  @media only screen and (max-width: 560px) {
    width: calc(50% - 10px);
    margin: 8px 8px 8px 0;
  }
  @media only screen and (max-width: 320px) {
    width: 100%;
    margin: 0px 0px 16px 0px;
  }
}
.image {
  background-position: center center;
  background-size: cover;
}
.close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.12);
  cursor: pointer;
}

.capture-enter {
  opacity: 0;
  transform: scale(0);
}

.capture-enter-to {
  opacity: 1;
  transform: scale(1);
}

.capture-enter-active {
  position: relative;
  transition: all $duration;
}

.capture-leave {
  opacity: 1;
}

.capture-leave-to {
  opacity: 0;
  width: 0%;
  margin: 0;
}

.capture-leave-active {
  transition: all $duration;
}
</style>
