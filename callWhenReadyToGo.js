function callWhenReadyToGo(callback) {
  var images = document.getElementsByTagName('img'); 
  var originalList = [];
  var counter = 0;
  for(var i = 0; i < images.length; i++) {
      if(images[i].src.indexOf(".gif") !== -1 && images[i].style.display !== "none") {
        originalList.push(images[i].src);
      }
  }

  if(originalList.length == 0) {
    callback(false);
    return;
  }

  function timeout(originalList, counter) {
      setTimeout(function () {
        var images = document.getElementsByTagName('img'); 
        var updatedList = [];
        for(var i = 0; i < images.length; i++) {
            if(images[i].src.indexOf(".gif") !== -1 && images[i].style.display === "none") {
              updatedList.push(images[i].src);
            }
        }
        var anyOriginalNotFound = false;
        for(var i = 0; i < originalList.length; i++) {
          var found = false;
          for(var j = 0; j < updatedList.length; j++) {
            if(originalList[i] === updatedList[j]) {
              found = true;
            }
          }

          if(found == false) {
            anyOriginalNotFound = true;
          }
        }
        if(counter == 5 || anyOriginalNotFound == false) {
          callback(anyOriginalNotFound);
        } else {
          timeout(originalList, counter++);
        }
      }, 1000);
  }
}
