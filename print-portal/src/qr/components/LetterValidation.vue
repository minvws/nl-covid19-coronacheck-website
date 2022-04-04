
<template>
    <div>
        <div class="input__set">
            <label for="input-code">
                {{$t(`${translation}.uniqueCode`)}}
                <div class="label--side-note">
                    {{$t('forInstanceAbbr')}} {{$t(`${translation}.exampleCode`)}}
                </div>
            </label>
            <input
                v-model="input"
                v-on:keyup.enter="$emit('submit')"
                type="text"
                id="input-code"
                :placeholder="$t(`${translation}.uniqueCode`)"/>
            <ErrorLabel
                v-if="error"
                :label="error"/>
        </div>
        <slot />
        <CcButton
            @select="$emit('submit')"
            :label="$t('next')"/>
    </div>
</template>

<script>
import CcButton from '@/components/elements/CcButton';
import ErrorLabel from '@/components/elements/ErrorLabel';

export default {
    components: { ErrorLabel, CcButton },
    props: {
        error: {
            type: String,
            required: false
        },
        translation: {
            type: String,
            required: false,
            default: 'views.provideCode'
        },
        value: {
            type: String,
            required: true
        }
    },
    computed: {
        input: {
            get () {
                return this.value
            },
            set (value) {
                this.$emit('input', value)
            }
        }
    }
}
</script>
