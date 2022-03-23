<template>
  <component :is="tag" class="text" :class="{ visible }">
    {{ $t(id) }}
  </component>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        id: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            required: false,
            default: 'div'
        },
        visible: {
            type: Boolean,
            required: false,
            default: true
        }
    }
})
</script>
<style lang="scss" scoped>
@import "@/styles/variables/typography.scss";
.text {
    font-family: $font-main;
    font-style: normal;
    color: #383836;
    opacity: 0;
    transition: opacity 0.3s;
    &.visible {
        opacity: 1;
    }
}
h2 {
    font-weight: 700;
    font-size: 30px;
    line-height: 37px;
}
p {
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    padding-bottom: 16px;
}
</style>
