import { mobile } from '@/styles/variables/breakpoins.scss'

export default {
    data () {
        return {
            isMobile: this.getIsMobile()
        }
    },
    methods: {
        getIsMobile () {
            return window.innerWidth <= parseInt(mobile)
        },
        configureListeners (type) {
            if (type === 'add') {
                window.addEventListener('resize', this.onResize)
            } else if (type === 'remove') {
                window.removeEventListener('resize', this.onResize)
            }
        },
        onResize () {
            this.isMobile = this.getIsMobile()
        }
    },
    mounted () {
        this.onResize()
        this.configureListeners('add')
    },
    beforeDestroy () {
        this.configureListeners('remove')
    }
}
