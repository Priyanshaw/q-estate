import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import EditModal from "../EditModal/EditModal";
import './ListingsTableView.css'

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
  // states for editing
  const [editingItem, setEditingItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // VARIABLES NEEDED
  const itemsPerPage = 10; // for viewing total items in a table
  const isAllSelected = selectedRows.length === itemsPerPage;

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
  const handleEdit = (data) => {
    setEditingItem(data);
    setIsEditModalOpen(true);
  };
  const handleEditSave = (editedItem) => {
    const updatedData = [...filteredData];

    const indexToBeEdited = updatedData.findIndex((data) => data.property_id === editedItem.property_id);

    if(indexToBeEdited !== -1){
      updatedData[indexToBeEdited] = editedItem;
      setFilteredData(updatedData);
    }
    setEditingItem(null);
  };

  const handleEditCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingItem(null);
  };
  // 2 delete function in htis we will make use of filtered data so whatever changes we make should reflect upon reselecting the item.

  const handleDelete = (id) => {
    const updatedData = filteredData.filter((data) => data.property_id !== id);

    const updatedTotalPages = Math.ceil(updatedData.length / itemsPerPage);
    if (currentPage > updatedTotalPages) {
      setCurrentPage(updatedTotalPages);
    }

    setFilteredData(updatedData);
    setSelectedRows([]);
  };
  const handleDeleteAllSelected = () => {
    if (selectedRows.length === 0) return;
    const updatedData = filteredData.filter(
      (data) => !selectedRows.includes(data.property_id)
    );

    const updatedTotalPages = Math.ceil(updatedData.length / itemsPerPage);
    if (currentPage > updatedTotalPages);
    setCurrentPage(updatedTotalPages);

    setFilteredData(updatedData);
    setSelectedRows([]);
  };

  // function for checkbox selection individual and all selection
  // 4 checkbox handlers

  const handleRowCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((item) => item !== id));
    }
  };
  const handleSelectAllCheckbox = (event, displayData) => {
    const isAllSelected = event.target.checked;

    if (isAllSelected) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      let rowsSelected = [];
      for (let i = startIndex; i < startIndex + itemsPerPage; i++) {
        if (i < displayData.length) {
          rowsSelected.push(displayData[i].property_id);
        } else {
          rowsSelected.push(Math.random()); // using math.random here as in last page we dont have 10 data so it will create a bug to avoid that we are adding some gibbereish data to it
        }
      }
      setSelectedRows(rowsSelected);
    } else {
      setSelectedRows([]);
    }
  };
  // 3 pagination function
  // HANDLING ALL THE PAGINATION CLICK FUNCTION

  const handleFirstPage = () => {
    setCurrentPage(1);
    setSelectedRows([]);
  };
  const handleLastPage = () => {
    setCurrentPage(totalPages);
    setSelectedRows([]);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setSelectedRows([]);
  };
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    setSelectedRows([]);
  };
  const handlePageClicks = (page) => {
    setCurrentPage(page);
    setSelectedRows([]);
  };

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

  const getPageNumbers = (totalPages) => {
    const pageNumbers = [];
    for (let currPage = 1; currPage <= totalPages; currPage++) {
      pageNumbers.push(currPage);
    }
    return pageNumbers;
  };
  const pageNumbers = getPageNumbers(totalPages);

  useEffect(() => {
    setFilteredData(listingsData);
  }, [listingsData]);

  useEffect(() => {
    // this use effect helps to soleve the bug when selecting price and location filter on page > 1 it shows page 11 of 4
    setCurrentPage(1);
    setSelectedRows([]);
  }, [locationFilter, priceRangeFilter]);

  return (
    <div className="listings-table-container">
      {/* table */}
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(event) =>
                  handleSelectAllCheckbox(event, displayData)
                }
                checked={isAllSelected}
              />
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
                  <input
                    type="checkbox"
                    onChange={(event) =>
                      handleRowCheckboxChange(event, data.property_id)
                    }
                    checked={selectedRows.includes(data.property_id)}
                  />
                </td>
                <td className="listing-property-name">{data.property_name}</td>
                <td>Rs{data.price}</td>
                <td>{data.address}</td>
                <td>{data.listing_date}</td>
                <td className="actions-items">
                  <MdDelete onClick={() => handleDelete(data.property_id)} />
                  <BiSolidEdit onClick={() => handleEdit(data)} />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {/* table footer */}
      <div className="table-footer">
        <button onClick={handleDeleteAllSelected}>Delete Selected</button>
        <div className="pagination-container">
          <span>
            Page {totalPages < 1 ? 0 : currentPage} of {totalPages}{" "}
            {/* if total page is 0 i.e no data from backend then our current should also be 0*/}
          </span>
          <div className="pagination">
            <button onClick={handleFirstPage} disabled={currentPage === 1}>
              First
            </button>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            {pageNumbers.map((page) => (
              <button key={page} onClick={() => handlePageClicks(page)}>
                {page}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditModal
          data={editingItem}
          onSave={handleEditSave}
          onClose={handleEditCloseModal}
        />
      )}
    </div>
  );
}
