


  var $dt_feeds = $('#dt_feeds');

  // $dt_feeds.DataTable({
  //   'dom': '<"wrapper"Bfit>',
  //   'scrollY': '70vh',
  //   "bInfo" : false,
  //   'searching': false,
  //   'scrollX': true,
  //   'scrollCollapse': true,
  //   'paging': false,
  //   "ordering": false,
  //   'buttons': [
  // ]
  // });

  var dt_feeds = $dt_feeds.DataTable({
    'ajax': {
        "type": "GET",
        "url": base_url + 'feeds.txt',
        // "data": data,
        "dataSrc": ""
      },
      // fnCreatedRow: function(nRow, data, iDisplayIndex) {
      //    $(nRow).attr('data-c_id', data.c_id);
      //  },
       
      'columns': [

        { "data": function(data, type, row, meta) {
          var content = "";
          content += '<div class="panel panel-default">'
          content += '<div class="panel-body">';
          content += '<section class="post-heading">';
          content += '<div class="row">';
          content += '<div class="col-md-11">';
          content += '<div class="media">';
          content += '<div class="media-left">';
          content += '<a href="#">';
          content += '<img class="media-object photo-profile" src="https://scontent.fmnl17-1.fna.fbcdn.net/v/t1.0-1/c0.0.60.60/p60x60/30415667_237958176769169_7508514551885725696_n.jpg?_nc_cat=0&oh=245d5dc4a4bf6920169b1b4bded3f9e2&oe=5BB4A2F4" width="40" height="40" alt="...">';
          content += '</a>';
          content += '</div>';
          content += '<div class="media-body">';
          content += '<a href="#" class="anchor-username"><h4 class="media-heading">'+data.f_title+'</h4></a>';
          content += '<a href="#" class="anchor-time"> Posted by:'+data.a_id+'</a>';
          content += '</div>';
          content += '</div>';
          content += '</div>';
          content += '</div>';             
          content += '</section>';
          content += '<section class="post-body">'
          content += '<p class="post-content">'+data.f_content+'</p>';
          content += '</section>';
          content += '</div>';
          content += '</div>';
          return content;
          // return '<a href="#" data-toggle="modal" data-target="#emp_pic" data-a_office="' + data.a_office + '" data-a_position="' + data.a_position + '" data-id="' + data.a_action + '"  data-name="' + data.name + '">' + data.a_position + '</a>';
            }
        },
      ],
      'dom': '<"wrapper"Bfit>',
      'scrollY': '85vh',
      'ordering':false,
      "bInfo" : false,
      'searching': false,
      'scrollX': true,
      'scrollCollapse': true,
      'paging': false,
      'buttons': [
    ],
      fnInitComplete: function(oSettings, json) {
        $('.alert-info .glyphicon-remove').trigger("click");
      }
  });

  var btn_savefeeds = document.getElementById('btn_savefeeds');
      btn_savefeeds.onclick = function(){
        save_feed();
      }

  function save_feed(){
      $is_processing =  $('body .ui-pnotify > .alert-info').length;
      if($is_processing == 0){
        var arr = $("#frm_feeds").serializeObject();
            notify('Processing', 'Please wait..', 'info', 999999);
            postAjax(base_url + 'cdrrmd/savefeed/', arr,
            function(data) {

              if (data.status == "yes") {
                $('.ui-pnotify .alert-info').remove();
                $('.ui-pnotify .alert-warning').remove();
                notify('Success!', data.content, 'success', 3000);

                
              } else {
                $('.ui-pnotify .alert-info').remove();
                $('.ui-pnotify .alert-warning').remove();
                notify('Failed!', data.content, 'danger', 3000);
                
              }
            }
            
          );
        }
        return false;
  }
