const Tournament = require('../models/Tournament');

// @desc    Get all tournaments
// @route   GET /api/tournaments
// @access  Public
const getTournaments = async (req, res) => {
    try {
        // Filtering
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
        excludedFields.forEach(el => delete queryObj[el]);

        // Advanced filtering (gt, gte, lt, lte)
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let query = Tournament.find(JSON.parse(queryStr));

        // Search (by title)
        if (req.query.search) {
            const searchQuery = {
                title: { $regex: req.query.search, $options: 'i' }
            };
            query = query.find(searchQuery);
        }

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        // Execution
        const tournaments = await query;
        const total = await Tournament.countDocuments();

        res.status(200).json({
            success: true,
            count: tournaments.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: tournaments
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single tournament
// @route   GET /api/tournaments/:id
// @access  Public
const getTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);
        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }
        res.status(200).json({ success: true, data: tournament });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new tournament
// @route   POST /api/tournaments
// @access  Public (for MVP)
const createTournament = async (req, res) => {
    try {
        const tournament = await Tournament.create(req.body);
        res.status(201).json({
            success: true,
            data: tournament
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update tournament
// @route   PUT /api/tournaments/:id
// @access  Public (for MVP)
const updateTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }

        res.status(200).json({ success: true, data: tournament });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete tournament
// @route   DELETE /api/tournaments/:id
// @access  Public (for MVP)
const deleteTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findByIdAndDelete(req.params.id);

        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const joinTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);
        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }

        const player = await require('../models/Player').findOne({ user: req.user.id });
        if (!player) {
            return res.status(400).json({ message: 'Please create a player profile first' });
        }

        // Check if already joined
        const alreadyJoined = tournament.participants.some(p => p.user.toString() === req.user.id);
        if (alreadyJoined) {
            return res.status(400).json({ message: 'You have already joined this tournament' });
        }

        tournament.participants.push({
            user: req.user.id,
            player: player._id,
            ign: player.ign
        });

        await tournament.save();

        res.status(200).json({ success: true, data: tournament });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTournaments,
    getTournament,
    createTournament,
    updateTournament,
    deleteTournament,
    joinTournament
};
