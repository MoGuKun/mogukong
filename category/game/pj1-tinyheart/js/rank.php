<?php 
require_once('../connect.php');
$sql = mysql_query('select Max(id) from fishrank');
$idrow = mysql_fetch_array($sql);
$id = ++$idrow[0];
// echo "<br>";
// print_r($id);

if ($_POST['name'] == "") {
  $_POST['name'] = "无名人士";
}
if ($_POST['score'] == "") {
  $_POST['score'] = 0;
}

$name = $_POST['name'];

$score = $_POST['score'];

$insertsql = "insert into fishrank(id, name, score) values({$id}, '$name', '$score')";
// print_r($insertsql);
 mysql_query($insertsql);




?>