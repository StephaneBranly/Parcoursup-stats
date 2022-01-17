export  const getField = (school: Record<string, any>, fieldName: string) => {
    if (school[fieldName] !== undefined) return school[fieldName]
    return 'NaN'
}