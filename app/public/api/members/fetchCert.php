<?php

// Step 1: Get a datase connection from our help class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$stmt = $db->prepare( 'SELECT * FROM MemberCert m, Certifications c WHERE memberId = ? AND m.certId=c.certId');
$stmt->execute([$_GET['memberId']]);

$membercert = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($membercert, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
