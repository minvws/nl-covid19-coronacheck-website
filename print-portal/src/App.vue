<script>
import Identity from '@/components/elements/Identity';
import axios from 'axios';

export default {
    components: { Identity },
    methods: {
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
        }
    },
    mounted() {
        this.getHolderConfig();
    }
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
