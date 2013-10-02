var setFrameUrl = function(url) {
  if (!url || url == 'undefined') return;
  if (!url.match('^https?://')) {
    url = 'http://' + url;
  }
  $('#url').val(url);
  $('#frame').attr('src',url);
};

var rotate = function() {
  $('#ipad').toggleClass('landscape').toggleClass('portrait');
  $('#iphone').toggleClass('landscape').toggleClass('portrait');
  $('#iphone5').toggleClass('landscape').toggleClass('portrait');
}

var setDevice = function(device) {
  if (!device || device == 'undefined') return;
  if (device.toLowerCase() === 'ipad') {
    $("#to_ipad").trigger("click");
  } else if (device.toLowerCase() === 'iphone') {
    $("#to_iphone").trigger("click");
  } else if (device.toLowerCase() === 'iphone5') {
    $("#to_iphone5").trigger("click");
  }
}

var parseURLParams = function() {
  //Set the frame url based on the url param
  setFrameUrl($.url.param('url'));

  //Which device?
  setDevice($.url.param('device'));

  //If portrait exists, set it to portrait.
  if ($.url.param('portrait')) rotate();
}

$(document).ready(function(){
  //Setup handlers
  $('#rotate').click(rotate);

  $('#to_ipad').click(function(){
    $('#iphone').attr('id','ipad');
    $('#iphone5').attr('id','ipad');
  });

  $('#to_iphone').click(function(){
    $('#ipad').attr('id','iphone');
    $('#iphone5').attr('id','iphone');
  });

  $('#to_iphone5').click(function(){
    $('#ipad').attr('id','iphone5');
    $('#iphone').attr('id','iphone5');
  });

  $('#url').focus(function(){
    $('#keyboard').show();
  });

  $('#url').blur(function(){
    $('#keyboard').hide();
  });

  $('#url').keyup(function(evt){
    if (evt.keyCode != 13) return;
    $('#url').blur();
    setFrameUrl($(this).val());
  });

  $('#toggleHelp').click(function(){
    $('#help').toggle();
    if ($("#help").is(":visible")) {
      $('html,body').animate({scrollTop: $("#help").offset().top});
    } else {
      $("#buttons").scrollTop();
    }
  });

  parseURLParams();
});
