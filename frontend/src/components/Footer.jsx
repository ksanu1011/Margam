import { FaTwitter, FaDiscord, FaInstagram, FaTwitch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--glass-border)',
            marginTop: '80px',
            padding: '60px 0 20px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Top Neon Border Line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                boxShadow: '0 0 10px var(--accent)'
            }}></div>

            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', paddingBottom: '40px' }}>

                {/* Brand Section */}
                <div>
                    <h2 style={{ color: 'var(--accent)', fontSize: '1.8rem', marginBottom: '20px', textShadow: '0 0 10px var(--accent-glow)' }}>
                        MARGAM <span style={{ color: '#fff' }}>ESPORTS</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                        Digitizing the grassroots of Indian gaming. The path to pro starts here.
                    </p>
                    <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                        <SocialIcon icon={<FaTwitter />} />
                        <SocialIcon icon={<FaDiscord />} />
                        <SocialIcon icon={<FaInstagram />} />
                        <SocialIcon icon={<FaTwitch />} />
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{ color: '#fff', marginBottom: '20px', fontSize: '1.1rem' }}>Platform</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <li><FooterLink to="/tournaments">Tournaments</FooterLink></li>
                        <li><FooterLink to="/players">Leaderboards</FooterLink></li>
                        <li><FooterLink to="/sponsors">Sponsors</FooterLink></li>
                        <li><FooterLink to="/login">Login</FooterLink></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h4 style={{ color: '#fff', marginBottom: '20px', fontSize: '1.1rem' }}>Resources</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <li><FooterLink to="#">About Us</FooterLink></li>
                        <li><FooterLink to="#">Contact Support</FooterLink></li>
                        <li><FooterLink to="#">Privacy Policy</FooterLink></li>
                        <li><FooterLink to="#">Terms of Service</FooterLink></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 style={{ color: '#fff', marginBottom: '20px', fontSize: '1.1rem' }}>Stay Updated</h4>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '15px', fontSize: '0.9rem' }}>
                        Join the revolution. Get tournament alerts.
                    </p>
                    <div style={{ display: 'flex' }}>
                        <input
                            type="email"
                            placeholder="Enter email"
                            style={{
                                padding: '10px',
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                background: 'rgba(255,255,255,0.05)',
                                color: '#fff',
                                border: '1px solid var(--border-color)'
                            }}
                        />
                        <button style={{
                            padding: '10px 20px',
                            background: 'var(--accent)',
                            color: '#000',
                            border: 'none',
                            borderTopRightRadius: '8px',
                            borderBottomRightRadius: '8px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>GO</button>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                &copy; {new Date().getFullYear()} Margam Esports. All rights reserved.
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon }) => (
    <a href="#" style={{
        color: 'var(--text-secondary)',
        fontSize: '1.2rem',
        transition: '0.3s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)'
    }}
        onMouseOver={(e) => {
            e.currentTarget.style.color = 'var(--accent)';
            e.currentTarget.style.background = 'rgba(0, 255, 149, 0.1)';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
        }}
    >
        {icon}
    </a>
);

const FooterLink = ({ to, children }) => (
    <Link to={to} style={{ color: 'var(--text-secondary)', transition: '0.3s' }}
        onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
        onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
    >
        {children}
    </Link>
);

export default Footer;
