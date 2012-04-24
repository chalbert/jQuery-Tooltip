/**
 * |-----------------|
 * | jQuery-Tooltip |
 * |-----------------|
 *  jQuery-Clickout is freely distributable under the MIT license.
 *
 * @author Nicolas Gilbert
 *
 * @requires jQuery
 */

(function(factory){
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory($);
  }

})(function ($){
  'use strict';

  $.fn.tooltip = function(options){
    var settings,
        timer,
        active = false,
        methods,
        api = ['unbind', 'enable', 'disable'],
        offset,
        $tooltip;

    settings = $.extend({
            id: 'tooltip',
            speed: 200,
            delay: 800,
            //selector: '[data-tooltip]',
            attribute: 'data-tooltip',
            align: 'bottom right'
          }, options),

    settings.selector = '[' + settings.attribute + ']';

    settings.align = settings.align.split(' ');
    // Assure alignment is valid
    if ((settings.align.indexOf('top') !== -1 && settings.align.indexOf('bottom') !== -1)
        || (settings.align.indexOf('left') !== -1 && settings.align.indexOf('right') !== -1)
        ) throw new Error("Align property must contain only one vertical and" +
        "one horizontal alignment max.");

    methods = {
      init: function(){
        // Create tooltip if it doesn't exist
        if (!$('#' + settings.id).length) {
          $('body').append('<div id="' + settings.id + '"/>');
          $tooltip = $('#' + settings.id);
        }
        methods.setListeners.call(this);
      },

      unbind: function(){
        this.off('.tooltip', settings.selector);
      },

      disable: function(){
        methods.changeState.call(this, 'disable');
      },

      enable: function(){
        methods.changeState.call(this);
      },

      changeState: function(action){
        this.find(settings.selector + ',' + settings.selector.replace(']', '-off]')).each(function(){
          var tooltip = $(this).attr(settings.attribute) || $(this).attr(settings.attribute + '-off'),
              attributes = {},
              removedAttr = settings.attribute + (action !== 'disable' ? '-off' : ''),
              addAttr = settings.attribute + (action === 'disable' ? '-off' : '');
          $(this)
              .removeAttr(removedAttr)
              .attr(addAttr, tooltip);

        });
      },

      setListeners: function(){
        methods.unbind.call(this);
        this.on('mouseleave.tooltip', settings.selector, methods.close)
            .on('mousemove.tooltip', settings.selector, function(e){
              if ($(this).attr(settings.attribute) === '') return;

              if (!active) {
                if (timer) clearTimeout(timer);
                timer = setTimeout($.proxy(function(){
                  timer = null;
                  active = true

                  $tooltip
                      .text($(this).attr(settings.attribute));

                  methods.setPosition(e.pageX, e.pageY);

                  $tooltip
                      .stop(true, true)
                      .show()
                      .addClass('opened');


                }, this), settings.delay);

              } else {
                methods.close();
              }

            })

      },

      setPosition: function(x, y){
        var offset,
            a = settings.align;
        offset = {
          left: a.indexOf('right') !== -1 ? $tooltip.outerWidth() : 0,
          top: a.indexOf('bottom') !== -1 ? $tooltip.outerHeight() : 0
        };
        console.log(a);
        $tooltip.css({
          left: x - offset.left,
          top: y - offset.top
        });
      },

      close: function(){
        active = false;
        clearTimeout(timer);
        $tooltip
            .removeClass('opened')
            .delay(350)
            .hide(20);
      }
    }

    // If using the public API
    if (typeof(options) === 'string' && api.indexOf(options) !== -1) {
      methods[options].call(this);
    } else {
      methods.init.call(this);
    }

  }

});