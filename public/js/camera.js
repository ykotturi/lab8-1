function initCamera() {
  capture($('#camera-video'),
          $('#camera-canvas'),
          $('#camera-button'));
  disableCamera();
}

function enableCamera() {
  $('#camera-video').show();
  $('#camera-button').show();
  $('#camera-change').hide();
}

function disableCamera() {
  $('#camera-video').hide();
  $('#camera-button').hide();
  $('#camera-change').show();
}

function capture(video, canvas, snapshotButton) {
  //Setup navigator for all versions of browsers.
  navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia || navigator.msGetUserMedia;
  var ctx = canvas[0].getContext('2d');

  var successCallback = function(mediaStream) {
    //The success callback function. On
    video.attr('src', window.URL.createObjectURL(mediaStream));
    snapshotButton.click(function(e) { takePhoto(); });
  };

  var errorCallback = function() {
    console.log('Capture failed');
  };

  var takePhoto = function () {
    console.log("Taking photo");
    var width = video.width();
    var height = video.height();
    canvas.attr('width', width);
    canvas.attr('height', height);
    ctx.drawImage(video[0], 0, 0, width, height);
    disableCamera();

    canvas[0].toBlob(function(blob) { uploadImage('/changeProfilePhoto', blob); });
  };

  navigator.getUserMedia({ 'video': true },
      successCallback, errorCallback);

};

function uploadImage(url, data)
{
  var formData = new FormData();
  formData.append("img", data);
  $.ajax({
    url: url,
    type: 'POST',
    data: formData,
    contentType: false,
    processData: false,
    success: function() {
      console.log("Swapping profile photo.");
      //Force update with time change.
      var d = new Date();
      $('#facebookPhoto #photo').attr('src', 'images/profile.png?'+d.getTime());
    }
  });
};

