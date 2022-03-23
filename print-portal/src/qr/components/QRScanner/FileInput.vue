<template>
  <div class="file-input">
    <input
      v-if="!isPending"
      class="file screen-reader"
      type="file"
      ref="input"
      id="input"
      :accept="accept"
      @change="onFileInput"
    />
    <label for="input">
      <DropFile
        @file="$emit('file', $event)"
        @error="$emit('error', $event)"
        v-bind="{
          isPending,
          labels,
          accept
        }"
      />
    </label>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import DropFile from '@/qr/components/DropFile.vue'
import { prettyFileExtensions } from '@/qr/utils/FileType'
import { LocaleMessages } from 'vue-i18n'
export default Vue.extend({
    components: {
        DropFile
    },
    props: {
        isPending: {
            type: Boolean,
            required: true
        },
        accept: {
            type: String,
            required: false,
            default: 'image/*'
        }
    },
    computed: {
        labels() {
            const acceptFileExtensions = prettyFileExtensions(
                this.accept,
                this.$t('qr.and') as string
            )
            return {
                ...(this.$t('qr.file.upload') as LocaleMessages),
                ...{
                    unsupported: {
                        ...(this.$t('qr.file.error.unsupported') as LocaleMessages),
                        body: this.$t('qr.file.error.unsupported.body', {
                            acceptFileExtensions
                        })
                    }
                }
            }
        }
    },
    methods: {
        onFileInput({ target: { files } }: { target: { files: File[] } }) {
            const file = files[0]
            if (!file) return
            this.$emit('file', file)
        }
    }
})
</script>
<style lang="scss" scoped>
.file-input {
  position: relative;
}
.file {
  position: absolute;
  width: 100%;
}

.screen-reader {
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
}
</style>
