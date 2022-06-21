<template>
  <div class="file-input">
    <input
      v-if="!isPending"
      class="file"
      type="file"
      ref="input"
      id="input"
      :disabled="dialog"
      :accept="accept"
      @change="onFileInput"
      aria-describedby="input-description"
    />
    <label for="input">
      <DropFile
        class="drop"
        @file="$emit('file', $event)"
        @error="$emit('error', $event)"
        @dialog="dialog = $event"
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
    data () {
        return {
            dialog: false
        }
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
                this.$t('qr.or') as string,
                false,
                '-'
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
  height: 100%;
  padding-left: 20px;
}

.drop {
    position: relative;
    z-index: 1;
}

</style>
