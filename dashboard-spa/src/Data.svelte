<script>
    import { locale, t } from './i18n.js';
    import { createNumberFormatter } from './util.js';

    export let content;
    export let placeholderColor = '#ddd';
    export let placeholderWidth = 60;
    export let placeholderLabel = $t('loading');

    $: format = createNumberFormatter($locale);
</script>

{#if typeof content === 'number'}
    {format(content)}
{:else if content !== undefined}
    {content}
{:else}
    <span
        style="width: {placeholderWidth}px; background: {placeholderColor}"
        aria-label={placeholderLabel}
    >
        &nbsp;
    </span>
{/if}

<style>
    span {
        display: inline-block;
    }
</style>
