import API from './config.service'

const employees = '/employees/'

const formatObj = obj => {
  if (obj == {}) return ''
  let str = []
  for (let prop in obj)
    if (obj[prop] != '' && prop != 'role') {
      if (obj.hasOwnProperty(prop)) {
        str.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]))
      }
    }
  return str.join('&')
}

export const employeesService = {
  getAll: (role, data) => {
    return new Promise((resolve, reject) => {
      API.get(employees + role + '?' + formatObj(data))
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  get: (role, id) =>
    new Promise((resolve, reject) => {
      API.get(employees + role + '/' + id)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    }),

  post: data =>
    new Promise((resolve, reject) => {
      API.post(employees, data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    }),

  patch: (id, data) =>
    new Promise((resolve, reject) => {
      API.patch(employees + id, data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    }),

  delete: (role, id) =>
    new Promise((resolve, reject) => {
      API.delete(employees + role + '/' + id)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    }),
}
