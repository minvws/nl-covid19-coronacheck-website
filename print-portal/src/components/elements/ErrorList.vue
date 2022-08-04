<template>
    <div>
        <p><strong>{{ label }}</strong></p>
        <ul class="ul--with-padding">
            <i18n path="xss" tag="li" :key="index" v-for="(error, index) in errors">
            {{ error }}
            </i18n>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ErrorList',
    props: {
        errors: {
            type: Array,
            required: true
        }
    },
    computed: {
        label () {
            return this.$tc('views.errorGeneral.label', this.errors.length)
        }
    }
}
</script>
