<script>
    import { t } from './i18n.js';
    export let retry;
    export let loading;
</script>

<div class="content-block">
    <h2>{$t('error-title')}</h2>
    <p>{$t('error-description')}</p>
    <button class="btn" on:click={retry} disabled={loading}>{$t('retry')}</button>
</div>
