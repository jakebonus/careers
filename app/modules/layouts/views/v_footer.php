
      </div>
    </div>

    <div id="custom_notifications" class="custom-notifications dsp_none">
      <div id="notif-group" class="tabbed_notifications"></div>
    </div>

    <!-- jQuery -->
    <script type="text/javascript">
    // document.getElementById('txt_search').value = localStorage.getItem("_id");
        var base_url = "<?php echo base_url(); ?>";
    </script>
  <script src="<?php echo base_url('vendors/comet/prototype.js?v='.VERSION); ?>"></script>
    <script src="<?php echo base_url('vendors/jquery/dist/jquery.min.js'); ?>"></script>
    <script src="<?php echo base_url('vendors/bootstrap/dist/js/bootstrap.min.js'); ?>"></script>
    <!-- <script src="<?php //echo base_url('vendors/jquery-userTimeout-master/dist/jquery.userTimeout.min.js'); ?>"></script> -->
    <script src="<?php echo base_url('vendors/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js'); ?>"></script>
    <script src="<?php echo base_url('vendors/nprogress/nprogress.min.js'); ?>"></script>

    <script src="<?php echo base_url('vendors/pnotify/dist/pnotify.js'); ?>"></script>
    <script src="<?php echo base_url('vendors/pnotify/dist/pnotify.buttons.js'); ?>"></script>

    <script src="<?php echo base_url('vendors/formvalidation/formValidation.min.js'); ?>"></script>
    <script src="<?php echo base_url('vendors/formvalidation/framework/bootstrap.min.js'); ?>"></script>

    <script src="<?php echo base_url('vendors/select2/dist/js/select2.full.min.js'); ?>"></script>
    <script src="<?php echo base_url('vendors/jquery.inputmask/dist/min/jquery.inputmask.bundle.min.js'); ?>"></script>

    <!-- dataTables -->
    <script src="<?php echo base_url('vendors/pdatatables/jquery.dataTables.min.js'); ?>"></script>
    <script src="<?php echo base_url('vendors/pdatatables/dataTables.buttons.min.js'); ?>"></script>
    <script src="<?php echo base_url('vendors/pdatatables/buttons.print.min.js'); ?>"></script>
    <script src="<?php echo base_url('vendors/pdatatables/jszip.min.js'); ?>"></script>
    <script src="<?php echo base_url('vendors/pdatatables/buttons.html5.min.js'); ?>"></script>



    <script src="<?php //echo base_url('vendors/highcharts/highcharts.js'); ?>"></script>
    <script src="<?php //echo base_url('vendors/highcharts/exporting.js'); ?>"></script>

    <script src="<?php echo base_url('vendors/easyautocomplete/jquery.easy-autocomplete.min.js'); ?>"></script>

    <!-- <script src="<?php // echo base_url('vendors/signature/SigWebTablet.min.js'); ?>"></script> -->
    <!-- <script src="<?php // echo base_url('build/js/signature.min.js?v='.VERSION); ?>"></script> -->

    <!-- <script src="<?php // echo base_url('vendors/webcam/webcam.min.js'); ?>"></script> -->
    <!-- <script src="<?php // echo base_url('build/js/capturefunction.min.js?v='.VERSION); ?>"></script> -->

    <!-- Custom Theme Scripts -->
    <script src="<?php echo base_url('build/js/custom.js?v='.VERSION); ?>"></script>

    <script>

    </script>

    <?php if(($this->uri->segment(1) == "admin" || $this->uri->segment(1) == "")  && $this->uri->segment(2) == "") { ?>
      <script src="<?php echo base_url('build/js/admin.js?v='.VERSION); ?>"></script>
      <script src="<?php echo base_url('build/js/towords.jquery.js?v='.VERSION); ?>"></script>
    <?php } ?>

    
    <?php if($this->uri->segment(1) == "cdrrmd" ) { ?>
      <script src="<?php echo base_url('build/js/cdrrmd.js?v='.VERSION); ?>"></script>
    
      <script src="<?php echo base_url('cometFeeds.js?v='.VERSION); ?>"></script>
    <?php } ?>

    <?php if ($this->session->userdata('password') == '8c4b1850f2b93f670b55ab809adf57f1033d9414' && $this->uri->segment(2) != "profile") { ?>
    <!-- <script src="<?php // echo base_url('build/js/notify.min.js?v='.VERSION); ?>"></script> -->
    <?php } ?>
    <script>
          $(document).ready(function() {
        $(".time").inputmask("hh:mm",{ "placeholder": "hh:mm" });
        $(".date").inputmask("yyyy-mm-dd",{ "placeholder": "yyyy-mm-dd" });
        $(".numeric").inputmask('decimal', { rightAlign: false });
        $(".currency").inputmask("numeric", {
            radixPoint: ".",
            groupSeparator: ",",
            digits: 2,
            autoGroup: true,
            prefix: '₱ ',
            rightAlign: false,
            oncleared: function () { self.Value(''); }
        });
     
      $(".mobilenum").inputmask({"mask": "9999-999-9999"});
       });
      </script>


  </body>
</html>
