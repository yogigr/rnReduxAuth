export const sendError422 = (error) => {
  if (error != null) {
    for (const err in error) {
      return error[err][0]
    }
  }
}