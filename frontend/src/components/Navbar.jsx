import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const links = [
        { path: '/', label: 'Home' },
        { path: '/tournaments', label: 'Tournaments' },
        { path: '/players', label: 'Players' },
        { path: '/sponsors', label: 'Sponsors' },
    ];

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                MARGAM <span style={{ fontSize: '0.4em', color: 'var(--text-secondary)' }}>ESPORTS</span>
            </Link>
            <div className="nav-links" style={{ position: 'relative' }}>
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        style={{ position: 'relative', padding: '5px 0' }}
                    >
                        {link.label}
                        {location.pathname === link.path && (
                            <motion.div
                                layoutId="underline"
                                style={{
                                    position: 'absolute',
                                    bottom: '-4px',
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    background: 'var(--accent-cyan)',
                                    boxShadow: '0 0 10px var(--accent-cyan)'
                                }}
                            />
                        )}
                    </Link>
                ))}

                {user ? (
                    <>
                        {user.role === 'admin' && <Link to="/admin">Admin</Link>}
                        <Link to="/dashboard">Dashboard</Link>
                        <div style={{ marginLeft: '15px', color: 'var(--accent-pink)', fontWeight: 'bold' }}>{user.name}</div>
                        <button onClick={logout} className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '0.8rem', marginLeft: '10px' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ marginLeft: '20px' }}>Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
