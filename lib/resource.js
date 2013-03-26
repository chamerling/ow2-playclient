//
// Manipulates resource : Get and Create
//

var utils = require('./utils');

/**
 * 
 */
var Resource = function(options, play) {
  this.options = options;
  if (!options.uri) {
    throw new Error('URI is required');
  }
  this.uri = options.uri;
  this.play = play
  return this
}

Resource.prototype.all = function(callback) {
  console.log('Get all', this.uri);
  callback = utils.safe(callback);
  
  this.play._get(this.uri, function(err, res) {
    if (res.statusCode != 200) {
      callback(new Error(res.message));
    } else {
      callback(err, res.body);
    }
  });
}

Resource.prototype.get = function(id, callback) {
  console.log('Get ' + this.uri + ' with ID ' + id);
  callback = utils.safe(callback);
  
  if (!id) {
    return callback(new Error('Can not get ' + this.uri + ' from null ID'));
  }
  
  var url = [this.uri, id].join('/');

  this.play._get(url, function(err, res) {
    if (res.statusCode != 200) {
      callback(new Error(res.message));
    } else {
      callback(err, res.body);
    }
  });
}

Resource.prototype.delete = function(id, callback) {
  console.log('Delete ' + this.uri + ' with ID ' + id);
  
  callback = utils.safe(callback);
  
  if (!id) {
    return callback(new Error("Can not delete resource from null ID"));
  }
  
  var url = [this.uri, id].join('/')

  this.play._delete(url, function(err, res) {
    if (res.statusCode != 204) {
      callback(new Error(res.message));
    } else {
      callback(err, null);
    }
  });
}

/**
 * Create a new resource ie HTTP POST
 */
Resource.prototype.create = function(obj, callback) {
  
  var method = this.options.create + 'Create';
  // TODO te method by name
  
  var createcb = function(err, res) {
    if (res.statusCode != 201) {
      callback(new Error(res.message));
    } else {
      callback(err, res.body);
    }
  }
  
  if(this.options.create === 'json') {
    this.jsonCreate(obj, createcb);
  } else if(this.options.create === 'form'){
    this.formCreate(obj, createcb);
  } else {
    // ...
    throw new Error('Unsupported create method', this.options.create);
  }
}

Resource.prototype.jsonCreate = function(obj, callback) {
  console.log('Create new JSON ' + this.uri);
  
  callback = utils.safe(callback);

  this.play._post(this.uri, obj, function(err, res) {
    callback(err, res);
  });
}

Resource.prototype.formCreate = function(obj, callback) {
  console.log('Create new FORM ' + this.uri);
  
  callback = utils.safe(callback);

  this.play._form(this.uri, obj, function(err, res) {
    callback(err, res);
  }); 
}

module.exports = Resource