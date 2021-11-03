<script>
    import Data from './Data.svelte';
    import { t } from './i18n.js';
    import { subtractDays } from './util.js';

    export let data;

    const sum = (data) => data.vaccination + data.recovery + data.test;

    $: total = data && data.dcc && data.dcc.total;
    $: week = data && data.dcc && data.dcc.week;
    $: month = data && data.dcc && data.dcc.month;
    $: date = data && data.date;
    $: weekAgo = date && subtractDays(date, 7);
    $: monthAgo = date && subtractDays(date, 30);
</script>

<div class="content-block">
    <h2>{$t('dcc-certificate')}</h2>

    <div class="column-3 legend">
        <div>
            <h2>{$t('total')}</h2>
            <p>
                <strong>
                    <Data
                        content={total && sum(total)}
                        placeholderWidth={100}
                    />
                </strong>
            </p>
            <p><small>{$t('since-first-data')}</small></p>
            <ul>
                <li class="type-1">
                    {$t('vaccination-certificates')}: <Data
                        content={total && total.vaccination}
                        placeholderWidth={60}
                    />
                </li>
                <li class="type-2">
                    {$t('recovery-certificates')}: <Data
                        content={total && total.recovery}
                        placeholderWidth={60}
                    />
                </li>
                <li class="type-3">
                    {$t('test-certificates')}: <Data
                        content={total && total.test}
                        placeholderWidth={60}
                    />
                </li>
            </ul>
        </div>

        <div>
            <h2>{$t('past-7-days')}</h2>
            <p>
                <strong>
                    <Data content={week && sum(week)} placeholderWidth={100} />
                </strong>
            </p>
            <p>
                <small>
                    <Data content={weekAgo} /> / <Data content={date} />
                </small>
            </p>
            <ul>
                <li class="type-1">
                    {$t('vaccination-certificates')}: <Data
                        content={week && week.vaccination}
                    />
                </li>
                <li class="type-2">
                    {$t('recovery-certificates')}: <Data
                        content={week && week.recovery}
                    />
                </li>
                <li class="type-3">
                    {$t('test-certificates')}: <Data
                        content={week && week.test}
                    />
                </li>
            </ul>
        </div>

        <div>
            <h2>{$t('past-30-days')}</h2>
            <p>
                <strong>
                    <Data
                        content={month && sum(month)}
                        placeholderWidth={100}
                    />
                </strong>
            </p>
            <p>
                <small>
                    <Data content={monthAgo} /> / <Data content={date} />
                </small>
            </p>
            <ul>
                <li class="type-1">
                    {$t('vaccination-certificates')}: <Data
                        content={month && month.vaccination}
                    />
                </li>
                <li class="type-2">
                    {$t('recovery-certificates')}: <Data
                        content={month && month.recovery}
                    />
                </li>
                <li class="type-3">
                    {$t('test-certificates')}: <Data
                        content={month && month.test}
                    />
                </li>
            </ul>
        </div>
    </div>
</div>
