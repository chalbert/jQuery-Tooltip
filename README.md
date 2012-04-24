jQuery-Tooltip
==============

jQuery tooltip plugin - convention-based contextual help

**$('#content').tooltip();**

## What is a tooltip?

A tooltip is a small text box that shows on hover, providing contextual help. Think 'title' attributes 
but with more control and custom UI.

## Options & defaults
    
    id: 'tooltip', // Id of the tooltip box. Use this id to create your css.
    attribute: 'data-tooltip', // The attribute that stores the tooltip text.
    openedClass: 'opened', // Css class to be applied when the tooltip opens.
    delay: 800, // Delay before the tooltip shows on hover (Milliseconds).
    animSpeed: 0, // Delay before the tooltip is hidden when closing (Milliseconds).
                  // To accommodate css transition you might have. 
    align: 'bottom right' // Align the element relative to the mouse,
    zIndex: 9999999 // Z-index of the tooltip
    
## Uses

### Basic use 

    <div class="content">
      <a href="#" data-tooltip="I'm a link, just click me.">I need clarification</a>
    </div>

    $('#content').tooltip(); // Apply tooltips with defaults.
    
### Custom use

    <style>
      #custom-tootip-id {
        opacity 0
        transition opacity .5s
      }
      #custom-tootip-id.active {
        opacity 1
      }
    </style>

    <div class="content">
      <a href="#" data-help="I'm a link, just click me.">I need clarification</a>
    </div>

    $('#content').tooltip({
      id: 'custom-tootip-id',
      attribute: 'data-help',
      openClass: 'active',
      delay: 500,
      animSpeed: 500,
      align: 'top left'      
    });
    
## Public API

### unbind

    $('#content').tooltip(); // Bind tooltips
    
    $('#content').tooltip('unbind'); // Unbind tooltips

**Note:** The events are delegated, so you must unbind on the same selector you binded on.

### disable

Disable the tooltips within a selection. Simply append '-off' a the end of the attributes,
e.g `data-tooltip` becomes `data-tooltip-off`. 

    // <div class="item" data-tooltip="..."/>
    $('.item').tooltip('disable'); // <div class="item" data-tooltip-off="..."/>

### enable

Reverse the disable method.

    // <div class="item" data-tooltip-off="..."/>
    $('.item').tooltip('enable'); // <div class="item" data-tooltip="..."/>

