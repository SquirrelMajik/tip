import axios from 'axios'

class ResourceFactory {
  constructor (rule, options = {}) {
    this.$resourceClass = options.resourceClass || Resource
    this.$resourcesClass = options.resourcesClass || Resources

    this.$axiosOptions = options
    if (rule.startsWith('/')) {
      this.$baseURL = options.baseURL
      this.$rule = this.$autoCompleteRule(rule)
    } else {
      this.$baseURL = new URL(rule).origin
      this.$axiosOptions.baseURL = this.baseURL
      this.$rule = this.$autoCompleteRule(rule.replace(this.baseURL, ''))
    }
    this.$actionKey = options.actionKey || 'action'
    this.$transformData = options.transformData || this.$defaultTransformData
    this.$transformQueryData = options.transformQueryData || this.$defaultTransformQueryData
    if (options.transformRequest) {
      this.$axiosOptions.transformRequest = Array.isArray(options.transformRequest)
        ? options.transformRequest : [options.transformRequest]
    }
    if (options.transformResponse) {
      this.$axiosOptions.transformResponse = Array.isArray(options.transformResponse)
        ? options.transformResponse : [options.transformResponse]
    }

    this.$itemActions = {}
    this.$batchActions = {}
    let actions = options.actions || {}
    Object.entries(actions).forEach(([key, value]) => {
      let actionSet = value.batch ? this.$batchActions : this.$itemActions
      actionSet[key] = value
    })
  }

  $new () {
    return this.$newResource()
  }

  $newResource () {
    return new this.$resourceClass(this)
  }

  $newResources () {
    return new this.$resourcesClass(this)
  }

  $defaultTransformData (data) {
    return data
  }

  $defaultTransformQueryData (data) {
    return data
  }

  $autoCompleteRule (rule) {
    return rule.replace(/\/*$/g, '/')
  }

  $query (params = {}) {
    let resources = new this.$resourcesClass(this)
    resources.$query(params)
    return resources
  }

  $get (params = {}) {
    let resource = new this.$resourceClass(this)
    resource.$get(params)
    return resource
  }
}

class Resource {
  constructor (factory) {
    this.$factory = factory
    this.$rule = this.$factory.$rule
    this.$baseURL = this.$factory.$baseURL
    this.$axiosOptions = this.$factory.$axiosOptions
    this.$actionKey = this.$factory.$actionKey
    this.$actions = this.$factory.$itemActions
    this.$transformData = this.$factory.$transformData
  }

  $init (data) {
    if (data instanceof Object) {
      Object.keys(this).forEach(key => { if (!key.startsWith('$')) { delete this[key] } })
      Object.assign(this, data)
    }
    return this
  }

  get $data () {
    let filteredKeys = Object.keys(this).filter(key => !key.startsWith('$'))
    return filteredKeys.reduce((obj, key) => ({ ...obj, [key]: this[key] }), {})
  }

  $setAction (key, options) {
    this['$' + key] = (params = {}) => {
      let actionOptions = this.$updateAxiosOptions(options, params.options || {}, {
        method: options.method,
        url: this.$parseUrl(params),
        data: Object.assign({[this.$actionKey]: key}, this.data)
      })
      return this.$request(actionOptions)
    }
  }

  $parseUrl (params = {}) {
    return this.$rule.replace(/\/<\w+>/g, matched => {
      let keyword = matched.slice(1, -1)
      return params[keyword] || this[keyword] || ''
    })
  }

  $updateAxiosOptions (...options) {
    let axiosOptions = Object.assign({}, ...options)
    let objectKeys = ['data', 'search', 'headers']
    objectKeys.forEach(key => {
      axiosOptions[key] = Object.assign({}, ...options.map(option => option[key] || {}))
    })
    return axiosOptions
  }

  $request (options = {}) {
    this.$promise = axios(this.$updateAxiosOptions(this.$axiosOptions, options))
      .then(response => this.$transformData(response.data))
      .then(data => this.$init(data))
    return this.$promise
  }

  /// default actions

  $save (params = {}) {
    return this.$request(this.$updateAxiosOptions(params.options || {}, {
      method: this.id ? 'put' : 'post',
      url: this.$parseUrl(params),
      data: this.$data
    }))
  }

  $get (params = {}) {
    return this.$request(this.$updateAxiosOptions(params.options || {}, {
      method: 'get',
      url: this.$parseUrl(params)
    }))
  }

  $update (params = {}) {
    return this.$request(this.$updateAxiosOptions(params.options || {}, {
      method: 'put',
      url: this.$parseUrl(params),
      data: this.$data
    }))
  }

  $patch (params = {}) {
    return this.$request(this.$updateAxiosOptions(params.options || {}, {
      method: 'patch',
      url: this.$parseUrl(params),
      data: this.$data
    }))
  }

  $delete (params = {}) {
    return this.$request(this.$updateAxiosOptions(params.options || {}, {
      method: 'delete',
      url: this.$parseUrl(params)
    }))
  }

  $remove (params = {}) {
    return this.$delete(params)
  }
}

class Resources extends ExtendableBuiltIn(Array) {
  constructor (factory) {
    super()
    this.$factory = factory
    this.$rule = this.$factory.$rule
    this.$baseURL = this.$factory.$baseURL
    this.$axiosOptions = this.$factory.$axiosOptions
    this.$actionKey = this.$factory.$actionKey
    this.$actions = this.$factory.$batchActions
    this.$transformData = this.$factory.$transformQueryData
  }

  $init (data) {
    if (Array.isArray(data)) {
      this.push(...data.map(this.$factory.$newResource(this).$init))
    }
    return this
  }

  get $data () {
    return this
  }

  $setAction (key, options) {
    this['$' + key] = (params = {}) => {
      let actionOptions = this.$updateAxiosOptions(options, params.options || {}, {
        method: options.method,
        url: this.$parseUrl(params),
        data: {[this.$actionKey]: key}
      })
      return this.$request(actionOptions)
    }
  }

  $parseUrl (params = {}) {
    return this.$rule.replace(/\/<\w+>/g, matched => {
      let keyword = matched.slice(1, -1)
      return params[keyword] || this[keyword] || ''
    })
  }

  $updateAxiosOptions (...options) {
    let axiosOptions = Object.assign({}, ...options)
    let objectKeys = ['data', 'search', 'headers']
    objectKeys.forEach(key => {
      axiosOptions[key] = Object.assign({}, ...options.map(option => option[key] || {}))
    })
    return axiosOptions
  }

  $request (options = {}) {
    this.$promise = axios(this.$updateAxiosOptions(this.$axiosOptions, options))
      .then(response => this.$transformData(response.data))
      .then(data => this.$init(data))
    return this.$promise
  }

  /// default actions

  $query (params = {}) {
    return this.$request(this.$updateAxiosOptions(params.options || {}, {
      method: 'get',
      url: this.$parseUrl(params)
    }))
  }

  $delete (resources, params = {}) {
    return this.$request(this.$updateAxiosOptions(params.options || {}, {
      method: 'put',
      url: this.$parseUrl(params),
      data: {[this.$actionKey]: 'batch_delete', ids: resources.map(item => item.id)}
    }))
  }

  $remove (resources, params = {}) {
    return this.$delete(resources, params)
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

export default ResourceFactory
