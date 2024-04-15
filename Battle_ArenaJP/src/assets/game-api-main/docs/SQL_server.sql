USE webdb2023dev;

DROP TABLE IF EXISTS Logs CASCADE;
DROP TABLE IF EXISTS Directions CASCADE;
DROP TABLE IF EXISTS Attacks CASCADE;
DROP TABLE IF EXISTS Players_games CASCADE;
DROP TABLE IF EXISTS Games CASCADE;
DROP TABLE IF EXISTS Players CASCADE;

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

CREATE TABLE Logs(
	log_ID BIGINT AUTO_INCREMENT PRIMARY KEY,
    game_ID VARCHAR(20) NOT NULL,
    description VARCHAR(100) NOT NULL,
    date_time DATETIME NOT NULL DEFAULT NOW(),
    player_ID VARCHAR(20) NULL,
    -- FOREIGN KEY (player_ID) REFERENCES Players (player_ID),
    FOREIGN KEY (game_ID) REFERENCES Games (game_ID)
);
