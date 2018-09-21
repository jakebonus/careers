Webcam.set({
    // live preview size
    width: 240,
    height: 180,

    // device capture size
    dest_width: 240,
    dest_height: 180,

    // final cropped size
    crop_width: 180,
    crop_height: 180,

    // format and quality
    image_format: 'jpeg',
    jpeg_quality: 90
  });

  Webcam.attach('#camera');

  function preview_snapshot() {
			// freeze camera so user can preview pic
			Webcam.freeze();

			// swap button sets
			document.getElementById('pre_take_buttons').style.display = 'none';
			document.getElementById('post_take_buttons').style.display = '';
		}

		function cancel_preview() {
			// cancel preview freeze and return to live camera feed
			Webcam.unfreeze();

			// swap buttons back
			document.getElementById('pre_take_buttons').style.display = '';
			document.getElementById('post_take_buttons').style.display = 'none';
		}

		// function save_photo() {
		// 	// actually snap photo (from preview freeze) and display it
		// 	Webcam.snap( function(data_uri) {
		// 		// display results in page
		// 		document.getElementById('results').innerHTML =
		// 			'<h2>Here is your image:</h2>' +
		// 			'<img id="result_img" src="'+data_uri+'"/>';
    //
		// 		// swap buttons back
		// 		document.getElementById('pre_take_buttons').style.display = '';
		// 		document.getElementById('post_take_buttons').style.display = 'none';
    //
    //     var result_img = document.getElementById('result_img').src.trim();
    //     var r_id = document.getElementById('r_id').value;
    //       notify('Processing', 'Please wait..', 'info', 999999);
    //
    //       postAjax(base_url + 'resident/ajax_savephoto','&result_img=' + result_img + '&r_id=' + r_id,
    //         function(data) {
    //           $('.alert-info .glyphicon-remove').trigger("click");
    //           if (data.status == "yes") {
    //             notify('Success!', data.content, 'success', 1500);
    //           } else {
    //             notify('Failed!', data.content, '', 1500);
    //           }
    //         }
    //       );
    //
    //
		// 	} );
		// }
