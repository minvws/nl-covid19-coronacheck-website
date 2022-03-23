export default (video: HTMLVideoElement): Promise<string> => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
        canvas.toBlob((blob: Blob | null) => {
            if (!blob) return
            const url = URL.createObjectURL(blob)
            resolve(url)
        })
    })
}
