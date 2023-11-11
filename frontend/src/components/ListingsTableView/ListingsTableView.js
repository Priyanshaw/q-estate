import React, { useEffect, useState } from "react";

export default function ListingsTableView({
  listingsData,
  priceRangeFilter,
  locationFilter,
  sortBy,
}) {
  // states to be defined
  // 1. current page holder i.e, page 1 of 11
  // 2. state for filtered data upon deletion
  // 3. state for selected rows

  const [currentPage, setCurrentPage] = useState(1); // setting default page of table to 1
  const [filteredData, setFilteredData] = useState([]); // for handling the edit and delete action only
  const [selectedRows, setSelectedRows] = useState([]); // INITIALLY NONE OF THE ROWS ARE SELECETTED SO EMPTY ARRAY

  // VARIABLES NEEDED
  const itemsPerPage = 10; // for viewing total items in

  let displayData = applyFilters(
    filteredData,
    locationFilter,
    priceRangeFilter,
    sortBy
  ); // function call of apply filters on every re render
  // const totalPages;
  // const startIndex; // to keep track of data which is coming on respective pages from start
  // const endIndex; // to keep track of data which is coming on respective pages from end so that while selecting all only data of 4th page is selected.

  const totalPages = Math.ceil(displayData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage; // adding it will give the last content of that page for ex for pageNo - 3 we have (19 + 10) data

  // function to be defined
  // 1 editing funciton
  // 2 delete function
  // 3 pagination function
  // 4 checkbox

  // this function will appply all the filters
  function applyFilters(filteredData, location, priceRange, sortBy) {
    let updatedData = [...filteredData];

    if (location.length) {
      updatedData = updatedData.filter((listing) =>
        location.includes(listing.city)
      );
    }

    if (priceRange.length) {
      updatedData = updatedData.filter((listing) => {
        let found = false;
        priceRange.forEach((rangeEntry) => {
          let low = rangeEntry.split("-")[0];
          let high = rangeEntry.split("-")[1];
          if (
            Number(listing.price) >= Number(low) &&
            Number(listing.price) <= Number(high)
          ) {
            found = true;
          }
        });
        return found;
      });
    }

    if (sortBy === "price") {
      updatedData.sort(
        (firstListing, secondListing) =>
          firstListing.price - secondListing.price
      );
    } else if (sortBy === "date") {
      updatedData.sort(
        (firstListing, secondListing) =>
          new Date(firstListing.listing_date) -
          new Date(secondListing.listing_date)
      );
    }
    console.log("updated data is here", updatedData);
    return updatedData;
  }

  // function for displaying page no button

  const getPageNumbers = (totalPages) =>{
    const pageNumbers =[];
    for(let currPage= 1;currPage<=totalPages;currPage++){
      pageNumbers.push(currPage)
    }
    return pageNumbers;

  }
  const pageNumbers = getPageNumbers(totalPages); 

  useEffect(() => {
    setFilteredData(listingsData);
  }, [listingsData]);

  return (
    <div className="listings-table-container">
      {/* table */}
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" onChange={""} checked={""} />
            </th>
            <th>Property Name</th>
            <th>Price</th>
            <th>Address</th>
            <th>Listing Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayData.slice(startIndex, endIndex).map(
            (
              data,
              index // slice used here to slice the data from start endex this is how we have only 10 datas per page
            ) => (
              <tr className="table-row">
                <td>
                  <input type="checkbox" />
                </td>
                <td className="property-name">{data.property_name}</td>
                <td>Rs{data.price}</td>
                <td>{data.address}</td>
                <td>{data.listing_date}</td>
                <td className="actions-items"> delete , modify</td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {/* table footer */}
      <div className="table-footer">
        <button>Delete Selected</button>
        <div className="pagination-container">
          <span>
            Page {totalPages < 1 ? 0 : currentPage} of {totalPages} {/* if total page is 0 i.e no data from backend then our current should also be 0*/} 
          </span>
          <div className="pagination-button">
              <button>First</button>
              <button>Previous</button>
              {pageNumbers.map((page)=>(
                <button key={page}>{page}</button>
              ))}
              <button>Next</button>
              <button>Last</button>
          </div>
        </div>
      </div>
    </div>
  );
}
