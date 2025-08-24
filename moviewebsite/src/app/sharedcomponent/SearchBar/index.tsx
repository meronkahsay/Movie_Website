"use client";
import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'

interface Props {
  onSearch: (query: string) => void;
}
const SearchBar: React.FC<Props> = ({ onSearch }) => {
const [query, setQuery] = useState("");
 const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== '') {
      onSearch(query); 
    }
  };
  return (
    <div>
        <form className='relative' onSubmit={handleSubmit} >
    <FiSearch className='absolute top-2 left-3 text-xl'/>
       <input type='text' placeholder='Search' 
value={query}
   onChange={(e) => setQuery(e.target.value)}
 className='relative border rounded-2xl w-250 px-11 py-1.5 focus:outline-white '></input>

   </form>
    </div>
  )
}

export default SearchBar











