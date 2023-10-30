import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import axios from 'axios';
import config from '../../config';
import CheckBoxFilter from '../CheckBoxFilter/CheckBoxFilter';
import SortingFilter from '../SortingFilter/SortingFilter';
import ListingsTableView from '../ListingsTableView/ListingsTableView';
import Footer from '../Footer/Footer';

export default function Explore() {
    const [listingsData, setListingsData] = useState();
    const [locationFilter, setLocationFilter] = useState([]);
    const [priceRangeFilter, setpriceRangeFilter] = useState([]);
    const [sortBy, setSortBy] = useState("")

    async function fetchListingsData(){
        try {
            let response = await axios.get(`${config.backEndPoint}/real-estate-data`);
            let data = response.data.listings;
            console.log(data)
            setListingsData(data);
        } catch (error) {
            console.log(error)
        }

    }
    // filter handlers or the filter function

    const handleLocationFilterChange =()=>{}
    const handlePriceFilterChange=()=>{}
    const handleSortByChange=()=>{}

    // use effect to call the function whuch is calling the api
    useEffect(()=>{
        fetchListingsData()
    },[])
  return (
    <>
        <Header/>
        <div className='property-listings-view'>
            <CheckBoxFilter/>
            <SortingFilter/>
            <ListingsTableView/>

        </div>
        <Footer/>
    </>
  )
}
