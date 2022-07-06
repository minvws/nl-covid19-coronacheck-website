<template>
  <div
    class="camera-list"
    :class="{ visible: !!(cameras && cameraId) }"
    @click.stop="isOpen = !isOpen"
  >
    <ClickOutside @click="isOpen = false" />
    <p v-if="label">{{ label }}</p>
    <div class="camera-list-inner">
      <div class="inner">
        <div class="item">{{ selectedCamera || '&nbsp;' }}</div>
        <div class="list-icon" :class="{ open: isOpen }">
          <img src="@/qr/assets/icons/chevron.svg" />
        </div>
      </div>
      <div class="list" v-if="isOpen">
        <div v-for="item in cameras" :key="item.id">
          <div v-if="false">{{ item.id }}</div>
          <div
            class="camera"
            :class="{
              active: !pendingCameraId && item.id === cameraId,
              pending: item.id === pendingCameraId,
              disabled: !!pendingCameraId
            }"
            @click.stop="$emit('select', item)"
          >
            {{ getCameraLabel(item) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import QrScanner from 'qr-scanner'
import ClickOutside from '@/qr/components/ClickOutside.vue'

export default Vue.extend({
    components: {
        ClickOutside
    },
    props: {
        label: {
            type: String,
            required: false
        },
        cameraId: {
            type: String as () => QrScanner.DeviceId,
            required: false
        },
        pendingCameraId: {
            type: String as () => QrScanner.DeviceId,
            required: false
        },
        cameras: {
            type: Array as () => QrScanner.Camera[] | undefined,
            required: false
        }
    },
    data() {
        return {
            isOpen: false
        }
    },
    computed: {
        selectedCamera(): string | null {
            const { camera } = this
            return this.getCameraLabel(camera)
        },
        camera(): QrScanner.Camera | undefined {
            return this.cameras?.find(({ id }) => id === this.cameraId)
        }
    },
    methods: {
        getCameraLabel(camera?: QrScanner.Camera): string | null {
            if (!camera) return null
            return camera.label
        }
    },
    watch: {
        pendingCameraId(pendingCameraId): void {
            if (!pendingCameraId) this.isOpen = false
        }
    }
})
</script>

<style lang="scss" scoped>
.camera-list {
  padding-top: 16px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  cursor: pointer;

  &.visible {
    opacity: 1;
    pointer-events: all;
  }

  &-inner {
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 18px;
    padding: 16px 8px;
  }
}

.inner {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 18px;
}

.title {
  font-size: 1.3rem;
  font-weight: bold;
}

.camera {
  cursor: pointer;
  text-align: left;
  &.active {
    font-weight: bold;
    pointer-events: none;
  }
  &.pending {
    font-weight: bold;
    pointer-events: none;
  }

  &.disabled {
    opacity: 0.7;
  }
}

.item {
  position: relative;
  z-index: 0;
  font-weight: bold;
}

.list {
  position: absolute;
  top: 0;
  left: 0;
  margin: 18px;
  padding: 18px;
  width: calc(100% - 72px);
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 18px;
  backdrop-filter: blur(60px);
}

.list-icon {
  position: relative;
  z-index: 1;
  &.open {
    img {
        transform: rotate(180deg);
    }
  }
}
</style>
