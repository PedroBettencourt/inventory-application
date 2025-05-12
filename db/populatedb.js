require("dotenv").config();
const { Client } = require('pg');

// CHANGE GENRE AND ARTIST FROM ID TO HAVE NAME AS THEIR PRIMARY KEY SO IT'S LESS MESSY..

const SQL = `
DROP TABLE IF EXISTS album;
DROP TABLE IF EXISTS artist;
DROP TABLE IF EXISTS genre;


CREATE TABLE IF NOT EXISTS album (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR,
    artist INTEGER,
    release DATE,
    genre INTEGER[],
    quantity INTEGER
);

CREATE TABLE IF NOT EXISTS artist (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR,
    description VARCHAR
);

CREATE TABLE IF NOT EXISTS genre (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR,
    description VARCHAR
);


INSERT INTO album (title, artist, release, genre, quantity)
VALUES ('Brat', 1, '2024-06-07', ARRAY[1, 2, 3], 20);

INSERT INTO album (title, artist, release, genre, quantity)
VALUES ('How I''m Feeling Now', 1, '2020-05-15', ARRAY[5, 1, 4], 8);

INSERT INTO album (title, artist, release, genre, quantity)
VALUES ('Melodrama', 2, '2017-06-16', ARRAY[6, 7, 3], 22);

INSERT INTO album (title, artist, release, genre, quantity)
VALUES ('Vespertine', 3, '2001-08-27', ARRAY[8, 9, 10], 15);

INSERT INTO album (title, artist, release, genre, quantity)
VALUES ('Homogenic', 3, '1997-09-22', ARRAY[8, 9], 27);

INSERT INTO album (title, artist, release, genre, quantity)
VALUES ('Hounds of Love', 4, '1985-09-16', ARRAY[8, 11], 19);

INSERT INTO album (title, artist, release, genre, quantity)
VALUES ('Speak for Yourself', 5, '2005-07-18', ARRAY[8, 12, 10], 6);


INSERT INTO artist (name, description)
VALUES ('Charli XCX', '');

INSERT INTO artist (name, description)
VALUES ('Lorde', '');

INSERT INTO artist (name, description)
VALUES ('Björk', '');

INSERT INTO artist (name, description)
VALUES ('Kate Bush', '');

INSERT INTO artist (name, description)
VALUES ('Imogen Heap', 'English musician, singer, songwriter and record producer. She is considered a pioneer in pop and electropop music.');


INSERT INTO genre (name, description)
VALUES ('Electropop', '');

INSERT INTO genre (name, description)
VALUES ('EDM', '');

INSERT INTO genre (name, description)
VALUES ('Dance-pop', '');

INSERT INTO genre (name, description)
VALUES ('Bubblegum Bass', '');

INSERT INTO genre (name, description)
VALUES ('Hyperpop', '');

INSERT INTO genre (name, description)
VALUES ('Alt-pop', '');

INSERT INTO genre (name, description)
VALUES ('Synthpop', '');

INSERT INTO genre (name, description)
VALUES ('Art Pop', '');

INSERT INTO genre (name, description)
VALUES ('Electronic', '');

INSERT INTO genre (name, description)
VALUES ('Glitch Pop', '');

INSERT INTO genre (name, description)
VALUES ('Progressive Pop', '');

INSERT INTO genre (name, description)
VALUES ('Indietronica', '');
`;



async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:5432/${process.env.DATABASE_NAME}`,
        ssl: true,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();