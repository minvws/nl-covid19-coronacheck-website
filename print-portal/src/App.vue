<script>
import Identity from '@/components/elements/Identity';
import axios from 'axios';
import languages from '@/data/languages';
import Modal from './components/elements/Modal';

export default {
    components: { Modal, Identity },
    methods: {
        init() {
            this.getHolderConfig();
            // todo this should be done based on oneskyapp
            this.addLanguages();
            this.setCurrentLanguage();
        },
        getHolderConfig() {
            const url = 'https://api-ct.bananenhalen.nl/v1/holder/config/';
            axios({
                method: 'get',
                url: url
            }).then((response) => {
                if (response.data && response.data.payload) {
                    const holderConfig = JSON.parse(atob(response.data.payload));
                    this.$store.commit('setHolderConfig', holderConfig);
                }
            }).catch((error) => {
                console.log(error);
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
        v-if="currentLanguage"
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
