<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Application extends MX_Controller
{
    //============ CONSTRUCTOR
    public function __construct()
    {
        parent::__construct();
        $this->load->model('mdl_application');
        // $this->output->cache($n);
    }

    public function index() {

        if(!empty($this->session->userdata('accountId'))){
            $this->load->view('account/v_registration');
          }else{
            redirect('account');
          }
    }

    public function get_province(){
        $r_id = 5;
        $result = $this->mdl_application->m_get_province($r_id);
        echo json_encode($result);

    }

    public function checkemail(){
        $email = $this->input->get('email');

        if($this->mdl_application->m_checkemail($email)){
            // foreach ($result as $r) {
                if($this->sendApplicantCredential($email)){
                    $result = array('status'=>'yes', 'content'=> "Email exist, and we've sent a message on your email.");
                    echo json_encode($result);
                }else{
                    $result = array('status'=>'yes', 'content'=> "Email exist!");
                    echo json_encode($result);
                }
            // }
          
        }else{
          $result = array('status'=>'no','content'=> "Great!");
          echo json_encode($result);
        }

    }

    public function get_city(){
        $p_id = $this->input->get('p_id');
        $result = $this->mdl_application->m_get_city($p_id);
        echo json_encode($result);

    }


    public function get_brgy(){
        $c_id = $this->input->get('c_id');
        $result = $this->mdl_application->m_get_brgy($c_id);
        echo json_encode($result);

    }


    public function get_courses(){
        // $c_id = $this->input->get('c_id');
        $result = $this->mdl_application->m_get_course();
        echo json_encode($result);

    }


    public function get_vacancies(){
        // $c_id = $this->input->get('c_id');
        $result = $this->mdl_application->m_get_vacancies();
        echo json_encode($result);

    }
    
    public function generate_province(){
            $arrContextOptions=array(
                    "ssl"=>array(
                        "verify_peer"=>false,
                        "verify_peer_name"=>false,
                    ),
                );
            
            $province = file_get_contents(base_url()."application/get_province", false, stream_context_create($arrContextOptions));
            file_put_contents(basename("/province.txt"), $province);
    }

    public function generate_courses(){
        
            $arrContextOptions=array(
                    "ssl"=>array(
                        "verify_peer"=>false,
                        "verify_peer_name"=>false,
                    ),
                );
            
            $courses = file_get_contents(base_url()."application/get_courses", false, stream_context_create($arrContextOptions));
            file_put_contents(basename("/courses.txt"), $courses);
    }



    public function saveinfo(){

        $secret  = '6LfzCWoUAAAAAAwtpR8F5kltIo3bBWj7sBu8X-8m';

           // if ($_POST) {
               if (isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])) {
               $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $_POST['g-recaptcha-response']);
               $responseData   = json_decode($verifyResponse);

               if($responseData->success){

                    $data['oa_email']       = $this->input->post('oa_email');

                    $oa_password            = $this->input->post('oa_password');

                    // if($oa_password != 'password'){
                        $data['oa_password']    = sha1(md5($oa_password . 'c[x]t!@n[*]{7hndv}'));
                    // }

                    

                    $data['oa_email']       = strtoupper($this->input->post('oa_email'));
                    $data['oa_fname']       = strtoupper($this->input->post('oa_fname'));
                    $data['oa_mname']       = strtoupper($this->input->post('oa_mname'));
                    $data['oa_lname']       = strtoupper($this->input->post('oa_lname'));
                    $data['oa_extname']     = strtoupper($this->input->post('oa_extname'));
                    $data['oa_course']      = $this->input->post('oa_course');
                    $data['oa_school']      = strtoupper($this->input->post('oa_school'));
                    $data['oa_educremarks'] = $this->input->post('oa_educremarks');
                    $data['oa_eligibility'] = $this->input->post('oa_eligibility');
                    $data['oa_eligremarks'] = strtoupper($this->input->post('oa_eligremarks'));

                    $data['oa_bdate']       = strtoupper($this->input->post('oa_bdate'));

                    $data['oa_gender']      = strtoupper($this->input->post('oa_gender'));
                    $data['oa_mobile']      = strtoupper($this->input->post('oa_mobile'));
                    $data['oa_pdesire']     = strtoupper($this->input->post('checkValues'));
                    $data['oa_street']      = strtoupper($this->input->post('oa_street'));
                    $data['oa_brgy']        = strtoupper($this->input->post('oa_brgy'));
                    $data['oa_city']        = strtoupper($this->input->post('oa_city'));
                    $data['oa_province']    = strtoupper($this->input->post('oa_province'));
                    $data['oa_region']      = strtoupper($this->input->post('oa_region'));
                    $data['oa_recwork']     = strtoupper($this->input->post('oa_recwork'));
                    $data['oa_rectraining'] = strtoupper($this->input->post('oa_rectraining'));
                    $data['oa_awards']      = strtoupper($this->input->post('oa_awards'));
                    $data['oa_skills']      = strtoupper($this->input->post('oa_skills'));
                    $data['oa_activationcode'] = strtoupper($this->input->post('oa_activationcode'));
                    $data['oa_postgraduate'] = $this->input->post('oa_postgraduate');
                    $data['oa_postgraduateremarks'] = strtoupper($this->input->post('oa_postgraduateremarks'));
                    $data['oa_isactivated'] = 'YES';

                     $id = $this->input->post('oa_id');

                     // echo $_FILES["pic"]["size"];
                     // die();
                    $files = $_FILES;




                    if($id == 'null'){
                        $data['oa_password']    = sha1(md5($oa_password . 'c[x]t!@n[*]{7hndv}'));
                        if($id = $this->mdl_application->m_saveinfo($data)){
                            $this->session->sess_destroy();
                            if($this->doUpload($id,$files)){
                                if($this->sendmessage($id)){
                                    $result = array('status'=>'yes','content'=>'Success! <br/> Email sent!','id'=>$id);

                                    echo json_encode($result);

                                }else{
                                    $result = array('status'=>'yes','content'=>'Success!','id'=>$id);
                                    echo json_encode($result);
                                }
                            }

                        }else{
                            $result = array('status'=>'no','content'=>'failed');
                            echo json_encode($result);
                        }
                    }else{

                        if($this->mdl_application->m_updateinfo($id,$data)){
                            $this->session->sess_destroy();
                            if($this->doUpload($id,$files)){
                                if($this->sendmessage($id)){
                                    $result = array('status'=>'yes','content'=>'Success! <br/> Email sent!','id'=>$id);
                                    
                                    echo json_encode($result);
                                }else{
                                    $result = array('status'=>'yes','content'=>'Success!','id'=>$id);
                                    echo json_encode($result);
                                }
                            }
                           

                        }else{
                            $result = array('status'=>'no','content'=>'failed');
                            echo json_encode($result);
                        }
                    }

                }
            }
    }


    public function doUpload($id,$files){

                    $data['oa_isactivated'] = 'YES';

                    if (!file_exists('images/'.$id)) {
                        mkdir('images/'.$id, 0777, true);
                        $config['upload_path'] = './images/'.$id;

                       
                    }else{
                        $config['upload_path'] = './images/'.$id;
                    }

                        $indexfile = './images/index.html';
                        $toFile = './images/'.$id.'/index.html';
                        copy($indexfile,$toFile);

                    $picTmp        = explode(".", $files["pic"]["name"]);
                    $picName       = rand(0000001,9999999) . '.' . end($picTmp); // The file name

                    $picTmpLoc     = $files["pic"]["tmp_name"]; // File in the PHP tmp folder
                    $picType       = $files["pic"]["type"]; // The type of file it is
                    $picSize       = $files["pic"]["size"]; // File size in bytes
                    $picErrorMsg   = $files["pic"]["error"]; // 0 for false... and 1 for true

                    if (!$picTmpLoc) { // if file not chosen
                        // $result = array('status'=>'no','content'=>"ERROR: Please browse for a file before clicking the upload button.");
                        //         echo json_encode($result);
                        //     exit();
                    }else{
                          $picdirectory = 'images/'.$id.'/'.$picName;

                             if (file_exists($picdirectory)) {
                                unlink($picdirectory);
                            }

                        if(move_uploaded_file($picTmpLoc, $picdirectory)){
                            $data['oa_pic'] =  $picName;
                           // $result = array('status'=>'yes','content'=>'Success! <br/> Email sent!');
                           //            echo json_encode($result);
                        }else{
                            // $result = array('status'=>'yes','content'=>'Success!');
                            //           echo json_encode($result);
                        }
                    }

                  
                    // END IMAGE

                    // RESUME
                    $resumeTmp        = explode(".", $files["resume"]["name"]);
                    $resumeName       = rand(0000001,9999999) . '.' . end($resumeTmp); // The file name
                    
                    $resumeTmpLoc     = $files["resume"]["tmp_name"]; // File in the PHP tmp folder
                    $resumeType       = $files["resume"]["type"]; // The type of file it is
                    $resumeSize       = $files["resume"]["size"]; // File size in bytes
                    $resumeErrorMsg   = $files["resume"]["error"]; // 0 for false... and 1 for true

                    if (!$resumeTmpLoc) { // if file not chosen
                        // $result = array('status'=>'no','content'=>"ERROR: Please browse for a file before clicking the upload button.");
                        //  echo json_encode($result);
                        // exit();
                    }else{

                        $resumedirectory = 'images/'.$id.'/'.$resumeName;

                             if (file_exists($resumedirectory)) {
                                unlink($resumedirectory);
                            }

                        if(move_uploaded_file($resumeTmpLoc, $resumedirectory)){
                            $data['oa_resume'] =  $resumeName;
                           // $result = array('status'=>'yes','content'=>'Success! <br/> Email sent!');
                           //            echo json_encode($result); 

                        }else{
                            // $result = array('status'=>'yes','content'=>'Success!');
                            //           echo json_encode($result);
                        } 
                    }

                    
                    // END RESUME


                    // TOR
                    $torTmp        = explode(".", $files["tor"]["name"]);
                    $torName       = rand(0000001,9999999) . '.' . end($torTmp); // The file name
                    
                    $torTmpLoc     = $files["tor"]["tmp_name"]; // File in the PHP tmp folder
                    $torType       = $files["tor"]["type"]; // The type of file it is
                    $torSize       = $files["tor"]["size"]; // File size in bytes
                    $torErrorMsg   = $files["tor"]["error"]; // 0 for false... and 1 for true

                    if (!$torTmpLoc) { // if file not chosen
                        // $result = array('status'=>'no','content'=>"ERROR: Please browse for a file before clicking the upload button.");
                        //  echo json_encode($result);
                        // exit();
                    }else{

                        $tordirectory = 'images/'.$id.'/'.$torName;
                            if (file_exists($tordirectory)) {
                                unlink($tordirectory);
                            }

                        if(move_uploaded_file($torTmpLoc, $tordirectory)){
                            $data['oa_tor'] =  $torName;
                           // $result = array('status'=>'yes','content'=>'Success! <br/> Email sent!');
                           //            echo json_encode($result); 
                            
                        }else{
                            // $result = array('status'=>'yes','content'=>'Success!');
                            //           echo json_encode($result);
                        }
                    }

                    // $temp = explode(".", $torName);
                    // $newfilename = 'tor' . '.' . end($temp);

                    // END TOR

                    // DIPLOMA
                    $diplomaTmp        = explode(".", $files["diploma"]["name"]);
                    $diplomaName       = rand(0000001,9999999) . '.' . end($diplomaTmp); // The file name
                    
                    $diplomaTmpLoc     = $files["diploma"]["tmp_name"]; // File in the PHP tmp folder
                    $diplomaType       = $files["diploma"]["type"]; // The type of file it is
                    $diplomaSize       = $files["diploma"]["size"]; // File size in bytes
                    $diplomaErrorMsg   = $files["diploma"]["error"]; // 0 for false... and 1 for true

                    if (!$diplomaTmpLoc) { // if file not chosen
                        // $result = array('status'=>'no','content'=>"ERROR: Please browse for a file before clicking the upload button.");
                        //  echo json_encode($result);
                        // exit();
                    }else{

                        $diplomadirectory = 'images/'.$id.'/'.$diplomaName;
                        if (file_exists($diplomadirectory)) {
                            unlink($diplomadirectory);
                        }
                        if(move_uploaded_file($diplomaTmpLoc, $diplomadirectory)){
                            $data['oa_diploma'] =  $diplomaName;
                           // $result = array('status'=>'yes','content'=>'Success! <br/> Email sent!');
                           //            echo json_encode($result); 
                            
                        }else{
                            // $result = array('status'=>'yes','content'=>'Success!');
                            //           echo json_encode($result);
                        }
                    }

                    // END DIPLOMA

                    // ELIGIBILITY CERT
                    $eligCertTmp        = explode(".", $files["eligibility"]["name"]);
                    $eligCertName       = rand(0000001,9999999) . '.' . end($eligCertTmp); // The file name
                    
                    $eligCertTmpLoc     = $files["eligibility"]["tmp_name"]; // File in the PHP tmp folder
                    $eligCertType       = $files["eligibility"]["type"]; // The type of file it is
                    $eligCertSize       = $files["eligibility"]["size"]; // File size in bytes
                    $eligCertErrorMsg   = $files["eligibility"]["error"]; // 0 for false... and 1 for true

                    if (!$eligCertTmpLoc) { // if file not chosen
                        // $result = array('status'=>'no','content'=>"ERROR: Please browse for a file before clicking the upload button.");
                        //  echo json_encode($result);
                        // exit();
                    }else{  

                        
                        $eligcertdirectory = 'images/'.$id.'/'.$eligCertName;
                        if (file_exists($eligcertdirectory)) {
                            unlink($eligcertdirectory);
                        }
                        if(move_uploaded_file($eligCertTmpLoc, $eligcertdirectory)){
                           // $result = array('status'=>'yes','content'=>'Success! <br/> Email sent!');
                           //            echo json_encode($result); 
                            $data['oa_eligcert'] =  $eligCertName;
                        }else{
                            // $result = array('status'=>'yes','content'=>'Success!');
                            //           echo json_encode($result);
                        }
                    }

                   
                    // END ELIGIBILITY CERT
                    if($this->mdl_application->m_updateinfo($id,$data)){
                        return true;    
                    }else{
                        return true;
                    }
                    return true;
    }

    public function sendApplicantCredential($email){

        // if($result = $this->mdl_application->m_get_applicant_details($id)){

            // foreach ($result as $r) {

                $config = Array('mailtype'  => 'html', 'charset' => 'utf-8','wordwrap' => TRUE);
                $this->load->library('email', $config);
                $this->email->initialize($config);

                $subject = "LGU - CSFP Careers";

                $message = "<br/> <br/>";

                $message .= "Dear, Mam/Sir,";

                $message .= " <br/><br/>";

                $message .= ' Please sign in thru this link:';

                $message .= ' https://cityofsanfernando.gov.ph/careers/';

                $message .= " <br/><br/>";

                $message .= ' You can use your <strong>email address</strong> as your username and  "<strong>password</strong>" as your default password if you didn\'t set any.';


                $message .= " <br/><br/>";

                $message .= "Thank you,";
                $message .= " <br/><br/>";
                           $message .= " Recruitment,Selection and Placement Section ";
                 $message .= " <br/>";
                $message .= " City Human Resource Development Office";
                $message .= " <br/>";
                $message .= "Local Government Unit";
                $message .= " <br/>";
                $message .= "City of San Fernando, Pampanga";
                $message .= " <br/>";
                $message .= "Tel No. (045) 961-8640 local 203";

                $this->email->from('csfp.recruitment@gmail.com', 'City of San Fernando, Pampanga');
                $this->email->to($email);
                $this->email->subject($subject);
                $this->email->message($message);
                if($this->email->send()){
                    return true;
                }else{
                     return false;
                }

    }

    public function sendmessage($id){

        if($result = $this->mdl_application->m_get_applicant_details($id)){


            // print_r($result);

            // die();
            foreach ($result as $r) {

                $config = Array('mailtype'  => 'html', 'charset' => 'utf-8','wordwrap' => TRUE);
                $this->load->library('email', $config);
                $this->email->initialize($config);

                $subject = "LGU - CSFP Online Application number " . $r->oa_prefix.'-'.$r->oa_suffix."!";

                $message = "<br/> <br/>";

                $message .= "Dear, " . $r->oa_lname. ",";
                $message .= " <br/><br/>";
                $message .= "Congratulations!";
                $message .= "<br/>";
                $message .= "You have successfully submitted your application to the City Government of San Fernando (P) Online Recruitment System!";
                $message .= " <br/><br/>";
                $message .= "Your Application number is : <h3>". $r->oa_prefix.'-'.$r->oa_suffix.'</h3>';
                $message .= "<br/>";
                $message .= "To update your details please click the link below";
                $message .= " <br/><br/>";

                $message .= 'https://cityofsanfernando.gov.ph/careers/';

                $message .= ' You can use your <strong>email address</strong> as your username and  "<strong>password</strong>" as your default password if you didn\'t set any.';

                $message .= " <br/><br/>";
                $message .= "Thank you,";
                $message .= " <br/><br/>";

                 $message .= " Recruitment,Selection and Placement Section ";
                 $message .= " <br/>";
                $message .= " City Human Resource Development Office";
                $message .= " <br/>";
                $message .= "Local Government Unit";
                $message .= " <br/>";
                $message .= "City of San Fernando, Pampanga";
                $message .= " <br/>";
                $message .= "Tel No. (045) 961-8640 local 203";



                $this->email->from('csfp.recruitment@gmail.com', 'City of San Fernando, Pampanga');
                $this->email->to($r->oa_email);
                $this->email->subject($subject);
                $this->email->message($message);
                if($this->email->send()){
                     return true;
                }else{
                    return false;
                }

            }
            // echo 'true';
           
        }else{

            // echo 'false';
            return false;
        }


    }


    public function get_applicant_details(){

        $a_id = $this->input->get('oa_id');

        $result =  $this->mdl_application->m_get_applicant_details($a_id);
        echo json_encode($result);
    }



    // public function do_upload(){

    //     $a = $this->input->post('oa_id');
    //     $path = $_FILES['pic']['name'];
    //     $ext = pathinfo($path, PATHINFO_EXTENSION);
    //     $z = 'images/'.$a.'/'.$a.'.'.$ext;

    //     if (!file_exists('images/'.$a)) {
    //         mkdir('images/'.$a, 0777, true);
    //         $config['upload_path'] = './images/'.$a;
    //     }else{
    //         $config['upload_path'] = './images/'.$a;
    //     }

    //     $config['allowed_types'] = 'jpg|png|jpeg';
    //     $config['file_name'] = $a;

    //     $this->load->library('upload', $config);
    //     if(!file_exists($z)){

    //         if ( ! $this->upload->do_upload('pic')){
    //             $error = array('error' => $this->upload->display_errors());
    //         }else{
    //         }
    //     }else{
    //         unlink($z);
    //         if ( ! $this->upload->do_upload('pic')){
    //             $error = array('error' => $this->upload->display_errors());
    //         }else{
    //             $file_data = $this->upload->data();
    //         }
    //     }

    // }



}
