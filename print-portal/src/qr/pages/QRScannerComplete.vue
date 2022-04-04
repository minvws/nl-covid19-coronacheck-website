<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        QR SCANNER COMPLETE TODO
        <router-link :replace="true" :to="{ name: 'vaccinationOverviewList' }">continue</router-link>
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
