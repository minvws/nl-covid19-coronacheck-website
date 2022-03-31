<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
       <PageIntro v-bind="intro" />
       {{ $store.getters['qr/CODE']}}
        <div
            class="section-block">
            <Loading/>
        </div>
    </div>
</Page>

</template>

<script>
import Vue from 'vue'
import Page from '@/components/elements/Page.vue';
import PageIntro from '@/components/elements/PageIntro.vue';
import Loading from '@/components/elements/Loading';
import pageIntroMixin from '@/qr/mixins/page-intro-mixin'

export default Vue.extend({
    mixins: [pageIntroMixin],
    components: {
        Page,
        PageIntro,
        Loading
    },
    props: {
        accepted: {
            type: Object,
            required: true
        },
        rejected: {
            type: Object,
            required: true
        }
    },
    created () {
        const validOne = Math.random() > 0
        const validCode = 'HBNYON';
        const invalidCode = 'HBNYON';
        const invalid = 'NL2:1I7ZY0OD74/%1D86 77RFON78AXL9PB *DEG/1Q35Y.$3FZ5SIGOB4%5115A2$V3*X/I4J.QU8TM%%BA.6*X36BZ*JW5SISK -HNNH+KZFM1LSO2C$YQ9ORO8L13Y+I/10CEBJB-9P3+OIGMFS%H89NLOL+M-4A6P$U:%KIANI9H3C/$L1NZGL6FC97R1-B0KBVAO5XDTDP QOGX0XWUWL*C6XDMUTIV2B7ADK32PMSXJBSVOF2D-% U-94QU8$:22+LK8DI5L21Y94P8BR-T4Q512T58IPBP.1/D+T7BGC9RTZM0WQLJJ*RGR*WND7WJEP86I3/Y7W*A B-51C47:8TVSEY W-9YHREN4P/7DXPGT/KG9H$L%W9$J2A+LF21LS*-U14C/Q:6S$Y PNCPBTLK*PRBHTYY1G2%W3KVI/R*GAD*O2WZDGRFAA8M9M3IH7.D%Z0IRED S$V0E-U/R60O+GTWIXIA3193P3*/.$EUM8G:KW5S48C-.Y61PI-JTXUIKSE+J3-S26NUF/RRHBVW7%6RSMC6.63%3PW32690BY5/C8903$IT+NKHJFL-G3H44MTR:X2N.Z6T5K2VVP57E:U%2TXOOU7S-061BC%NTR0L GE.NI1*SSH28BQSKVGS9NM5%I5+C$GFXZLMP/FNGO%K/LN$1%LK/BQQ-TQ9VEG84Y:RYQ9*$ZGUMFC6J6DM5+DD5W%IDMQR+CG:+L*$KAMGVTV4.C6*IYA5VX$1+/M5/5RM.5VVDTS+*ZB8V%M%6VHSGUX.JXE*GIIPWXTN%+ISL$*IQLBTASPO40990YZ0EOVOK3RGZ16FS.F+Y2N6W3Z7ZDFR1Y.Z9C24Z9A2BM4KNEYN3I%77MXYUD3$F4EA2QIKIX06XV AKTE:FNY/N7YXKIK'
        const valid = 'HC1:NCFCS2UN7OJ2O13S6C1UGNGH2SKVI7/VB5/T*9QZ6EX-EM%U+LE9HOR/8 HQJIO7YUI-C%M2PKRW83%OQPOKV8BF%HX+7H8CEZCJABV7BPC59EC8SKUJC2.4/PIPUG:ZQS1UA:K%9M6LO8Q7CZSE8S-ZUK7NABVVY968PUP3/FH:/GQJMZHTI/6JK2PW46C5FDG4.2MZK6O0 5A BLG/VJP36SKY*R-V5S/LDXH4:6SPQWQBBHBU+0DSLZ4RH85T3P0:QOWLBDLL7FTZ6/FGM.1E+MQI0DIT%J9319FT2+A461P%Q8YE86Q8HYQ0*15Q1X70BR0S40/BB9R8PQQ27BOW9V 4XJ7F.D7IV:VCSJHPL2JA26R4.P7WP45J62EAT$KQA5UQEJTV+N2P:KPVTV/UQ1NDOF:*T6MMWPI/-9+RJVBQQ+I7SJNFD5H1CAA2NTH9N3PM:/M6CG:R64Q74-CVDBX/A0GDTSJTTF5.8/W33MOS+H ODUO7 FWEOQ7NPTSN1-HENI84BOT3S+FWVJH8U.1SQ189Y8/GCUBUH7MCRO2BUVCU PQ21VQFWI:TFBW4VB0IV/OAF9O 1FI/7U500BW 0TS4'
        const qr = validOne ? valid : invalid;
        const couplingCode = validOne ? validCode : invalidCode
        const credential = qr
        this.onSend({ couplingCode, credential })
    },
    methods: {
        async onSend (payload) {
            try {
                const { data: { status } } = await this.$axios({
                    method: 'post',
                    url: '/holder/coupling',
                    data: payload
                })
                switch (status) {
                case 'accepted':
                    this.$store.dispatch('qr/CODE', payload)
                    this.$router.replace(this.accepted)
                    break
                case 'rejected':
                    this.$router.replace(this.rejected)
                    break
                default:
                }
            } catch (e) {
                this.$router.replace(this.rejected)
            }
        }
    }
})
</script>
