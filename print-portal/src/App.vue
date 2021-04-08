<script>
import Identity from '@/components/elements/Identity';

export default {
    components: { Identity }
}
</script>

<template>
    <div id="app">
        <Identity/>
        <router-view/>
    </div>
</template>

<style lang="scss">
@import "@/styles/index";

* {
    box-sizing: border-box;
}
</style>
