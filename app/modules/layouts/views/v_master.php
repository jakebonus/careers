<?php	
	
	$this->load->view('v_head');
	$this->load->view('v_menuleft');
	$this->load->view($content);
	$this->load->view('v_footer');
	
	
		// if( $this->session->userdata('a_id')) {
			// if(strtolower($this->session->userdata('a_level')) == 'manager'){
				// $this->load->view('v_sidebar'); // SideBar - Menubar for HR Manager
			// }else{
				// $this->load->view('v_employee_sidebar'); // SideBar - Menubar for Employees
			// }
		// }
	
	
	
	// if( $this->session->userdata('a_id')) {
	//$this->load->view('v_footer'); // Footer after login
	// }else{
		// $this->load->view('v_login_footer'); // JS , JQuery for Login
	// }
	
