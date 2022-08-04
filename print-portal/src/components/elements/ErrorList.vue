<template>
    <div>
        <template v-if="errors.length">
            <p><strong>{{ label }}</strong></p>
            <ul class="ul--with-padding" v-if="errors.length > 1">
                <i18n path="xss" tag="li" :key="index" v-for="(error, index) in errors">
                {{ error }}
                </i18n>
            </ul>
            <div v-else>{{ errors[0] }}</div>
        </template>
        <template v-if="link">
            <br v-if="errors.length" />
            <div v-html="link" />
        <br>
        </template>
    </div>
</template>

<script>
export default {
    name: 'ErrorList',
    props: {
        errors: {
            type: Array,
            required: false,
            default: () => []
        },
        link: {
            type: String,
            required: false
        }
    },
    computed: {
        label () {
            return this.$tc('views.errorGeneral.label', this.errors.length)
        }
    }
}
</script>
