import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { motion } from 'framer-motion';
import { FaUserAstronaut, FaGamepad, FaTrophy, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [createMode, setCreateMode] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        ign: '',
        realName: '',
        age: '',
        gameSpecialization: 'BGMI',
        region: 'India'
    });

    useEffect(() => {
        const fetchPlayerProfile = async () => {
            if (user) {
                try {
                    // Filter players by logged-in user ID
                    const res = await api.get(`/players?user=${user._id}`);
                    if (res.data.data.length > 0) {
                        setPlayer(res.data.data[0]);
                    }
                } catch (err) {
                    console.error("Error fetching profile", err);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchPlayerProfile();
    }, [user]);

    const handleCreateProfile = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/players', formData);
            setPlayer(res.data.data);
            setCreateMode(false);
            alert("Welcome to the Arena, Player!");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to create profile");
        }
    };

    if (loading) return <div className="container" style={{ paddingTop: '100px' }}>Loading...</div>;

    return (
        <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 className="neon-text">Command Center</h1>
                <button onClick={logout} className="btn btn-outline" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>Logout</button>
            </div>

            <div className="grid">
                {/* User Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{
                            width: '60px', height: '60px',
                            borderRadius: '50%', background: 'var(--accent-gradient)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.5rem', color: '#000'
                        }}>
                            <FaUserAstronaut />
                        </div>
                        <div>
                            <h3>{user?.name}</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>{user?.email}</p>
                            <span className="badge" style={{ marginTop: '5px', display: 'inline-block' }}>{user?.role}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Player Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card"
                    style={{ gridColumn: 'span 2' }}
                    key={player ? 'profile' : 'no-profile'}
                >
                    {player ? (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem' }}>{player.ign}</h2>
                                    <p style={{ fontSize: '1.1rem' }}>{player.realName} | {player.region}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>{player.skillScore}</div>
                                    <div className="badge">{player.tier}</div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginTop: '25px', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '10px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Game</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{player.gameSpecialization}</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>K/D Ratio</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#4ade80' }}>{player.stats.kd}</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Wins</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#facc15' }}>{player.stats.wins}</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Matches</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{player.stats.matchesPlayed}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            <FaGamepad size={50} style={{ color: 'var(--text-secondary)', marginBottom: '15px' }} />
                            <h2>Become a Player</h2>
                            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 20px' }}>
                                Create your specialized player profile to join tournaments, track stats, and climb the global leaderboards.
                            </p>
                            {!createMode ? (
                                <button onClick={() => setCreateMode(true)} className="btn btn-primary" style={{ padding: '12px 30px', fontSize: '1.1rem' }}>
                                    Initialize Profile
                                </button>
                            ) : (
                                <form onSubmit={handleCreateProfile} style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        <div className="form-group">
                                            <label>IGN (In-Game Name)</label>
                                            <input required value={formData.ign} onChange={e => setFormData({ ...formData, ign: e.target.value })} placeholder="e.g. Viper" />
                                        </div>
                                        <div className="form-group">
                                            <label>Real Name</label>
                                            <input required value={formData.realName} onChange={e => setFormData({ ...formData, realName: e.target.value })} placeholder="e.g. Yash Soni" />
                                        </div>
                                        <div className="form-group">
                                            <label>Age</label>
                                            <input required type="number" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Region</label>
                                            <input required value={formData.region} onChange={e => setFormData({ ...formData, region: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ marginTop: '15px' }}>
                                        <label>Primary Game</label>
                                        <select value={formData.gameSpecialization} onChange={e => setFormData({ ...formData, gameSpecialization: e.target.value })}>
                                            <option value="BGMI">BGMI</option>
                                            <option value="Valorant">Valorant</option>
                                            <option value="CODM">Call of Duty Mobile</option>
                                            <option value="Free Fire">Free Fire</option>
                                            <option value="CS:GO">CS:GO</option>
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Confirm Identity</button>
                                        <button type="button" onClick={() => setCreateMode(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>

            {/* My Tournaments Section */}
            {player && (
                <div style={{ marginTop: '50px' }}>
                    <h2 className="section-title">My Tournaments</h2>
                    <div className="card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                        <FaTrophy size={40} style={{ marginBottom: '15px', opacity: 0.5 }} />
                        <p>You haven't joined any tournaments yet.</p>
                        <a href="/tournaments" className="btn btn-outline" style={{ marginTop: '15px', display: 'inline-block' }}>Browse Tournaments</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
