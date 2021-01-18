import API from './config.service'

const companies = '/companies/'

export const companiesService = {
  getById: id =>
    new Promise((resolve, reject) => {
      API.get(companies + id)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    }),

  patch: (id, data) =>
    new Promise((resolve, reject) => {
      API.patch(companies + id, data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    }),
}
