import { useState } from 'react'
import { MdSearch } from 'react-icons/md'
import './SearchBar.scss'

export interface SearchBarProps {
    loadFormations: (query?: string) => void
    currentQuery: string
}

const SearchBar = (props: SearchBarProps) => {
    const { loadFormations, currentQuery } = props

    const [value, setValue] = useState<string>(currentQuery)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            loadFormations(value)
        }
    }

    return (
        <div className="pcs-searchbar">
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="pcs-searchbar-input"
                type="text"
                placeholder="Rechercher"
                onKeyPress={handleKeyDown}
            />
            <MdSearch
                className="pcs-searchbar-button"
                onClick={() => loadFormations(value)}
            />
        </div>
    )
}

export default SearchBar
