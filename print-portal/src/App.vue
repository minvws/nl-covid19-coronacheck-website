<script>
import Identity from '@/components/elements/Identity';
import languages from '@/data/languages';
import Modal from './components/elements/Modal';

export default {
    components: { Modal, Identity },
    computed: {
        dataReady() {
            return this.currentLanguage && this.$store.state.holderConfig && this.$store.state.testProviders.all.length > 0;
        }
    },
    methods: {
        init() {
            this.getHolderConfig();
            this.getTestProviders();
            // todo this should be done based on oneskyapp
            this.addLanguages();
            this.setCurrentLanguage();
        },
        async getHolderConfig() {
            this.$axios({
                method: 'get',
                url: '/holder/config/'
            }).then((response) => {
                if (response.data && response.data.payload) {
                    const holderConfig = JSON.parse(atob(response.data.payload));
                    this.$store.commit('setHolderConfig', holderConfig);
                }
            }).catch((error) => {
                console.log(error);
            })
        },
        async getTestProviders() {
            this.$axios({
                method: 'get',
                url: 'holder/config_ctp'
            }).then((response) => {
                if (response.data && response.data.payload) {
                    const config = JSON.parse(atob(response.data.payload));
                    this.$store.commit('testProviders/init', config.corona_test_providers);
                } else {
                    console.error('Something went wrong when retrieving config corona test providers')
                }
            }).catch((error) => {
                console.error(error);
            })
        },
        addLanguages() {
            this.$store.commit('languages/init', languages);
        },
        setCurrentLanguage() {
            const routeNameChunks = window.location.href.split('/');
            if (routeNameChunks.length > 0) {
                const locale = routeNameChunks[3];
                const language = this.$store.getters['languages/getItemByProperty']('locale', locale, true);
                if (language) {
                    this.$store.commit('languages/setCurrent', language);
                } else {
                    this.$store.commit('languages/setCurrent', this.$store.state.languages.all[0]);
                }
            } else {
                this.$store.commit('languages/setCurrent', this.$store.state.languages.all[0]);
            }
        }
    },
    mounted() {
        this.init();
    }
}
</script>

<template>
    <div
        v-if="dataReady"
        id="app"
        :class="{'direction-rtl': currentLanguage.direction === 'rtl' }"
        :style="{'direction': currentLanguage.direction }">
        <Identity/>
        <router-view/>
        <Modal/>
    </div>
</template>

<style lang="scss">
@import "@/styles/index";

* {
    box-sizing: border-box;
}
</style>
