<script>
import Identity from '@/components/elements/Identity';
import languages from '@/data/languages';
import Modal from '@/components/elements/modal/Modal';
import { cmsDecode } from '@/tools/cms'
import Snackbar from '@/components/elements/Snackbar';
import { handleRejection } from '@/tools/error-handler';

export default {
    components: { Snackbar, Modal, Identity },
    data() {
        return {
            initPhaseHasErrored: false,
            timer: null
        }
    },
    computed: {
        dataReady() {
            return this.currentLanguage && this.$store.state.holderConfig && this.$store.state.testProviders.all.length > 0;
        },
        displaySnackbar() {
            return this.$store.state.snackbar.visible
        },
        displayModal() {
            return this.$store.state.modal.visible;
        },
        modalIsActive() {
            return this.displayModal || this.$store.state.slotModalActive;
        },
        currentRoute() {
            return this.$route.name
        }
    },
    methods: {
        init() {
            this.getHolderConfig();
            this.getTestProviders();
            this.addLanguages();
            this.setCurrentLanguage();
            this.setTimerToEndSession();
        },
        async getHolderConfig() {
            this.$axios({
                method: 'get',
                url: '/holder/config'
            }).then((response) => {
                if (response.data && response.data.payload) {
                    const holderConfig = cmsDecode(response.data.payload);
                    this.$store.commit('setHolderConfig', holderConfig);
                }
            }).catch((error) => {
                this.initPhaseHasErrored = true;
                handleRejection(error, { flow: 'startup', step: '10', provider_identifier: '000' });
            })
        },
        async getTestProviders() {
            this.$axios({
                method: 'get',
                url: '/holder/config_providers'
            }).then((response) => {
                if (response.data && response.data.payload) {
                    const config = cmsDecode(response.data.payload);
                    this.$store.commit('testProviders/init', config.corona_test_providers);
                    this.$store.commit('eventProviders/init', config.event_providers);
                } else {
                    this.$store.commit('modal/set', {
                        messageHead: this.$t('message.error.general.head'),
                        messageBody: this.$t('message.error.general.body'),
                        closeButton: true
                    });
                }
            }).catch((error) => {
                this.initPhaseHasErrored = true;
                handleRejection(error, { flow: 'startup', step: '20', provider_identifier: '000' });
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
            this.$i18n.locale = this.$store.state.languages.current.locale;
            const html = document.documentElement;
            html.setAttribute('lang', this.$store.state.languages.current.locale)
        },
        setTimerToEndSession() {
            const hours = 24;
            const time = hours * 3600000
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.$router.push({ name: 'Home' })
                this.$store.commit('sessionEnded')
                this.$store.commit('modal/set', {
                    messageHead: this.$t('message.info.sessionEnded.head'),
                    messageBody: this.$t('message.info.sessionEnded.body'),
                    closeButton: true
                })
            }, time)
        }
    },
    mounted() {
        this.init();
    },
    watch: {
        currentRoute() {
            if (!this.dataReady) {
                this.init();
            }
        }
    }
}
</script>

<template>
    <div
        v-if="dataReady || initPhaseHasErrored"
        id="app">
        {{currentRoute}}
        <div
            :aria-hidden="modalIsActive ? 'true' : 'false'"
            class="content">
            <Identity/>
            <router-view/>
            <Snackbar v-if="displaySnackbar"/>
        </div>

        <Modal v-if="displayModal"/>
        <portal-target name="root"/>
    </div>
</template>

<style lang="scss">
@import "@/styles/index";

* {
    box-sizing: border-box;
}

.vue-portal-target {
    position: absolute;
    left: 0;
    top: 0;
}
</style>
