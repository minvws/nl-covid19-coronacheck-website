<script>
    import Data from './Data.svelte';
    import { t } from './i18n.js';

    export let data;

    $: android =
        data &&
        data.appstats &&
        data.appstats.android &&
        data.appstats.android.downloads;
    $: ios =
        data &&
        data.appstats &&
        data.appstats.ios &&
        data.appstats.ios.downloads;
</script>

<div class="content-block key-figures">
    <h2>{$t('coronacheck-app-statistics')}</h2>

    <div class="column-2">
        <div>
            <h3>{$t('android')}</h3>
            <p><small>{$t('number-of-downloads-coronacheck-app')}</small></p>
            <p class="emphasize">
                <Data content={android} placeholderWidth={160} />
            </p>
        </div>

        <div>
            <h3>{$t('ios')}</h3>
            <p><small>{$t('number-of-downloads-coronacheck-app')}</small></p>
            <p class="emphasize">
                <Data content={ios} placeholderWidth={160} />
            </p>
        </div>
    </div>
</div>
