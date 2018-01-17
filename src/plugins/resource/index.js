import axios from 'axios'
import ResourceFactory from './resource'

class MyVueResource {
  static options = {}

  static install (Vue, options = {}) {
    MyVueResource.options = MyVueResource.updateAxiosOptions(MyVueResource.options, options)
    Vue.prototype.$resource = MyVueResource.factory
    Vue.prototype.$axios = axios
    Vue.prototype.$http = axios
  }

  static factory (rule, options = {}) {
    options = MyVueResource.updateAxiosOptions(MyVueResource.options, options)
    return new ResourceFactory(rule, options)
  }

  static updateAxiosOptions (...options) {
    let axiosOptions = Object.assign({}, ...options)
    let objectKeys = ['data', 'search', 'headers', 'actions']
    objectKeys.forEach(key => {
      axiosOptions[key] = Object.assign({}, ...options.map(option => option[key] || {}))
    })
    return axiosOptions
  }

  static setDedaultOptions (options = {}) {
    MyVueResource.options = options
  }

  static setDefaultBaseURL (baseURL) {
    MyVueResource.options.baseURL = baseURL
  }

  static setDedaultActions (actions = {}) {
    MyVueResource.options.actions = actions
  }

  static setDedaultHeaders (headers = {}) {
    MyVueResource.options.headers = headers
  }
}

export default MyVueResource
