<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Mdl_account extends CI_Model
{
	//LOGIN/CHECK LOGIN CREDENTIALS
    public function m_ajax_signin($data)
    {
        $datelogin = date("Y-m-d G:i:s", time());
        $a_username = $data['a_username'];
        $a_password = sha1(md5($data['a_password'] . 'c[x]t!@n[*]{7hndv}'));
        $sql = "SELECT
                  `oa_id`
                FROM
                  `tbl_onlineapplicant`
                WHERE 
                      `oa_email` = '$a_username' AND
                      `oa_password` = '$a_password'
                LIMIT 1";

        $query = $this->db->query($sql);

        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return false;
        }
    }

	public function m_ajax_signout()
    {
        $datelogout = date("Y-m-d G:i:s", time());
        $sql = "UPDATE `tbl_account` SET `a_logout` = ? WHERE `a_id` = ?";
        $param= array($datelogout,$this->session->userdata('accountId'));
        if($this->db->query($sql,$param)) {
            $this->session->sess_destroy();
            return true;
        } else {
            return false;
        }
    }

    public function m_ajax_update_password($a_id,$password)
    {
        $newpass = sha1(md5($password.'c[x]t!@n[*]{7hndv}'));
        $this->session->set_userdata('password', $newpass);
        $sql ="UPDATE `tbl_account` SET `a_password` = '$newpass' WHERE `a_id` = '$a_id' ";
        if($this->db->query($sql)){
            return true;
        } else {
            return false;
        }
    }

    public function m_ajax_save_userdetails($data1,$a_id) {

  		$this->db->where('a_id', $a_id);
  		if($this->db->update('tbl_account',$data1)) {
  			return TRUE;
  		} else {
  			return FALSE;
  		}

  	}

    public function m_ifonline() {
  		$sql = 'SELECT `a_id` AS `id`
  				FROM
  				  `tbl_account`
  				WHERE `a_id` = "1"
  				';
  		$query = $this->db->query($sql);
  		if($query->num_rows() > 0)
  		{
  			return $query->result();
  		} else {
  			return false;
  		}
      }
      
    public function m_saveinfo($data){

        $query =  $this->db->insert('`tbl_clients`',$data);
        if($query){
            return $this->db->insert_id();
        }else{
            return false;
        }
    }

    public function m_getrefnum(){
        $ref =  date('y').''.date('m');
      
        $sql = "SELECT
                    IF(`c_refnum` IS NULL,
                        LPAD((0000) + 1,4,0),
                        LPAD(MAX(SUBSTRING_INDEX(SUBSTRING_INDEX(`c_refnum`, '-', 2), '-', -1))+1,4,0)
                    ) AS c_refnum
                    FROM `tbl_clients`
                    WHERE SUBSTRING_INDEX(SUBSTRING_INDEX(`c_refnum`, '-', 1), '-', -1) = '$ref'
                    ";
        $query = $this->db->query($sql);
        if($query->num_rows() == 1){
            return $query->result();
        }else{
            return false;
        }
    }

}
