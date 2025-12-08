import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ page, pages, changePage }) => {
    if (pages <= 1) return null;

    // Helper to generate page numbers
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxButtons = 5;
        let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
        let endPage = Math.min(pages, startPage + maxButtons - 1);

        if (endPage - startPage + 1 < maxButtons) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '40px' }}>
            {/* Prev Button */}
            <motion.button
                whileHover={{ scale: 1.1, boxShadow: '0 0 15px var(--accent-glow)' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => changePage(page - 1)}
                disabled={page === 1}
                style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: page === 1 ? 'not-allowed' : 'pointer',
                    opacity: page === 1 ? 0.3 : 1,
                    color: 'var(--accent-cyan)'
                }}
            >
                <FaChevronLeft />
            </motion.button>

            {/* Page Numbers */}
            {getPageNumbers().map((num) => (
                <motion.button
                    key={num}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => changePage(num)}
                    style={{
                        background: page === num ? 'var(--accent)' : 'transparent',
                        border: page === num ? '1px solid var(--accent)' : '1px solid var(--border-color)',
                        borderRadius: '8px',
                        width: '40px',
                        height: '40px',
                        color: page === num ? '#fff' : 'var(--text-secondary)',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: page === num ? '0 0 15px var(--accent-glow)' : 'none'
                    }}
                >
                    {num}
                </motion.button>
            ))}

            {/* Next Button */}
            <motion.button
                whileHover={{ scale: 1.1, boxShadow: '0 0 15px var(--accent-glow)' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => changePage(page + 1)}
                disabled={page === pages}
                style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: page === pages ? 'not-allowed' : 'pointer',
                    opacity: page === pages ? 0.3 : 1,
                    color: 'var(--accent-cyan)'
                }}
            >
                <FaChevronRight />
            </motion.button>
        </div>
    );
};

export default Pagination;
