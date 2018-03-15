<?php
// Title: auth.php
// Author: Paul Piwowarski
// Date 7/2017
//
// Search the user table for the emailID received from the app
// If found, put the received username and password in it.
// Send the uid in the user entry to the app
//
// input from app:
//   username, password, emailID
// output (emailID found):
//   user table entry updated with username, password, 
//   active flag set true. uid sent to app with success message
// output (emailID not found):
//   failure message sent app
//
// References:
//   modified from https://www.simplifiedios.net/swift-php-mysql-tutorial/
//   by Belal Khan

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
        $username = $_REQUEST['username'];
        $password = $_REQUEST['password'];

        // Create db operation object
        $db = new DbOperation();
        if (is_null($db->errMessage))
        {
            // Find emailID in user table
            $result = $db->createUser($username,$password);
            if ($result> 0)
            {
                
                // put username and password in the user row columns
                // uid in user entry returned in message field
                $response['error'] = false;
                $response['message'] = $result; // uid from user table
            }
            else
            {
                if ($result == 0)  // 0 = emailID not found
                {
                    $response['error'] = true;
                    $response['message'] = 'random emailID not found';
                }            
                else {  
                    // error searching for email ID   (negative number)
                    // when error log available, log to it
                    // user cannot do anything
                    $response['error'] = $result;
                    $response['message']='DB error searching for emailID';
                }
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
