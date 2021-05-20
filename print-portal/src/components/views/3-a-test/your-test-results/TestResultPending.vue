<script>
import Page from '@/components/elements/Page';

export default {
    name: 'TestResultPending',
    components: { Page },
    computed: {},
    methods: {
        goBack() {
            this.$router.push({ name: 'ProvideCode' });
        }
    }
}
</script>

<template>
    <Page :display-back-button="false">
        <div class="section">
            <div class="section-block">
                <h2>
                    {{$t('resultPending')}}
                </h2>
                <div v-html="$t('resultPendingDirection')"/>
                <div class="section-block__footer">
                    <button
                        @click="goBack()"
                        :to="{ name: 'ProvideCode' }"
                        type="button"
                        class="btn">
                        {{$t('back')}}
                    </button>
                </div>
            </div>
        </div>
    </Page>
</template>
