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
    }
}
</script>

<template>
    <div class="section-block">
        <h1 v-if="head">
            {{head}}
        </h1>
        <div
            v-if="intro"
            v-html="intro"/>
    </div>
</template>

<style lang="scss">

</style>
