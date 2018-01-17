import Services from './services'

class MyService {
  static install (Vue) {
    Vue.prototype.$services = new Services()
  }
}

export default MyService
