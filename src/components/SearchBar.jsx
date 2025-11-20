import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SearchBar = ({ className = '' }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            if (query.trim()) {
                navigate(`/cards?search=${encodeURIComponent(query)}`);
            }
        }
    };

    return (
        <div className={`relative ${className}`}>
            <input
                type="text"
                placeholder="Search cards..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all shadow-sm text-text-main placeholder:text-text-muted"
            />
            <button onClick={handleSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors">
                <Search className="w-4 h-4" />
            </button>
        </div>
    );
};

export default SearchBar;
