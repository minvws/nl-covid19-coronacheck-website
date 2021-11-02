<script>
    import Loading from './Loading.svelte';
    import Error from './Error.svelte';
    import KeyFigures from './KeyFigures.svelte';
    import AppStatistics from './AppStatistics.svelte';
    import { t } from './i18n.js';
    import { data, error, loading, refresh } from './data.js';

    $: $error && console.error($error);
</script>

{#if $error}
    <Error retry={refresh} loading={$loading} />
{:else}
    <KeyFigures data={$data} />
    <AppStatistics data={$data} />
{/if}
