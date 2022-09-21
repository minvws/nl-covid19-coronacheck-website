export const Listener = {
    ADD: 'add',
    REMOVE: 'remove'
}

export default class ImageFileLoader {
  private reader: FileReader
  public result = ''

  constructor() {
      this.reader = new FileReader()
      this.onLoad = this.onLoad.bind(this)
  }

  public load(file: File): void {
      this.reader.readAsDataURL(file)
  }

  public configureListeners(type: string): void {
      const event = 'load'
      if (type === Listener.ADD) {
          this.reader.addEventListener(event, this.onLoad)
      } else this.reader.removeEventListener(event, this.onLoad)
  }

  private onLoad(e: ProgressEvent<FileReader>): void {
      this.result = (e?.target?.result as string) ?? ''
  }
}
