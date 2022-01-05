<script>
export default {
    name: 'PageIntro',
    props: {
        head: {
            type: String,
            required: false
        },
        intro: {
            type: String,
            required: false
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.$store.state.visitedHomePage) {
                if (!this.$store.state.snackbar.visible) {
                    // only set focus when snackbar is not visible
                    this.$refs.initialTabStart?.focus();
                }
            } else {
                // to this every time, not only on home, beacuse you could enter from a redirect
                // we assume you have been at home before then
                this.$store.commit('setVisitedHomePage')
            }
        })
    }
}
</script>

<template>
    <div class="section-block">
        <h1
            v-if="head"
            ref="initialTabStart"
            tabindex="-1">
            {{head}}
        </h1>
        <div
            v-if="intro"
            id="page-intro"
            v-html="intro"/>
    </div>
</template>

<style lang="scss">
    h1 {
        font-size: 30px;
        line-height: 1.21875;
        margin-bottom: 24px;
    }

    #page-intro {

        a {
            text-decoration: underline;
        }
    }
</style>
