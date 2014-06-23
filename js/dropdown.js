// drawermenu.js

var dropdownMenu = function(options){

  var self = this;

  defaults = {
    menu : '',
    show_class : 'is-visible',
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
          self.$active_li.find('> ul').addClass(options.show_class);
          self.menu_open = true;
        }
      }, options.open_delay);
    });

    self.$menu.on('mouseleave', function() {
      clearTimeout(self.TO_enter);
      if (self.menu_open) {
        self.TO_leave = window.setTimeout(function() {
          self.$active_li.find('> ul').removeClass(options.show_class);
          self.$active_li = null;
          self.menu_open = false;
          self.menu_active = false;
        }, options.close_delay);
      }
    });

    self.$menu.on('mouseenter', '> li', function(e) {
      if (self.$active_li !== null) {
        self.$active_li.find('> ul').removeClass(options.show_class);
      }
      self.$active_li = $(this);
      if (self.menu_active) {
        self.$active_li.find('> ul').addClass(options.show_class);
        self.menu_open = true;
      }
    });
  }

  if (options.menu !== '' ) {
    self.init();
  }

};



$(document).ready(function() {

  var newDropdown = new dropdownMenu({
    menu : '#page-head .nav-main > ul'
  });

});
