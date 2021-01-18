export const getDate = (birthdate, formType) => {
  if (birthdate)
    return formType == 'edit'
      ? new Date(birthdate).toISOString().substring(0, 10)
      : birthdate
  else return birthdate
}
