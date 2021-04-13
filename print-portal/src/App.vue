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
            this.$store.commit('languages/setCurrent', this.$store.state.languages.all[0]);
        }
    },
    mounted() {
        this.init();
    }
}
</script>

<template>
    <div
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
