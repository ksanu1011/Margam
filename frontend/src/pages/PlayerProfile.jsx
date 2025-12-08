import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';

const PlayerProfile = () => {
    const { id } = useParams();
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const res = await api.get(`/players/${id}`);
                setPlayer(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlayer();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!player) return <p>Player not found</p>;

    // Data for charts
    const performanceData = [
        { name: 'K/D', value: player.stats.kd * 10, fullMark: 100 }, // Scaled for chart
        { name: 'Wins', value: player.stats.wins, fullMark: 100 },
        { name: 'Headshot', value: player.stats.headshotRange, fullMark: 100 },
        { name: 'Matches', value: player.stats.matchesPlayed || 10, fullMark: 100 }
    ];

    return (
        <div>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '40px' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                    {player.ign.charAt(0)}
                </div>
                <div>
                    <h1 style={{ fontSize: '3rem', color: 'var(--accent-color)' }}>{player.ign}</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                        {player.realName} | {player.region} | <strong>{player.gameSpecialization}</strong>
                    </p>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{
                            background: player.tier === 'Pro' ? '#e74c3c' : player.tier === 'Semi-Pro' ? '#f39c12' : '#2ecc71',
                            color: '#fff',
                            padding: '6px 14px',
                            borderRadius: '20px',
                            fontWeight: 'bold',
                            marginRight: '15px'
                        }}>
                            {player.tier}
                        </span>
                        <span style={{ fontSize: '1.2rem' }}>Skill Score: <strong>{player.skillScore}</strong></span>
                    </div>
                </div>
            </div>

            <div className="grid">
                <div className="card">
                    <h3>Performance Metrics</h3>
                    <div style={{ height: '300px', marginTop: '20px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={performanceData}>
                                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                                <YAxis stroke="var(--text-secondary)" />
                                <Tooltip
                                    contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                                    itemStyle={{ color: 'var(--text-primary)' }}
                                />
                                <Bar dataKey="value" fill="var(--accent-color)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card">
                    <h3>Skill Radar</h3>
                    <div style={{ height: '300px', marginTop: '20px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart outerRadius={90} data={performanceData}>
                                <PolarGrid stroke="var(--border-color)" />
                                <PolarAngleAxis dataKey="name" stroke="var(--text-secondary)" />
                                <Radar
                                    name="Player"
                                    dataKey="value"
                                    stroke="var(--accent-color)"
                                    fill="var(--accent-color)"
                                    fillOpacity={0.6}
                                />
                                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerProfile;
