<template>
  <div class="success-message">
    <transition appear name="message" mode="out-in" @after-enter="onClear">
      <div v-if="count > 0" class="inner" :key="count">
        <img class="icon" src="@/qr/assets/icons/check.svg" />
        <div class="message">{{ message }}</div>
      </div>
    </transition>
  </div>
</template>
<script>
import Vue from 'vue'
export default Vue.extend({
    props: {
        codesAdded: {
            type: Number,
            required: false,
            default: 0
        }
    },
    watch: {
        codesAdded: {
            handler(count) {
                this.clear()
                if (!count) {
                    this.count = 0
                    return
                }
                this.timeout = setTimeout(() => {
                    this.count = count
                }, 100)
            },
            immediate: true
        }
    },
    data() {
        return {
            timeout: 0,
            count: 0
        }
    },
    computed: {
        message() {
            const { count } = this
            return this.$tc('qr.code.added', count > 1 ? 1 : 0, { count })
        }
    },
    methods: {
        onClear() {
            this.clear()
            this.timeout = setTimeout(() => {
                this.$emit('clear')
            }, 2000)
        },
        clear() {
            clearTimeout(this.timeout)
        }
    },
    beforeDestroy() {
        this.clear()
    }
})
</script>

<style lang="scss" scoped>
$duration: 0.3s;

.success-message {
  position: relative;
  color: green;
  font-weight: bold;
}
.inner {
  display: flex;
  position: relative;
  line-height: 24px;
}

.icon {
  width: 18px;
  height: 18px;
  margin-top: 3px;
}

.message {
  margin: 0 4px;
}
.message-enter {
  opacity: 0;
}

.message-enter-to {
  opacity: 1;
}

.message-enter-active {
  transition: all $duration;
}

.message-leave {
  opacity: 1;
}

.message-leave-to {
  opacity: 0;
}

.message-leave-active {
  transition: all $duration;
}
</style>
