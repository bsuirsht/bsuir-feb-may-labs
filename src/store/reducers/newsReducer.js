import { NewsActionType } from "../actions/newsActions";

const initialState = {
    news: [],
    sources: [],
    searchParams: {
        language: "en",
        sources: "",
        searchQuery: ""
    },
    visibleNews: []
};

const MAX_NEWS_ON_PAGE = 5;

export const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case NewsActionType.NEWS_FETCH_COMPLETE: {
            return {
                ...state,
                news: action.payload,
                visibleNews: action.payload.slice(0, MAX_NEWS_ON_PAGE)
            };
        }
        case NewsActionType.NEWS_SOURCES_FETCH_COMPLETE: {
            return {
                ...state,
                sources: action.payload
            };
        }
        case NewsActionType.NEWS_SET_LANGUAGE: {
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    language: action.payload
                }
            }
        }
        case NewsActionType.NEWS_SET_SOURCES: {
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    sources: action.payload
                }
            }
        }
        case NewsActionType.NEWS_SET_SEARCH_QUERY: {
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    searchQuery: action.payload
                }
            }
        }
        case NewsActionType.NEWS_LOAD_MORE: {
            const index = state.visibleNews.length;
            const step = action.payload;
            return {
                ...state,
                visibleNews: [
                    ...state.visibleNews,
                    ...state.news.slice(index, index + step)
                ]
            }
        }
        default: {
            return state;
        }
    }
};
