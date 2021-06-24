<script>
import Print from './Print';
import PageIntro from '@/components/elements/PageIntro';

export default {
    name: 'PrintVaccination',
    components: { Print, PageIntro },
    methods: {
        back() {
            this.$router.push({ name: 'YourVaccinations' });
        }
    }
}
</script>

<template>
    <div class="PrintVaccination">
        <Print
            @back="back"
            :type="'vaccination'">
            <PageIntro
                :head="$t('views.printVaccination.pageHeader')"
                :intro="$t('views.printVaccination.pageIntro')"/>
        </Print>
    </div>
</template>

<style lang="scss">
.PrintVaccination {

}
</style>
