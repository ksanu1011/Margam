import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { FaChartLine, FaUsers, FaGlobe, FaHandshake, FaGem, FaCrown } from 'react-icons/fa';

const SponsorDashboard = () => {
    // Premium Demo Data
    const engagementData = [
        { name: 'Jan', viewHours: 4000, value: 2400 },
        { name: 'Feb', viewHours: 3500, value: 2210 },
        { name: 'Mar', viewHours: 5000, value: 3290 },
        { name: 'Apr', viewHours: 7800, value: 4500 },
        { name: 'May', viewHours: 9000, value: 6100 },
        { name: 'Jun', viewHours: 12000, value: 8500 },
    ];

    const demographicsData = [
        { name: '13-17', value: 35 },
        { name: '18-24', value: 45 },
        { name: '25-34', value: 15 },
        { name: '35+', value: 5 },
    ];

    return (
        <div style={{ paddingBottom: '100px' }}>
            {/* Hero Section */}
            <section className="hero" style={{ padding: '80px 0', position: 'relative' }}>
                <div className="floating-orb" style={{ top: '-50px', right: '10%' }}></div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>
                        PARTNER WITH THE <br />
                        <span style={{ color: 'var(--accent)', textShadow: '0 0 20px var(--accent-glow)' }}>FUTURE OF GAMING</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 40px' }}>
                        Margam Esports connects brands with the most engaged Gen-Z audience in India.
                        Data-driven ROI. Unmatched exposure.
                    </p>
                    <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
                        Become a Partner
                    </button>
                </motion.div>
            </section>

            {/* ROI Dashboard */}
            <section className="container" style={{ marginBottom: '80px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '2rem' }}>ROI <span style={{ color: 'var(--accent-cyan)' }}>DASHBOARD</span></h2>
                    <span style={{ color: 'var(--text-secondary)' }}>Live Analytics Preview</span>
                </div>

                <div className="grid">
                    {/* Main Growth Chart */}
                    <div className="card" style={{ gridColumn: 'span 2' }}>
                        <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FaChartLine style={{ color: 'var(--accent)' }} /> Viewer Engagement Growth
                        </h3>
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={engagementData}>
                                    <defs>
                                        <linearGradient id="colorView" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="name" stroke="var(--text-secondary)" />
                                    <YAxis stroke="var(--text-secondary)" />
                                    <Tooltip contentStyle={{ background: '#1A0B2E', border: '1px solid var(--accent)' }} />
                                    <Area type="monotone" dataKey="viewHours" stroke="var(--accent)" fillOpacity={1} fill="url(#colorView)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Key Stats Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="card" style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ color: 'var(--accent-pink)', fontSize: '2.5rem', fontWeight: 'bold' }}>12.5%</div>
                            <div style={{ color: 'var(--text-secondary)' }}>Click-Through Rate (CTR)</div>
                        </div>
                        <div className="card" style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ color: 'var(--accent-cyan)', fontSize: '2.5rem', fontWeight: 'bold' }}>₹450</div>
                            <div style={{ color: 'var(--text-secondary)' }}>Avg. User Spend</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Sponsor Us */}
            <section className="container" style={{ marginBottom: '100px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '50px' }}>WHY <span style={{ color: 'var(--accent-pink)' }}>CHOOSE MARGAM?</span></h2>
                <div className="grid">
                    <div className="card">
                        <FaUsers style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '20px' }} />
                        <h3>Massive Reach</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Access a dedicated community of 500k+ gamers across Tier 2 & 3 cities.</p>
                    </div>
                    <div className="card">
                        <FaGlobe style={{ fontSize: '3rem', color: 'var(--accent-cyan)', marginBottom: '20px' }} />
                        <h3>Hyper-Targeted</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Target users by region, game preference, and skill level with precision.</p>
                    </div>
                    <div className="card">
                        <FaHandshake style={{ fontSize: '3rem', color: 'var(--accent-pink)', marginBottom: '20px' }} />
                        <h3>Brand Safety</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Verified tournaments, anti-cheat protected matches, and strictly moderated content.</p>
                    </div>
                </div>
            </section>

            {/* Tiered Sponsor Showcase */}
            <section className="container">
                <h2 style={{ fontSize: '2rem', marginBottom: '40px', textAlign: 'center' }}>OUR <span style={{ color: '#fff' }}>PARTNERS</span></h2>

                {/* Diamond Tier */}
                <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'var(--accent-cyan)', marginBottom: '20px', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        <FaGem /> Diamond Partners
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                        <div className="card" style={{ width: '250px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--accent-cyan)', boxShadow: '0 0 20px rgba(138, 255, 239, 0.2)' }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>LOGITECH G</span>
                        </div>
                        <div className="card" style={{ width: '250px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--accent-cyan)', boxShadow: '0 0 20px rgba(138, 255, 239, 0.2)' }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>AMD</span>
                        </div>
                    </div>
                </div>

                {/* Gold Tier */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#FFD700', marginBottom: '20px', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        <FaCrown /> Gold Partners
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        <div className="card" style={{ width: '200px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #FFD700', opacity: 0.8 }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>RED BULL</span>
                        </div>
                        <div className="card" style={{ width: '200px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #FFD700', opacity: 0.8 }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>MONSTER</span>
                        </div>
                        <div className="card" style={{ width: '200px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #FFD700', opacity: 0.8 }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>INTEL</span>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default SponsorDashboard;
