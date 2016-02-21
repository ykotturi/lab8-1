'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

  capture(document.getElementById("camera-video"),
          document.getElementById("camera-canvas"), 
          document.getElementById("camera-image"), 
          document.getElementById("camera-button"));
}


function capture(video, canvas, image, snapshotButton) {
  var ctx = canvas.getContext('2d');
  console.log("inside capture");

  navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia || navigator.msGetUserMedia;


  var constraints = {
    video: true
  };

  var successCallback = function(mediaStream) {

    video.src = window.URL.createObjectURL(mediaStream);
    video.addEventListener("loadedmetadata", function(e) {
      snapshotButton.onclick = function() {
        takePhoto();
      }

    });
  };

  var errorCallback = function() {
    console.log('failure to get media');
  };

  var takePhoto = function () {
    ctx.drawImage(video, 0, 0, 100, 75);
    canvas.style.display = "block";
    showImage();
  
    canvas.toBlob(function(blob) {
      $.post("/changeProfilePhoto", 
             {"img": blob});
    },
    "image/png"

    );


  };

  var showImage = function () {
    image.src = canvas.toDataURL('image/webp');
  };

  navigator.getUserMedia(constraints, successCallback, errorCallback);

};


