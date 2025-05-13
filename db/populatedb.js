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
    artist VARCHAR,
    release DATE,
    genre VARCHAR[],
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
VALUES ('Brat', 'Charli XCX', '2024-06-07', ARRAY['Electropop', 'EDM', 'Dance-Pop'], 20);

INSERT INTO album (title, artist, release, genre, quantity)
VALUES ('How I''m Feeling Now', 'Charli XCX', '2020-05-15', ARRAY['Hyperpop', 'Electropop', 'Bubblegum Bass'], 8);

INSERT INTO album (title, artist, release, genre, quantity)
VALUES ('Melodrama', 'Lorde', '2017-06-16', ARRAY['Alt-pop', 'Synthpop'], 22);

INSERT INTO album (title, artist, release, genre, quantity)
VALUES ('Vespertine', 'Björk', '2001-08-27', ARRAY['Art Pop', 'Electronic', 'Glitch Pop'], 15);

INSERT INTO album (title, artist, release, genre, quantity)
VALUES ('Homogenic', 'Björk', '1997-09-22', ARRAY['Electronic', 'Art Pop'], 27);

INSERT INTO album (title, artist, release, genre, quantity)
VALUES ('Hounds of Love', 'Kate Bush', '1985-09-16', ARRAY['Art Pop', 'Progressive Pop'], 19);

INSERT INTO album (title, artist, release, genre, quantity)
VALUES ('Speak for Yourself', 'Imogen Heap', '2005-07-18', ARRAY['Art Pop', 'Indietronica', 'Glitch Pop'], 6);


INSERT INTO artist (name, description)
VALUES ('Charli XCX', 'British singer, songwriter, and actress, known for her experimental pop music and collaborations with other artists.');

INSERT INTO artist (name, description)
VALUES ('Lorde', 'New Zealand singer and songwriter. She is known for her unconventional style of pop music and introspective songwriting.');

INSERT INTO artist (name, description)
VALUES ('Björk', 'Icelandic singer, songwriter, composer, record producer, and actress. She is one of the most influential pioneers in electronic and experimental music.');

INSERT INTO artist (name, description)
VALUES ('Kate Bush', 'English singer, songwriter, record producer, and dancer. Her imaginative and inventive art rock is marked by theatrical sensuality, textural experimentation, and allusive subject matter');

INSERT INTO artist (name, description)
VALUES ('Imogen Heap', 'English musician, singer, songwriter and record producer. She is considered a pioneer in pop and electropop music.');


INSERT INTO genre (name, description)
VALUES ('Electropop', 'Dense, layered, and compressed production, usually coupled with a distinct fuzzy and "warm" low-frequency synthesizer style.');

INSERT INTO genre (name, description)
VALUES ('EDM', 'Broad category for subgenres mainly derived from Disco, featuring Electronic sounds, synthesizers, drum machines and varying BPM ranges.');

INSERT INTO genre (name, description)
VALUES ('Dance-Pop', 'Simple, yet catchy melodies and throbbing beats inspired initially by Disco and later various House styles.');

INSERT INTO genre (name, description)
VALUES ('Bubblegum Bass', 'Originated in the early 2010s, exaggerating the cutest and most feminine parts of 2000s Pop and combining them with bouncy, plastic synths over rhythms and sounds derived from a variety of contemporary club styles.');

INSERT INTO genre (name, description)
VALUES ('Hyperpop', 'Developed and took inspiration from Bubblegum Bass and popular 2000s-2010s Electropop, characterized by eclectic, unconventional, mechanical-sounding and dense production; and by manipulated, usually auto-tuned vocals.');

INSERT INTO genre (name, description)
VALUES ('Alt-pop', 'Emerged in the late 2000s and early 2010s, combines chart Pop conventions with alternative/indie genre sensibilities sometimes on a more minimal and contemplative atmosphere, often extracted from Alternative R&B.');

INSERT INTO genre (name, description)
VALUES ('Synthpop', 'Led by melodic synthesizer sounds, often with reverberating drum machine patterns; commonly associated with the 1980s.');

INSERT INTO genre (name, description)
VALUES ('Art Pop', 'Inventive, idiosyncratic, or artistically ambitious, often experimenting with unconventional musical elements and conceptual approaches while retaining accessibility.');

INSERT INTO genre (name, description)
VALUES ('Electronic', 'Uses non-traditional electronic instrumentation and sound manipulation technology as the primary backbone of a composition.');

INSERT INTO genre (name, description)
VALUES ('Glitch Pop', 'Incorporates elements of more experimental Electronic styles like IDM and Glitch.');

INSERT INTO genre (name, description)
VALUES ('Progressive Pop', 'Milder counterpart to Progressive Rock, emerging in the late 1960s and introducing complex songwriting and arrangements into a Pop context.');

INSERT INTO genre (name, description)
VALUES ('Indietronica', 'Leftfield or DIY approach characterised by simpler Pop-informed melodies, often incorporating vocals or live instrumentation alongside Electronic production.');
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