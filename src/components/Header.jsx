import { countries } from "../constants/countryList"
import {categories} from "../constants/categoriesList"
import { Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { changeCategory, changeCountry, changeNews, changeSource, fetchNews } from "../actions/actions";
import {URL, API} from "../constants/constants"
import { useDispatch } from "react-redux";
import NewsList from "./NewsList";

const Header = () => {
  const category = useSelector(state => state.category);
  const country = useSelector(state => state.country);
  let listOfSources = []
  let newNews = [];
  const source = useSelector(state => state.source);
  const news = useSelector(state => state.news.articles);
  const changedNews = useSelector(state => state.newNews);
  const dispatch = useDispatch();

  
  const handleCountryChange = (e) => {
    e.preventDefault();
    dispatch(changeCountry(e.target.value));
  }

  const handleCategoryChange = (e) => {
    e.preventDefault();
    dispatch(changeCategory(e.target.value));
  }

  const handleSourceChange = async (e) => {
    e.preventDefault();
    let newSource = e.currentTarget.innerText
    dispatch(changeSource(newSource));

    // eslint-disable-next-line
    newNews = news.filter((item) => {
      if (item["source"]["name"] === e.currentTarget.innerText) {
        return item;
      }
    })  

    let filteredNews = await dispatch(changeNews(newNews));
    newNews = filteredNews["payload"];
  }


  useEffect(() => {

    if (country !== ""
      || category !== "") {
      dispatch(fetchNews(URL + "country=" +
        country + "&apiKey=" + API + "&category=" + category));
      
    }
    

  }, [dispatch, country, category, news, source]);

  // console.log(isLoading)


  if (news !== undefined) {
    // eslint-disable-next-line
    
    news.forEach(source => {
      if (!listOfSources.includes(source["source"]["name"])) {
        listOfSources.push(source["source"]["name"]);
      }
    });
  
  }

  // console.log(news);

   return (
     <div className='container'>
       <div className="--flex headline --center-all">
       <div className='--flex-start'>
         {country ? (<h3 className="heading --p --m ">News from {country.toUpperCase()}</h3>) : (
          <h3 className="heading --p --m ">News App</h3>
         )}
        </div>
          <div className='--flex-end'>
            <div className='--p --m'>
            <FormControl sx={{ m: 1, minWidth: 150 }}
            >
            <InputLabel id="demo-simple-select-helper-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={country}
                label="Country"
                onChange={handleCountryChange}
        >
                {countries.map((c) => {
                  return <MenuItem
                    key={c.key}
                    value={c.value}>{c.text}</MenuItem>
          })}
          
              </Select>
              </FormControl>
          </div>


          <div className='--p --m'>
            <FormControl sx={{ m: 1, minWidth: 150 }}
            >
            <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={category}
                label="Category"
                onChange={handleCategoryChange}
        >
                {categories.map((c) => {
                  return <MenuItem
                    key={c.key}
                    value={c.value}>
                    {c.text}
                  </MenuItem>
          })}
          
              </Select>
              </FormControl>
          </div>
         </div>
      </div>

       {country ? (
         <section className="--m --p --flex --center-all">
           <div className="--flex-between">
         {listOfSources.map((source) => {
           return (
            <div className="filters">
              <Chip
                 label={source}
                 key={source}
                variant="outlined"
                 clickable
                 sx={{
                   borderColor: "black",
                   backgroundColor: "white",
                   fontFamily: "Playfair Display",
                   fontWeight: "bold"
                 }}
                 onClick={handleSourceChange} 
                />
         </div>
           )
         })}
         </div>
         
       </section>
       ) : (<></>)}
       
       {news ? (
         source ?
         ((changedNews.map((item) => {
         return (
           <section className="--center-all --flex">
             <NewsList props={item} />
            </section>
                )
         }
         )
        )
       ): ((news.map((item) => {
         return (
           <section className="--center-all --flex">
             <NewsList props={item} />
            </section>
         )
       })))) : (
           <h4 className="--center-all --p">Please select a country</h4>
         )}
    </div>
  )
}

export default Header