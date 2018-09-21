<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$route['default_controller'] = 'account';
// $route['404'] = 'error/e_404';
$route['404_override'] = 'xhr/e_404';
$route['translate_uri_dashes'] = FALSE;
