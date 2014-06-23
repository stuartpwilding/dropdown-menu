// drawermenu.js

var dropdownMenu = function(options){

  var self = this;

  defaults = {
    menu : ''
  };

  options = $.extend(defaults, options);

  self.init = function(){

    self.$menu = $(options.menu);

    if (!self.$menu.length) { return false; }

    self.$active_li = null;
    self.menu_active = false;
    self.menu_open = false;  
    self.TO_enter;
    self.TO_leave;

    self.$menu.on('mouseenter', function() {
      clearTimeout(self.TO_leave);
      self.TO_enter = window.setTimeout(function() {
        self.menu_active = true;
        if (!self.menu_open) {
          self.$active_li.find('> ul').addClass('is-visible');
          self.menu_open = true;
        }
      }, 500);

    });

    self.$menu.on('mouseleave', function() {
      clearTimeout(self.TO_enter);
      if (self.menu_open) {
        self.TO_leave = window.setTimeout(function() {
          self.$active_li.find('> ul').removeClass('is-visible');
          self.$active_li = null;
          self.menu_open = false;
          self.menu_active = false;
        }, 500);
      }
    });


    self.$menu.on('mouseenter', '> li', function(e) {
      if (self.$active_li !== null) {
        self.$active_li.find('> ul').removeClass('is-visible');
      }

      self.$active_li = $(this);

      if (self.menu_active) {

        self.menu_open = true;
        self.$active_li.find('> ul').addClass('is-visible');

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
