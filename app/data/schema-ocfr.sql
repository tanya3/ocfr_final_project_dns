CREATE TABLE Members (
  memberId int NOT NULL AUTO_INCREMENT,
  firstName varchar(255),
  lastName varchar(255),
	address varchar(255),
  email varchar(255),
	phoneNumber varchar(255),
	dob varchar(255),
	gender varchar(255),
	isActive boolean,
	radioNumber varchar(255),
  stationNumber varchar(255),
	PRIMARY KEY(memberId)
);

CREATE TABLE Certifications (
  certId varchar(50),
  certName varchar(255),
  certAgency varchar(225),
  stdExp int,
 	PRIMARY KEY(certId)
);

CREATE TABLE MemberCert (
  memberId int,
  certId int,
	startDate date,
 	endDate boolean,
	FOREIGN KEY (memberId) REFERENCES Members(memberId),
	FOREIGN KEY (certId) REFERENCES Certifications(certId)
);

SELECT * FROM Members;
