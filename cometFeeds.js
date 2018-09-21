var feedsComet = Class.create();
feedsComet.prototype = {
  timestamp: 0,
  url: base_url + 'feedsBackEnd.php',
  noerror: true,
  initialize: function() { },

  connect: function()
  {
    this.ajax = new Ajax.Request(this.url, {
      method: 'get',
      parameters: { 'timestamp' : this.timestamp },
      onSuccess: function(transport) {
        // handle the server response
        var response = transport.responseText.evalJSON();
        this.feeds.timestamp = response['timestamp'];
        this.feeds.handleResponse(response);
        this.feeds.noerror = true;
      },
      onComplete: function(transport) {
        // send a new ajax request when this request is finished
        if (!this.feeds.noerror)
          // if a connection problem occurs, try to reconnect each 5 seconds
          setTimeout(function(){ feeds.connect() }, 5000);
        else
          this.feeds.connect();
        this.feeds.noerror = false;
      }
    });
    this.ajax.feeds = this;
  },

  disconnect: function()
  {


  },

  handleResponse: function(response)
  {
    dt_feeds.ajax.reload();
  },

  doRequest: function(request)
  {
    new Ajax.Request(this.url, {
      method: 'get',
      parameters: { 'msg' : request }
    });
  }
}

var feeds = new feedsComet();
feeds.connect();
