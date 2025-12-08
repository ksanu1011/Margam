const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Player = require('./models/Player');
const Tournament = require('./models/Tournament');

// Load env vars
dotenv.config();

const players = [
    { ign: "Mortal", realName: "Naman Mathur", age: 24, gameSpecialization: "BGMI", skillScore: 950, tier: "Pro", stats: { kd: 4.5, wins: 120, matchesPlayed: 300, headshotRange: 35 } },
    { ign: "ScoutOP", realName: "Tanmay Singh", age: 25, gameSpecialization: "BGMI", skillScore: 940, tier: "Pro", stats: { kd: 4.8, wins: 110, matchesPlayed: 280, headshotRange: 40 } },
    { ign: "Jonathan", realName: "Jonathan Amaral", age: 21, gameSpecialization: "BGMI", skillScore: 980, tier: "Pro", stats: { kd: 6.2, wins: 150, matchesPlayed: 320, headshotRange: 55 } },
    { ign: "Viper", realName: "Yash Soni", age: 23, gameSpecialization: "BGMI", skillScore: 890, tier: "Semi-Pro", stats: { kd: 3.5, wins: 80, matchesPlayed: 250, headshotRange: 30 } },
    { ign: "Snax", realName: "Raj Varma", age: 22, gameSpecialization: "BGMI", skillScore: 910, tier: "Pro", stats: { kd: 4.1, wins: 95, matchesPlayed: 260, headshotRange: 42 } },
    { ign: "SkRossi", realName: "Ganesh Gangadhar", age: 23, gameSpecialization: "Valorant", skillScore: 960, tier: "Pro", stats: { kd: 1.4, wins: 200, matchesPlayed: 400, headshotRange: 65 } },
    { ign: "HellrangeR", realName: "Bhavin Kotwani", age: 24, gameSpecialization: "Valorant", skillScore: 880, tier: "Semi-Pro", stats: { kd: 1.1, wins: 180, matchesPlayed: 420, headshotRange: 45 } },
    { ign: "Deathmaker", realName: "Debanjan Das", age: 22, gameSpecialization: "Valorant", skillScore: 920, tier: "Pro", stats: { kd: 1.3, wins: 190, matchesPlayed: 380, headshotRange: 58 } },
    { ign: "Antidote", realName: "Sabyasachi Bose", age: 25, gameSpecialization: "Valorant", skillScore: 850, tier: "Semi-Pro", stats: { kd: 1.0, wins: 160, matchesPlayed: 350, headshotRange: 40 } },
    { ign: "Mw1", realName: "Tejas Kotian", age: 21, gameSpecialization: "Valorant", skillScore: 930, tier: "Pro", stats: { kd: 1.25, wins: 195, matchesPlayed: 390, headshotRange: 60 } },
    { ign: "ClutchGod", realName: "Vivek Aabhas", age: 19, gameSpecialization: "BGMI", skillScore: 870, tier: "Semi-Pro", stats: { kd: 3.2, wins: 70, matchesPlayed: 220, headshotRange: 32 } },
    { ign: "Mavi", realName: "Harmandeep Singh", age: 24, gameSpecialization: "BGMI", skillScore: 900, tier: "Pro", stats: { kd: 3.8, wins: 100, matchesPlayed: 290, headshotRange: 38 } },
    { ign: "Regaltos", realName: "Parv Singh", age: 20, gameSpecialization: "BGMI", skillScore: 860, tier: "Semi-Pro", stats: { kd: 3.1, wins: 65, matchesPlayed: 210, headshotRange: 30 } },
    { ign: "Kronten", realName: "Chetan Chandgude", age: 26, gameSpecialization: "BGMI", skillScore: 820, tier: "Amateur", stats: { kd: 2.5, wins: 40, matchesPlayed: 150, headshotRange: 25 } },
    { ign: "Dynamo", realName: "Aditya Sawant", age: 27, gameSpecialization: "BGMI", skillScore: 800, tier: "Amateur", stats: { kd: 2.2, wins: 35, matchesPlayed: 140, headshotRange: 20 } },
    { ign: "Marzil", realName: "Agneya Koushik", age: 24, gameSpecialization: "Valorant", skillScore: 915, tier: "Pro", stats: { kd: 1.35, wins: 185, matchesPlayed: 370, headshotRange: 55 } },
    { ign: "Rite2Ace", realName: "Tejas Sawant", age: 26, gameSpecialization: "Valorant", skillScore: 895, tier: "Semi-Pro", stats: { kd: 1.15, wins: 175, matchesPlayed: 410, headshotRange: 48 } },
    { ign: "Amaterasu", realName: "Anuj Sharma", age: 25, gameSpecialization: "Valorant", skillScore: 885, tier: "Semi-Pro", stats: { kd: 1.1, wins: 170, matchesPlayed: 400, headshotRange: 46 } },
    { ign: "Excali", realName: "Karan Mhaswadkar", age: 23, gameSpecialization: "Valorant", skillScore: 905, tier: "Pro", stats: { kd: 1.28, wins: 188, matchesPlayed: 385, headshotRange: 52 } },
    { ign: "V3nom", realName: "Ankit Panth", age: 30, gameSpecialization: "Valorant", skillScore: 830, tier: "Amateur", stats: { kd: 0.95, wins: 140, matchesPlayed: 300, headshotRange: 35 } }
];

const tournaments = [
    { title: "Margam Winter Skirmish", game: "Valorant", prizePool: 50000, startDate: new Date("2024-01-15"), status: "Completed" },
    { title: "BGMI Pro League Season 1", game: "BGMI", prizePool: 200000, startDate: new Date("2024-02-10"), status: "Completed" },
    { title: "Valorant Challengers Split 1", game: "Valorant", prizePool: 150000, startDate: new Date("2024-03-05"), status: "Completed" },
    { title: "Red Bull Campus Clutch", game: "Valorant", prizePool: 30000, startDate: new Date("2024-04-20"), status: "Completed" },
    { title: "Skyesports Champions Series", game: "BGMI", prizePool: 250000, startDate: new Date("2025-06-15"), status: "Live" },
    { title: "Upthrust Diwali Battle", game: "BGMI", prizePool: 100000, startDate: new Date("2025-10-25"), status: "Upcoming" },
    { title: "Margam Elite Cup", game: "Valorant", prizePool: 500000, startDate: new Date("2025-12-20"), status: "Upcoming" },
    { title: "New Year Invitational", game: "BGMI", prizePool: 75000, startDate: new Date("2026-01-01"), status: "Upcoming" },
    { title: "Valorant Ascension Pacific", game: "Valorant", prizePool: 1000000, startDate: new Date("2026-02-15"), status: "Upcoming" },
    { title: "Community Scrims Weekly", game: "BGMI", prizePool: 5000, startDate: new Date("2025-06-18"), status: "Live" }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Optional: Clear existing data
        await Player.deleteMany();
        await Tournament.deleteMany();
        console.log('Data Cleared...');

        await Player.insertMany(players);
        console.log('Players Added!');

        await Tournament.insertMany(tournaments);
        console.log('Tournaments Added!');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
