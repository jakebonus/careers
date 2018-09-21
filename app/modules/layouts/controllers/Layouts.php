<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Layouts extends MX_Controller
{

    public function __construct()
    {
        parent::__construct();
    }
	
	public function index() {
		$this->load->view('v_master');
	}

}
