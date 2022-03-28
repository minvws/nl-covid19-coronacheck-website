<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        <div class="section-block">
            Letter combination TODO
        </div>
    </div>
</Page>

</template>

<script lang="ts">
import Vue from 'vue'
import Page from '@/components/elements/Page.vue';

export default Vue.extend({
    components: {
        Page
    }
})
</script>
