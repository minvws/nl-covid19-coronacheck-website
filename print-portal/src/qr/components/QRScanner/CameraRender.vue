<template>
  <div :style="style" class="camera-frame">
    <div class="inner">
      <slot />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    props: {
        ratio: {
            type: Number,
            required: false,
            default: 0.7
        },
        status: {
            type: String,
            required: false
        }
    },
    watch: {
        status() {
            this.onResize()
        }
    },
    methods: {
        onResize() {
            const video = this.$el.querySelector('video')
            video.style.width = ''
            video.style.height = ''
            if (!video) return
            requestAnimationFrame(() => {
                const bounds = this.$el.getBoundingClientRect()
                const target = video.getBoundingClientRect()
                const scaleInX =
                bounds.width / bounds.height > target.width / target.height
                if (scaleInX) video.style.width = `${bounds.width}px`
                else video.style.height = `${bounds.height}px`
            })
        }
    },
    mounted() {
        this.onResize()
        window.addEventListener('resize', this.onResize)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    },
    computed: {
        style() {
            return {
                paddingBottom: `${this.ratio * 100}%`
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.camera-frame {
  position: relative;
  line-height: 0;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.12);
  mask-image: -webkit-radial-gradient(white, black);
  overflow: hidden;
  text-align: center;
}

.inner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
}
</style>
