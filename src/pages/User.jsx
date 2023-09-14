import React, { useEffect ,useState, } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Pagination from "../components/Pagination"
import TableComponent from '../components/TableComponent'
import FilterSearch from '../components/FilterSearch'
import {useUserContext} from '../ApiContext'

function User() {

  const {
    userData,
    setUserData,
    limit,
    setLimit,
    skip,
    setSkip,
    total,
    setTotal,
    query,
    setQuery,
    filterKey,
    setFilterKey,
    filterValue,
    setFilterValue,
    // handleAgeChange,         // Add this line
    // selectedAge,             // Add this line
    // ageOptions,              // Add this line
    // handleGenderChange,      // Add this line
    // selectedGender,          // Add this line
    // genderOptions,           // Add this line
    // selectedDate,            // Add this line
    // handleDateChange,        // Add this line
    // handleIntegerPartChange, // Add this line
    // selectedIntegerPart,     // Add this line
    // handleDecimalPartChange, // Add this line
    // selectedDecimalPart,     // Add this line
  } = useUserContext();
    const baseUrl = "https://dummyjson.com/users"
    // const [userData, setUserData] = useState([])
    // const [limit, setLimit] = useState(5)
    // const [skip, setSkip] =useState(0)
    // const [total, setTotal] = useState(0)
    const [currentPageValue, setCurrentPageValue] = useState(1)
    // const [query, setQuery] = useState("");
    // const [filterKey, setFilterKey] = useState("")
    // const [filterValue, setFilterValue] = useState(null)   
  
    useEffect(() => {
      if(query === ""){
        fetchData();
      } else {
        const filteredData = userData.filter((user) =>
          Object.values(user).some((value) =>
            value.toString().toLowerCase().includes(query.toLowerCase())
          )
        );
        
        setUserData(filteredData);
      }
    }, [limit,currentPageValue,query,filterKey,filterValue]);

    const fetchData = async () => {
        try {
          setSkip((currentPageValue - 1) * limit);
          let data = {}
          if(filterKey === 'All' && filterValue === 'All'){
            const response = await axios.get(`${baseUrl}?limit=${limit}&skip=${skip}&select=firstName,lastName,maidenName,age,gender,email,phone,username,password,birthDate,bloodGroup,height,weight`);
            data = response.data
          } else {
            console.log("filter valuees",filterValue)
            const response = await axios.get(`${baseUrl}/filter?key=${filterKey}&value=${filterValue}&limit=${limit}&skip=${skip}&select=firstName,lastName,maidenName,age,gender,email,phone,username,password,birthDate,bloodGroup,height,weight`);
            data = response.data
          }
          setUserData(data.users)
          console.log("response",data)
          setTotal(data.total);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    const handlePageChange = (newPage) => {
      setCurrentPageValue(newPage);
    };
// Drop down selector 
 //age
    // const [selectedAge, setSelectedAge] = useState(1);

  // const handleAgeChange = (event) => {
  //   setSelectedAge(parseInt(event.target.value));
  //   setFilterKey("age")
  //   setFilterValue(parseInt(event.target.value))
  //   console.log("ageeeeee")
  // };

//   const ageOptions = Array.from({ length: 100 }, (_, index) => index + 1);
//  //gender
//     const [selectedGender, setSelectedGender] = useState('All');
//     const genderOptions = ['All', 'male', 'female', 'others'];

//     const handleGenderChange = (event) => {
//       setSelectedGender(event.target.value);
//       setFilterKey("gender")
//       setFilterValue(event.target.value)
//     };

//   //calander
//     const [selectedDate, setSelectedDate] = useState(null);

//     const handleDateChange = (date) => {
//       // Format the date to 'YYYY-MM-DD' and set it in the state
//       setSelectedDate(date ? date.toISOString().split('T')[0] : null);
//       setFilterKey('birthDate')
//       setFilterValue(date ? date.toISOString().split('T')[0] : null)
//     };
//     const [selectedIntegerPart, setSelectedIntegerPart] = useState(0);
//     const [selectedDecimalPart, setSelectedDecimalPart] = useState(0);
  
//     const handleIntegerPartChange = (event) => {
//       setSelectedIntegerPart(event.target.value);
//       setFilterKey("weight")
//       setFilterValue(event.target.value)
//     };
  
//     const handleDecimalPartChange = (event) => {
//       setSelectedDecimalPart(event.target.value);
//       setFilterValue(parseFloat(`${selectedIntegerPart}.${selectedDecimalPart}`))
//       console.log(event.target.value,"qwerty")

//     };
  
    // Combine the integer and decimal parts into a floating-point number
    // const combinedValue = parseFloat(`${selectedIntegerPart}.${selectedDecimalPart}`);
    // console.log("combinedValue..",combinedValue)

    //searching option

    //TableComponent size
      // const handlePageSizeChange = (e) => {
      //   setLimit(parseInt(e.target.value));
      //   setSkip(0);
      // };

      // const handleFilterChange = (key, value) => {
      //   setFilterKey(key);
      //   setFilterValue(value);
      // };
  
  return (
    <div>
      {/* <div> */}
      {/* <FilterSearch
        limit={limit}
        handlePageSizeChange={handlePageSizeChange}
        query={query}
        handleQueryChange={setQuery}
        ageOptions={ageOptions}
        selectedAge={selectedAge}
        handleAgeChange={handleAgeChange}
        genderOptions={genderOptions}
        selectedGender={selectedGender}
        handleGenderChange={handleGenderChange}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        selectedIntegerPart={selectedIntegerPart}
        selectedDecimalPart={selectedDecimalPart}
        handleIntegerPartChange={handleIntegerPartChange}
        handleDecimalPartChange={handleDecimalPartChange}
      />
      </div> */}
      
      <div>
        <FilterSearch />
        {/* <div>
        <select value={limit} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        </div> */}
        {/* <div>
          <input
            className="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </div> */}
        {/* <div>
          {userData.map((user) => (
            <div key={user.id}>
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
            <select id="age" onChange={handleAgeChange} value={selectedAge}>
              {ageOptions.map((age,index) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" onChange={handleGenderChange} value={selectedGender}>
            {genderOptions.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
        <div>
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
        <div>
          <label htmlFor="weight">Weight:</label>
          <select id="weight" onChange={handleIntegerPartChange} value={selectedIntegerPart}>
            {Array.from({ length: 1000 }, (_, index) => index + 1).map((number) => (
              <option key={number} value={number.toString()}>
                {number}
              </option>
            ))}
          </select>
          <span>.</span>
          <select onChange={handleDecimalPartChange} value={selectedDecimalPart}>
            {Array.from({ length: 10 }, (_, index) => index).map((number) => (
              <option key={number} value={number.toString()}>
                {number}
              </option>
            ))}
          </select>
        </div> */}
      </div>
      <div>
          <TableComponent  />
        {/* <table>
          <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Maiden Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Username</th>
                <th>Password</th>
                <th>Birth Date</th>
                <th>Blood Group</th>
                <th>Height</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              { userData.length > 0? 
                userData.map((user) => (
                    <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.maidenName}</td>
                    <td>{user.age}</td>
                    <td>{user.gender}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td>{user.birthDate}</td>
                    <td>{user.bloodGroup}</td>
                    <td>{user.height}</td>
                    <td>{user.weight}</td>
                    </tr>
                )) :
                <tr>
                  <td colSpan="13">Loading...</td>
                </tr>
            }
          </tbody>
        </table> */}
      </div>
      <Pagination 
        total={total}
        limit={limit}
        onPageChange={handlePageChange}
        currentPageValue={currentPageValue}
      />
    </div>
  )
}

export default User



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Pagination from "../components/Pagination";
// import Table from '../components/Table';
// import FilterSearch from '../components/FilterSearch';
// import { useUserContext } from '../ApiContext';

// function User() {
//   const baseUrl = "https://dummyjson.com/users";
//   const {
//     userData,
//     setUserData,
//     limit,
//     setLimit,
//     skip,
//     setSkip,
//     total,
//     setTotal,
//     currentPage,
//     setCurrentPage,
//     query,
//     setQuery,
//     filterKey,
//     setFilterKey,
//     filterValue,
//     setFilterValue,
//   } = useUserContext();

//   useEffect(() => {
//     fetchData();
//   }, [limit, currentPage, filterKey, filterValue]);

//   const fetchData = async () => {
//     try {
//       setSkip((currentPage - 1) * limit);
//       let response;

//       if (filterKey === 'age' || filterKey === 'gender' || filterKey === 'birthDate' || filterKey === 'weight') {
//         response = await axios.get(
//           `${baseUrl}/filter?key=${filterKey}&value=${filterValue}&limit=${limit}&skip=${skip}`
//         );
//       } else {
//         response = await axios.get(
//           `${baseUrl}?limit=${limit}&skip=${skip}&select=firstName,lastName,maidenName,age,gender,email,phone,username,password,birthDate,bloodGroup,height,weight`
//         );
//       }

//       setUserData(response.data.users);
//       setTotal(response.data.total);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   return (
//     <div>
//       <FilterSearch />
//       <div>
//         {userData.length > 0 ? 
//           <Table data={userData} />
//           :
//           <Table data={[]} />
//         }
//       </div>
//       <Pagination 
//         total={total}
//         limit={limit}
//         onPageChange={handlePageChange}
//         currentPage={currentPage}
//       />
//     </div>
//   );
// }

// export default User;


