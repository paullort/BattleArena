DROP DATABASE IF EXISTS LS_PW1_API2023;
CREATE DATABASE LS_PW1_API2023;
-- SHOW DATABASES;

-- CREATE USER 'LS'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'root';
-- GRANT ALL PRIVILEGES ON LS_PW1_API2023.* TO 'LS'@'localhost';

use LS_PW1_API2023;

CREATE TABLE Players(
	player_id VARCHAR(20) PRIMARY KEY,
    password VARCHAR(20) NOT NULL ,
    XP FLOAT NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 0,
    coins INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE Attacks(
	attack_id VARCHAR(20) PRIMARY KEY,
    positions VARCHAR(100) NOT NULL ,
    price INTEGER NOT NULL,
    power INTEGER NOT NULL,
    level_needed INTEGER NOT NULL DEFAULT 0,
    type VARCHAR(5) NULL
);

CREATE TABLE Player_attacks(
	player_ID VARCHAR(20),
    attack_ID VARCHAR(20),
    PRIMARY KEY (player_ID, attack_ID),
    FOREIGN KEY (player_ID) REFERENCES Players (player_ID),
    FOREIGN KEY (attack_ID) REFERENCES Attacks (attack_ID)
);

/*
CREATE TABLE Objects(
	object_id VARCHAR(20) PRIMARY KEY,
    price INTEGER NOT NULL,
    img_url VARCHAR(255) NOT NULL,
    level_needed INTEGER NOT NULL DEFAULT 0,
    type VARCHAR(10) NOT NULL
);

CREATE TABLE Increase_objects(
	increase_object_ID VARCHAR(20) PRIMARY KEY,
	power_increase INTEGER NOT NULL,
    power_type VARCHAR(5) NOT NULL,
    FOREIGN KEY (increase_object_ID) REFERENCES objects (object_id)
);

CREATE TABLE Heal_objects(
	heal_object_ID VARCHAR(20) PRIMARY KEY,
	HP_increase INTEGER NOT NULL,
    FOREIGN KEY (heal_object_ID) REFERENCES objects (object_id)
);

CREATE TABLE Protection_objects(
	protection_object_ID VARCHAR(20) PRIMARY KEY,
	HP_protection INTEGER NOT NULL,
    from_power_type VARCHAR(5) NOT NULL,
    FOREIGN KEY (protection_object_ID) REFERENCES objects (object_id)
);

CREATE TABLE Movement_objects(
	movement_object_ID VARCHAR(20) PRIMARY KEY,
	x INTEGER NOT NULL,
    y INTEGER NOT NULL,
    FOREIGN KEY (movement_object_ID) REFERENCES objects (object_id)
);

CREATE TABLE Player_objects(
	player_ID VARCHAR(20),
    object_ID VARCHAR(20),
    PRIMARY KEY (player_ID, object_ID),
    FOREIGN KEY (player_ID) REFERENCES Players (player_ID),
    FOREIGN KEY (object_ID) REFERENCES Objects (object_ID)
);

*/

CREATE TABLE Games (
	game_ID BIGINT AUTO_INCREMENT PRIMARY KEY,
    size INTEGER NOT NULL,
    creation_date DATETIME NOT NULL,
    finished BOOLEAN NOT NULL DEFAULT 0,
    HP_max INTEGER NOT NULL DEFAULT 50,
    p1_connected BOOLEAN NOT NULL DEFAULT 0,
    p2_connected BOOLEAN NOT NULL DEFAULT 0,
    player1 VARCHAR(20) NOT NULL,
    player2 VARCHAR(20) NOT NULL,
    x_p1 INTEGER NOT NULL,
    y_P1 INTEGER NOT NULL,
    x_p2 INTEGER NOT NULL,
    y_p2 INTEGER NOT NULL,
    HP_p1 INTEGER NOT NULL DEFAULT 50,
    HP_p2 INTEGER NOT NULL DEFAULT 50,
    winner VARCHAR(20) DEFAULT NULL,
    FOREIGN KEY (player1) REFERENCES Players (player_ID),
    FOREIGN KEY (player2) REFERENCES Players (player_ID),
    FOREIGN KEY (winner) REFERENCES Players (player_ID)
);

CREATE TABLE Logs(
	log_ID BIGINT AUTO_INCREMENT PRIMARY KEY,
    game_ID BIGINT NOT NULL,
    description VARCHAR(100) NOT NULL,
    date_time DATETIME NOT NULL,
    player_ID VARCHAR(20) NOT NULL,
    FOREIGN KEY (player_ID) REFERENCES Players (player_ID),
    FOREIGN KEY (game_ID) REFERENCES Games (game_ID)
);

INSERT INTO objects (object_id, price, img_url, level_needed, type) VALUES  ('healing soup', 20, 'https://pngimg.com/uploads/soup/soup_PNG106.png', 3, 'heal');
INSERT INTO Heal_objects (heal_object_ID, HP_increase) VALUES ('healing soup', 20);
SELECT * FROM objects;

INSERT INTO Attacks (attack_id, positions, price, power, level_needed, type) VALUES
('basic-right attack', '(1,0)', 0, 5, 0, null), ('basic-left attack', '(-1,0)', 0, 5, 0, null);
-- SELECT * FROM Attacks ORDER BY type;

DELIMITER $$
CREATE TRIGGER add_attacks_new_user AFTER INSERT ON Players
FOR EACH ROW
BEGIN
	INSERT INTO Player_attacks(player_ID, attack_ID) VALUES (NEW.player_ID, 'basic-right attack'), (NEW.player_ID, 'basic-left attack');
END $$

CREATE TRIGGER delete_user BEFORE DELETE ON Players
FOR EACH ROW
BEGIN
	DELETE FROM Player_attacks WHERE player_ID = OLD.player_ID;
    DELETE FROM Player_objects WHERE player_ID = OLD.player_ID;
    DELETE FROM Logs WHERE player_ID = OLD.player_ID;
    DELETE FROM games WHERE player1 = OLD.player_ID OR player2 = OLD.player_ID;
END $$
DELIMITER ;


-- _____________________________________________________________________
INSERT INTO Players (player_id, password, XP, level, coins) VALUES
('player1','player1', 0 , 0 , 0),('player2','player2', 0 , 0 , 0),('player3','player3', 250 , 1 , 300);

-- SELECT * FROM players;
-- SELECT * FROM player_attacks;



