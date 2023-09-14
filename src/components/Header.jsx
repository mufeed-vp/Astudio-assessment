import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUserContext } from '../ApiContext';

function Header() {

  const { 
    currentPage,
    setCurrentPage,
    setFilterKey,
    setFilterValue,
  } = useUserContext();

  const location = useLocation();

  // Define a function to check if the current location matches a given path
  const isActive = (path) => location.pathname === path;

  const headerContainer = {
    height: '50px',
    padding: '30px 30px 20px',
  }
  const userLinkStyle = {
    textDecoration: 'none',
    position: 'relative',
  };

  const productLinkStyle = {
    textDecoration: 'none',
    position: 'relative',
  };

  const coloredBackground = {
    position: 'absolute',
    content: '""',
    backgroundColor:'#fdc936',
    width: '100%', 
    height: '55%',
    bottom: '0',
    left: '0',
    zIndex: '-1',
    transform: 'skewX(-20deg)',
  };

  const userLinkHandler = () => {
    setCurrentPage('user')
    setFilterKey('All')
    setFilterValue('All')
  }

  const productHandler = () => {
    setCurrentPage('product')
    setFilterKey('All')
    setFilterValue('All')
  }

  return (
    <header style={headerContainer}>
      <nav>
        <Link to="/" style={userLinkStyle} onClick={userLinkHandler}>
        {currentPage === 'user'? <span style={coloredBackground}></span> : ""}
          User
        </Link>
        <span> / </span>
        <Link to="/product" style={productLinkStyle} onClick={productHandler}>
        {currentPage === 'product'? <span style={coloredBackground}></span> : ""}
          Product
        </Link>
      </nav>
    </header>
  );
}

export default Header;


// import React from 'react';
// // import { usePage } from '../context/PageContext';
// import {Link } from 'react-router-dom'

// function Header() {
//   // const { currentPage, setPage } = usePage();

//   return (
//     <div>
//       <header>
//         <nav>
//               <Link to="/">Home</Link>
//               <span>/</span>
//               <Link to="/product">Product</Link>
           
//         </nav>
//       </header>
//       {/* <button onClick={() => setPage('Home')}>Home</button>
//       <button onClick={() => setPage('Product')}>Product</button>
//       <h1>{currentPage}</h1> */}
//     </div>
//   );
// }

// export default Header;





