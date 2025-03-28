import React, { useEffect, useState } from 'react';

const Search = () => {
    const [items, setItems] = useState(["apple", "grapes", "banana", "anar", "lor"]);
    const [search, setSearch] = useState('');
    const [deBounceSearch, setDebounceSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    // Debounce effect
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceSearch(search);
        }, 1000);

        return () => clearTimeout(handler);
    }, [search]);

    // Filtering items when debounce value changes
    useEffect(() => {
        setFilteredItems(items.filter((item) => item.toLowerCase().includes(deBounceSearch.toLowerCase())));
    }, [deBounceSearch, items]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ul>
                {filteredItems.map((searchItem, index) => (
                    <li key={index}>{searchItem}</li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
