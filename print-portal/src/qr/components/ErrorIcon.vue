<template>
  <div class="error-icon">
    <transition appear name="icon">
        <template v-if="visible">
            <img v-if="icon" :src="icon" class="icon" alt=""/>
            <div class="icon" v-else :style="style">!</div>
        </template>
    </transition>
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
            default: false
        },
        color: {
            type: String,
            required: false,
            default: 'red'
        },
        size: {
            type: Number,
            required: false,
            default: 30
        },
        label: {
            type: String,
            required: false
        },
        icon: {
            type: String,
            required: false
        }
    },
    computed: {
        style() {
            const { color, size } = this
            return {
                width: `${size}px`,
                height: `${size}px`,
                fontSize: `${size * 0.7}px`,
                lineHeight: `${size}px`,
                border: `${size / 6}px solid ${color}`,
                color
            }
        }
    }
})
</script>
<style lang="scss" scoped>
.icon {
  position: relative;
  text-align: center;
  border-radius: 50%;
  margin: 0 auto;
}
.label {
  position: relative;
  top: 24px;
}

$duration: 0.3s;
.icon-enter {
  opacity: 0;
  transform: scale(0);
}

.icon-enter-to {
  opacity: 1;
  transform: scale(1);
}
.icon-enter-active {
  position: relative;
  transition: all 0.3 0.15;
}

.icon-leave {
  opacity: 1;
}
.icon-leave-to {
  opacity: 0;
}
.icon-leave-active {
  transition: all $duration;
}

.icon {
    width: 44px;
    height: 44px;
}
</style>
