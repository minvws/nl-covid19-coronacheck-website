import { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import QRScanner from '@/qr/components/QRScanner/index.vue'
import QRFromImageOrPDF from '@/qr/components/QRScanner/QRFromImageOrPDF.vue'

const routes: Array<RouteConfig> = [
    {
        path: '/qr',
        name: 'Qr',
        component: Home
    },
    {
        path: '/camera',
        name: 'camera',
        component: QRScanner
    },
    {
        path: '/file',
        name: 'file',
        component: QRFromImageOrPDF
    }
]

export default routes
