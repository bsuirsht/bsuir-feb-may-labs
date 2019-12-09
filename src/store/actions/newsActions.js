export const NewsActionType = {
    NEWS_FETCH: "NEWS_FETCH",
    NEWS_FETCH_COMPLETE: "NEWS_FETCH_COMPLETE",
    NEWS_SOURCES_FETCH: "NEWS_SOURCES_FETCH",
    NEWS_SOURCES_FETCH_COMPLETE: "NEWS_SOURCES_FETCH_COMPLETE",
    NEWS_ERROR: "NEWS_ERROR",
    NEWS_SET_LANGUAGE: "NEWS_SET_LANGUAGE",
    NEWS_SET_SOURCES: "NEWS_SET_SOURCES",
    NEWS_SET_SEARCH_QUERY: "NEWS_SET_SEARCH_QUERY",
    NEWS_LOAD_MORE: "NEWS_LOAD_MORE",
};

export function actionNewsFetch(
    payload,
    resolve,
    reject
) {
    return {
        payload,
        type: NewsActionType.NEWS_FETCH,
        promise: {
            resolve,
            reject
        }
    }
}

export function actionNewsFetchComplete(payload) {
    return {
        payload,
        type: NewsActionType.NEWS_FETCH_COMPLETE
    }
}

export function actionNewsSourcesFetch(
    payload,
    resolve,
    reject
) {
    return {
        payload,
        type: NewsActionType.NEWS_SOURCES_FETCH,
        promise: {
            resolve,
            reject
        }
    }
}

export function actionNewsSourcesFetchComplete(payload) {
    return {
        payload,
        type: NewsActionType.NEWS_SOURCES_FETCH_COMPLETE
    }
}

export function actionNewsError(error) {
    return {
        type: NewsActionType.NEWS_ERROR
    }
}

export function actionSetLanguage(payload) {
    return {
        payload,
        type: NewsActionType.NEWS_SET_LANGUAGE
    }
}

export function actionSetSources(payload) {
    return {
        payload,
        type: NewsActionType.NEWS_SET_SOURCES
    }
}

export function actionSetSearchQuery(payload) {
    return {
        payload,
        type: NewsActionType.NEWS_SET_SEARCH_QUERY
    }
}

export function actionLoadMore(payload) {
    return {
        payload,
        type: NewsActionType.NEWS_LOAD_MORE
    }
}
