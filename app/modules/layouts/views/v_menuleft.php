        <div class="col-md-3 left_col menu_fixed">
          <div class="left_col scroll-view">
            <div class="navbar nav_title" style="border: 0;">
              <a href="<?php echo base_url('/'); ?>" class="site_title"><i class="fa fa-certificate"></i> <span>CSFP-CEDULA</span>
                <sup><?php echo 'v'.VERSION; ?></sup>
              </a>
            </div>

            <div class="clearfix"></div>
            <br />

            <!-- sidebar menu -->
            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
                <h3>General</h3>
                <ul class="nav side-menu">
                  <li><a href="<?php echo base_url('admin/'); ?>"> <i class="fa fa-list"></i> Clist List</a></li>
                  <li><a href="<?php echo base_url('admin/issued'); ?>"> <i class="fa fa-plane"></i> Issued CTC</a></li>
                </ul>
              </div>
             </div>
          </div>
        </div>

        <!-- top navigation -->
        <div class="top_nav">
          <div class="nav_menu">
            <nav>
              <div class="nav toggle">
                <a id="menu_toggle"><i class="fa fa-bars"></i></a>
              </div>

              <ul class="nav navbar-nav navbar-right">
                <li class="">
                  <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <img src="<?php echo base_url('build/images/logo.png'); ?>" alt=""><?php echo $this->session->userdata('name'); ?>
                    <span class=" fa fa-angle-down"></span>
                  </a>
                  <ul class="dropdown-menu dropdown-usermenu pull-right">
                    <li class="btn-profile"><a href="<?php echo base_url('account/profile'); ?>"> Profile</a></li>
                    <li><a href="<?php echo base_url('account/logout'); ?>"><i class="fa fa-sign-out pull-right"></i> Log Out</a></li>
                  </ul>
                </li>

                <li role="presentation" class="dropdown dropdown-notify hidden">
                  <a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                    <i class="fa fa-bell-o"></i>
                    <span class="badge bg-red"></span>
                  </a>
                  <ul id="menu1" class="menu-notify dropdown-menu list-unstyled msg_list scrollbar" role="menu">
                  </ul>
                </li>

              </ul>
            </nav>
          </div>
        </div>
        <!-- /top navigation -->
