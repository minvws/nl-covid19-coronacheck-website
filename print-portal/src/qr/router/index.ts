import { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import QRScannerPage from '@/qr/pages/QRScannerPage.vue'
import QRFromImageOrPDFPage from '@/qr/pages/QRFromImageOrPDFPage.vue'

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
        component: QRFromImageOrPDFPage
    }
]

export default routes
