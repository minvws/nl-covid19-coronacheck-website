<template>
  <transition appear name="background" @after-enter="isOpen = true">
    <div class="dialog">
      <div class="inner">
        <transition appear name="dialog" @after-leave="$emit('close')">
          <div class="content" v-if="isOpen">
            <img
              class="close"
              src="@/qr/assets/icons/close.svg"
              @click.stop.prevent="isOpen = false"
            />
            <h3 class="title">{{ title }}</h3>
            <p class="body" v-html="body" />
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    },
    mounted() {
        this.configureListeners('add')
    },
    beforeDestroy() {
        this.configureListeners('remove')
    },
    methods: {
        onKeyDown({ key }: KeyboardEvent) {
            if (!this.isOpen || key !== 'Escape') return
            this.isOpen = false
        },
        configureListeners(type: 'add' | 'remove') {
            if (type === 'add') document.addEventListener('keydown', this.onKeyDown)
            else document.removeEventListener('keydown', this.onKeyDown)
        }
    },
    data() {
        return {
            isOpen: false
        }
    }
})
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.title {
  text-align: center;
}
.body {
  text-align: left;
}
.inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.content {
  min-width: 300px;
  padding: 18px 18px 40px 18px;
  border-radius: 8px;
  background: white;
}
.close {
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
}

$duration: 0.3s;
.background-enter {
  opacity: 0;
}
.background-enter-to {
  opacity: 1;
}
.background-enter-active {
  transition: all $duration;
}
.background-leave {
  opacity: 1;
}
.background-leave-to {
  opacity: 0;
}
.background-leave-active {
  transition: all $duration;
}

.dialog-enter {
  opacity: 0;
  transform: scale(0.9);
}
.dialog-enter-to {
  opacity: 1;
  transform: scale(1);
}
.dialog-enter-active {
  transition: all $duration;
}
.dialog-leave {
  opacity: 1;
  transform: scale(1);
}
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.dialog-leave-active {
  transition: all $duration;
}
</style>
