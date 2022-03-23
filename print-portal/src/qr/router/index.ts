import { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import QRScannerPage from '@/qr/components/QRScanner/QRScannerPage.vue'
import QRFromImageOrPDF from '@/qr/components/QRScanner/QRFromImageOrPDF.vue'

export enum RouterNames {
    CHOOSE_ADD_PROOF = 'chooseAddProof',
    CAMERA = 'camera',
    FILE = 'file'

}
const routes: Array<RouteConfig> = [
    {
        path: '/kies-bewijs-toevoegen',
        name: RouterNames.CHOOSE_ADD_PROOF,
        component: Home
    },
    {
        path: '/camera',
        name: RouterNames.CAMERA,
        component: QRScannerPage
    },
    {
        path: '/file',
        name: RouterNames.FILE,
        component: QRFromImageOrPDF
    }
]

export default routes
