import { FETCH_NEWS_REQUEST, CHANGE_SOURCE, CHANGE_NEWS, CHANGE_CATEGORY, CHANGE_COUNTRY, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILURE } from '../actions/actions';

const initialState = {
	country: "",
	category: "",
	source: "",
	loading: false,
	news: [],
  error: '',
  newNews: []
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        news: action.payload,
        error: ''
      };
    case FETCH_NEWS_FAILURE:
      return {
        ...state,
        loading: false,
        news: [],
        error: action.payload
		  };
	case CHANGE_COUNTRY:
      return {
        ...state,
			loading: true,
			country: action.payload,
			error: ''
		  };
	case CHANGE_CATEGORY:
      return {
        ...state,
			loading: true,
			category: action.payload,
			error: ''
      };
    case CHANGE_SOURCE:
        return {
          ...state,
        loading: true,
        source: action.payload,
        error: ''
      }; 
    case CHANGE_NEWS:
      return {
        ...state,
      loading: true,
      newNews: action.payload,
      error: ''
    }; 
    default:
      return state;
  }
};

export default newsReducer;
