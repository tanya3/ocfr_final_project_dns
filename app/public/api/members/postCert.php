<?php
// Step 0: Validate data

// Step 1: Get a datase connection from our help class
$db = DbConnection::getConnection();      //:: indicates that its a static function

// Step 2: Prepare & run the query
$stmt = $db->prepare(
  'INSERT INTO MemberCert
  (memberId, certId, startDate, endDate)
  VALUES (?,?,?,?)'
);      //$db is a method of PHP's PDO (Persistent Data Object) class (masked by DbConnection class) and prepare is a function of PDO that returns a PDOStatement object.


$stmt->execute([
  $_POST['memberId'],
  $_POST['certId'],
  $_POST['startDate'],
  $_POST['endDate']
]);                                   //$stmt object executes the query and the $stmt object references to the result set

// $stmt1 = $db->prepare('SELECT MAX(memberId) FROM Members');
// $stmt1->execute();
// $members = $stmt1->fetchAll();
// // Step 3: Convert to JSON
// $json = json_encode($members, JSON_PRETTY_PRINT);
// $memberId=$json[0]->memberId;

// header('Location: ../members/?memberId='.$memberId);
