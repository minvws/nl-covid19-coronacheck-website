<template>
    <div class="consent-checkbox">
        <h4 class="consent-checkbox-title" v-html="title" />
        <p v-html="body" />
        <UserConsent
            class="consent-checkbox-label"
            @update="consent = $event"
            v-bind="{
                consent,
                label: checkbox
            }"
        />
    </div>
</template>

<script>
import UserConsent from '../views/1-home/UserConsent.vue'
export default {
    name: 'ConsentCheckbox',
    components: { UserConsent },
    data () {
        return {
            consent: false
        }
    },
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
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables/sizes.scss";
.consent-checkbox {
    border-radius: 12px;
    border: 1px solid #E5E5E5;
    padding: $grid-x2-5 $grid-x2-5 0 $grid-x2-5;
    margin-bottom: 2 * $grid-x2-5;
    &-label {
        background: none;
        padding: 0;
    }
}
</style>
