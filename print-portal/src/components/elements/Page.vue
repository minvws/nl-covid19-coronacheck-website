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
    <div id="content">
        <div class="pagewrap">
            <Navigation
                @back="back"
                :display-back-button="displayBackButton"/>
            <slot/>
        </div>
        <Footer/>
    </div>
</template>

<style lang="scss">
.Page {

}
</style>
