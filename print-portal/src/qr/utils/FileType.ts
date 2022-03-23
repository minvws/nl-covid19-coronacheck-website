export const fileIsOfType = (accept: string, file: File): boolean => {
    return !!accept.split(',').find((accept) => {
        const offset = accept[accept.length - 1] === '*' ? 1 : 0
        const type = accept.substring(0, accept.length - offset)
        return file.type.startsWith(type)
    })
}

export const isPDF = (file: File): boolean => {
    return fileIsOfType('application/pdf', file)
}

export const isImage = (file: File): boolean => {
    return fileIsOfType('image/*', file)
}

export const fileExtensions = (accept: string): string[] => {
    const types = accept.split(',')
    return types.map((type: string) => {
        if (type.endsWith('/*')) return type.substring(0, type.length - 2)
        return type.split('/')[1]
    })
}

export const prettyFileExtensions = (accept: string, seperator: string): string => {
    const ext = fileExtensions(accept)
        .map((type) => {
            if (type === 'pdf') return type.toUpperCase()
            return type
        })
        .map((type) => `<b>${type}</b>`)
    if (ext.length > 1) {
        ext[ext.length - 2] = `
        ${ext[ext.length - 2]}
        ${seperator}
        ${ext[ext.length - 1]}
        `
        ext.splice(ext.length - 1, 1)
    }
    return ext.join(', ')
}
