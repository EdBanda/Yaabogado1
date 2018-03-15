<?php
// Title: checkuser.php
// Author: Paul Piwowarski
// Date 2/2018
//
// Search the user table for the user/password from the app
// If found, return 1, else return 0
//
// input from app:
//   username, password


// Importing required scripts
require_once 'dboperation.php';  
require_once 'funcs.php';
 
$response = [];

if ($_SERVER['REQUEST_METHOD'] == 'POST' || $_SERVER['REQUEST_METHOD'] == 'GET')
{   
    // See if proper parameters were provided
    if (verifyRequiredParams(['user', 'password']))
    {
        // Get parameter values
        $username = $_REQUEST['user'];
        $password = $_REQUEST['password'];

        // Create db operation object
        $db = new DbOperation();
        if (is_null($db->errMessage))
        {
            // Find emailID in user table
            $result = $db->authenticateUser($username,$password);
            if ($result)   // if not null, username/password found
            {
                
             
                $response['error'] = false;
                $response['message'] = $result; 
            }
            else
            {
            
                    $response['error'] = true;
                    $response['message'] = 'username not found';
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
        $response['message'] = 'Username and password are required';
    }    
}
else
{
    $response['error'] = true;
    $response['message'] = 'Invalid request';
}
// Echo json response
echo json_encode($response);

