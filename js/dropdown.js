// drawermenu.js

var dropdownMenu = function(options){

  var self = this;

  defaults = {
    menu : '',
    show_class : 'is-open',
    open_delay : 200,
    close_delay : 500
  };

  options = $.extend(defaults, options);

  self.init = function(){

    self.$menu = $(options.menu);

    if (!self.$menu.length) { return false; }

    self.$active_li = null;
    self.menu_active = false;
    self.menu_open = false;  
    self.TO_enter = null;
    self.TO_leave = null;

    self.$menu.on('mouseenter', function() {
      clearTimeout(self.TO_leave);
      self.TO_enter = window.setTimeout(function() {
        self.menu_active = true;
        if (!self.menu_open) {
          self.open();
        }
      }, options.open_delay);
    });

    self.$menu.on('mouseleave', function() {
      clearTimeout(self.TO_enter);
      if (self.menu_open) {
        self.TO_leave = window.setTimeout(function() {
          self.close();
          self.$active_li = null;
          self.menu_open = false;
          self.menu_active = false;
        }, options.close_delay);
      } else {
        self.$active_li = null;
      }
    });

    self.$menu.on('mouseenter', '> li', function() {
      var $this_item = $(this);
      if (self.$active_li !== null && !$this_item.hasClass(options.show_class)) {
        self.close();
      }
      self.$active_li = $this_item;
      if (self.menu_active && !$this_item.hasClass(options.show_class)) {
        self.open();
      }
    });
  }

  self.open = function() {
    self.$active_li.addClass(options.show_class)
    .find('> ul[aria-hidden]').attr('aria-hidden', 'false');
    self.menu_open = true;
  };

  self.close = function() {
    self.$active_li.removeClass(options.show_class)
    .find('> ul[aria-hidden]').attr('aria-hidden', 'true');
  };

  if (options.menu !== '' ) {
    self.init();
  }

};



$(document).ready(function() {

  var newDropdown = new dropdownMenu({
    menu : '#page-head .nav-main > ul'
  });

});
