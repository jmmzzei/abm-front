import { string, date, object } from 'yup'

export const EditSchema = object().shape({
  first_name: string(),
  last_name: string(),
  birthdate: date(),
})

export const EmployeeSchema = object().shape({
  first_name: string().required('Complete con el nombre del empleado.'),
  last_name: string().required('Complete con el apellido del empleado.'),
  birthdate: date().required(
    'Complete con la fecha de nacimiento del empleado.',
  ),
  role: string().required('Seleccione una profesión.'),
  typeId: string().when('role', {
    is: val => val === 'designer',
    then: string().required('Seleccione un tipo de diseñador.'),
    otherwise: string(),
  }),
  languageId: string().when('role', {
    is: val => val === 'programmer',
    then: string().required('Seleccione un lenguage.'),
    otherwise: string(),
  }),
})

export const SearchSchema = object().shape({
  first_name: string(),
  last_name: string(),
  birthdate: date(),
  role: string(),
  typeId: string().when('role', {
    is: val => val === 'designer',
    then: string(),
    otherwise: string(),
  }),
  languageId: string().when('role', {
    is: val => val === 'programmer',
    then: string(),
    otherwise: string(),
  }),
})

export const CompanySchema = object().shape({
  name: string().required('Complete con el nombre de la empresa.'),
})
