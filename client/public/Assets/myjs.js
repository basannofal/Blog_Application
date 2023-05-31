document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var body = document.querySelector('body');
  var sidebar = document.querySelector('.sidebar');

 

  sidebar.addEventListener('show.bs.collapse', function (event) {
      var collapses = sidebar.querySelectorAll('.collapse.show');
      collapses.forEach(function (collapse) {
          collapse.classList.remove('show');
      });
  });

  var minimizeToggle = document.querySelectorAll('[data-toggle="minimize"]');
  minimizeToggle.forEach(function (element) {
      element.addEventListener('click', function () {
          if (body.classList.contains('sidebar-toggle-display') || body.classList.contains('sidebar-absolute')) {
              body.classList.toggle('sidebar-hidden');
          } else {
              body.classList.toggle('sidebar-icon-only');
          }
      });
  });

 
});
