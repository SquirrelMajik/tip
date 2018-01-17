class Services extends ExtendableBuiltIn(Array) {
  register (name, service) {
    this.push(service)
    this['$' + name] = service
  }
}

function ExtendableBuiltIn (cls) {
  function buildIn () {
    cls.apply(this, arguments)
  }
  buildIn.prototype = Object.create(cls.prototype)
  Object.setPrototypeOf(buildIn, cls)
  return buildIn
}

export default Services
