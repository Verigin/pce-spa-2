import config from "../config";

const queryString = require('query-string');

let METHOD_GET = 'GET';
let METHOD_POST = 'POST';
let METHOD_DELETE = 'DELETE';
let METHOD_PUT = 'PUT';
let METHOD_OPTIONS = 'OPTIONS';

export default class Api {
  constructor() {
  }

  login(user, password) {
    let url = '/user/login';
    return this._exec(METHOD_POST, url, { email: user, password })
  }

  register(name, email, password) {
    let url = '/user';
    return this._exec(METHOD_PUT, url, { name, email, password })
  }

  errorSummary(data) {
    if (!Array.isArray(data)) {
      return '';
    }
    return data.map((row) => {
      return row.hasOwnProperty('message') ? row.message : '';
    }).join(', ');
  }

  _exec(method, url, params, additionalHeaders = {}) {
    let promise;
    let headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      //'Accept': 'application/json',        
      'Content-Type': 'application/json; charset=utf-8',
      //'Accept':'application/json; charset=utf-8',
    };

    for (let key in additionalHeaders) {
      headers[key] = additionalHeaders[key];
    }

    switch (method) {
      case METHOD_GET:
        promise = fetch(config.baseURL + url + queryString.stringify(params), {
          method: METHOD_GET,
          mode: 'cors',
          follow: 0,
          headers: headers
        });
        break;
      case METHOD_PUT:
      case METHOD_DELETE:
      case METHOD_POST:
        promise = fetch(config.baseURL + url, {
          method: method,
          body: JSON.stringify(params),
          headers: headers,
          responseType: 'json',
          withCredentials: true,
          mode: 'cors',
          follow: 0
        });
        break;
      default:
        throw new Error("Don't support method.");
    }
    let httpStatus, httpBody;
    return new Promise(function (resolve, reject) {
      promise.then(response => {
        httpStatus = response.status;

        // workaround debugger issue https://github.com/facebook/react-native/issues/15325
        if (response.hasOwnProperty("_bodyBlob"))
          return response._bodyBlob.data;
        return response.text();
      }).then(text => {
        httpBody = text;
        return JSON.parse(text);
      }).catch(e => {
        throw new Error('Response parsing error. ' + e.message);
      }).then(json => {
        if (httpStatus == 200 || httpStatus == 201) {
          return json;
        } else if (httpStatus === 422) {
          let message = this.errorSummary(json);
          throw new Error('Error: ' + message);
        } else {
          let message = json && json.hasOwnProperty('message') ? json.message : 'Error, httpCode=' + httpStatus;

          throw new Error(message);
        }
      })
        .then(jsonData => {
          resolve(jsonData);

        })
        .catch(e => {
          console.warn(e);
          reject(e);
        });
    });
  }

}