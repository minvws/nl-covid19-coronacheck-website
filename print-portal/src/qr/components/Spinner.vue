<template>
  <div class="spinner-outer">
    <div class="spinner" :style="spinnerStyle">
      <transition-group appear name="spinner">
        <div class="spin" :style="style" :key="i" v-for="i in spinners"></div>
      </transition-group>
    </div>
    <div class="label"><slot /></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        visible: {
            type: Boolean,
            required: false,
            default: true
        },
        color: {
            type: String,
            required: false,
            default: 'red'
        },
        size: {
            type: Number,
            required: false,
            default: 40
        },
        label: {
            type: String,
            required: false
        }
    },
    computed: {
        spinners() {
            return this.visible ? 4 : 0
        },
        spinnerStyle() {
            const { size } = this
            return {
                width: `${size}px`,
                height: `${size}px`
            }
        },
        style() {
            const { color, size } = this
            return {
                borderColor: `${color} transparent transparent transparent`,
                width: `${size}px`,
                height: `${size}px`,
                borderWidth: `${size / 8}px`
            }
        }
    }
})
</script>
<style lang="scss" scoped>
$color: black;
.spinner {
  display: inline-block;
  position: relative;
  &-outer {
    line-height: 0;
  }
}
.spinner .spin {
  box-sizing: border-box;
  display: block;
  position: absolute;
  border: 0px solid $color;
  border-radius: 50%;
  animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: $color transparent transparent transparent;
}
.spinner .spin:nth-child(1) {
  animation-delay: -0.45s;
}
.spinner .spin:nth-child(2) {
  animation-delay: -0.3s;
}
.spinner .spin:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.label {
  position: relative;
  line-height: 24px;
  padding: 16px 16px 0 16px;
}

$duration: 0.3s;
.spinner-enter {
  opacity: 0;
}

.spinner-enter-to {
  opacity: 1;
}
.spinner-enter-active {
  position: relative;
  transition: all $duration;
}

.spinner-leave {
  opacity: 1;
}
.spinner-leave-to {
  opacity: 0;
}
.spinner-leave-active {
  transition: all $duration;
}
</style>
