import { useState, useEffect } from 'react';
import api from '../api';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('tournaments');
    const [tournaments, setTournaments] = useState([]);
    const [players, setPlayers] = useState([]);
    const [users, setUsers] = useState([]);

    // Forms
    const [tForm, setTForm] = useState({ title: '', game: 'BGMI', prizePool: 0, startDate: '', status: 'Upcoming' });
    const [pForm, setPForm] = useState({ ign: '', realName: '', age: 18, gameSpecialization: 'BGMI', stats: { kd: 1.0, wins: 0, headshotRange: 0, matchesPlayed: 0 } });

    const fetchData = async () => {
        try {
            if (activeTab === 'tournaments') {
                const res = await api.get('/tournaments?sort=-createdAt');
                setTournaments(res.data.data);
            } else if (activeTab === 'players') {
                const res = await api.get('/players?sort=-createdAt');
                setPlayers(res.data.data);
            } else if (activeTab === 'users') {
                // Need to create this endpoint or mock it for now if strict REST not needed
                // But let's assume we create a route or just reuse auth/me for now? 
                // No, we need a getUsers route.
                // For MVP speed, I will use a simple list if I can't add route instantly.
                // But wait, I can add `getAllUsers` in authController quickly.
                const res = await api.get('/auth/users'); // I will add this next
                setUsers(res.data.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleCreateTournament = async (e) => {
        e.preventDefault();
        try {
            await api.post('/tournaments', tForm);
            fetchData();
            alert('Tournament Created!');
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    const handleDeleteTournament = async (id) => {
        if (!window.confirm('Delete?')) return;
        try {
            await api.delete(`/tournaments/${id}`);
            fetchData();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleCreatePlayer = async (e) => {
        e.preventDefault();
        try {
            await api.post('/players', pForm);
            fetchData();
            alert('Player Created!');
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    const handleDeletePlayer = async (id) => {
        if (!window.confirm('Delete?')) return;
        try {
            await api.delete(`/players/${id}`);
            fetchData();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Ban User? (This will delete the account)')) return;
        try {
            // Assuming we add this endpoint
            await api.delete(`/auth/users/${id}`);
            fetchData();
        } catch (err) {
            alert('Failed to ban user');
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '30px', borderBottom: '1px solid #333' }}>
                <button
                    onClick={() => setActiveTab('tournaments')}
                    className="btn"
                    style={{
                        background: activeTab === 'tournaments' ? 'var(--accent-color)' : 'transparent',
                        color: activeTab === 'tournaments' ? '#000' : 'var(--text-primary)'
                    }}
                >
                    Manage Tournaments
                </button>
                <button
                    onClick={() => setActiveTab('players')}
                    className="btn"
                    style={{
                        background: activeTab === 'players' ? 'var(--accent-color)' : 'transparent',
                        color: activeTab === 'players' ? '#000' : 'var(--text-primary)'
                    }}
                >
                    Manage Players
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    className="btn"
                    style={{
                        background: activeTab === 'users' ? 'var(--accent-color)' : 'transparent',
                        color: activeTab === 'users' ? '#000' : 'var(--text-primary)'
                    }}
                >
                    Manage Users
                </button>
            </div>

            {activeTab === 'tournaments' && (
                <div className="grid">
                    <div className="card">
                        <h3>Create Tournament</h3>
                        <form onSubmit={handleCreateTournament} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                            <input placeholder="Title" value={tForm.title} onChange={e => setTForm({ ...tForm, title: e.target.value })} required />
                            <select value={tForm.game} onChange={e => setTForm({ ...tForm, game: e.target.value })}>
                                <option value="BGMI">BGMI</option>
                                <option value="Free Fire">Free Fire</option>
                                <option value="CODM">CODM</option>
                                <option value="Valorant Mobile">Valorant Mobile</option>
                            </select>
                            <input type="number" placeholder="Prize Pool" value={tForm.prizePool} onChange={e => setTForm({ ...tForm, prizePool: e.target.value })} required />
                            <input type="date" value={tForm.startDate} onChange={e => setTForm({ ...tForm, startDate: e.target.value })} required />
                            <button type="submit" className="btn btn-primary">Create</button>
                        </form>
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                        {tournaments.map(t => (
                            <div key={t._id} className="card" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4>{t.title}</h4>
                                    <small>{t.game} - {t.status}</small>
                                </div>
                                <button className="btn btn-outline" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }} onClick={() => handleDeleteTournament(t._id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'players' && (
                <div className="grid">
                    <div className="card">
                        <h3>Create Player</h3>
                        <form onSubmit={handleCreatePlayer} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                            <input placeholder="IGN" value={pForm.ign} onChange={e => setPForm({ ...pForm, ign: e.target.value })} required />
                            <input placeholder="Real Name" value={pForm.realName} onChange={e => setPForm({ ...pForm, realName: e.target.value })} required />
                            <input type="number" placeholder="Age" value={pForm.age} onChange={e => setPForm({ ...pForm, age: e.target.value })} />
                            <input placeholder="Game Specialization" value={pForm.gameSpecialization} onChange={e => setPForm({ ...pForm, gameSpecialization: e.target.value })} />
                            <input type="number" placeholder="K/D" step="0.1" value={pForm.stats.kd} onChange={e => setPForm({ ...pForm, stats: { ...pForm.stats, kd: e.target.value } })} />
                            <input type="number" placeholder="Matches Played" value={pForm.stats.matchesPlayed} onChange={e => setPForm({ ...pForm, stats: { ...pForm.stats, matchesPlayed: e.target.value } })} />
                            <button type="submit" className="btn btn-primary">Create</button>
                        </form>
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                        {players.map(p => (
                            <div key={p._id} className="card" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4>{p.ign} ({p.realName})</h4>
                                    <small>Skill: {p.skillScore} | {p.tier}</small>
                                </div>
                                <button className="btn btn-outline" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }} onClick={() => handleDeletePlayer(p._id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'users' && (
                <div className="card">
                    <h3>Registered Users</h3>
                    <table style={{ marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u._id}>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.role}</td>
                                    <td>
                                        {u.role !== 'admin' && (
                                            <button
                                                className="btn btn-outline"
                                                style={{ padding: '4px 8px', fontSize: '0.8rem', color: 'var(--danger)', borderColor: 'var(--danger)' }}
                                                onClick={() => handleDeleteUser(u._id)}
                                            >
                                                Ban
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Admin;
