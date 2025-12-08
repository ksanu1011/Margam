const express = require('express');
const router = express.Router();
const {
    getTournaments,
    getTournament,
    createTournament,
    updateTournament,
    deleteTournament,
    joinTournament
} = require('../controllers/tournamentController');

const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getTournaments)
    .post(protect, admin, createTournament);

router.route('/:id')
    .get(getTournament)
    .put(protect, admin, updateTournament)
    .delete(protect, admin, deleteTournament);

router.route('/:id/join').post(protect, joinTournament);

module.exports = router;
