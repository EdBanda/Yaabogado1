<?php
// Title: DbOperation.php
// Author: Joshua Cockerill
//
// This class contains specific functions for querying data in
// the MySQL database connected to via dbconnection.php and constants.php
// for the Luna web api (handles SELECT, INSERT, UPDATE operations)
//
// References:
//   modified from https://www.simplifiedios.net/swift-php-mysql-tutorial/
//   by Belal Khan

class DbOperation
{
    public $errMessage = null;  //message if error occurs connecting to database
    private $conn = null;       //database connection if no error occurs

    /**
     * Constructor creates and connects with DbConnection
     * @param none
     * @return self
     */
    function __construct()
    {
        require_once dirname(__FILE__) . '/constants.php';
        require_once dirname(__FILE__) . '/dbconnection.php';
        // Try opening db connection
        $db = new DbConnection();
        $result = $db->connect();
        // Check for errors
        if ($result['error'])
        {
            $this->errMessage = $result['message'];
        }
        else
        {
            $this->conn = $result['message'];
        }
    }

    /**
     * Function to authenticate username/password on login
     * @param $username string of user to be authenticated
     * @param $pass string of user to be authenticated
     * @return bool whether or not username/password combination
     *   was found in the database
     */
    public function authenticateUser($username, $hashed_pass)
    {
        $active_on = 1;
	$uid = null;
        $stmt = $this->conn->prepare('SELECT uid FROM User WHERE user = ? AND password = ? AND active = ?');
        $stmt->bind_param('sss', $username, $hashed_pass, $active_on);
        $stmt->execute();
        $res = $stmt->get_result();
        // if user found get its uid 
        if ($res->num_rows > 0) {
	       //$res = $stmt->get_result();       
	      if ($row1 = $res->fetch_assoc()) {
                $uid = $row1["uid"];  // get uid
              }	
	}        
	// Return the uid if row found with username/password
        return $uid;
    }

   /**
     * Function to return all data from User row
     * @param $uid  uid of row to return
     * @return success: string of all fields of row
     * @return fail: null string 
     */
    public function getUser($uid)
    {
	$active_on = 1; 
	$row = null;       
	$stmt = $this->conn->prepare('SELECT * FROM User WHERE uid = ? AND active = ?');
        $stmt->bind_param('ss', $uid, $active_on);
        $stmt->execute();
        $res = $stmt->get_result();
        // if uid found get its row 
        if ($res->num_rows > 0) {
	       //$res = $stmt->get_result();
	       
	   if ($foundrow = $res->fetch_assoc()) {
                $row = $foundrow;
           }


	} 
	return $row;    
    }	



    /**
     * Function to create new user with user ID and password
     * A new user row is created in the user table that 
     * has user ID,password, and a random uid
     *   uid returned when user successfully inserted in the database
     *   null if error
     */
    public function createUser($username,$password)
    {
            $active_on = 1;
  
            // Create random uid
            $uid = $this->createRandomUid();
            if ($uid > 0)   // no error created uid
            {

                $stmt = $this->conn->prepare('INSERT INTO User (uid,username, password,active) VALUES (?,?,?,?)');
                $stmt->bind_param('ssss',$uid,$username,$password,$active_on);
                if ($stmt->execute())
                {
                    //User created successfully
                    return $uid;
                }
                else
                {
                    //Error creating user
                    return null;
                }
            } else {    // Error creating user
                return null;
            }
    
    }

    /**
     * Function to create a new incident in the database
     * @param $user_hash string containing hashed value of username
     *   reporting the logged incident
     * @param $location string of place where incident occurred
     * @param $date string of date incident occurred
     * @return bool whether or not the location was successfully
     *   inserted in the database
     */
    public function createIncident($user_hash, $location, $date)
    {
        $date = date('Y-m-d', strtotime(str_replace('-', '/', $date)));
        $stmt = $this->conn->prepare('INSERT INTO Incident (user_hash, incident_loc, incident_date) VALUES (?, ?, ?)');
        $stmt->bind_param('sss', $user_hash, $location, $date);
        if ($stmt->execute())
        {
            //Incident created successfully
            return true;
        }
        else
        {
            //Error creating Incident
            return false;
        }
    }

    /**
     * Function to change a users password
     * @param $username string of user who's password is being changed
     * @param $newPassword string to change user's password to
     * @return bool whether or not password was successfully updated
     *   in the database
     */
    public function changePassword($username, $newPassword)
    {
        $stmt = $this->conn->prepare('UPDATE User SET password = ? WHERE username = ?');
        $stmt->bind_param('ss', $newPassword, $username);
        if ($stmt->execute())
        {
            //Password changed successfully
            return true;
        }
        else
        {
            //Error changing password
            return false;
        }
    }

    /**
     * Function to deactivate a user
     * @param $username string of user to be deleted/deactivated
     * @return bool whether or not user was successfully set to
     *   inactive in the database
     */
    public function deleteUser($username)
    {
        $stmt = $this->conn->prepare('UPDATE User SET active = 0 WHERE username = ?');
        $stmt->bind_param('s', $username);
        if ($stmt->execute())
        {
            //User deleted successfully
            return true;
        }
        else
        {
            //Error deleting user
            return false;
        }
    }

    /**
     * Function to determine if a username already exists
     * @param $username string of name to be checked
     * @return bool whether or not username exists in the database
     *   regardless of activity status
     *   NOTE: keeps usernames unique
     */
    public function doesUserExist($username)
    {
        $stmt = $this->conn->prepare('SELECT uid FROM User WHERE username = ?');
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $stmt->store_result();
        // Return if results were found
        return $stmt->num_rows > 0;
    }
  /**
     * Function to determine if an emailID already exists
     * @param $emailID  to be checked
     * @return true (1): emailID exists in user table
               false (0): emailID does not exist in user table
     */
    public function doesEmailIDExist($emailID)
    {
        $stmt = $this->conn->prepare('SELECT uid FROM User WHERE emailID = ?');
        $stmt->bind_param('s', $emailID);
        $stmt->execute();
        $stmt->store_result();
        // Return if results were found
        return $stmt->num_rows > 0;
    }

    /**
     * Function to determine if a hashed username exists
     * @param $user_hash string containing hashed value of username
     *   reporting an incident to be logged
     * @return bool whether or not username exists in the database
     */
    public function doesHashedUserExist($user_hash)
    {
        $stmt = $this->conn->prepare('SELECT uid FROM User WHERE MD5(username) = ?');
        $stmt->bind_param('s', $user_hash);
        $stmt->execute();
        $stmt->store_result();
        // Return if results were found
        return $stmt->num_rows > 0;
    }

    /**
     * Function to generate random string of specified length
     * @param $length int number of chars of generated string
     * @return string of random chars using mt_rand and numbers,
     *   lowercase letters, and uppercase letters
     */
    private function genRandomString($length = 8)
    {
        $str = '';
        $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $max = strlen($chars) - 1;
        // Generate string with length number of chars
        for ($i = 0; $i < $length; ++$i)
        {
            // Get new random char and add to end of string
            $rand = mt_rand(0, $max);
            $str .= $chars[$rand];
        }
        // Return random string
        return $str;
    }
   
    /**
     * Function to authenticate userid exists in user table and is active
     * $uid: user ID to be authenticated
     * returns: true (1): uid exists and is active
     *          false (0): uid does not exist, or is not active
     */
    public function authenticateUid($uid)
    {       
        //does active User ID exist
        $stmt = $this->conn->prepare('SELECT uid FROM User WHERE uid = ? AND active = 1');
        $stmt->bind_param('s', $uid);
        $stmt->execute();
        $stmt->store_result();
        // Return if results were found
        return $stmt->num_rows > 0;
    }   // end of authenticateUid

   /**
     * Function to create random uid. Search user table uids
     * to ensure that it is not a duplicate
     * returns: random uid (0 if error)
     */

    public function createRandomUid()
    {       
        // create random uid
        // although high probability that random function will
        // create a unique ID, it may not happen so:
        // check if created random ID in table, try 1000 times
        // to create a random ID (if fails after 1000 tries,
        // must be randomizing bug). Terminating loop after 1000
        // times prevents endless loop when there is a bug
        // random uid starts at 11. 1-10 reserved for testing
        $count = 0;     // Set $count = 0
        $max = 100000;  // maximum random number
        $uid = mt_rand(11,$max); // get random number from 1 $max
        // while uid not unique && < 1000 tries
        while ($this->doesUidExist($uid) && $count < 1000) {
            $uid = mt_rand(11,$max); 
            $count++;   // increment count
        }   // end random ID while loop  
        // if random uid created count < 1000
        if ($count < 1000)
        {
            return $uid;
        } 
        else {
            return 0;
        }
    }   // end  createRandomUid

/**
     * findEmailID  NOT USED S18
     * Function to find emailID in user table on login, then:
     * 1 Put passed username and password in found user
     * 2 Set active flag on 
     * @param $emailID random emailID to search for
     * @param $username  (already hashed)
     * @param $password  (already hashed)
     * @return uid for the user from user table
     *  (0 if emailID not found)
     * (negative if error trying to change fields in user)
     */

    public function findEmailID( $username, $password)
    {         
        // Find emailID in user table
        
            // get uid from selected row
            $results = $res->fetch_assoc();  // fetch uid
            $uid = $results["uid"];
             // set password
             $stmt = $this->conn->prepare('UPDATE User SET password = ? WHERE emailID = ?');
             $stmt->bind_param('ss', $password, $emailID);
             if (!$stmt->execute())
             {   //  password error
                 return -2;
             } 
             // set username
             $stmt = $this->conn->prepare('UPDATE User SET username = ? WHERE emailID = ?');
             $stmt->bind_param('ss', $username,$emailID);
             if (!$stmt->execute())
             {   //  username error
                 return -3;
             } 
            // set active flag on
            $stmt = $this->conn->prepare('UPDATE User SET active = 1 WHERE emailID = ?');
            $stmt->bind_param('s', $emailID);
            if (!$stmt->execute())
            {  // active error
               return  -4;                      
            }  

      
  	
        return $uid;  // return positive uid

    }   // end findEmailID

   /**
     * doesUidExist
     * Function to determine if a uid already exists
     * @param $uid: uid to check 
     * @return  true (1) when uid exists in user table
     *   regardless of activity status
     *         false (0) uid not in user table         
     *   NOTE: keeps uids unique
     */

    public function doesUidExist($uid)
    {
        $stmt = $this->conn->prepare('SELECT uid FROM User WHERE uid = ?');
        $stmt->bind_param('s', $uid);
        $stmt->execute();
        $stmt->store_result();
        return $stmt->num_rows > 0;
    }   // end doesUidExist

    /**
     * Function to change an onboard question 
     *  $uid (user id): uid of user to change onboard questions 
     *  $birthday, $cycleLength,....  all 9 onboard questions
     *  followed in order
     * 
     * returns:  true onboard questions successfully changed
     *           false error changing onboard questions
     */

    public function changeOnboard($uid, $birthday,  $time)
    {
        $stmt = $this->conn->prepare('UPDATE User SET birthday = ? WHERE uid = ?');
        $stmt->bind_param('ss', $birthday, $uid );
        if ($stmt->execute())
        {
            // data in column changed successfully
            // continue changing columns
        }
        else
        {
            //Error changing data
            return false;
        }
  
   
     
        $stmt = $this->conn->prepare('UPDATE User SET time = ? WHERE uid = ?');
        $stmt->bind_param('ss', $time, $uid);
        if ($stmt->execute())
        {
            //data in column changed successfully
            // continue changing columns
        }
        else
        {
            //Error changing data
            return false;
        }

        return true;  //   Success all columns updated
    } // end changeOnboard

    /**
     * Function to create a new daily question Entry in entry table
     *  $uid:  user ID
     *  $date: date incident occurred
     *  daily question data for all daily questions 
     * @return true: new row in entry table with daily question data
     *.        false: error creating new row in entry table
     */

    public function createEntry($uid, $date, $onPeriod, $sexualInterest, $sexualActivityNumber, $emotionalCloseness, $sexualRelationship, $sexualLife, $sexualArousal, $sexualArousalConfidence, $lubrication, $lubricationMaintain, $difficulty, $satisfaction, $discomfort)
    {

        $date = date('Y-m-d', strtotime(str_replace('-', '/', $date)));
        $stmt = $this->conn->prepare('INSERT INTO Entry (uid,entry_date, onPeriod, sexualInterest, sexualActivityNumber, emotionalCloseness, sexualRelationship, sexualLife, sexualArousal, sexualArousalConfidence, lubrication, lubricationMaintain, difficulty, satisfaction, discomfort) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

        $stmt->bind_param('sssssssssssssss', $uid, $date, $onPeriod, $sexualInterest,$sexualActivityNumber, $emotionalCloseness, $sexualRelationship, $sexualLife, $sexualArousal, $sexualArousalConfidence, $lubrication, $lubricationMaintain, $difficulty, $satisfaction, $discomfort);

        if ($stmt->execute())
        {
            //Entry created successfully
            return true;
        }
        else
        {
            //Error creating Entry
            return false;
        }
    }   // end of createEntry

}  // end of DbOperation class
