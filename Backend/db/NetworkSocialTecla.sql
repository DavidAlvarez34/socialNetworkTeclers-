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
     PRIMARY KEY (emailUsr)
)
DROP TABLE userTecla;
INSERT INTO userTecla(nameUsr,lastName,nameUsrPage,emailUsr,birthdate,passwordUser) VALUES
('David','Orea Alvarez','David_5453','david@gmail.com','1999/04/21','7654321')
