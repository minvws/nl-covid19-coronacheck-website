import QrScanner from 'qr-scanner'

export enum CameraFacingMode {
  ENVIRONMENT = 'environment',
  USER = 'user'
}

export enum CameraState {
  NONE = 'NONE',
  STARTING = 'STARTING',
  STARTED = 'STARTED',
  PLAYING = 'PLAYING',
  SELECTED = 'SELECTED',
  LIST = 'LIST',
  STOPPED = 'STOPPED'
}

export const showCameraState = (type: CameraState): boolean => {
    return [
        CameraState.NONE,
        CameraState.STARTING,
        CameraState.SELECTED,
        CameraState.LIST,
        CameraState.STOPPED
    ].includes(type)
}

type QRScannerDataType = {
  isDebug: boolean
  isAutoStart: boolean
  isReady: boolean
  isStartPending: boolean
  isStopPending: boolean
  isStarted: boolean
  cameraHasFlash: boolean
  cameraIsFlashOn: boolean
  qrScanner: null | QrScanner
  cameras: null | QrScanner.Camera[]
  cameraId: null | string
  pendingCameraId: null | string
  cameraDefaultFacingMode: CameraFacingMode | QrScanner.DeviceId
  code: null | string
  error: null | string
  state: CameraState
  lastCapture: null | string
  codesAdded: number
}

export default QRScannerDataType
