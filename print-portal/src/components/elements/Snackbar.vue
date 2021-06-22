<script>
export default {
    name: 'Snackbar',
    props: {},
    computed: {
        message() {
            return this.$store.state.snackbar.message;
        },
        displaySnackbar() {
            return this.$store.state.snackbar.visible;
        }
    },
    methods: {
        close() {
            this.$store.commit('snackbar/close');
        }
    },
    mounted() {
        window.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                console.log('close');
                this.close();
            }
        });
    }
}
</script>

<template>
    <div class="snackbar">
        {{message}}
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.snackbar {
    position: fixed;
    left: $grid-x6;
    bottom: $grid-x6;
    z-index: 2;
    background: $color-coronacheck_blue;
    color: #fff;
    padding: 12px;
}
</style>
