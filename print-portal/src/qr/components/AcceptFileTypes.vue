<template>
  <div class="accept-file-types" v-html="acceptFileExtensions" />
</template>
<script lang="ts">
import Vue from 'vue'
import { prettyFileExtensions } from '@/qr/utils/FileType'

export default Vue.extend({
    props: {
        visible: {
            type: Boolean,
            required: false,
            default: true
        },
        accept: {
            type: String,
            required: true
        }
    },
    computed: {
        acceptFileExtensions() {
            return prettyFileExtensions(this.accept, this.$t('qr.and') as string)
        }
    }
})
</script>
