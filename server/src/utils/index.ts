import pick from 'lodash/pick.js'

export const pickFields = (obj: {}, fields: string[]) => {
  return pick(obj, fields)
}

export const removeUndefinedObject = (obj: any) => {
  Object.keys(obj).forEach((k) => {
    if (obj[k] === undefined) {
      delete obj[k]
    }
  })
}

export const convertToUpdateNested = (obj: Record<string, any>) => {
  const final: Record<string, any> = {}
  Object.keys(obj).forEach((k) => {
    if (Boolean(obj[k]) && typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
      const response = convertToUpdateNested(obj[k])
      Object.keys(response).forEach((a) => {
        final[`${k}.${a}`] = response[a]
      })
    } else {
      final[k] = obj[k]
    }
  })

  return final
}
