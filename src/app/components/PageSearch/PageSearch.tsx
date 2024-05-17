"use client";
import React, { useState } from 'react'
import Search from '../Search/Search'

const PageSearch = () => {

    const[roomTypeFilter,setRoomTypeFilter] = useState("");
    const[searchQuery,setSearchQuery] = useState("");

  return (
    <Search 
    setRoomTypeFilter={setRoomTypeFilter} 
    searchQuery={searchQuery} 
    roomTypeFilter={roomTypeFilter}
    setSearchQuery={setSearchQuery}
    />
  );
};

export default PageSearch;