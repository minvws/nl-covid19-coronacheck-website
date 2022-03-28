<template>
  <div class="error-message">
    <transition appear name="message" mode="out-in" @after-enter="onClear">
      <div class="message" :key="errorMessage" v-if="errorMessage">
        {{ errorMessage }}
      </div>
    </transition>
  </div>
</template>
<script>
import Vue from 'vue'
import { NO_QR_CODE_FOUND } from '@/qr/utils/QRScanner'
export default Vue.extend({
    props: {
        error: {
            type: String,
            required: false
        },
        timeoutDuration: {
            type: Number,
            required: false,
            default: 4000
        }
    },
    data() {
        return {
            timeout: 0
        }
    },
    computed: {
        errorMessage() {
            if (this.error === NO_QR_CODE_FOUND) return this.$t('qr.code.not-found')
            return this.error
        }
    },
    methods: {
        onClear() {
            this.clear()
            this.timeout = setTimeout(() => {
                this.$emit('clear')
            }, this.timeoutDuration)
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

.error-message {
  position: relative;
  color: red;
  font-weight: bold;
}
.inner {
  display: flex;
  position: relative;
  line-height: 24px;
}

.icon {
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
