import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useUserContext } from '../ApiContext';
import styles from "./stlyles/FilterSearch.module.scss"

function FilterSearch() {

    const {
        setUserData,
        currentPage,
        limit,
        setLimit,
        setSkip,
        query,
        setQuery,
        filterKey,
        setFilterKey,
        filterValue,
        setFilterValue,
        selectedAge, 
        setSelectedAge,              
        setSelectedGender,           
        selectedGender,                     
        selectedDate, 
        setSelectedDate,           
        selectedIntegerPart, 
        setSelectedIntegerPart,
        selectedDecimalPart, 
        setSelectedDecimalPart,
        selectedCatgory, 
        setSelectedCategory    
    } = useUserContext();

  //Table limit
    const handlePageSizeChange = (e) => {
        setLimit(parseInt(e.target.value));
        setSkip(0);
    };

  //Age filter
    const ageOptions = Array.from({ length: 100 }, (_, index) => index + 1);
    const handleAgeChange = (event) => {
        setSelectedAge(parseInt(event.target.value));
        setFilterKey("age")
        setFilterValue(parseInt(event.target.value))
        console.log("ageeeeee")
    };

  //Gender filter
    const genderOptions = ['All', 'male', 'female', 'others'];
    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
        setFilterKey("gender")
        setFilterValue(event.target.value)
    };

  //Calander
    const handleDateChange = (date) => {
      // Format the date to 'YYYY-MM-DD' and set it in the state
      setSelectedDate(date ? date.toISOString().split('T')[0] : null);
      setFilterKey('birthDate')
      setFilterValue(date ? date.toISOString().split('T')[0] : null)
    };

  //weight
    const handleIntegerPartChange = (event) => {
        setSelectedIntegerPart(event.target.value);
        setFilterKey("weight")
        setFilterValue(event.target.value)
    };

    const handleDecimalPartChange = (event) => {
        setSelectedDecimalPart(event.target.value);
        setFilterValue(parseFloat(`${selectedIntegerPart}.${selectedDecimalPart}`))
        console.log(event.target.value,"qwerty")

    };

  //Poduct Category
    // const [selectedCatgory, setSelectedCategory] = useState('All');
    const category = ['All', 'laptop'];

    const handleCategory = (event) => {
        setSelectedCategory(event.target.value);
        setFilterValue(event.target.value)
    };

  return (
    <div className={styles.container}>
      <div className={styles.dropDown}>
        <select value={limit} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      {/* <div>
        <input
          className="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => handleQueryChange(e.target.value.toLowerCase())}
        />
      </div> */}
      <div className={`${styles.dropDown} ${styles.searchBorder}`}>
          <input
            className="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </div>
      <div>
        {/* Mapping userData */}
      </div>
      { currentPage === 'user' && currentPage !== 'product' ? 
        (
            <>
                <div className={styles.dropDown}>
                    <label htmlFor="age">Age:</label>
                    <select id="age" onChange={handleAgeChange} value={selectedAge}>
                    <option value="All">All</option>
                    {ageOptions.map((age, index) => (
                        <option key={age} value={age}>
                        {age}
                        </option>
                    ))}
                    </select>
                </div>
                <div className={styles.dropDown}>
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" onChange={handleGenderChange} value={selectedGender}>
                    {genderOptions.map((gender) => (
                        <option key={gender} value={gender}>
                        {gender}
                        </option>
                    ))}
                    </select>
                </div>
                <div className={styles.dropDown}>
                    <label htmlFor="dob">Date of Birth:</label>
                    <DatePicker
                    id="dob"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="YYYY-MM-DD"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    />
                </div>
                <div className={styles.dropDown}> 
                    <label htmlFor="weight">Weight:</label>
                    <select
                    id="weight"
                    onChange={handleIntegerPartChange}
                    value={selectedIntegerPart}
                    >
                    <option value="All">All</option>
                    {Array.from({ length: 1000 }, (_, index) => index + 1).map(
                        (number) => (
                        <option key={number} value={number.toString()}>
                            {number}
                        </option>
                        )
                    )}
                    </select>
                    <span>.</span>
                    <select onChange={handleDecimalPartChange} value={selectedDecimalPart}>
                    <option value="All">All</option>
                    {Array.from({ length: 10 }, (_, index) => index).map((number) => (
                        <option key={number} value={number.toString()}>
                        {number}
                        </option>
                    ))}
                    </select>
                </div> 
            </>
        ) : (
            <>
                <div className={styles.dropDown}>
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" onChange={handleCategory} value={selectedCatgory}>
                        {category.map((gender) => (
                        <option key={gender} value={gender}>
                            {gender}
                        </option>
                        ))}
                    </select>
                </div>
            </>
        )
      }
    </div>
  );
}

export default FilterSearch;


// import React from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useUserContext } from '../ApiContext';

// function FilterSearch() {
//   const {
//     limit,
//     setLimit,
//     query,
//     setQuery,
//     filterKey,
//     setFilterKey,
//     filterValue,
//     setFilterValue,
//     handleAgeChange,         // Add this line
//     selectedAge,             // Add this line
//     ageOptions,              // Add this line
//     handleGenderChange,      // Add this line
//     selectedGender,          // Add this line
//     genderOptions,           // Add this line
//     selectedDate,            // Add this line
//     handleDateChange,        // Add this line
//     handleIntegerPartChange, // Add this line
//     selectedIntegerPart,     // Add this line
//     handleDecimalPartChange, // Add this line
//     selectedDecimalPart,     // Add this line
//   } = useUserContext();

//   const handlePageSizeChange = (e) => {
//     setLimit(parseInt(e.target.value));
//   };

//   return (
//     <div>
//       <div>
//         <select value={limit} onChange={handlePageSizeChange}>
//           <option value={5}>5</option>
//           <option value={10}>10</option>
//           <option value={20}>20</option>
//           <option value={50}>50</option>
//         </select>
//       </div>
//       <div>
//         <input
//           className="search"
//           placeholder="Search..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value.toLowerCase())}
//         />
//       </div>
//       {/* Other filter components here */}
//       <div>
//         {/* Mapping userData */}
//       </div>
//       <div>
//         <label htmlFor="age">Age:</label>
//         <select id="age" onChange={handleAgeChange} value={selectedAge}>
//           {ageOptions.map((age, index) => (
//             <option key={age} value={age}>
//               {age}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label htmlFor="gender">Gender:</label>
//         <select id="gender" onChange={handleGenderChange} value={selectedGender}>
//           {genderOptions.map((gender) => (
//             <option key={gender} value={gender}>
//               {gender}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label htmlFor="dob">Date of Birth:</label>
//         <DatePicker
//           id="dob"
//           selected={selectedDate}
//           onChange={handleDateChange}
//           dateFormat="yyyy-MM-dd"
//           placeholderText="YYYY-MM-DD"
//           showYearDropdown
//           scrollableYearDropdown
//           yearDropdownItemNumber={100}
//         />
//       </div>
//       <div>
//         <label htmlFor="weight">Weight:</label>
//         <select
//           id="weight"
//           onChange={handleIntegerPartChange}
//           value={selectedIntegerPart}
//         >
//           {Array.from({ length: 1000 }, (_, index) => index + 1).map(
//             (number) => (
//               <option key={number} value={number.toString()}>
//                 {number}
//               </option>
//             )
//           )}
//         </select>
//         <span>.</span>
//         <select onChange={handleDecimalPartChange} value={selectedDecimalPart}>
//           {Array.from({ length: 10 }, (_, index) => index).map((number) => (
//             <option key={number} value={number.toString()}>
//               {number}
//             </option>
//           ))}
//         </select>
//       </div> 
//     </div>
//   );
// }

// export default FilterSearch;


