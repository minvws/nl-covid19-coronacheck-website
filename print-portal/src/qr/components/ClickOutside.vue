<template>
  <div class="click-outside" />
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    methods: {
        onClickOutside() {
            this.$emit('click')
        },
        configureListeners(type: 'add' | 'remove') {
            if (type === 'add') window.addEventListener('click', this.onClickOutside)
            else window.removeEventListener('click', this.onClickOutside)
        }
    },
    mounted() {
        this.configureListeners('add')
    },
    beforeDestroy() {
        this.configureListeners('remove')
    }
})
</script>
<style lang="scss" scoped>
.click-outside {
  line-height: 0;
  display: none;
}
</style>
