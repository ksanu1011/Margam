import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';
import { FaTrophy, FaChartLine, FaShieldAlt, FaRocket, FaGamepad, FaClock, FaFire } from 'react-icons/fa';

// Import local image (will need to move file there)
// For now using the absolute path or a placeholder if I haven't moved it yet.
// I'll assume I will move it to /public/hero-bg.png
const HERO_BG = "/hero-bg-purple.png";

// --- 3D Tilt Card Component ---
const TiltCard = ({ title, description, icon, delay }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay }}
            className="card"
        >
            <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d", display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', color: 'var(--accent)', marginBottom: '20px', filter: 'drop-shadow(0 0 10px var(--accent-glow))' }}>
                    {icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#fff' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{description}</p>
            </div>
        </motion.div>
    );
};

// --- Animated Counter Component ---
const AnimatedCounter = ({ value, label, suffix = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Quick and dirty animated number implementation for effect
    // Ideally use 'framer-motion' animate function logic for numbers

    return (
        <div ref={ref} style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '3rem', color: 'var(--accent)', fontWeight: '800', textShadow: '0 0 20px var(--accent-glow)' }}>
                {value}{suffix}
            </h2>
            <p style={{ textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '5px' }}>
                {label}
            </p>
        </div>
    );
};

// --- Path to Pro Component ---
const PathStep = ({ title, icon, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1, flex: 1 }}
    >
        <div style={{
            width: '60px', height: '60px', borderRadius: '50%', background: 'var(--bg-secondary)',
            border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', color: 'var(--accent)', boxShadow: '0 0 15px var(--accent-glow)', marginBottom: '15px'
        }}>
            {icon}
        </div>
        <h4 style={{ color: '#fff' }}>{title}</h4>
        {index < 3 && (
            <div style={{
                position: 'absolute', top: '30px', left: '50%', width: '100%', height: '2px',
                background: 'linear-gradient(90deg, var(--accent), transparent)', zIndex: -1
            }}></div>
        )}
    </motion.div>
);


const Home = () => {
    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Background 3D Grid */}
            <div className="cyber-grid"></div>
            <div className="cyber-grid-fade"></div>

            {/* Glowing Orbs */}
            <div className="floating-orb" style={{ top: '10%', left: '20%' }}></div>
            <div className="floating-orb" style={{ bottom: '20%', right: '10%', animationDelay: '2s', background: 'radial-gradient(circle, rgba(0,255,149,0.2), transparent 70%)' }}></div>

            {/* --- HERO SECTION --- */}
            <section className="hero" style={{ position: 'relative', paddingTop: '120px', paddingBottom: '120px' }}>
                {/* Hero Image Overlay */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundImage: `url(${HERO_BG})`, backgroundSize: 'cover', backgroundPosition: 'center',
                    opacity: 0.15, zIndex: -1, mixBlendMode: 'screen'
                }}></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 style={{ marginBottom: '10px', fontSize: '4.5rem', letterSpacing: '-2px' }}>
                        THE PATH TO <span style={{ textShadow: "0 0 30px var(--accent-glow)", color: '#fff' }}>PRO</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    style={{ maxWidth: '600px', margin: '0 auto 40px', fontSize: '1.3rem', color: 'var(--text-secondary)' }}
                >
                    Margam Esports formalizes the grassroots gaming scene in India.
                    <br />Competing is no longer chaos—it's a career.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}
                >
                    <Link to="/tournaments" className="btn btn-primary glow-btn">
                        Find Tournaments
                    </Link>

                    <Link to="/players" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>Scout Talent</span>
                        <span style={{ fontSize: '1.2rem' }}>→</span>
                    </Link>
                </motion.div>
            </section>

            {/* --- LIVE TICKER (Mock) --- */}
            <div style={{ background: 'var(--accent)', color: '#000', padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                <motion.div
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    style={{ display: 'inline-block' }}
                >
                    🔴 LIVE: WINTER SKIRMISH FINALS • NEXT MATCH: 18:00 IST • PRIZE POOL: ₹10,000 • TIER 1 SCRIMS STARTING SOON • 🔴 LIVE: WINTER SKIRMISH FINALS
                </motion.div>
            </div>

            {/* --- METRICS BAR --- */}
            <section style={{ padding: '60px 0', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)' }}>
                <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '40px' }}>
                    <AnimatedCounter value="50" suffix="K+" label="Active Players" />
                    <AnimatedCounter value="200" suffix="K+" label="Verified Matches" />
                    <AnimatedCounter value="28" label="States Covered" />
                    <AnimatedCounter value="500" suffix="+" label="Tournaments" />
                </div>
            </section>

            {/* --- PATH TO PRO ROADMAP --- */}
            <section className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '60px' }}>YOUR <span style={{ color: 'var(--accent)' }}>CAREER ROADMAP</span></h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                    <PathStep index={0} icon={<FaGamepad />} title="Casual" />
                    <PathStep index={1} icon={<FaFire />} title="Amateur" />
                    <PathStep index={2} icon={<FaShieldAlt />} title="Semi-Pro" />
                    <PathStep index={3} icon={<FaTrophy />} title="Pro Athlete" />
                </div>
            </section>

            {/* --- FEATURES SECTION --- */}
            <section className="container" style={{ padding: '100px 20px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '60px' }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>WHY CHOOSE <span style={{ color: 'var(--accent)' }}>MARGAM</span></h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Built for players, trusted by sponsors.</p>
                </motion.div>

                <div className="grid" style={{ perspective: '1000px' }}>
                    <TiltCard
                        delay={0.1}
                        icon={<FaShieldAlt />}
                        title="Anti-Cheat System"
                        description="Verified gameplay integrity. We ensure fair play for every single match hosted on our platform."
                    />

                    <TiltCard
                        delay={0.3}
                        icon={<FaChartLine />}
                        title="AI Skill Scoring"
                        description="Our algorithm tracks K/D, win rates, and impact to generate one universal skill score."
                    />

                    <TiltCard
                        delay={0.5}
                        icon={<FaTrophy />}
                        title="Guaranteed Payouts"
                        description="Secure prize pools held in escrow. Winners get paid instantly, no delays, no excuses."
                    />
                    <TiltCard
                        delay={0.7}
                        icon={<FaRocket />}
                        title="Path to Pro"
                        description="The top 1% get recruited by franchise teams. Your career starts with your first scrim."
                    />
                </div>
            </section>

            {/* --- COMMUNITY / TESTIMONIALS --- */}
            <section style={{ padding: '80px 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', marginBottom: '40px' }}>JOIN THE <span style={{ color: 'var(--accent)' }}>REVOLUTION</span></h2>
                    <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px', justifyContent: 'center' }}>

                        <div className="card" style={{ minWidth: '300px', maxWidth: '350px', textAlign: 'left' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                <div style={{ width: '50px', height: '50px', background: '#333', borderRadius: '50%' }}></div>
                                <div>
                                    <h4 style={{ color: 'var(--accent)' }}>Mortal</h4>
                                    <small style={{ color: 'var(--text-secondary)' }}>Pro Player, Soul</small>
                                </div>
                            </div>
                            <p style={{ color: '#eee', fontStyle: 'italic' }}>"Margam is exactly what the Indian ecosystem needed. A structured way to find new talent."</p>
                        </div>

                        <div className="card" style={{ minWidth: '300px', maxWidth: '350px', textAlign: 'left' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                <div style={{ width: '50px', height: '50px', background: '#333', borderRadius: '50%' }}></div>
                                <div>
                                    <h4 style={{ color: 'var(--accent)' }}>ScoutOP</h4>
                                    <small style={{ color: 'var(--text-secondary)' }}>Content Creator</small>
                                </div>
                            </div>
                            <p style={{ color: '#eee', fontStyle: 'italic' }}>"Finally, a platform that tracks stats reliably. The skill score is a game changer."</p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
