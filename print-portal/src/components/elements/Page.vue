<script>
import Footer from './Footer';
import Navigation from './Navigation';

export default {
    name: 'Page',
    components: { Navigation, Footer },
    props: {
        displayBackButton: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    computed: {},
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
