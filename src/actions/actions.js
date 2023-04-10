export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';
export const CHANGE_COUNTRY = 'CHANGE_COUNTRY'
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'
export const CHANGE_SOURCE = 'CHANGE_SOURCE';
export const CHANGE_NEWS = 'CHANGE_NEWS'


export const fetchNewsRequest = () => {
  return {
    type: FETCH_NEWS_REQUEST
  };
};

export const changeCountry = (country) => {
    return {
        type: CHANGE_COUNTRY,
        payload: country
    }
}

export const changeSource = (source) => {
  return {
    type: CHANGE_SOURCE,
    payload: source
  }
}

export const changeNews = (newNews) => {
  // console.log(newNews);
  return {
    type: CHANGE_NEWS,
    payload: newNews
  }
}

export const changeCategory = (category) =>{
    return {
        type: CHANGE_CATEGORY,
        payload: category
        }
}

export const fetchNewsSuccess = (news) => {
  return {
    type: FETCH_NEWS_SUCCESS,
    payload: news
  };
};

export const fetchNewsFailure = (error) => {
  return {
    type: FETCH_NEWS_FAILURE,
    payload: error
  };
};

export const fetchNews = (URL) => {
  return (dispatch) => {
    dispatch(fetchNewsRequest());
    fetch(URL)
      .then(response => {
        if (response.ok) {
          // console.log(response);
          return response.json();
        }
      }).then((data) => {
        dispatch(fetchNewsSuccess(data));
      }).catch((error) => {
        console.error(error);
    })
  };
};
