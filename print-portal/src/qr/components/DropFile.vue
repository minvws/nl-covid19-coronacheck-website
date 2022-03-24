<template>
    <div
        class="drop-file"
        :class="{
            'is-pending': isPending,
            'drag-and-drop': isDragAndDrop,
            'is-over': isOver,
            'drag': !!type
        }"
        @dragover.prevent.stop="isOver = true"
        @dragenter.prevent.stop="isOver = true"
        @dragleave.prevent.stop="isOver = false"
        @dragend.prevent.stop="isOver = false"
        @drop.prevent.stop="onDropFile"
    >
        <div class="inner">
            <div class="icon-holder">
                <div class="icon" :class="{ active: !isDurationPending }" />
                <Spinner color="#007aff" :visible="isDurationPending" />
            </div>
            <template>
                <p id="input-description" class="label">{{ label }}</p>
                <AcceptFileTypes
                    class="accept"
                    :accept="accept"
                    :visible="!isDurationPending"
                />
            </template>
        </div>
        <Dialog @close="dialog = null" v-if="dialog" v-bind="dialog" />
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Dialog from '@/qr/components/Dialog.vue';
import Spinner from '@/qr/components/Spinner.vue';
import AcceptFileTypes from '@/qr/components/AcceptFileTypes.vue';
import { fileIsOfType } from '@/qr/utils/FileType';

export default Vue.extend({
    components: {
        AcceptFileTypes,
        Spinner,
        Dialog
    },
    props: {
        isPending: {
            type: Boolean,
            required: true
        },
        labels: {
            type: Object,
            required: true
        },
        accept: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: false,
            default: 300
        }
    },
    data() {
        return {
            timeout: -1 as any,
            isOver: false,
            isDurationPending: this.isPending,
            dialog: null as null | { title: string; body: string }
        };
    },
    watch: {
        isPending(isPending) {
            this.clear();
            if (isPending) this.isDurationPending = true;
            else {
                this.timeout = setTimeout(
                    () => (this.isDurationPending = false),
                    this.duration
                );
            }
        }
    },
    methods: {
        clear() {
            clearTimeout(this.timeout);
        },
        onDropFile({ dataTransfer }: DragEvent) {
            this.isOver = false;
            const file = dataTransfer?.files[0];
            if (!file) return;
            if (!fileIsOfType(this.accept, file)) {
                this.dialog = this.labels.unsupported;
                return;
            }
            this.$emit('file', file);
        }
    },
    beforeDestroy() {
        this.clear();
    },
    computed: {
        type () {
            return this.$data.isDurationPending
                ? 'isPending'
                : this.$data.isOver
                    ? 'isOver'
                    : '';
        },
        label() {
            const label = this.labels[this.type] || this.labels.default;
            return label;
        },
        isDragAndDrop() {
            const div = document.createElement('div');
            return (
                'draggable' in div || ('ondragstart' in div && 'ondrop' in div)
            );
        }
    }
});
</script>
<style lang="scss" scoped>
$color-primary: #1540EB;
$color-secondary: #F6FAFB;

.is-over {
    background-color: $color-secondary;
}

.drag-and-drop {
    &.drag {
        border: 2px dashed $color-primary;
    }
}
.drag {
    .icon {
         &:after {
            content: "";
            background-image: url('~@/qr/assets/icons/arrow.svg');
            top: 33px;
            left: 8px;
            transform: translate(-50%, -50%) rotate(90deg);
            background-repeat: no-repeat;
        }
    }
}

.drop-file {
    text-align: center;
    border: 2px solid rgba(0, 0, 0, 0);
    border-radius: 8px;
    background-color: $color-secondary;
    transition: background 0.3s;
    cursor: pointer;
    &.is-pending {
        pointer-events: none;
    }
    &:hover {
        @extend .is-over;
    }
}
.inner {
    padding: 40px 0;
}

.icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: $color-primary;
    opacity: 0;
    transition: opacity 0.3s;

    &.active {
        opacity: 1;
    }

    &:after {
        content: "+";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        font-size: 32px;
        line-height: 1.3;
        transform: translate(-50%, -50%);
        color: white;
    }

    &-holder {
        position: relative;
        display: inline-block;
        margin: 0 auto;
    }
}
.label {
    font-weight: bold;
    color: $color-primary;
    margin: 8px 0;
}

.accept {
    color: #383836;
}
</style>
