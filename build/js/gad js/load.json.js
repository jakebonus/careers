$(function() {
  var json_brgy = null;

  function get_json(url){
    var html = '',
        xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        json_brgy = JSON.parse(this.responseText);
      }
    }
    xhr.send();
  }

  get_json(base_url + "admin/ajax_get_brgy");

});
