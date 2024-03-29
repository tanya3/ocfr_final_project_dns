<?php
use Ramsey\Uuid\Uuid;
// Step 0: Validate data

// Step 1: Get a datase connection from our help class
$db = DbConnection::getConnection();      //:: indicates that its a static function

// Step 2: Prepare & run the query
$stmt = $db->prepare(
  'INSERT INTO Members
  (memberId, firstName, lastName, radioNumber, stationNumber, member_status, member_address, member_email, member_phoneNumber, member_dob, member_gender)
  VALUES (?,?,?,?,?,?,?,?,?,?,?)'
);      //$db is a method of PHP's PDO (Persistent Data Object) class (masked by DbConnection class) and prepare is a function of PDO that returns a PDOStatement object.

$guid = Uuid::uuid4()->toString();

$stmt->execute([
  $guid,
  $_POST['firstName'],
  $_POST['lastName'],
  $_POST['radioNumber'],
  $_POST['stationNumber'],
  $_POST['member_status'],
  $_POST['member_address'],
  $_POST['member_email'],
  $_POST['member_phoneNumber'],
  $_POST['member_dob'],
  $_POST['member_gender']
]);                                   //$stmt object executes the query and the $stmt object references to the result set

// $stmt1 = $db->prepare('SELECT MAX(memberId) FROM Members');
// $stmt1->execute();
// $members = $stmt1->fetchAll();
// // Step 3: Convert to JSON
// $json = json_encode($members, JSON_PRETTY_PRINT);
// $memberId=$json[0]->memberId;

header('HTTP/1.1 303 See Other');
header('Location: ../members/?memberId='.$guid);
// header('Location: ../members/?memberId='.$memberId);
