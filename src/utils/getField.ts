export const getField = (formation: Record<string, any>, fieldName: string) => {
    if (formation[fieldName] !== undefined) return formation[fieldName]
    return 'NaN'
}
