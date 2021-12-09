<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import { goHome } from '@/tools/router';

export default {
    name: 'RecoveryLayout',
    components: { Page, PageIntro, CcButton },
    props: {
        translationId: {
            type: String,
            required: true
        },
        route: {
            /* {
                 name: string, // router name
                 translationId: string, // button label
                 replace?: boolean // router push or replace
             } */
            type: Object,
            required: false,
            default: null
        },
        displayBackButton: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        onButtonClick () {
            const { replace, name } = this.route
            if (name === 'Home') {
                goHome()
                return
            }
            if (replace) this.$router.replace(this.route)
            else this.$router.push(this.route)
        }
    }
}
</script>

<template>
    <Page
        :display-back-button="displayBackButton">
        <div class="section">
            <PageIntro
                :head="$t(`views.${this.translationId}.pageHeader`)"
                :intro="$t(`views.${this.translationId}.pageIntro`)"/>
            <div
                class="section-block"
                v-if="route">
                <div class="section-block__footer">
                    <CcButton
                        @select="onButtonClick"
                        :label="$t(route.translationId)"/>
                </div>
            </div>
        </div>
    </Page>
</template>
