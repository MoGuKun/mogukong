<?php
	require_once('../connect.php');
	$sql = 'select * from fishrank order by score desc limit 10';
	$result = mysql_query($sql);
	$json = "";
	$data = array();

	class Rank
	{
		public $id;
		public $name;
		public $score;
	}
	while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
	{
		$rank = new Rank();
		$rank->id = $row["id"];
		$rank->name = $row["name"];
		$rank->score = $row["score"];

		$data[] = $rank;
	}
	$newdata = json_encode($data);
	echo $newdata;
?>

