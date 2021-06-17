<script>
import signedEventsTool from '@/tools/signed-events'

export default {
    name: 'redirect-mixin',
    methods: {
        completeAuthentication() {
            this.isLoading = true;
            const confirmAction = () => {
                this.$router.push({ name: 'Home' });
            }

            this.authVaccinations.completeAuthentication().then((user) => {
                // after redirect we've lost the consent
                this.$store.commit('setUserConsent', true);
                this.notifyDigidFinished();
                this.collectEvents(user.id_token);
            }).catch(() => {
                this.gotoPreviousPage();
                this.$store.commit('modal/set', {
                    messageHead: this.$t('message.info.digidCanceled.head'),
                    messageBody: this.$t('message.info.digidCanceled.body'),
                    confirm: true,
                    confirmAction,
                    confirmYes: this.$t('goBackToStart'),
                    confirmNo: this.$t('close')
                })
            });
        },
        notifyDigidFinished() {
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.digidFinished.head'),
                messageBody: this.$t('message.info.digidFinished.body'),
                closeButton: true,
                closeText: this.$t('message.info.digidFinished.closeText')
            })
        },
        collectEvents(token) {
            this.$store.commit('signedEvents/clear');
            this.isLoading = true;
            signedEventsTool.collect(token, this.type).then(signedEvents => {
                this.$store.commit('signedEvents/createAll', signedEvents);
                this.isLoading = false;
                this.checkResult();
            }, (error) => {
                this.$store.commit('modal/set', {
                    messageHead: this.$t('message.error.general.head'),
                    messageBody: (this.$t('message.error.general.body') + '<p>' + error + '</p>'),
                    closeButton: true
                });
            });
        }
    },
    mounted() {
        this.completeAuthentication();
    }
}
</script>
