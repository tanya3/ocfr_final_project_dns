CREATE TABLE Members (
	memberId varchar(50),
	firstName varchar(255),
	lastName varchar(255),
	member_address varchar(255),
	member_email varchar(255),
	member_phoneNumber bigint,
	member_dob date,
	member_gender varchar(255),
	member_status varchar(10),
	radioNumber varchar(10),
	stationNumber int,
	PRIMARY KEY(memberId),
    constraint c1 CHECK (member_status in ('Active', 'Inactive'))
);

CREATE TABLE Certifications (
  certId varchar(50),
  certName varchar(255),
  certAgency varchar(225),
  stdExp int,
 	PRIMARY KEY(certId)
);

CREATE TABLE MemberCert (
  memberId varchar(50),
  certId varchar(50),
	startDate date,
 	endDate date,
	FOREIGN KEY (memberId) REFERENCES Members(memberId) ON DELETE CASCADE,
	FOREIGN KEY (certId) REFERENCES Certifications(certId) ON DELETE CASCADE,
  PRIMARY KEY (memberId, certId)
);
