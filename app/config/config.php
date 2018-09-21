  <?php
defined('BASEPATH') OR exit('No direct script access allowed');

// $config['base_url'] = 'https://cityofsanfernando.gov.ph/fernandino/';
$config['base_url'] = 'https://localhost/careersv2/';
$config['index_page'] = '';
$config['uri_protocol']	= 'REQUEST_URI';
$config['url_suffix'] = '';
$config['language']	= 'english';
$config['charset'] = 'UTF-8';
$config['enable_hooks'] = TRUE;
$config['subclass_prefix'] = 'MY_';
$config['composer_autoload'] = FALSE;
$config['permitted_uri_chars'] = 'a-z 0-9~%.:_\-';

$config['allow_get_array'] = TRUE;
$config['enable_query_strings'] = FALSE;
$config['controller_trigger'] = 'c';
$config['function_trigger'] = 'm';
$config['directory_trigger'] = 'd';

$config['log_threshold'] = 0;
$config['log_path'] = '';
$config['log_file_extension'] = '';

$config['log_file_permissions'] = 0644;
$config['log_date_format'] = 'Y-m-d H:i:s';

$config['error_views_path'] = '';
$config['cache_path'] = '';
$config['cache_query_string'] = FALSE;
$config['encryption_key'] = '4ESr2MMtVLfrd4t1kmkaQXu7DtjOF871';

/*
J6ZHWdsz490f9fbuZu7lEV86tT75ETyR
7ktRy18LWq14WuzaHYzE5svp2pb82Cqu
4ESr2MMtVLfrd4t1kmkaQXu7DtjOF871
1Ep3B3Bqu01O5DU52Z5fBVtJKmQgpSCh
*/

$config['sess_driver'] = 'files';
$config['sess_cookie_name'] = 'careers_session';
$config['sess_expiration'] = 7200;
$config['sess_save_path'] = NULL;
$config['sess_match_ip'] = FALSE;
$config['sess_time_to_update'] = 300;
$config['sess_regenerate_destroy'] = FALSE;

$config['cookie_prefix']	= '';
$config['cookie_domain']	= '';
$config['cookie_path']		= '/';
$config['cookie_secure']	= FALSE;
$config['cookie_httponly'] 	= FALSE;

$config['standardize_newlines'] = FALSE;

$config['global_xss_filtering'] = TRUE;

$config['csrf_protection'] = FALSE;
$config['csrf_token_name'] = 'csrftest_name';
$config['csrf_cookie_name'] = 'csrfcookie_name';

$config['csrf_expire'] = 7200;
$config['csrf_regenerate'] = FALSE;
$config['csrf_exclude_uris'] = array();


$config['compress_output'] = FALSE;

$config['time_reference'] = 'gmt';
date_default_timezone_set('Asia/Manila');

$config['rewrite_short_tags'] = FALSE;
$config['proxy_ips'] = '';
