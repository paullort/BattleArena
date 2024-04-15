DROP DATABASE IF EXISTS LS_PW1_API2023_v2;
CREATE DATABASE LS_PW1_API2023_v2;
-- SHOW DATABASES;

-- CREATE USER 'LS'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'root';
GRANT ALL PRIVILEGES ON LS_PW1_API2023_v2.* TO 'LS'@'localhost';

use LS_PW1_API2023_v2;

/*CREATE TABLE Elements(
	element_ID VARCHAR(5) PRIMARY KEY
);
INSERT INTO Elements (element_ID) VALUES ('fire'),('water'),('air'),('earth');
*/
CREATE TABLE Directions(
	direction_ID VARCHAR(5) PRIMARY KEY
);
INSERT INTO Directions (direction_ID) VALUES ('left'),('right'),('up'),('down');

CREATE TABLE Players(
	player_id VARCHAR(20) PRIMARY KEY,
    password VARCHAR(20) NOT NULL ,
    img VARCHAR (255) NOT NULL,
    XP FLOAT NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 0,
    coins INTEGER NOT NULL DEFAULT 0,
    token VARCHAR(36) NULL UNIQUE
);

/*DELIMITER $$
CREATE TRIGGER Insert_token_new_user BEFORE INSERT ON Players
FOR EACH ROW
BEGIN
	IF new.token IS NULL THEN
		SET new.token = uuid();
	END IF;
END $$

CREATE TRIGGER UpdateXP_HP_level BEFORE UPDATE ON Players
FOR EACH ROW
BEGIN

	IF (NEW.XP <> OLD.XP) THEN
		SET NEW.XP = OLD.XP + NEW.XP;
		SET NEW.coins = OLD.coins + NEW.coins;

		SET NEW.level = CASE
			WHEN NEW.XP >= 150 THEN 1
			WHEN NEW.XP >= 500 THEN 2
			WHEN NEW.XP >= 1000 THEN 3
			WHEN NEW.XP >= 1500 THEN 4
			ELSE OLD.level
		END;
	END IF;
END $$

DELIMITER ;
*/


CREATE TABLE Attacks(
	attack_id VARCHAR(20) PRIMARY KEY,
    img VARCHAR(255) NOT NULL, 
    positions VARCHAR(100) NOT NULL ,
    price INTEGER DEFAULT 0,
    power INTEGER NOT NULL DEFAULT 0,
    level_needed INTEGER NOT NULL DEFAULT 0,
    -- element VARCHAR(5) NULL,
    equipped BOOLEAN NOT NULL DEFAULT false,
    on_sale BOOLEAN NOT NULL DEFAULT false,
    player_ID VARCHAR(20) NOT NULL,
    FOREIGN KEY (player_ID) REFERENCES Players (player_ID)
    -- FOREIGN KEY (element) REFERENCES Elements (element_ID)
);

/*DELIMITER $$
CREATE TRIGGER Insert_powerLevel_new_attack BEFORE INSERT ON Attacks
FOR EACH ROW
BEGIN

	DECLARE power integer;
	DECLARE level_player integer;

    SET level_player := (SELECT level FROM players WHERE player_ID = NEW.player_ID);

    SET power := CASE
		WHEN level_player = 0 THEN ROUND(RAND()*(5-2)+2, 0)
		WHEN level_player = 1 THEN ROUND(RAND()*(8-5)+5, 0)
		WHEN level_player = 2 THEN ROUND(RAND()*(11-8)+8, 0)
		WHEN level_player = 3 THEN ROUND(RAND()*(14-11)+11, 0)
        WHEN level_player = 4 THEN ROUND(RAND()*(17-14)+14, 0)
		ELSE FLOOR(RAND()*(30-17)+17)
	END;

	SET new.level_needed = level_player;
    SET new.power = power;

END $$

-- DROP TRIGGER IF exists buy_attack;
CREATE TRIGGER buy_attack BEFORE UPDATE ON Attacks
FOR EACH ROW
BEGIN

	IF (NEW.on_sale = 0 AND OLD.on_sale = 1) THEN

        SET new.price = null;

        IF (new.player_ID <> OLD.player_ID) THEN

			IF ((SELECT level FROM players WHERE player_ID = NEW.player_ID) < OLD.level_needed) THEN
				SIGNAL SQLSTATE '45000'
				SET MESSAGE_TEXT = 'You haven''t enough level to buy it';
			END IF;

			IF ((SELECT coins FROM players WHERE player_ID = NEW.player_ID) >= OLD.price) THEN

				UPDATE players
				SET coins = coins + OLD.price
				WHERE player_ID = OLD.player_ID
                LIMIT 1;

				UPDATE players
				SET coins = coins - OLD.price
				WHERE player_ID = NEW.player_ID
                LIMIT 1;

			ELSE
				SIGNAL SQLSTATE '45000'
				SET MESSAGE_TEXT = 'Not enough coins to buy it';

			END IF;
		END IF;

    ELSE

        if(NEW.on_sale = 0 AND OLD.on_sale = 0 AND NEW.equipped = OLD.equipped) THEN
			SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'You can''t buy what is not on sale';
		END IF;

        if(NEW.on_sale = 1 AND OLD.on_sale = 1 AND NEW.equipped = OLD.equipped) THEN
			SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'You can''t sell what is already on sale';
		END IF;

    END IF;

END $$
DELIMITER ;
*/



CREATE TABLE Games (
	game_ID VARCHAR(20) PRIMARY KEY,
    size INTEGER NOT NULL,
    creation_date DATETIME DEFAULT NOW(),
    finished BOOLEAN NOT NULL DEFAULT 0,
    HP_max INTEGER NOT NULL DEFAULT 50,
    start BOOLEAN DEFAULT 0
);


CREATE TABLE Players_games(
	game_ID VARCHAR(20) NOT NULL,
    player_ID VARCHAR(20) NOT NULL,
    x_game INTEGER NOT NULL,
    y_game INTEGER NOT NULL,
    direction VARCHAR(5) NOT NULL,
    hp INTEGER NOT NULL DEFAULT 0,
    winner BOOLEAN NULL,
    xp_win INTEGER NOT NULL DEFAULT 0,
    coins_win INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (game_ID, player_ID),
    FOREIGN KEY (direction) REFERENCES Directions (direction_ID),
    FOREIGN KEY (game_ID) REFERENCES games (game_ID),
    FOREIGN KEY (player_ID) REFERENCES players (player_ID)
);

/*DELIMITER $$
CREATE TRIGGER updatePosition BEFORE UPDATE ON Players_games
FOR EACH ROW
BEGIN

	DECLARE gameSize INTEGER;
	set gameSize := (SELECT size FROM games WHERE game_ID = NEW.game_ID);

	IF (NEW.x_game <> OLD.x_game) THEN

        IF (NEW.x_game > (gameSize - 1) ) THEN
			SET NEW.x_game = gameSize - 1;
		END IF;

        IF (NEW.x_game < 0) THEN
			SET NEW.x_game = 0;
        END IF;
	END IF;

    IF (NEW.y_game <> OLD.y_game) THEN

        IF (NEW.y_game > (gameSize - 1) ) THEN
			SET NEW.y_game = gameSize - 1;
		END IF;

        IF (NEW.y_game < 0) THEN
			SET NEW.y_game = 0;
        END IF;
	END IF;

END $$
DELIMITER ;
*/

CREATE TABLE Logs(
	log_ID BIGINT AUTO_INCREMENT PRIMARY KEY,
    game_ID VARCHAR(20) NOT NULL,
    description VARCHAR(100) NOT NULL,
    date_time DATETIME NOT NULL DEFAULT NOW(),
    player_ID VARCHAR(20) NULL,
    -- FOREIGN KEY (player_ID) REFERENCES Players (player_ID),
    FOREIGN KEY (game_ID) REFERENCES Games (game_ID)
);


/*
ALTER TABLE logs MODIFY player_ID varchar(20) null;
ALTER TABLE logs DROP FOREIGN KEY logs_ibfk_1;

select CONSTRAINT_NAME
from INFORMATION_SCHEMA.TABLE_CONSTRAINTS
where TABLE_NAME = 'Logs'

DELIMITER $$
CREATE TRIGGER delete_user BEFORE DELETE ON Players
FOR EACH ROW
BEGIN
	DELETE FROM Attacks WHERE player_ID = OLD.player_ID;

    UPDATE Logs
    SET player_ID = "undefined"
    WHERE player_ID = OLD.player_ID;

    UPDATE players_games
    SET player_ID = "undefined"
    WHERE player_ID = OLD.player_ID;

END $$
DELIMITER ;*/

-- INSERT INTO Players (player_id, password,img, token) VALUES ('bbdd2','bbdd2','foto', 'hola');
-- _____________________________________________________________________
/*INSERT INTO Players (player_id, password, XP, level, coins,img) VALUES
('player1','player1', 0 , 0 , 0, 'foto'),('player2','player2', 0 , 2 , 0, 'foto'),
('player3','player3', 250 , 1 , 300, 'foto'), ('player4','player4', 250 , 1 , 300, 'foto'),
('player5','player5', 250 , 1 , 300, 'foto'), ('player6','player6', 250 , 1 , 300, 'foto');

INSERT INTO attacks (attack_ID, positions, player_ID) VALUES
("attack1", "(1,0)", "player1"),
("attack2", "(1,0)", "player1"),
("attack3", "(1,0)", "player1"),
("attack4", "(1,0)", "player1"),
("attack5", "(1,0)", "player1"),
("attack6", "(1,0)", "player1"),
("attack7", "(1,0)", "player1"),
("attack8", "(1,0)", "player1"),
("attack9", "(1,0)", "player1"),
("attack10", "(1,0)", "player1"),
("attack11", "(1,0)", "player3"),
("attack12", "(1,0)", "player3"),
("attack13", "(1,0)", "player3"),
("attack14", "(1,0)", "player3"),
("attack15", "(1,0)", "player3"),
("attack16", "(1,0)", "player2"),
("attack17", "(1,0)", "player2"),
("attack18", "(1,0)", "player2"),
("attack19", "(1,0)", "player2"),
("attack20", "(1,0)", "player2");
-- INSERT INTO Attacks (attack_id, positions, price, power, level_needed, player_ID) VALUES
-- ('basic attack', '(1,0)', 0, 5, 0, 'player1');
-- SELECT * FROM Attacks;
-- SELECT * FROM players;




INSERT INTO games (game_ID, size, finished, HP_max, start) VALUES
("game1", 4, false, 200, true),
("game2", 4, false, 200, false),
("game3", 4, false, 200, false),
("game4", 4, false, 200, false),
("game5", 4, true, 200, true),
("game6", 4, true, 200, true),
("game7", 4, false, 200, false),
("game8", 4, false, 200, false),
("game9", 4, false, 200, false),
("game10", 4, false, 200, false);

INSERT INTO players_games (game_ID, player_ID, x_game, y_game, direction, hp, winner) VALUES
("game1", "player1", 0 , 0 , 'left', 200, null),
("game2", "player4", 0 , 0 , 'left', 200, null),
("game3", "player5", 0 , 0 , 'left', 200, null),
("game4", "player3", 0 , 0 , 'left', 200, null),
("game6", "player3", 0 , 0 , 'left', 200, true),
("game6", "player1", 0 , 0 , 'left', 200, false),
("game1", "player2", 0 , 0 , 'left', 200, null),
("game5", "player5", 0 , 0 , 'left', 200, true),
("game5", "player6", 0 , 0 , 'left', 200, false);

/*INSERT INTO LOGS (game_ID, description, player_ID) VALUES
('game1', 'Create game with 200 maximum HP and 4 arena size', 'player1'),
('game1', 'Enter to the game and start', 'player2'),
('game1', 'Move down (0,0) -> (0,1)', 'player2');
*/


SELECT * FROM players_games;
SELECT * FROM attacks;
SELECT * FROM games;
SELECT * FROM players;
SELECT * FROM logs;




-- SELECT * FROM directions;

/*SELECT COUNT(gp.game_ID) AS 'games_played', (SELECT COUNT(gw.game_ID) FROM players_games AS gw
                                                  WHERE gw.player_ID = 'player1' AND gw.winner = TRUE) AS 'games_won'
      FROM players_games AS gp
      WHERE gp.player_ID = 'player1';
*/








