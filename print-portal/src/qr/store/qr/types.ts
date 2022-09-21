import { ActionContext } from 'vuex'

export type QRData = {
  result: string
  src?: string | null
}

export type QRState = {
  qrs: QRData[]
  pending: QRData[],
  code: string | any; // @TODO
}

export type QRActionContext = ActionContext<QRState, QRState>
