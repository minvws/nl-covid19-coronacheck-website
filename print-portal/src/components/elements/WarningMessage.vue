<template>
   <div class="warning-message">
       <p v-if="message">{{ message }}</p>
       <slot />
    </div>
</template>
<script>
export default {
    name: 'WarningMessage',
    props: {
        message: {
            type: String,
            required: true
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/styles/variables/sizes.scss";
.warning-message {
    border-radius: 12px;
    border: 1px solid #E5E5E5;
    padding: $grid-x2-5 $grid-x2-5 0 $grid-x2-5;
}
</style>
