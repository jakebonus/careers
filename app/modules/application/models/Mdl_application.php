<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Mdl_application extends CI_Model {

	public function __construct() {
		parent::__construct();

	}


	public function m_get_province($id){
		$sql = "SELECT * FROM `tbl_province` WHERE `r_id` = '$id'";
		$query = $this->db->query($sql);

		if($query->num_rows() > 0){
			return $query->result();
		}else{
			return false;
		}
	}

	public function m_get_city($id){
		$sql = "SELECT * FROM `tbl_city` WHERE `p_id` = '$id'";
		$query = $this->db->query($sql);

		if($query->num_rows() > 0){
			return $query->result();
		}else{
			return false;
		}
	}

	public function m_get_brgy($id){
		$sql = "SELECT * FROM `tbl_brgy` WHERE `c_id` = '$id'";
		$query = $this->db->query($sql);

		if($query->num_rows() > 0){
			return $query->result();
		}else{
			return false;
		}
	}

	public function m_get_course(){
		$sql = "SELECT * FROM `tbl_courses`";
		$query = $this->db->query($sql);

		if($query->num_rows() > 0){
			return $query->result();
		}else{
			return false;
		}
	}
	public function m_get_vacancies(){
		$sql = "SELECT * FROM `tbl_vacancies` WHERE `v_isavailable` = 'YES'";
		$query = $this->db->query($sql);

		if($query->num_rows() > 0){
			return $query->result();
		}else{
			return false;
		}
	}

	public function m_get_suffix($prefix){
		$sql =	"SELECT IF(`oa_suffix` IS NULL,LPAD((000) + 1,3,0),LPAD(MAX(`oa_suffix`) + 1, 3, 0)) AS `oa_suffix` FROM `tbl_onlineapplicant` WHERE `oa_isactivated` = 'YES' AND `oa_prefix` = '".$prefix."' LIMIT 1";
		
		$query = $this->db->query($sql);
		
		if($query->num_rows() > 0){
			return $query->result();
		}else{
			return false;
		}
	}

	public function m_get_appnumber($oa_id){
		$sql =	"SELECT `oa_prefix`,`oa_suffix`  FROM `tbl_onlineapplicant` WHERE  `oa_id` = '".$oa_id."' AND `oa_prefix` IS NOT NULL  AND `oa_suffix` IS NOT NULL ";
		$query = $this->db->query($sql);
		
		if($query->num_rows() > 0){
			return $query->result();
		}else{
			return false;
		}
	}

	public function m_saveinfo($data){

					$data['oa_prefix'] = date('m').''.date('y');

					$suffix_query =  "SELECT 
									IF(`oa_suffix` IS NULL,
										LPAD((000) + 1,3,0),
										LPAD(MAX(`oa_suffix`) + 1, 3, 0)
									) AS `oa_suffix` 
								FROM `tbl_onlineapplicant` 
								WHERE `oa_isactivated` = 'YES' 
								AND `oa_prefix` = '".$data['oa_prefix']."' 
								LIMIT 1";

					$suffix_result = $this->db->query($suffix_query);

					if($suffix_result->num_rows() > 0){

						foreach ($suffix_result->result() as $sr) {
							$data['oa_suffix'] = $sr->oa_suffix;

						}

					}else{
						$data['oa_suffix'] = '001';
					}
		
		 $query =	$this->db->insert('`tbl_onlineapplicant`', $data);
			 
			 if($query){
			 	// return true;
			 	$oa_id =  $this->db->insert_id();

				$new_v_id = array();
				$myArray = explode(',', $data['oa_pdesire']);
		
				foreach($myArray as $n){
					$new_v_id[] = '(
								"'. $oa_id .'",
								"'. $n .'"
								)';
				}
				
				// insert batch
				$query3 = $this->db->query('UPDATE `tbl_positionapplied` SET `pa_islatest` = "NO" WHERE `oa_id` IN('.$oa_id.')');

				if($query3){

					$query2 = $this->db->query('INSERT INTO `tbl_positionapplied` (`oa_id`,`v_id`) VALUES '.implode(',',$new_v_id));

					if($query2){

							

						 return $oa_id;

					}else{

						 return false;

					}

				}else{

					return false;

				}


		}else{

			return false;

		}	
				
		
	}

	public function m_get_applicant_details($id){

		$sql 	= "SELECT * FROM `tbl_onlineapplicant` WHERE `oa_id` = '$id' AND `oa_isactivated` = 'YES'";
		$query 	= $this->db->query($sql);
		if($query->num_rows() == 1){
			return $query->result();
		}else{
			return false;
		}
	}

	public function m_checkemail($email){

		$sql 	= "SELECT `oa_id`,`oa_email` FROM `tbl_onlineapplicant` WHERE `oa_email` = '$email' AND `oa_isactivated` = 'YES'";
		$query 	= $this->db->query($sql);
		if($query->num_rows() == 1){
			return $query->result();
		}else{
			return false;
		}
	}

	public function m_updateinfo($id,$data){

		$this->db->where('oa_id',$id);
		$query 	= $this->db->update('`tbl_onlineapplicant`',$data);
		if($query){
			return true;
		}else{
			return false;
		}
	}
}
