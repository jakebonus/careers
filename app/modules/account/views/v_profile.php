        <!-- page content -->
        <div class="right_col" role="main">
          <div class="">
            <div class="clearfix"></div>

            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                  <div class="x_title">
                    <h2>Profile</h2>
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">
                  <div class="row">
              <div class="col-lg-offset-3 col-md-offset-3 col-sm-offset-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <form id="frm_registration" name="frm_registration">
                <div class="x_panel">
                    <div class="x_title">
                      <h3><center><strong>CEDULA</strong> Online Application <sup><?php echo VERSION; ?></sup></center></h3>
                      <div class="clearfix"></div>
                    </div>
                    <div class="x_content">
                      <!-- <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                          <label class="control-label">Fernandino Card ID No.</label>
                            <input type="text" class="form-control input-sm" id="fernandinonum" name="fernandinonum">
                        </div>
                      </div> -->
                      <div class="row">
                       
                        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                          <label class="control-label"><strong>E-mail add:</strong><span>*</span></label>
                            <input type="email" class="form-control input-sm" id="email" name="email"  required value="JAKEBONUS@GMAIL.COM">
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                          <label class="control-label"><strong>Password:</strong><span>*</span></label>
                            <input type="password" class="form-control input-sm" id="password1" name="password1" required value="JAKEBONUS@GMAIL.COM">
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <label class="control-label"><strong>Repeat Password:</strong><span>*</span></label>
                            <input type="password" class="form-control input-sm" id="password2" name="password2" required value="JAKEBONUS@GMAIL.COM">
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                          <label class="control-label"><strong> First Name:</strong><span>*</span></label>
                          <input type="text" class="form-control input-sm" id="fname" name="fname"  required value="JAKEBONUS">
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-8 col-xs-12">
                          <label class="control-label"> Middle Name:</label>
                          <input type="text" class="form-control input-sm" id="mname" name="mname" value="JAKEBONUS">
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                          <label class="control-label"> <strong>Last Name:</strong><span>*</span></label>
                          <input type="text" class="form-control input-sm" id="lname" name="lname"  required value="JAKEBONUS">
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                          <label class="control-label"> <strong>Birth date :</strong><span>*</span></label>
                          <input type="date" class="form-control input-sm"  id="birthdate" name="birthdate" value="1900-01-01" required>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-8 col-xs-8">
                          <label class="control-label"> <strong>Birth place :</strong><span>*</span></label>
                          <input type="text" class="form-control input-sm"  id="birthplace" name="birthplace" required value="JAKEBONUS">
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>Citizenship :</strong><span>*</span></label>
                          <input type="text" class="form-control input-sm" id="citizenship" name="citizenship" value="FILIPINO"  required>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                          <label class="control-label"> HOUSE # :</label>
                          <input type="text" class="form-control input-sm" id="housenum" name="housenum" value="JAKEBONUS">
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>BARANGAY :</strong><span>*</span></label>
                          <input type="text" class="form-control input-sm" id="brgy" name="brgy"  required value="JAKEBONUS">
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>MUNICIPALITY :</strong><span>*</span></label>
                          <input type="text" class="form-control input-sm" id="city" name="city" value="CITY OF SAN FERNANDO"  required value="JAKEBONUS">
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                          <label class="control-label"> <strong>PROVINCE :</strong><span>*</span></label>
                          <input type="text" class="form-control input-sm" id="province" name="province" value="PAMPANGA"  required value="JAKEBONUS">
                        </div>
                        
                      </div>
                      <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                          <label class="control-label"> TIN :</label>
                          <input type="text" class="form-control input-sm" id="tin" name="tin" value="JAKEBONUS">
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                          <label class="control-label"> <strong>Gender :</strong><span>*</span></label>
                          <select class="form-control input-sm" id="gender" name="gender" required>
                              <option value="">- - Choose - -</option>
                              <option value="MALE" selected>MALE</option>
                              <option value="FEMALE">FEMALE</option>
                          </select>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                          <label class="control-label"><strong> Civil Status :</strong><span>*</span></label>
                          <select class="form-control input-sm" id="civilstatus" name="civilstatus" required>
                              <option value="">- - Choose - -</option>
                              <option value="SINGLE" selected>SINGLE </option>
                              <option value="MARRIED ">MARRIED </option>
                              <option value="WIDOWED ">WIDOWED </option>
                              <option value="SEPARATED ">SEPARATED </option>
                              <option value="DIVORCED ">DIVORCED </option>
                          </select>
                        </div>
                     </div>
                    <div class="row">
                      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                          <label class="control-label"><strong> Occupation :</strong><span>*</span></label>
                          <input type="text" class="form-control input-sm" id="occupation" name="occupation" required value="JAKEBONUS">
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-8 col-xs-8">
                          <label class="control-label"> <strong>Salary :</strong><span>*</span></label>
                          <input type="text" class="form-control input-sm"  id="salary" name="salary" required value="3000">
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                          <label class="control-label"><strong> Per  :</strong><span>*</span></label>
                          <select class="form-control input-sm" id="salaryper" name="salaryper" required>
                              <option value="">- - Choose - -</option>
                              <option value="DAILY" selected>DAILY </option>
                              <option value="MONTHLY">MONTHLY</option>
                              <option value="ANUALLY">ANNUALLY</option>
                          </select>
                        </div>
                      </div>
                      <div class="row">
                        <hr>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                          <button type="button" class="btn btn-primary col-xs-12" id="btn_saveinfo" name="btn_saveinfo"><i class="fa fa-save"></i> SAVE</button>
                        </div>

                      </div>
                    </div>
                    </div> 
                </form>
              </div>
            </div>
                 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /page content -->
