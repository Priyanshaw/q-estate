import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import config from "../../config";
import { useParams } from "react-router-dom";
import './ListingDetailPage.css'

export default function ListingDetailPage() {
  const [property, setProperty] = useState(null);
  const { property_id } = useParams();
  const fetchListings = async () => {
    try {
      let response = await axios.get(`${config.backEndPoint}/real-estate-data`);
      const data = response.data.listings;
      // console.log(data);
      setProperty(data.find((ele) => ele.property_id === Number(property_id)));
      // console.log(property)
    } catch (error) {
      setProperty(null);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchListings();
  }, []);
  return (
    <>
      <Header onPage="detail" />
      <div className="detail-page-container">
        {property ? (
          <>
            <div className="image-container">
              <img src="/assets/real-estate-detail.jpg" alt="real-estate-img" />
            </div>
            <div className="property-details">
              <h1>{property.property_name}</h1>
              <div className="property-description">
                {property.description} Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Molestias necessitatibus nobis, distinctio
                aspernatur nulla voluptas? Accusamus dicta quam corporis soluta
                eius unde temporibus voluptate impedit aut. Sequi nulla eos
                distinctio reprehenderit, similique iusto a incidunt, quaerat
                suscipit, sit ex pariatur lorem lorem ipsum.
              </div>
              <div className="agent-details">
              <h2 className="agent-details-header">Contact</h2>
              <div className="agent-details-content">
                <span className="title">Agent Name:</span>
                <span>John Smith</span>
                <span className="title">Email:</span>
                <span>admin@qestate.com</span>
              </div>
            </div>
            </div>
            
          </>
        ) : (
          <div>Details Unavailable At The Moment</div>
        )}
      </div>

      <Footer />
    </>
  );
}
