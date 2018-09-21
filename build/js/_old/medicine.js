$(function() {
  var prince = null,
      $frmmedicine = $('#frm-medicine'),
      $dt_medicinelist = $('#dt_medicinelist');
    ;

  $(window).on("blur focus", function(a) {
    var t = $(this).data("prevType");
    if (t != a.type) switch (a.type) {
      case "focus":
        otable.ajax.reload()
    }
    $(this).data("prevType", a.type)
  });

  notify('Processing', 'Please wait..', 'info', 999999);

  $('#m_dosage_form').change(function() {
    var selected = $(this).find('option:selected');
    if (selected.val() == 'PC') {
      $("#m_therapeutic_use option").attr('disabled', 'disabled');
      $("#m_therapeutic_use option[value='MEDICAL SUPPLIES']").removeAttr('disabled');
      $("#m_therapeutic_use option[value='MEDICAL SUPPLIES']").attr('selected', 'selected');
    } else {
      $("#m_therapeutic_use option").removeAttr('disabled');
    }
  });

  $dt_medicinelist.dataTable().fnClearTable();
  $dt_medicinelist.dataTable().fnDestroy();

  var otable = $dt_medicinelist.DataTable({
    'ajax': {
      'url': base_url + "medicine/ajax_get_allmedicine",
      'dataSrc': ""
    },
    'columns': [{
        "data": "m_id"
      },
      {
        "data": "m_name"
      },
      {
        "data": "m_dosage_form"
      },
      {
        "data": "m_therapeutic_use"
      },
      {
        "data": "m_set"
      },
      {
        "data": "m_pcsper_set"
      }
    ],
    'fnCreatedRow': function(nRow, data, iDisplayIndex) {
      $(nRow).attr('data-m_id', data.m_id);
      $(nRow).attr('data-m_name', data.m_name);
      $(nRow).attr('data-m_dosage_form', data.m_dosage_form);
      $(nRow).attr('data-m_therapeutic_use', data.m_therapeutic_use);
      $(nRow).attr('data-m_set', data.m_set);
      $(nRow).attr('data-m_pcsper_set', data.m_pcsper_set);
    },
    'columnDefs': [{
      'targets': [0],
      'visible': false,
      'searchable': true,
    }],
    'dom': '<"wrapper"Bfit>',
    'info': false,
    'order': [
      [0, "desc"]
    ],
    'scrollY': 380,
    'scrollX': true,
    'scrollCollapse': true,
    'paging': false,
    'buttons': [{
      'text': '',
      'titleAttr': 'Add',
      'className': 'fa fa-plus m-add'
      // action: function(e, dt, node, config) {
      //     window.open(base_url + "admin/add", '_blank');
      // }
    }, {
      'text': '',
      'extend': 'excelHtml5',
      'titleAttr': 'Export Excel',
      'className': 'fa fa-download',
      customize: function(xlsx) {
        var sheet = xlsx.xl.worksheets['sheet1.xml'];
        $('row c[r^="C"]', sheet).attr('s', '2');
      }
    }, {
      'text': '',
      'extend': 'print',
      'titleAttr': 'Print',
      'className': 'fa fa-print',
      'exportOptions': {
        'columns': ':visible'
        // columns: [1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14]
      },
    }, {
      'text': '',
      'titleAttr': 'Refresh',
      'className': 'fa fa-refresh',
      action: function(e, dt, node, config) {
        refresh('r');
      }
    }],
    fnInitComplete: function(oSettings, json) {
      $('.alert-info .glyphicon-remove').trigger("click");
    }
  });

  //ADD
  $frmmedicine.formValidation({
      framework: "bootstrap",
      button: {
        selector: '#btn-frm-medicine',
        disabled: 'disabled'
      },
      icon: null,
      fields: {
        m_name: {
          validators: {
            notEmpty: {
              message: 'The name is required'
            },
            regexp: {
              regexp: /^[a-zA-Z0-9 .,-_+]+$/
            }
          }
        },
        m_dosage_form: {
          validators: {
            notEmpty: {
              message: 'The dosage form is required'
            },
          }
        },
        m_therapeutic_use: {
          validators: {
            notEmpty: {
              message: 'The therapeutic use is required'
            },
          }
        },
        m_set: {
          validators: {
            notEmpty: {
              message: 'The set is required'
            },
          }
        },
        m_pcsper_set: {
          validators: {
            integer: {
              message: 'The value is not number'
            }
          }
        }
      }
    })
    .on('success.form.fv', function(e) {
      e.preventDefault();
      var $form = $(e.target),
        fv = $form.data('formValidation');

      if (prince == null) {
        $.ajax({
          dataType: 'json',
          type: 'post',
          url: base_url + "medicine/ajax_msave",
          data: $frmmedicine.serialize(),
          beforeSend: function() {
            notify('Processing', 'Please wait..', 'info');
          },
          success: function(data) {
            if (data.status == "yes") {
              notify('Success!', data.content, 'success');
              refresh('r');
            } else {
              notify('Failed!', data.content, '');
              refresh('r');
            }
          },
          error: function(jqXHR, exception, errorThrown) {
            if (jqXHR.responseText.indexOf('1062') != -1) {
              notify('Duplicate entry!', 'This medicine is already exists!, Please check.', 'error');
            } else {
              notify('Error!', 'Connection problems occurred... Unable to connect to the Internet! The Internet connection has been lost.', 'error');
            }
            refresh('r');
          }
        });
        return false;
      } else {
        $.ajax({
          dataType: 'json',
          type: 'post',
          url: base_url + "medicine/ajax_medit",
          data: $frmmedicine.serialize() + '&m_id=' + prince,
          success: function(data) {
            if (data.status == "yes") {
              notify('Success!', data.content, 'success');
              refresh('r');
            } else {
              notify('Failed!', data.content, '');
              refresh('r');
            }
          },
          error: function(jqXHR, exception) {
            notify('Error!', 'Connection problems occurred... Unable to connect to the Internet! The Internet connection has been lost.', 'error');
            refresh('r');
          }
        });
        return false;
      }
    });

  //EDIT
  $('#dt_medicinelist tbody').on('click', 'tr', function() {
    $frmmedicine.data('formValidation').resetForm();
    $("#btn-frm-medicine").prop({
      className: 'buttonNext btn btn-warning'
    });
    $("h2.title").text("Edit");
    prince = $(this).data('m_id');
    $('#frm-medicine #m_name').val($(this).data('m_name'));
    $('#frm-medicine #m_dosage_form').val($(this).data('m_dosage_form'));
    $('#frm-medicine #m_therapeutic_use').val($(this).data('m_therapeutic_use'));
    $('#frm-medicine #m_set').val($(this).data('m_set'));
    $('#frm-medicine #m_pcsper_set').val($(this).data('m_pcsper_set'));

    $(".bs-delete-modal-sm .modal-body p:eq(1)").html("<strong>" + $(this).data('m_name') + " " + $(this).data('m_dosage_form') + "</strong>");

    if ($('.actionBar').find('button').length <= 2) {
      $("#btn_reset").after('<button type="button" id="btn_delete" class="buttonPrevious btn btn-danger" data-toggle="modal" data-target=".bs-delete-modal-sm">Delete</button>');
    }
  });

  //ADD
  $(".m-add, #btn_reset").click(function() {
    refresh('');
  });

  //DELETE
  $("body").delegate("#btn_mdelete", "click", function() {
    $.ajax({
      dataType: 'json',
      type: 'post',
      url: base_url + "medicine/ajax_mdelete",
      data: 'm_id=' + prince,
      success: function(data) {
        if (data.status == "yes") {
          notify('Success!', data.content, 'success');
          refresh('r');
        } else {
          notify('Failed!', data.content, '');
          refresh('r');
        }
      },
      error: function(jqXHR, exception) {
        notify('Error!', 'Connection problems occurred... Unable to connect to the Internet! The Internet connection has been lost.', 'error');
        refresh('r');
      }
    });
    return false;
  });

  //SELECT
  $('#dt_medicinelist tbody').on('click', 'tr', function() {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      otable.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
    }
  });

  function notify(title, content, type) {
    $('.form-group').removeClass('has-success');
    new PNotify({
      title: title,
      text: content,
      styling: 'bootstrap3',
      type: type,
      delay: 1500
    });
  }

  function refresh(str) {
    $frmmedicine.data('formValidation').resetForm();
    prince = null;
    $("h2.title").text("Add");
    $frmmedicine[0].reset();
    $("#btn-frm-medicine").prop({
      className: 'buttonNext btn btn-success'
    });

    $("#btn_delete").remove();
    if (str == 'r') {
      otable.search('').columns().search('').draw();
      otable.ajax.reload();
    }
  }

});
