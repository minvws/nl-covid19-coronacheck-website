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
        },
        focus: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.$store.state.visitedHomePage) {
                if (!this.focus) return
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
        <div id="page-intro">
            <div v-if="intro" v-html="intro"/>
            <slot />
        </div>
    </div>
</template>

<style lang="scss">
    h1 {
        font-size: 1.875rem;
        line-height: 1.21875;
        margin-bottom: 24px;
    }

    #page-intro {
        padding-bottom: 24px;
        a {
            text-decoration: underline;
        }
        // no underline on phone numbers
        a[href^="tel:"] {
            text-decoration: none;
        }
    }

    h3 {
        margin-top: 40px;
        font-size: 1.125rem;
    }
</style>
