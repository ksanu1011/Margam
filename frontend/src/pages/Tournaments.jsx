import { useState, useEffect } from 'react';
import api from '../api';
import Pagination from '../components/Pagination';

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Tournaments = () => {
    const { user } = useAuth();
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        game: '',
        status: '',
        search: '',
        sort: '-createdAt'
    });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTournaments = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.game) params.append('game', filters.game);
            if (filters.status) params.append('status', filters.status);
            if (filters.search) params.append('search', filters.search);
            if (filters.sort) params.append('sort', filters.sort);

            params.append('page', page);
            params.append('limit', 8); // 8 cards per page

            const res = await api.get(`/tournaments?${params.toString()}`);
            setTournaments(res.data.data);
            setTotalPages(res.data.pages);
            setPage(res.data.page);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTournaments();
    }, [filters, page]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setPage(1); // Reset to page 1 on filter change
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Tournaments</h2>
                {user && user.role === 'admin' && (
                    <Link to="/admin" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                        + Create Tournament
                    </Link>
                )}
            </div>

            <div className="card" style={{ marginBottom: '30px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    placeholder="Search tournaments..."
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    style={{ flex: 1, minWidth: '200px' }}
                />
                <select name="game" onChange={handleFilterChange} style={{ flex: 1, minWidth: '150px' }}>
                    <option value="">All Games</option>
                    <option value="BGMI">BGMI</option>
                    <option value="Free Fire">Free Fire</option>
                    <option value="CODM">CODM</option>
                    <option value="Valorant Mobile">Valorant Mobile</option>
                </select>
                <select name="status" onChange={handleFilterChange} style={{ flex: 1, minWidth: '150px' }}>
                    <option value="">All Statuses</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Live">Live</option>
                    <option value="Completed">Completed</option>
                </select>
                <select name="sort" onChange={handleFilterChange} style={{ flex: 1, minWidth: '150px' }}>
                    <option value="-createdAt">Newest First</option>
                    <option value="createdAt">Oldest First</option>
                    <option value="-prizePool">Highest Prize</option>
                </select>
            </div>

            {loading ? <p>Loading...</p> : (
                <>
                    <div className="grid">
                        {tournaments.map(t => (
                            <div key={t._id} className="card">
                                <span style={{
                                    background: t.status === 'Live' ? 'var(--danger)' : '#333',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold'
                                }}>{t.status}</span>
                                <h3 style={{ margin: '10px 0', fontSize: '1.4rem' }}>{t.title}</h3>
                                <p style={{ color: '#aaa', marginBottom: '5px' }}>{t.game}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                                    <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>₹{t.prizePool} Prize</span>
                                    <span style={{ fontSize: '0.9rem' }}>{new Date(t.startDate).toLocaleDateString()}</span>
                                </div>

                                {user && user.role !== 'admin' && (
                                    <button
                                        onClick={async () => {
                                            try {
                                                await api.post(`/tournaments/${t._id}/join`);
                                                alert('Successfully joined the tournament!');
                                                fetchTournaments(); // Refresh to update participants count if we displayed it
                                            } catch (err) {
                                                alert(err.response?.data?.message || 'Failed to join');
                                            }
                                        }}
                                        className="btn btn-primary"
                                        style={{
                                            width: '100%',
                                            marginTop: '15px',
                                            background: t.participants?.some(p => p.user === user._id) ? 'var(--accent-glow)' : 'var(--accent-color)',
                                            opacity: t.participants?.some(p => p.user === user._id) ? 0.6 : 1
                                        }}
                                        disabled={t.participants?.some(p => p.user === user._id)}
                                    >
                                        {t.participants?.some(p => p.user === user._id) ? 'Joined' : 'Join Tournament'}
                                    </button>
                                )}

                                {user && user.role === 'admin' && (
                                    <button
                                        onClick={async () => {
                                            if (window.confirm('Delete Tournament?')) {
                                                try {
                                                    await api.delete(`/tournaments/${t._id}`);
                                                    fetchTournaments();
                                                } catch (err) { alert('Failed to delete'); }
                                            }
                                        }}
                                        className="btn btn-outline"
                                        style={{ width: '100%', marginTop: '15px', color: 'var(--danger)', borderColor: 'var(--danger)', fontSize: '0.9rem', padding: '8px' }}
                                    >
                                        Delete (Admin)
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <Pagination page={page} pages={totalPages} changePage={setPage} />
                </>
            )}
        </div>
    );
};

export default Tournaments;
