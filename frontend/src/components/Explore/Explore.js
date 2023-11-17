import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import config from "../../config";
import CheckBoxFilter from "../CheckBoxFilter/CheckBoxFilter";
import SortingFilter from "../SortingFilter/SortingFilter";
import ListingsTableView from "../ListingsTableView/ListingsTableView";
import Footer from "../Footer/Footer";
import './Explore.css'

export default function Explore() {
  const [listingsData, setListingsData] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [priceRangeFilter, setpriceRangeFilter] = useState([]);
  const [sortBy, setSortBy] = useState("");

  async function fetchListingsData() {
    try {
      let response = await axios.get(`${config.backEndPoint}/real-estate-data`);
      let data = response.data.listings;
      console.log(data);
      setListingsData(data);
      // console.log("This is listing data",listingsData);
    } catch (error) {
      console.log(error);
    }
  }
  // filter handlers or the filter function

  const handleLocationFilterChange = (event) => {
    // console.log(' location function called and checkbox clicked')
    const isChecked = event.target.checked;
    if(isChecked){
        setLocationFilter((prevState)=> [...prevState, event.target.value]);
    }
    else{
        setLocationFilter((prevState)=>
            prevState.filter((item)=>item !== event.target.value)
        )
       
    };
}
  const handlePriceFilterChange = (event) => {
    const isChecked = event.target.checked;
    if(isChecked){
        setpriceRangeFilter((prevState)=> [...prevState, event.target.value]);
    }
    else{
        setpriceRangeFilter((prevState)=>
        prevState.filter((item)=> item!== event.target.value)
        )
    }
    
  };
  const handleSortByChange = (event) => {
    setSortBy(event.target.value)

  };

  // use effect to call the function whuch is calling the api
  useEffect(() => {
    fetchListingsData();
  }, []);
  return (
    <>
      <Header onPage="explore" />

      <div className="property-listings-view">

        <CheckBoxFilter 
        handlePriceFilterChange={handlePriceFilterChange} // these two function are there to handle the logic upon 
        handleLocationFilterChange={handleLocationFilterChange} // changing and clicking of check boxes
        // these state variables are there to know which checkboxes are selected and are needed to passed as a props 
        priceRangeFilter={priceRangeFilter}
        locationFilter={locationFilter}
        />
        <SortingFilter sortBy={sortBy} handleSortByChange={handleSortByChange}/>

        <ListingsTableView //
          listingsData={listingsData} // contains the data from api which we need to render in the table
          priceRangeFilter={priceRangeFilter} // these three props are the filter which will help to filter the data
          locationFilter={locationFilter}
          sortBy={sortBy}
        />
      </div>
      <Footer />
    </>
  );
  }
