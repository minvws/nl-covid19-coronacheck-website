<script>
import CcModestButton from '@/components/elements/CcModestButton';
import modalMixin from './modal-mixin'

export default {
    name: 'SlotModal',
    components: { CcModestButton },
    mixins: [modalMixin],
    data () {
        return {
            isSticky: false
        }
    },
    methods: {
        mounted () {
            this.handleScroll()
        },
        close() {
            this.$emit('close');
            this.elementThatHadFocusBeforeModal.focus();
        },
        handleScroll() {
            const scrollPosition = this.$refs.modal?.scrollTop || 0
            this.isSticky = scrollPosition > 1
        }
    }
}
</script>

<template>
    <div class="cover">
        <div
            ref="tabStart"
            tabindex="0"></div>
        <div
            @click="close()"
            class="cover__clickable-area"></div>
        <div class="modal__container">
            <div
                class="modal"
                role="alertdialog"
                aria-labelledby="modal__head"
                aria-describedby="modal__body">
                    <div
                        class="sticky-header"
                        :class="{'is-sticky': isSticky }">
                        <h1
                            ref="focusStart"
                            tabindex="-1"
                            id="modal__head">
                            <slot name="head"/>
                        </h1>
                        <button @click="close()"
                            class="close-detail-pop-up"
                            :aria-label="$t('close')">
                            <img src="assets/img/icons/close.svg" alt=""/>
                        </button>
                    </div>
                <div
                    class="modal__content"
                    ref="modal"
                    @scroll="handleScroll">
                    <div id="modal__body"
                        class="sticky">
                        <slot name="body"/>
                    </div>
                    <div id="modal__footer">
                        <CcModestButton
                            id="modal-close"
                            @select="close()"
                            :label="$t('close')"/>
                    </div>
                </div>
            </div>
        </div>
        <div
            ref="tabEnd"
            tabindex="0"></div>
    </div>
</template>
