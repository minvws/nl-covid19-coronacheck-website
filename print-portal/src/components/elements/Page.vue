<script>
import Footer from './Footer';
import Navigation from './Navigation';
import Snackbar from '@/components/elements/Snackbar';

export default {
    name: 'Page',
    components: { Snackbar, Navigation, Footer },
    props: {
        displayBackButton: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    computed: {
        isSnackbarVisible() {
            return this.$store.state.snackbar.visible
        },
        hasSnackbarMessage() {
            return this.$store.state.snackbar.message
        }
    },
    methods: {
        back() {
            this.$emit('back');
        }
    }
}
</script>

<template>
    <div>
        <main id="content" role="main">
            <div class="pagewrap">
                <Navigation
                    @back="back"
                    :display-back-button="displayBackButton"/>
                 <Snackbar v-if="hasSnackbarMessage" :class="{ 'screen-reader-text': !isSnackbarVisible }"/>
                <slot/>
            </div>
        </main>

        <Footer/>
    </div>
</template>

<style lang="scss">
ul.ul--with-padding {
    padding-left: 1em;
}
</style>
