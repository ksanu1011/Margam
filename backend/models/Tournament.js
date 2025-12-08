const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a tournament title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    game: {
        type: String,
        required: [true, 'Please select a game'],
        enum: [
            'BGMI',
            'Valorant',
            'COD Mobile',
            'Free Fire',
            'New State',
            'Pokemon Unite',
            'Clash of Clans',
            'FIFA Mobile',
            'CS:GO',
            'Dota 2',
            'Apex Legends',
            'Fortnite',
            'League of Legends',
            'Overwatch',
            'Rainbow Six Siege',
            'Rocket League',
            'Street Fighter V',
            'Tekken 7',
            'Super Smash Bros. Ultimate',
            'Other'
        ]
    },
    prizePool: {
        type: Number,
        required: [true, 'Please add a prize pool amount']
    },
    startDate: {
        type: Date,
        required: [true, 'Please add a start date']
    },
    status: {
        type: String,
        enum: ['Upcoming', 'Live', 'Completed'],
        default: 'Upcoming'
    },
    participants: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
        ign: String,
        joinedAt: { type: Date, default: Date.now }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tournament', tournamentSchema);
