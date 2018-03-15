<?php
// Title: getuser.php
// Author: Paul Piwowarski
// Date 2/2018
//
// Search the user table for the uid
// If found, return its row fielwds
//  else rturn  null
// input from app:
//   uid


// Importing required scripts
require_once 'dboperation.php';  
require_once 'funcs.php';
 
$response = [];

if ($_SERVER['REQUEST_METHOD'] == 'POST' || $_SERVER['REQUEST_METHOD'] == 'GET')
{   
    // See if proper parameters were provided
    if (verifyRequiredParams(['uid']))
    {
        // Get parameter values
        $uid = $_REQUEST['uid'];

        // Create db operation object
        $db = new DbOperation();
        if (is_null($db->errMessage))
        {
            // Find uid data in user table
            $result = $db->getuser($uid);
            if ($result != null)   // if data uid found
            {         
                $response['error'] = false;
                $response['message'] = $result; 
            }
            else
            {
            
                    $response['error'] = true;
                    $response['message'] = 'uid not found';
            }            
   
        }
        else
        {
            $response['error'] = true;
            $response['message'] = $db->errMessage;
        }
    }
    else
    {
        $response['error'] = true;
        $response['message'] = 'uid is required';
    }    
}
else
{
    $response['error'] = true;
    $response['message'] = 'Invalid request';
}
// Echo json response
echo json_encode($response);
