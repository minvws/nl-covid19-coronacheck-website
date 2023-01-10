<template>
    <div>
        <template v-if="errors.length">
            <strong>
                {{ $tc("views.errorGeneral.label", errors.length) }}
            </strong>
            <ul class="list" v-if="errors.length > 1">
                <li :key="index" v-for="(error, index) in errors">
                    {{ error }}
                </li>
            </ul>
            <div v-else>{{ errors[0] }}</div>
        </template>
        <div
            v-if="link"
            v-html="link"
            :class="{ 'has-errors': errors.length }"
        />
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
    }
}
</script>

<style lang="scss" scoped>
.list {
    padding-left: 1em;
}

.has-errors {
    padding-top: 1em;
}

</style>
