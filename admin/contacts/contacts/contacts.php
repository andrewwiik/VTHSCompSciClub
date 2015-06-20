<?php
ini_set('display_errors', 1);
//MYSQLI sting to connect to the database
$mysqli = mysqli_connect("localhost", "root", "Sticker101?", "contacts");

switch($_GET["action"]){
	// Switch case for the team list controller
	case "list":
		$query = "SELECT * FROM contactList";
		$result = $mysqli->query($query);
		while ($row = $result->fetch_assoc()) {
		$json[] = array('fname' => $row['fname'], 'lname' => $row['lname'], 'address' => $row['address'], 'city' => $row['city'], 'zipcode' => $row['zipcode'], 'mnumber' => $row['mnumber'], 'lnumber' => $row['lnumber'], 'relation' => $row['relation'], 'photo' => $row['photo']);
		}
		echo json_encode($json);
		$mysqli->close();
	break;
	// Switch case for the team details controller
	case "detail":
	 	$id = $_GET['id'];
		$query = $mysqli->prepare('SELECT * FROM contactList WHERE id = ?');
		$query->bind_param('i', $id);
		$query->execute();
		$result = $query->get_result();
		while ($row = $result->fetch_assoc()){
		 	$json = array('id' => $row['id'], 'fname' => $row['fname'], 'lname' => $row['lname'], 'address' => $row['address'], 'city' => $row['city'], 'zipcode' => $row['zipcode'], 'mnumber' => $row['mnumber'], 'lnumber' => $row['lnumber'], 'relation' => $row['relation'], 'photo' => $row['photo']);
		 }
		 echo json_encode($json);
		 $mysqli->close();
	break;
	// Switch case for the add team controller
	case "add":
		$dataString = $_POST['photo'];
		define('UPLOAD_DIR', '../contactimg/');
		$img = $dataString;
		if (preg_match('/png/', $dataString)){
			$img = str_replace('data:image/png;base64,', '', $img);
			$file = UPLOAD_DIR . uniqid() . '.png';
		} else if (preg_match('/jpeg/', $dataString)) {
			$img = str_replace('data:image/jpeg;base64,', '', $img);
			$file = UPLOAD_DIR . uniqid() . '.jpg';
		}

		$img = str_replace(' ', '+', $img);
		$data = base64_decode($img);
		$success = file_put_contents($file, $data);

		$query = $mysqli->prepare('INSERT INTO contactList (fname, lname, address, city, zipcode, mnumber, lnumber, relation, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$query->bind_param('sssssssss', $_POST['fname'], $_POST['lname'], $_POST['address'], $_POST['city'], $_POST['zipcode'], $_POST['mnumber'], $_POST['lnumber'], $_POST['relation'], $file);
		$query->execute();
		$mysqli->close();
	break;
	// Switch case for the edit team controller
	case "edit":
		$id = $_GET['id'];
		$dataString = $_POST['photo'];

		if (stripos($dataString, 'base64') !== false){
			define('UPLOAD_DIR', '../contactimg/');
			$img = $dataString;
			if (preg_match('/png/', $dataString)){
				$img = str_replace('data:image/png;base64,', '', $img);
				$file = UPLOAD_DIR . uniqid() . '.png';
			} else if (preg_match('/jpeg/', $dataString)) {
				$img = str_replace('data:image/jpeg;base64,', '', $img);
				$file = UPLOAD_DIR . uniqid() . '.jpg';
			}
			$img = str_replace(' ', '+', $img);
			$data = base64_decode($img);
			$success = file_put_contents($file, $data);
		} else {
			$file = $_POST['photo'];
		}
		$query = $mysqli->prepare('UPDATE contactList SET fname = ?, lname = ?, address = ?, city = ?, zipcode = ?, mnumber = ?, lnumber = ?, relation = ?, relation = ?, photo = ? WHERE id = ?');
		$query->bind_param('sssssssssi', $_POST['fname'], $_POST['lname'], $_POST['address'], $_POST['city'], $_POST['zipcode'], $_POST['mnumber'], $_POST['lnumber'], $_POST['relation'], $file, $id);
		$query->execute();
		$mysqli->close();
	break;

	case "delete":
		$id = $_GET['id'];
		$query = $mysqli->prepare('DELETE FROM contactList WHERE id = ?');
		$query->bind_param('i', $id);
		$query->execute();
		$mysqli->close();
	break;







}
?>
