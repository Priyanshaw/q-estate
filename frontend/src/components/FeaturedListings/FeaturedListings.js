import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeaturedListings.css";
import config from "../../config";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";

export default function FeaturedListings() {
  const [listingsData, setListingsData] = useState([]);

  async function fetchListings() {
    try {
      let response = await axios.get(`${config.backEndPoint}/real-estate-data`);
      // console.log(response);
      let data = response.data.listings;
      // console.log(data)
      setListingsData(data.slice(0, 8));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {listingsData.length === 0 ? (
          <Grid item>
            <div classname="error-message">
              <p>No Featured Listing found</p>
            </div>
          </Grid>
        ) : (
          listingsData.map((elem, index)=>(
            <Grid item xs={12} sm={6} md={3} >
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={`/assets/real-estate-${index}.jpg`}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" className="property-name">
                    {elem.property_name.slice(0, 16)}
                  </Typography>
                </CardContent>
                <CardActions>
                    <div className="listings-detail">
                        <span className="property-price">Rs {elem.price}</span>
                        <span className="property-city">{elem.city}</span>
                    </div>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
