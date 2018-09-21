<!DOCTYPE html>
<html lang="en"  oncontextmenu="return false" >

  <head>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-38967746-5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-38967746-5');
</script>



   <?php define("VERSION", "2.0.0"); ?>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo (isset($title)) ? $title . ' | CSFP CAREERS' : ' CSFP CAREERS'; ?></title>
    <link rel="icon" href="<?php echo base_url('build/images/logo.png'); ?>">
    <link href="<?php echo base_url('vendors/bootstrap/dist/css/bootstrap.min.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('vendors/font-awesome/css/font-awesome.min.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('vendors/nprogress/nprogress.min.css'); ?>" rel="stylesheet">

    
     <link rel="stylesheet" href="<?php echo base_url('vendors/pdatatables/jquery.dataTables.min.css'); ?>">


    <link src="<?php echo base_url('vendors/select2/dist/css/select2.min.css'); ?>"  rel="stylesheet">

    <link href="<?php echo base_url('vendors/pnotify/dist/pnotify.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('vendors/pnotify/dist/pnotify.buttons.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('vendors/formvalidation/formValidation.min.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('vendors/select2/dist/css/select2.css'); ?>" rel="stylesheet">

    <link href="<?php echo base_url('build/css/custom.css?v='.VERSION); ?>" rel="stylesheet">
    <link href="<?php echo base_url('build/css/styles.css?v='.VERSION); ?>" rel="stylesheet">
    <link href="<?php echo base_url('build/css/jquery.fileuploader.css?v='.VERSION); ?>" rel="stylesheet">
    <link href="<?php echo base_url('build/css/jquery.fileuploader-theme-thumbnails.css?v='.VERSION); ?>" rel="stylesheet">
    <script src='https://www.google.com/recaptcha/api.js'></script>

  </head>
  <body oncontextmenu="return false" >

    <div class="container body">
      <div class="main_container">
        <!-- page content -->
        <br/><br/>
            <div class="row">
              <div class="col-lg-offset-2 col-md-offset-2 col-sm-offset-1 col-lg-8 col-md-8 col-sm-10 col-xs-12">
                <form id="frm_personalinfo" name="frm_personalinfo" enctype="multipart/form-data">
                <!-- <div id="registration"> -->
                <div class="x_panel">
                    <div class="x_title">
                      <h4><center><strong>- A P P L I C A N T &nbsp; &nbsp; &nbsp; I N F O R M A T I O N -</strong></center></button></h4>
                      <div class="clearfix">
                        <?php 
                          if($this->session->userdata('accountId')){?>
                             <a href="<?php echo base_url('account/logout') ?>" onClick="logout()" class="pull-right btn btn-warning"><i class="fa fa-sign-out"></i>Sign Out...</a>
                        <?php  }else{ ?>
                            <a href="<?php echo base_url('account/login'); ?>" class="pull-right btn btn-primary"> Already registered? Click here to sign in.</a>
                      
                          <?php
                        }
                        ?>
                       
                      </div>
                    </div>
                    <div class="x_content">
                       <div class="row">
                        <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                          <label class="control-label"><strong> Email:</strong><span>*</span></label>
                          <input type="text" class="form-control input-sm" id="oa_email" name="oa_email"   required="required">
                        </div>
                        <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                          <label class="control-label"> Password:<span>*</span></label>
                          <input type="password" class="form-control input-sm" id="oa_password" name="oa_password"  required="required" maxlength="30">
                        </div>
                        <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>Confirm Password:</strong><span>*</span></label>
                          <input type="password" class="form-control input-sm" id="oa_password_confirm" name="oa_password_confirm"   required="required">
                        </div>
                      </div>
                      <div class="row">

                        <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12"><hr></div>
                        <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                          <label class="control-label"><strong> First Name:</strong><span>*</span></label>
                          <input type="text" class="form-control input-sm" id="oa_fname" name="oa_fname"   required="required">
                        </div>
                        <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                          <label class="control-label"> Middle Name:</label>
                          <input type="text" class="form-control input-sm" id="oa_mname" name="oa_mname">
                        </div>
                        <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>Last Name:</strong><span>*</span></label>
                          <input type="text" class="form-control input-sm" id="oa_lname" name="oa_lname"   required="required" >
                        </div>
                         <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>Name Extension:</strong><span>*</span></label>
                          <input type="text" class="form-control input-sm" id="oa_extname" name="oa_extname"   required="required" >
                        </div>
                      </div>

                      <div class="row">
                        <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>Mobile Number:</strong><span>*</span></label>
                          <input type="text" class="form-control input-sm" id="oa_mobile" name="oa_mobile"   required="required" >
                        </div>
                         <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>Gender :</strong><span>*</span></label>
                          <select class="form-control input-sm" id="oa_gender" name="oa_gender"  required="required">
                              <option value="">- - Choose - -</option>
                              <option value="M">MALE</option>
                              <option value="F">FEMALE</option>
                          </select>
                        </div>
                        <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>Birth date :</strong><span>*</span></label>
                          <input type="text" class="form-control input-sm date"  id="oa_bdate" name="oa_bdate"   required="required">
                        </div>
                       
                        <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>Eligibility :</strong><span>*</span></label>
                          <select class="form-control input-sm select2_single" id="oa_eligibility" name="oa_eligibility"  required="required">
                              <option value="">- - Choose - -</option>
                             <option value="N/A">N/A</option>
                              <option value="Bar/Board Eligibility (RA1080)">Bar/Board Eligibility (RA1080)</option>
                              <option value="CSC Professional">CSC Professional</option>
                              <option value="CSC Subprofessional">CSC Subprofessional</option>
                              <option value="Barangay Official Eligibility (BOE)">Barangay Official Eligibility (BOE)</option>
                              <option value="Honor Graduate Eligibility (PD907)" >Honor Graduate Eligibility (PD907)</option>
                              <option value="Sanggunian Member Eligibility (SME)">Sanggunian Member Eligibility (SME)</option>
                              <option value="Skill Eligibility (CSC MC No, II)" >Skill Eligibility (CSC MC No, II)</option>   
                          </select>
                        </div>
                        <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>Province :</strong><span>*</span></label>
                          <select class="form-control input-sm select2_single" onchange="get_city()" id="oa_province" name="oa_province"  required="required">
                              <option value="">- - Choose - -</option>
                          </select>
                        </div>
                        <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>Municipality :</strong><span>*</span></label>
                          <select class="form-control input-sm select2_single" onchange="get_brgy()" id="oa_city" name="oa_city"  required="required">
                              <option value="">- - Choose - -</option>
                          </select>
                        </div>
                        <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>Barangay :</strong><span>*</span></label>
                          <div  id="brgy">
                            <select class="form-control input-sm select2_single" id="oa_brgy" name="oa_brgy"  required="required">
                                <option value="">- - Choose - -</option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group col-lg-3 col-md-3 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>Street :</strong><span>*</span></label>
                         <input type="text" class="form-control input-sm"  id="oa_street" name="oa_street"   required="required">
                        </div>
                      </div>

                       <div class="row">
                        <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12"><hr></div>
                        <h4><center><strong>- E D U C A T I O N A L &nbsp; &nbsp; &nbsp; I N F O R M A T I O N -</strong></center></h4>
                        <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>School Name:</strong><span>*</span></label>
                          <input type="text" class="form-control input-sm"  id="oa_school" name="oa_school"   required="required">
                        </div>
                        <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <label class="control-label"> <strong>Course:</strong><span>*</span></label>
                          <select class="form-control input-sm select2_single" id="oa_course" name="oa_course"  required="required">
                              <option value="">- - Choose - -</option>
                              <option value="Elementary">Elementary</option>
                              <option value="High School">High School</option>
                              <option value="Vocational (2 years)">Vocational (2 years)</option>
                          </select>
                        </div>
                        <div class="form-group col-lg-2 col-md-2 col-sm-2 col-xs-12">
                          <label class="control-label"> <strong>Remarks:</strong><span>*</span></label>
                          <select class="form-control input-sm" id="oa_educremarks" name="oa_educremarks"  required="required">
                              <option value="">- - Choose - -</option>
                              <option value="GRADUATE">GRADUATE</option>
                              <option value="UNDERGRADUATE">UNDERGRADUATE</option>
                          </select>
                        </div>
                        <div class="form-group col-lg-2 col-md-2 col-sm-3 col-xs-12">
                          <label class="control-label"> <strong>Post Graduate:</strong></label>
                          <select class="form-control input-sm" id="oa_postgraduate" name="oa_postgraduate" required="required">
                              <option value="">- - Choose - -</option>
                              <option value="Masteral">Masteral</option>
                              <option value="Doctorate">Doctorate</option>
                          </select>
                        </div>
                        <div class="form-group col-lg-10 col-md-10 col-sm-9 col-xs-12">
                          <label class="control-label"> <strong>Post Graduate Course</strong><span>*</span></label>
                          <input type="text" class="form-control input-sm"  id="oa_postgraduateremarks" name="oa_postgraduateremarks"   required="required">
                        </div>
                      </div>

                        <div class="row">
                        <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12"><hr></div>
                        <h4><center><strong>- O T H E R &nbsp; &nbsp; &nbsp; I N F O R M A T I O N -</strong></center></h4>
                        <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>Recent Work (if any):</strong><span>*</span></label>
                          <input type="text" class="form-control input-sm"  id="oa_recwork" name="oa_recwork" >
                        </div>
                         <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>Recent Training (if any):</strong><span>*</span></label>
                          <input type="text" class="form-control input-sm"  id="oa_rectraining" name="oa_rectraining" >
                        </div>
                         <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>Special Skills:</strong><span>*</span></label>
                          <textarea class="form-control" rows="5" id="oa_skills" name="oa_skills"  ></textarea>
                        </div>
                        <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>Awards Received:</strong><span>*</span></label>
                          <textarea class="form-control" rows="5" id="oa_awards" name="oa_awards"  ></textarea>
                        </div>
                      </div>
                      
                      <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                          <div class="ln_solid"></div>
                        </div>
                        <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>Position Desire:</strong><span>*</span></label>
                          <table class="cell-border compact hover width-full" id="dt_vacant" name="dt_vacant" cellspacing="0" width="100%">
                            <thead  style="display:none">
                              <tr>
                                <th style="min-width:100% display:none">x</th>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
                        </div>
                        <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>Attachment:</strong><span>*</span></label>
                          <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="ln_solid"></div>
                          </div>

                          <div class="col-md-8 col-sm-12 col-xs-12">
                            <label class="control-label"> Please upload your image:<a id="upic" class="fa fa-download" download></a></label>
                            <input class="form-control input-sm" type="file" id="pic" name="pic" accept="image/*" >
                          </div>
                          <div class="col-md-4 col-sm-12 col-xs-12">
                            <img id="ppic" src="#" alt="" style="height:80px; border-radius: 17px; display: block; margin: 0 auto;">
                          </div>

                          <div class="col-md-8 col-sm-12 col-xs-12">
                            <label class="control-label"> Please upload your resume:<a id="uresume" class="fa fa-download" download></a></label>
                            <input class="form-control input-sm" type="file" id="resume" name="resume" accept="application/msword, application/pdf" >
                          </div>
                          <div class="col-md-4 col-sm-12 col-xs-12">
                            <img id="presume" src="#" alt="" style="height:80px; border-radius: 17px; display: block; margin: 0 auto;">
                           <!-- <iframe id="viewer" frameborder="0" scrolling="no" width="80"></iframe> -->
                          </div>

                          <div class="col-md-8 col-sm-12 col-xs-12">
                            <label class="control-label"> Please upload your TOR:<a id="utor" class="fa fa-download" download></a></label>
                            <input class="form-control input-sm" type="file" id="tor" name="tor" accept="image/*" >
                          </div>
                          <div class="col-md-4 col-sm-12 col-xs-12">
                            <img id="ptor" src="#" alt="" style="height:80px; border-radius: 17px; display: block; margin: 0 auto;">
                          </div>

                          <div class="col-md-8 col-sm-12 col-xs-12">
                            <label class="control-label"> Please upload your Diploma:<a id="udiploma" class="fa fa-download" download></a></label>
                            <input class="form-control input-sm" type="file" id="diploma" name="diploma" accept=" image/*" >
                          </div>
                          <div class="col-md-4 col-sm-12 col-xs-12">
                            <img id="pdiploma" src="#" alt="" style="height:80px; border-radius: 17px; display: block; margin: 0 auto;">
                          </div>

                           <div class="col-md-8 col-sm-12 col-xs-12">
                            <label class="control-label"> Please upload your Eligibility Certificate: <a href="" id="ueligibility" class="fa fa-download" download></a></label>
                            <input class="form-control input-sm" type="file" id="eligibility" name="eligibility" accept="image/*" >
                          </div>
                          <div class="col-md-4 col-sm-12 col-xs-12">
                            <img id="peligibility" src="#" alt="" style="height:80px; border-radius: 17px; display: block; margin: 0 auto;">
                          </div>
                        </div>
                      </div>

                       <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                          <div class="ln_solid"></div>
                        </div>
                   
                        <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <div id="registration" class="g-recaptcha" data-sitekey="6LfzCWoUAAAAABt2q3h4re3FYYJwkfhAgb2DymOt"  data-callback="recaptchaCallback" ></div><br/>
                           <button type="submit" class="btn btn-primary col-xs-12" id="btn_saveinfo" name="btn_saveinfo"><i class="fa fa-save"></i> SAVE</button>
                        </div>
                      </div>



                    </div>
                    </div> 
                <!-- </div>  -->
                </form>
              </div>
            </div>
        <!-- /page content -->
      </div>
    </div>

    <div id="custom_notifications" class="custom-notifications dsp_none">
      <div id="notif-group" class="tabbed_notifications"></div>
    </div>

    <!-- jQuery -->
   
     <!-- <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script> -->
      <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer> </script>

    <script type="text/javascript">
        var base_url = "<?php echo base_url(); ?>";
    </script>
  

    <script src="<?php echo base_url('vendors/jquery/dist/jquery.min.js'); ?>"></script>
    <script src="<?php echo base_url('vendors/bootstrap/dist/js/bootstrap.min.js'); ?>"></script>
    <script src="<?php echo base_url('vendors/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js'); ?>"></script>
    <script src="<?php echo base_url('vendors/nprogress/nprogress.min.js'); ?>"></script>

    <script src="<?php echo base_url('vendors/pnotify/dist/pnotify.js'); ?>"></script>
    <script src="<?php echo base_url('vendors/pnotify/dist/pnotify.buttons.js'); ?>"></script>

  <script src="<?php echo base_url('vendors/formvalidation/formValidation.min.js'); ?>"></script>
    <script src="<?php echo base_url('vendors/formvalidation/framework/bootstrap.min.js'); ?>"></script>

    <!-- <script src="<?php // echo base_url('vendors/select2/dist/js/select2.full.min.js'); ?>"></script> -->
    <script src="<?php  echo base_url('vendors/jquery.inputmask/dist/min/jquery.inputmask.bundle.min.js'); ?>"></script>


    <script src="<?php echo base_url('vendors/select2/dist/js/select2.full.min.js'); ?>"></script>

    <!-- dataTables -->
   <script src="<?php echo base_url('vendors/pdatatables/jquery.dataTables.min.js'); ?>"></script>
    <script src="<?php echo base_url('vendors/pdatatables/dataTables.buttons.min.js'); ?>"></script>
    <script src="<?php echo base_url('vendors/pdatatables/buttons.print.min.js'); ?>"></script>
    <script src="<?php echo base_url('vendors/pdatatables/jszip.min.js'); ?>"></script>
    <script src="<?php echo base_url('vendors/pdatatables/buttons.html5.min.js'); ?>"></script>


    <!-- <script src="<?php // echo base_url('vendors/easyautocomplete/jquery.easy-autocomplete.min.js'); ?>"></script> -->
<script src="<?php echo base_url('build/js/jquery.fileuploader.min.js?v='.VERSION); ?>"></script>
    <script src="<?php echo base_url('build/js/custom.js?v='.VERSION); ?>"></script>
    <script src="<?php echo base_url('build/js/registration.js?v='.VERSION); ?>"></script>
    
    <script>

      
          $(document).ready(function() {

            $(".select2_single").select2({
              placeholder: "- Choose -",
              allowClear: true
            });

            $(".select2_multiple").select2({
              maximumSelectionLength: 1000000,
              placeholder: "You can select multiple position",
              allowClear: true
            });
            
          $(".time").inputmask("hh:mm",{ "placeholder": "hh:mm" });
          $(".date").inputmask("yyyy-mm-dd",{ "placeholder": "yyyy-mm-dd" });
          $(".numeric").inputmask('decimal', { rightAlign: false });
          $(".currency").inputmask("numeric", {
              radixPoint: ".",
              groupSeparator: ",",
              digits: 9,
              autoGroup: true,
              prefix: '₱ ',
              rightAlign: false,
              oncleared: function () { self.Value(''); 
              }
          });
          $(".mobilenum").inputmask({"mask": "9999-999-9999"});
      });
      </script>
  </body>
</html>
