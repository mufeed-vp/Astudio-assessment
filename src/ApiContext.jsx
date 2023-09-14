import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [userData, setUserData] = useState([]);
    const [limit, setLimit] = useState(5);
    const [skip, setSkip] = useState(0);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState('user');
    const [query, setQuery] = useState('');
    const [filterKey, setFilterKey] = useState('All');
    const [filterValue, setFilterValue] = useState('All');
    const [selectedAge, setSelectedAge] = useState('All');
    const [selectedGender, setSelectedGender] = useState("All");
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedIntegerPart, setSelectedIntegerPart] = useState('All');
    const [selectedDecimalPart, setSelectedDecimalPart] = useState('All');
    const [selectedCatgory, setSelectedCategory] = useState('All');

    

    const contextValue = {
        userData,
        setUserData,
        currentPage,
        setCurrentPage,
        limit,
        setLimit,
        skip,
        setSkip,
        total,
        setTotal,
        // currentPage,
        // setCurrentPage,
        query,
        setQuery,
        filterKey,
        setFilterKey,
        filterValue,
        setFilterValue,
        selectedAge, 
        setSelectedAge,
        selectedDate, 
        setSelectedDate,
        selectedGender, 
        setSelectedGender,
        selectedIntegerPart, 
        setSelectedIntegerPart,
        selectedDecimalPart, 
        setSelectedDecimalPart,
        selectedCatgory, 
        setSelectedCategory
    };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}
