import React, { useEffect ,useState, } from 'react'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css';
import Pagination from "../components/Pagination";
import TableComponent from '../components/TableComponent';
import FilterSearch from '../components/FilterSearch'
import { useUserContext } from '../ApiContext';

function Product() {

    const {
        userData, 
        setUserData,
        limit,
        skip , setSkip,
        filterValue, query,total,
        setTotal,
    } = useUserContext();

    const baseUrl = "https://dummyjson.com/users"
    const APi = `https://dummyjson.com/users/filter?key=hair.color&value=Brown`
    // const [userData, setUserData] = useState([])
    // const [limit, setLimit] = useState(5)
    // const [skip , setSkip] = useState(0)
    // const [total, setTotal] = useState(0)
    const [currentPageValue, setCurrentPageValue] = useState(1)
    // const [query, setQuery] = useState("");
    // const [filterValue, setFilterValue] = useState("All")

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
    }, [limit,currentPageValue,query,filterValue]);

    const fetchData = async () => {
        try {
          setSkip((currentPageValue - 1) * limit);
          let data = {}
          if(filterValue ==="All" && filterValue !== 'laptop'){
            const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,brand,category`);
            data = response.data
          } else {
            console.log("filter valuees",filterValue)
            const response = await axios.get(`https://dummyjson.com/products/category/laptops?limit=${limit}&skip=${skip}&select=title,brand,category`);
            data = response.data
          }
          setUserData(data.products)
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

 //category
    // const [selectedCatgory, setSelectedCategory] = useState('All');
    // const category = ['All', 'laptop'];

    // const handleCategory = (event) => {
    //   setSelectedCategory(event.target.value);
    //   setFilterValue(event.target.value)
    // };

    //TableComponent size
    //   const handlePageSizeChange = (e) => {
    //     setLimit(parseInt(e.target.value));
    //     setSkip(0)
    //   };
  
  return (
    <div>
        <div>
            <FilterSearch />
            {/* <div>
                <select value={limit} onChange={handlePageSizeChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                </select>
            </div>
            <div>
            <input
                className="search"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
            </div>
            <div>
                <label htmlFor="gender">Gender:</label>
                <select id="gender" onChange={handleCategory} value={selectedCatgory}>
                    {category.map((gender) => (
                    <option key={gender} value={gender}>
                        {gender}
                    </option>
                    ))}
                </select>
            </div> */}
        </div>
      <div>
        <TableComponent />
        {/* <table>
          <thead>
              <tr>
                <th>Title</th>
                <th>Brand</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              { userData.length > 0? 
                userData.map((product) => (
                    <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.brand}</td>
                    <td>{product.category}</td>
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

export default Product
