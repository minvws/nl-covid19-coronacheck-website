import { getPageHeaderIntro, getPageLink, getPageButton } from '@/qr/utils/QRPage'

export default {
    computed: {
        name () {
            const { name } = this.$route
            return name ?? ''
        },
        label () {
            return getPageLink(this.name)
        },
        intro () {
            return getPageHeaderIntro(this.name)
        },
        button () {
            return getPageButton(this.name)
        }
    }
}
