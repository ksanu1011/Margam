import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import Pagination from '../components/Pagination';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaSearch, FaFilter, FaGamepad, FaTrash } from 'react-icons/fa';

// Assume image is moved to public
const LEADERBOARD_BG = "/leaderboard-bg-purple.png";

const Players = () => {
    const { user } = useAuth();
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [params, setParams] = useState({
        search: '',
        sort: '-skillScore',
        game: '',
        region: ''
    });

    const fetchPlayers = async () => {
        setLoading(true);
        try {
            const searchParams = new URLSearchParams();
            if (params.search) searchParams.append('search', params.search);
            if (params.sort) searchParams.append('sort', params.sort);
            if (params.game) searchParams.append('game', params.game);
            if (params.region) searchParams.append('region', params.region);

            searchParams.append('page', page);
            searchParams.append('limit', 10);

            const res = await api.get(`/players?${searchParams.toString()}`);
            setPlayers(res.data.data);
            setTotalPages(res.data.pages);
            setPage(res.data.page);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, [params, page]);

    // Rank badge colors
    const getRankColor = (index) => {
        const actualRank = ((page - 1) * 10) + index + 1;
        if (actualRank === 1) return '#FFD700'; // Gold
        if (actualRank === 2) return '#C0C0C0'; // Silver
        if (actualRank === 3) return '#CD7F32'; // Bronze
        return 'var(--text-secondary)';
    };

    // Tier badge styles
    const getTierStyle = (tier) => {
        switch (tier) {
            case 'Pro': return { background: 'rgba(231, 76, 60, 0.2)', color: '#e74c3c', border: '1px solid #e74c3c' };
            case 'Semi-Pro': return { background: 'rgba(243, 156, 18, 0.2)', color: '#f39c12', border: '1px solid #f39c12' };
            default: return { background: 'rgba(46, 204, 113, 0.2)', color: '#2ecc71', border: '1px solid #2ecc71' };
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '100px' }}>

            {/* Background Image */}
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: `url(${LEADERBOARD_BG})`, backgroundSize: 'cover', backgroundPosition: 'center',
                opacity: 0.15, zIndex: -1
            }}></div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="container"
                style={{ paddingTop: '40px' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '3rem', margin: 0, textShadow: '0 0 20px rgba(0,255,149,0.3)' }}>GLOBAL <span style={{ color: 'var(--accent)' }}>RANKINGS</span></h1>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '5px' }}>Top players competing for glory.</p>
                    </div>
                    {user && user.role === 'admin' && (
                        <Link to="/admin" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaGamepad /> Add Player
                        </Link>
                    )}
                </div>

                {/* --- FILTERS & SEARCH --- */}
                <div className="card" style={{ marginBottom: '40px', padding: '20px', background: 'rgba(10, 20, 15, 0.6)', backdropFilter: 'blur(10px)', border: '1px solid var(--glass-border)' }}>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

                        <div style={{ flex: 2, position: 'relative' }}>
                            <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                placeholder="Search by IGN..."
                                value={params.search}
                                onChange={(e) => setParams({ ...params, search: e.target.value })}
                                style={{ paddingLeft: '45px', width: '100%', background: 'rgba(0,0,0,0.3)' }}
                            />
                        </div>

                        <div style={{ flex: 1, minWidth: '150px' }}>
                            <select
                                value={params.game}
                                onChange={(e) => setParams({ ...params, game: e.target.value })}
                                style={{ width: '100%', background: 'rgba(0,0,0,0.3)' }}
                            >
                                <option value="">All Games</option>
                                <option value="Valorant">Valorant</option>
                                <option value="BGMI">BGMI</option>
                                <option value="CS:GO">CS:GO</option>
                            </select>
                        </div>

                        <div style={{ flex: 1, minWidth: '180px' }}>
                            <select
                                value={params.sort}
                                onChange={(e) => setParams({ ...params, sort: e.target.value })}
                                style={{ width: '100%', background: 'rgba(0,0,0,0.3)' }}
                            >
                                <option value="-skillScore">Sort: Skill (High-Low)</option>
                                <option value="skillScore">Sort: Skill (Low-High)</option>
                                <option value="-stats.kd">Sort: K/D Ratio</option>
                                <option value="-stats.headshotRange">Sort: Headshot %</option>
                            </select>
                        </div>

                    </div>
                </div>

                {/* --- LEADERBOARD TABLE --- */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px', marginTop: '-10px' }}>
                        <thead>
                            <tr style={{ textTransform: 'uppercase', fontSize: '0.85rem', color: 'var(--text-secondary)', letterSpacing: '1px' }}>
                                <th style={{ padding: '15px 20px', textAlign: 'left', border: 'none' }}>Rank</th>
                                <th style={{ padding: '15px', textAlign: 'left', border: 'none' }}>Player</th>
                                <th style={{ padding: '15px', textAlign: 'left', border: 'none' }}>Tier</th>
                                <th style={{ padding: '15px', textAlign: 'center', border: 'none' }}>Skill Score</th>
                                <th style={{ padding: '15px', textAlign: 'center', border: 'none' }}>K/D</th>
                                <th style={{ padding: '15px', textAlign: 'center', border: 'none' }}>Win %</th>
                                {user && user.role === 'admin' && <th style={{ padding: '15px', textAlign: 'center', border: 'none' }}>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {loading && (
                                    <tr><td colSpan="7" style={{ textAlign: 'center', padding: '50px' }}>Loading Data...</td></tr>
                                )}

                                {!loading && players.map((p, index) => (
                                    <motion.tr
                                        key={p._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="player-row" // define in css if needed, using inline currently for speed
                                        style={{
                                            background: 'rgba(20, 30, 25, 0.4)',
                                            backdropFilter: 'blur(5px)',
                                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                        }}
                                        whileHover={{ scale: 1.01, background: 'rgba(0, 255, 149, 0.08)', boxShadow: '0 0 15px rgba(0, 255, 149, 0.1)' }}
                                    >
                                        <td style={{ padding: '20px', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', fontWeight: '800', fontSize: '1.2rem', color: getRankColor(index) }}>
                                            #{((page - 1) * 10) + index + 1}
                                        </td>

                                        <td style={{ padding: '15px' }}>
                                            <Link to={`/player/${p._id}`} style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none', color: '#fff' }}>
                                                {/* Fallback Avatar */}
                                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: '2px solid var(--glass-border)' }}>
                                                    {p.ign.charAt(0)}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 'bold', fontSize: '1rem', transition: '0.2s' }}>{p.ign}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{p.gameSpecialization || 'N/A'}</div>
                                                </div>
                                            </Link>
                                        </td>

                                        <td style={{ padding: '15px' }}>
                                            <span style={{ padding: '5px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', ...getTierStyle(p.tier) }}>
                                                {p.tier}
                                            </span>
                                        </td>

                                        <td style={{ padding: '15px', textAlign: 'center', fontWeight: '800', fontSize: '1.1rem', color: 'var(--accent)' }}>
                                            {p.skillScore}
                                        </td>

                                        <td style={{ padding: '15px', textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
                                            {p.stats.kd}
                                        </td>

                                        <td style={{ padding: '15px', textAlign: 'center', borderTopRightRadius: !user || user.role !== 'admin' ? '10px' : 0, borderBottomRightRadius: !user || user.role !== 'admin' ? '10px' : 0 }}>
                                            <div style={{ width: '100%', background: '#333', height: '6px', borderRadius: '3px', marginTop: '5px', position: 'relative' }}>
                                                <div style={{
                                                    width: `${p.stats.matchesPlayed > 0 ? (p.stats.wins / p.stats.matchesPlayed * 100) : 0}%`,
                                                    background: 'var(--accent)', height: '100%', borderRadius: '3px'
                                                }}></div>
                                            </div>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                                {p.stats.matchesPlayed > 0 ? ((p.stats.wins / p.stats.matchesPlayed) * 100).toFixed(0) : 0}%
                                            </span>
                                        </td>

                                        {user && user.role === 'admin' && (
                                            <td style={{ padding: '15px', textAlign: 'center', borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>
                                                <button
                                                    onClick={async (e) => {
                                                        e.preventDefault(); // stop navigation
                                                        if (window.confirm(`Delete ${p.ign}?`)) {
                                                            try {
                                                                await api.delete(`/players/${p._id}`);
                                                                fetchPlayers();
                                                            } catch (err) { alert('Failed'); }
                                                        }
                                                    }}
                                                    style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', opacity: 0.7 }}
                                                    className="hover-pop"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        )}
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {!loading && <Pagination page={page} pages={totalPages} changePage={setPage} />}

            </motion.div>
        </div>
    );
};

export default Players;
