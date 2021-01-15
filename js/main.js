(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
    
    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  //Establish Year - vendor form 2
    $(document).on('keyup',function(){
        $("#datepicker").datepicker({
          format: "yyyy",
          viewMode: "years", 
          minViewMode: "years",
          changeYear: false,
          startDate: '1900y',
          endDate:'2021y',
          defaultViewDate: {year: '2000'}
      });
    });

  //GST and PAN Validation

  $(document).ready(function () {      
    $("#gst").change(function () {    
        var inputvalues = $(this).val();    
        var gstinformat = new RegExp('^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$');    
        if (gstinformat.test(inputvalues)) {    
            return true;    
        } else {    
            alert('Please Enter Valid GSTIN Number');    
            $("#gst").val('');    
            $("#gst").focus();    
        }    
    });   
    $("#pan").change(function () {      
        var inputpanvalues = $(this).val();
        var panformat = new RegExp('^([a-zA-Z]{5})([0-9]{4})([a-zA-Z]{1})+$');    
        if (panformat.test(inputpanvalues)) {    
            return true;    
        } else {    
            alert('Please Enter Valid PAN Number');    
            $("#pan").val('');    
            $("#pan").focus();    
        }   
    });      

  });          
  

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

  //success-btn tick
/*   $(function () {
    $("#button").click(function () {
      $("#button").addClass("onclic", 250, validate);
    });
  
    function validate() {
      setTimeout(function () {
        $("#button").removeClass("onclic");
        $("#button").addClass("validate", 450, callback);
      }, 2250);
    }
    function callback() {
      setTimeout(function () {
        $("#button").removeClass("validate");
      }, 1250);
    }
  }); */
  

})(jQuery); // End of use strict
