/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('yootSearchBinderIndex', function(Y, NAME) {

  /**
  * The yootSearchBinderIndex module.
  *
  * @module yootSearchBinderIndex
  */

  /**
  * Constructor for the yootSearchBinderIndex class.
  *
  * @class yootSearchBinderIndex
  * @constructor
  */
  Y.namespace('mojito.binders')[NAME] = {

    /**
    * Binder initialization method, invoked after all binders on the page
    * have been constructed.
    */
    init: function(mojitProxy) {
      this.mojitProxy = mojitProxy;
    },

    /**
    * The binder method, invoked to allow the mojit to attach DOM event
    * handlers.
    *
    * @param node {Node} The DOM node to which this mojit is attached.
    */
    bind: function(node) {
      var me = this;
      this.node = node;
      var searchInput = node.one('#searchInput');
      searchInput.focus();
      searchInput.on('keypress', function(evt) {
        if(evt.charCode === 13) {
          me.mojitProxy.invoke('searchCity',
            { 'params': { 'body': { 'cityQuery': evt.target.get('value')}}},
            function(err, resp) {
              if(!err) {
                var places = Y.JSON.parse(resp),//resp[0];
                place = places[0];
                node.one(".city").set('innerHTML', place.name);
                node.one(".country").set('innerHTML', place.country.content);
                me.mojitProxy.broadcast('searchCity:cityChosen', place);
              }
            });
        }
      });
      /**
      * Example code for the bind method:
      *
      * node.all('dt').on('mouseenter', function(evt) {
      *   var dd = '#dd_' + evt.target.get('text');
      *   me.node.one(dd).addClass('sel');
      *
      * });
      * node.all('dt').on('mouseleave', function(evt) {
      *   
      *   var dd = '#dd_' + evt.target.get('text');
      *   me.node.one(dd).removeClass('sel');
      *
      * });
      */
    }

  };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client']});
