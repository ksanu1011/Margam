const Player = require('../models/Player');

// @desc    Get all players
// @route   GET /api/players
// @access  Public
const getPlayers = async (req, res) => {
    try {
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
        excludedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let query = Player.find(JSON.parse(queryStr));

        // Search by IGN or Real Name
        if (req.query.search) {
            const searchQuery = {
                $or: [
                    { ign: { $regex: req.query.search, $options: 'i' } },
                    { realName: { $regex: req.query.search, $options: 'i' } }
                ]
            };
            query = query.find(searchQuery);
        }

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-skillScore'); // Default sort by skill
        }

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        const players = await query;
        const total = await Player.countDocuments();

        res.status(200).json({
            success: true,
            count: players.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: players
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPlayer = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) return res.status(404).json({ message: 'Player not found' });
        res.status(200).json({ success: true, data: player });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPlayer = async (req, res) => {
    try {
        // Check if user is logged in
        if (req.user) {
            // If not admin, enforce that they can only create for themselves
            if (req.user.role !== 'admin') {
                req.body.user = req.user.id;
            }

            // Check if user already has a player profile
            if (req.body.user) {
                const existingPlayer = await Player.findOne({ user: req.body.user });
                if (existingPlayer) {
                    return res.status(400).json({ message: 'User already has a player profile' });
                }
            }
        }

        const player = await Player.create(req.body);
        res.status(201).json({ success: true, data: player });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updatePlayer = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) return res.status(404).json({ message: 'Player not found' });

        // If stats are being updated, we need to trigger the pre-save hook effectively
        // findByIdAndUpdate bypasses pre-save unless mapped carefully or we use save()
        // For simplicity with full updates:

        Object.assign(player, req.body);

        // Recalculate skill score if stats changed (schema pre-save handles this on save)
        await player.save();

        res.status(200).json({ success: true, data: player });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePlayer = async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);
        if (!player) return res.status(404).json({ message: 'Player not found' });
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPlayers,
    getPlayer,
    createPlayer,
    updatePlayer,
    deletePlayer
};
