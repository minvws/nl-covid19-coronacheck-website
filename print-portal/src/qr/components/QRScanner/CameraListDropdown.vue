<template>
  <div class="camera-list-dropdown">
    <select v-model="selected" v-bind="{ disabled }">
        <option v-for="item in cameras" :key="item.id" :value="item.id">
           {{  item.displayName }}
        </option>
    </select>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
    props: {
        disabled: {
            type: Boolean,
            required: false
        },
        camera: {
            type: Object,
            required: false
        },
        cameras: {
            type: Array,
            required: false
        }
    },
    computed: {
        selected: {
            get () {
                return this.camera?.id
            },
            set (id) {
                this.$emit('select', { id })
            }
        }
    }
})
</script>

<style lang="scss" scoped>
@import "@/styles/variables/typography.scss";
.camera-list-dropdown {

    select {
        width: 100%;
        font-family: $font-main;
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 18px;
        padding: 16px 24px;
        appearance: none;
        background-repeat: no-repeat;
        background-position-x: calc(100% - 28px);
        background-position-y: center;
        background-size: 12px;
        &:not(:disabled) {
            background-image: url('~@/qr/assets/icons/chevron.svg');
        }
    }
}
</style>
