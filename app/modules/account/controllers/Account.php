<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Account extends MX_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('mdl_account');
        $this->load->library('form_validation');
        // $this->output->cache($n);
    }

    //LOGIN
    public function index()
    {
        if (substr($_SERVER['HTTP_HOST'], 0, 4) === 'www.') {
            header('Location: http'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']=='on' ? 's':'').'://' . substr($_SERVER['HTTP_HOST'], 4).$_SERVER['REQUEST_URI']);
            exit;
        }

        if (!$this->session->userdata('accountId')) {
            $this->load->view('account/v_registration');
        } else {
            redirect('application');
        }
    }

    public function login(){
        if (substr($_SERVER['HTTP_HOST'], 0, 4) === 'www.') {
            header('Location: http'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']=='on' ? 's':'').'://' . substr($_SERVER['HTTP_HOST'], 4).$_SERVER['REQUEST_URI']);
            exit;
        }

        if (!$this->session->userdata('accountId')) {
            $data['title'] = 'Login';
            $this->load->view('v_login', $data);
        } else {
            redirect('application');
        }
    }


	//AJAX LOGIN
    public function ajax_signin()
    {
      $url = '';
  		if ($this->input->post('islogin') == 1) {
  			$data['a_username'] = $this->input->post('a_username');
  			$data['a_password'] = $this->input->post('a_password');

  			if ($user = $this->mdl_account->m_ajax_signin($data)) {
  				foreach ($user as $u) {
  					$this->session->set_userdata('accountId', $u->oa_id);
  				}

           $a_id = $this->session->userdata('accountId');
  				$result = array('status' => 'yes', 'content' => 'Successfully logged in! Redirecting...', 'id'=>$a_id);
  				echo json_encode($result);
  			} else {
  				$result = array('status' => 'no', 'content' => 'Invalid Username and Password!');
  				echo json_encode($result);
  			}
  		}
    }

	//LOGOUT/DESTROY ALL SESSIONS
    public function logout()
    {
  		// if($this->mdl_account->m_ajax_signout()) {
  			// redirect('account/login');
          // }
          $this->session->sess_destroy();
          redirect('account/login');
    }

    //CHANGE PASSWORD
    public function profile()
    {
        if ($this->session->userdata('accountId')) {
            $data['title'] = 'Profile';
            $data['content'] = 'account/v_profile';
            $this->load->view('layouts/v_master', $data);
        } else {
            redirect('account');
        }
    }

    public function update_password()
    {
        if ($this->session->userdata('accountId')) {
          $a_id = $this->session->userdata('accountId');
          if($this->input->post('password') == $this->input->post('password2')){
              if($this->mdl_account->m_ajax_update_password($a_id,$this->input->post('password'))){
                  $this->session->set_userdata('password', sha1(md5($this->input->post('password'). 'c[x]t!@n[*]{7hndv}')));
                  $result = array('status' => 'yes','content'=> 'Password Successfully Updated');
                  echo json_encode($result);
                  exit();
              } else {
                  $result = array('status' => 'no','content'=> 'Password failed to updated');
                  echo json_encode($result);
                  exit();
              }
          } else {
              $result = array('status' => 'no','content'=> 'Password did not match');
              echo json_encode($result);
              exit();
          }
        } else {
            redirect('account');
        }
    }

    public function ifonline(){
        if($this->mdl_account->m_ifonline())
        {
            $result = array('status' => 'yes');
            echo json_encode($result);
        } else {
            $result = array('status' => 'no');
            echo json_encode($result);
        }
    }

    public function registration(){
        if ($this->session->userdata('accountId')) {
            $data['title'] = 'Profile';
            $data['content'] = 'account/v_profile';
            $this->load->view('layouts/v_master', $data);
        } else {
            $this->load->view('account/v_registration');
        }

    }

    public function saveinfo(){

        $secret  = '6LcGDF0UAAAAADqzJu-ch82av3XYDs1fXJ0rR32R';

           if ($_POST) {
               if (isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])) {
               $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $_POST['g-recaptcha-response']);
               $responseData   = json_decode($verifyResponse);

               if($responseData->success){

                $data['c_email'] = strtolower($this->input->post('email'));
                $data['c_username']      = '-';
                $data['c_password']      = '-';
        
                $data['c_profile']      = 'Online Applicant';
                $data['c_fernandinonum'] = strtoupper(trim($this->input->post('fernandinonum')));
                $data['c_fname']      = strtoupper(trim($this->input->post('fname')));
                $data['c_mname']      = strtoupper(trim($this->input->post('mname')));
                $data['c_mi']         = strtoupper(substr(trim($data['c_mname']),0,1));
                $data['c_lname']      = strtoupper(trim($this->input->post('lname')));
        
                        $bdate      = $this->input->post('birthdate');
                        $birthdate  =  explode("-",$bdate);

                        $yr = date('Y')-5;


                        if($this->validateDate($bdate)){

                            if($birthdate['0'] > '1910' &&   $birthdate['0'] < $yr){
                                $data['c_birthdate'] = $this->input->post('birthdate');
                            }else{
                                $result = array('status' => 'no','content'=> 'Please check birthdate');
                                    echo json_encode($result);
                                     exit();
                            }

                        }else{
                            $result = array('status' => 'no','content'=> 'Please check birthdate');
                            echo json_encode($result);
                             exit();
                        }


        
                $data['c_birthplace'] = strtoupper(trim($this->input->post('birthplace')));
                $data['c_citizenship'] = strtoupper(trim($this->input->post('citizenship')));
                $data['c_civilstatus'] = strtoupper(trim($this->input->post('civilstatus')));
                $data['c_housenum']   = strtoupper(trim($this->input->post('housenum')));
                $data['c_brgy']       = strtoupper(trim($this->input->post('brgy')));
                $data['c_city']       = strtoupper(trim($this->input->post('city')));
                $data['c_province']   = strtoupper(trim($this->input->post('province')));
                $data['c_mobilenum']   = strtoupper(trim($this->input->post('mobilenum')));
                $data['c_tin']        = strtoupper(trim($this->input->post('tin')));
                $data['c_gender']     = strtoupper(trim($this->input->post('gender')));
                $data['c_occupation'] = strtoupper(trim($this->input->post('occupation')));
                    
                $data['c_height']   = strtoupper(trim($this->input->post('height')));
                $data['c_weight']   = strtoupper(trim($this->input->post('weight')));
                $data['c_icrno']   = strtoupper(trim($this->input->post('icrno')));
               
                
                        $salary     =   str_replace(',','',str_replace('₱ ','',$this->input->post('salary')));
                        $annually   = 0;
                        $salaryper  =  strtoupper(trim($this->input->post('salaryper')));
                    
                    if($salaryper == 'DAILY'){
                        $monthly = $salary * 20;
                        $annually = $monthly * 12;
                    }else if($salaryper == 'MONTHLY'){
                        $annually = $salary * 12;
                    }else if($salaryper == 'ANUALLY'){
                        $annually = $salary;
                    }
                    if($annually < 55000){
                        $data['c_annualsalary'] = 55000;
                    }else{
                        $data['c_annualsalary'] = $annually;
                    }
                
        
        
                $result = $this->mdl_account->m_getrefnum();
                foreach($result as $r){
                    $suf =  $r->c_refnum;
                }
        
                $data['c_refnum'] = date('y').date('m').'-'.$suf;
                $data['c_refdate'] = date('Y-m-d H:s:i');

                $datenow = date('Y-m-d');
                $daynow =  strtolower(date('l'));

                $plus = null;

               if($daynow == 'saturday'){
                    $plus = 6;
               }else if($daynow == 'sunday'){
                     $plus = 4;
               }else{
                    $plus = 7;
               }

                $validitydate = strtotime($datenow. '+ '.$plus.' days');

            
                $data['c_refvaliduntil'] =  date("Y-m-d",$validitydate).' '.date("H:i:s");
               $c_refvaliduntil = date("Y-m-d",$validitydate);
               
                $number = str_replace('-','',$data['c_mobilenum']);
                $message =  'Your CEDULA reference number is '.$data['c_refnum'];
                $result = $this->itexmo($number,$message);
                
                if ($result == ""){
                    $data['itextmsg'] = "iTexMo: No response from server!!!
                    Please check the METHOD used (CURL or CURL-LESS). If you are using CURL then try CURL-LESS and vice versa.	
                    Please CONTACT US for help. ";	
                }else if ($result == 0){
                    $data['itextmsg'] = "Message Sent!";
                }else{	
                    $data['itextmsg'] =  "Error Num ". $result . " was encountered!";
                 }


                    if($a_id = $this->mdl_account->m_saveinfo($data)){   


                        $result = array('status' => 'yes','content'=> 'Successfully registered! '.$number, 'refnum' => $data['c_refnum'],'validitydate'=>$c_refvaliduntil);
                        echo json_encode($result);
                         exit();
                    }else{
                        $result = array('status' => 'no','content'=> 'Failed to registered!');
                        echo json_encode($result);
                        exit();
                    }
                   
                } else {
                    $result = array('status' => 'no','content'=> 'Robot verification failed, please try again.');
                    echo json_encode($result);
                    exit();
                }
           } else {
                $result = array('status' => 'no','content'=> ' Please click on the reCAPTCHA box.');
                 echo json_encode($result);
                 exit();
           }
        }
    }

 //##########################################################################
// ITEXMO SEND SMS API - PHP - CURL-LESS METHOD
// Visit www.itexmo.com/developers.php for more info about this API
//##########################################################################
public function itexmo($number,$message){
    $apicode = 'TR-JAKEB263983_GYT56';
    // LOCALHOST
    // $url = 'https://www.itexmo.com/php_api/api.php';
    // $itexmo = array('1' => $number, '2' => $message, '3' => $apicode);
    // $param = array(
    //     'http' => array(
    //         'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
    //         'method'  => 'POST',
    //         'content' => http_build_query($itexmo),
    //     ),
    // );
    // $context  = stream_context_create($param);
    // return file_get_contents($url, false, $context);

    $ch = curl_init();
    $itexmo = array('1' => $number, '2' => $message, '3' => $apicode);
    curl_setopt($ch, CURLOPT_URL,"https://www.itexmo.com/php_api/api.php");
    curl_setopt($ch, CURLOPT_POST, 1);
     curl_setopt($ch, CURLOPT_POSTFIELDS, 
              http_build_query($itexmo));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    return curl_exec ($ch);
    curl_close ($ch);
}
    //##########################################################################


//##########################################################################
// ITEXMO SEND SMS API - PHP - CURL METHOD
// Visit www.itexmo.com/developers.php for more info about this API
//##########################################################################
// public function itexmo($number,$message){
//     $apicode = 'TR-JAKEB263983_GYT56';
//     $ch = curl_init();
//     $itexmo = array('1' => $number, '2' => $message, '3' => $apicode);
//     curl_setopt($ch, CURLOPT_URL,"https://www.itexmo.com/php_api/api.php");
//     curl_setopt($ch, CURLOPT_POST, 1);
//      curl_setopt($ch, CURLOPT_POSTFIELDS, 
//               http_build_query($itexmo));
//     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//     return curl_exec ($ch);
//     curl_close ($ch);
// }
//##########################################################################

function validateDate($date, $format = 'Y-m-d')
{
    $d = DateTime::createFromFormat($format, $date);
    // The Y ( 4 digits year ) returns TRUE for any integer with any number of digits so changing the comparison from == to === fixes the issue.
    return $d && $d->format($format) === $date;
}

public function send_email($email,$refnum,$name){

    $config = Array('mailtype'  => 'html','charset' => 'utf-8','wordwrap' => TRUE);
    $this->load->library('email', $config);
    $this->email->initialize($config);		

        $subject = "CSFP-CTO INDIVIDUAL CEDULA REFERENCE NUMBER";
        $message = "<br/> <br/>";
        
        $message .= "Good day, $name";
        $message .= " <br/><br/>";
        $message .= "Please take note of your COMMUNITY TAXT CERTIFICATE(CTC/CEDULA - individual)  reference number is ";
        $message .= $refnum;



       $this->email->from('mitd@cityofsanfernando.gov.ph', 'City of San Fernando, Pampanga');
       $this->email->to($email);
       $this->email->cc('jakebonus@cityofsanfernando.gov.ph');
       $this->email->subject($subject);
       $this->email->message($message);
       $this->email->send();
}


}
