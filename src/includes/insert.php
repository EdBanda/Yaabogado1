<html>
<body>
 
 
<?php
$con = mysqli_connect("localhost","id4663935_admin","00000");
if (!$con)
  {
  die('Could not connect: ' . mysqli_error());
  }
 
mysqli_select_db($con,"id4663935_users");
 
$sql="INSERT INTO User (first, last, email, username, password, birthday)
VALUES
('$_POST[first]','$_POST[last]','$_POST[email]','$_POST[username]','$_POST[password]','$_POST[birthday]')";
 
if (!mysqli_query($con,$sql))
  {
  die('Error: ' . mysqli_error($con));
  }
echo "1 record added";
 
mysqli_close($con)
?>
</body>
</html>