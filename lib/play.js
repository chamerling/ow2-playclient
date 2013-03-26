var util = require('util')
  , request = require('request');

var PlayClient = function(options, callback) {
  this.options = options;
  
  if (!options.token) {
    if (callback) {
      callback(new Error('API token is required'));
    } else {
      throw new Error('API token is required')
    }
  }
  this.token = options.token;
  this.apiServer = options.api_server || 'http://localhost:8080/play/api/v1/platform';
}

/**
 * Get resource
 *
 * @param {String} url
 * @param {Callback} callback
 *
 * @api private
 */

PlayClient.prototype._get = function (url, callback) {
  request({
    url: this._makeUrl(url),
    json: true,
    headers : {
      Authorization : 'Bearer ' + this.options.token
    }
  },
  function(error, response, body) {
    if (callback) callback(error, response);
  });
}

/**
 * Post data as JSON payload
 *
 */
PlayClient.prototype._post = function (url, data, callback) {
  request({
    url: this._makeUrl(url),
    method: 'post',
    json: true,
    body: data,
    headers : {
      Authorization : 'Bearer ' + this.options.token
    }
  },
  function(error, response, body) {
    if (callback) callback(error, response);
  });
}

/**
 * Post data with form
 *
 */
PlayClient.prototype._form = function (url, data, callback) {
  request({
    url: this._makeUrl(url),
    method: 'post',
    json: true,
    headers : {
      Authorization : 'Bearer ' + this.options.token
    }
  },
  function(error, response, body) {
    if (callback) callback(error, response);
  }).form(data);
}

/**
 * Delete a resource
 *
 */
PlayClient.prototype._delete = function (url , callback) {
  request({
    url: this._makeUrl(url),
    method: 'delete',
    json: true,
    headers : {
      Authorization : 'Bearer ' + this.options.token
    }
  },
  function(error, response, body) {
    // delete returns HTTP Status XXX
    if (callback) callback(error, response);
  });
}

// TODO : PUT and DEL

PlayClient.prototype._makeUrl = function(url) {
  return this.apiServer + '/' + url
}


// Manage resources from generic resource...
var Resource = require('./resource')

var resource = function(uri, create) {
  return function(id) {
    var self = this;
    if (!self.token) {
      var err = 'Access token is required'
      if (self.errorFn) {
        return self.errorFn(err)
      } else {
        throw new Error(err)
      }
    }

    var options = {
      uri : uri,
      create : create || 'form'
    }

    return new Resource(options, self);
  }
}

PlayClient.prototype.patterns = resource('patterns')
PlayClient.prototype.topics = resource('topics')
PlayClient.prototype.streams = resource('streams')
PlayClient.prototype.subscriptions = resource('subscriptions', 'json')

/**
 * Export create to get a new client instance
 */
exports.create = function(options, callback) {
  return new PlayClient(options, callback)
}