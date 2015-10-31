(function (exportName) {

  /*<remove>*/
  'use strict';
  /*</remove>*/

  /*<jdists encoding='ejs' data='../package.json'>*/
  /**
   * @file <%- name %>
   *
   * <%- description %>
   * @author
       <% (author instanceof Array ? author : [author]).forEach(function (item) { %>
   *   <%- item.name %> (<%- item.url %>)
       <% }); %>
   * @version <%- version %>
       <% var now = new Date() %>
   * @date <%- [
        now.getFullYear(),
        now.getMonth() + 101,
        now.getDate() + 100
      ].join('-').replace(/-1/g, '-') %>
   */
  /*</jdists>*/

  /*<jdists import="./schema.js?define">*/
  var Schema = require('./schema');
  /*</jdists>*/

  /*<jdists encoding="regex" pattern="/~/g" replacement="--">*/
    /*<jdists encoding="regex" pattern="/^.*'(.*)'.*$/mg" replacement="<!~jdists import='$1.js?define'/~>">*/
  require('./schemas/base')(Schema);
  require('./schemas/staticArray')(Schema);
  require('./schemas/dynamicArray')(Schema);

  require('./schemas/object')(Schema);
  require('./schemas/union')(Schema);
  require('./schemas/cases')(Schema);

  require('./schemas/staticString')(Schema);
  require('./schemas/dynamicString')(Schema);

  require('./schemas/dependArray')(Schema);
  require('./schemas/dependString')(Schema);

  require('./schemas/enums')(Schema);
  require('./schemas/cstring')(Schema);
    /*</jdists>*/
  /*</jdists>*/

  var exports = Schema;

  if (typeof define === 'function') {
    if (define.amd || define.cmd) {
      define(function () {
        return exports;
      });
    }
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports;
  } else {
    window[exportName] = exports;
  }

})('jpacks');