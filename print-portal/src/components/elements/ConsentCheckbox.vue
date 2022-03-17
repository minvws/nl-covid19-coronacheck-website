<template>
    <WarningMessage>
        <h4 class="consent-checkbox-title" v-html="title" />
        <p v-html="body" />
        <UserConsent
            class="consent-checkbox-label"
            @update="$emit('input', $event)"
            v-bind="{
                consent,
                label: checkbox
            }"
        />
    </WarningMessage>
</template>

<script>
import UserConsent from '../views/1-home/UserConsent.vue'
import WarningMessage from './WarningMessage.vue'
export default {
    name: 'ConsentCheckbox',
    components: { UserConsent, WarningMessage },
    props: {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        checkbox: {
            type: String,
            required: true
        },
        consent: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.consent-checkbox {
    &-title {
        font-size: 18px;
    }
    &-label {
        background: none;
        padding: 0;
    }
}
</style>
