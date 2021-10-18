CREATE DATABASE networkSocialData;
USE networkSocialData;
CREATE TABLE userTecla(
     id_usr int NOT NULL IDENTITY (1,1),
     nameUsr VARCHAR(50),
     lastName VARCHAR(50),
     nameUsrPage VARCHAR(50),
     emailUsr  VARCHAR(60),
     birthDate date,
     passwordUser VARCHAR(500),
     photoUserUrl  VARCHAR(250)
     PRIMARY KEY (emailUsr)
)
DROP TABLE userTecla;
INSERT INTO userTecla(nameUsr,lastName,nameUsrPage,emailUsr,birthDate,passwordUser) VALUES('David','Orea Alvarez','David_5453','david@gmail.com','1999/04/21','7654321')
SELECT * From userTecla;

CREATE TABLE infoAdditonal(
     id_info int NOT NULL IDENTITY (1,1),
     professionalProfile TEXT,
     emailUsr VARCHAR(60),
     country VARCHAR(50),
     town VARCHAR(50),
     linkLinkedin VARCHAR(100),
     languages TEXT,
     certifications TEXT,
     hobbies TEXT
     FOREIGN KEY(emailUsr) REFERENCES userTecla(emailUsr)
)
SELECT * FROM infoAdditonal;
DROP TABLE infoAdditonal;
CREATE TABLE commentsUsers(
     id_comments int NOT NULL IDENTITY (1,1),
     comments TEXT,
     emailUsr VARCHAR(60),
     FOREIGN KEY(emailUsr) REFERENCES userTecla(emailUsr)
)
SELECT * FROM  commentsUsers;
DROP TABLE commentsUsers;