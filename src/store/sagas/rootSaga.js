
import { all, takeEvery, AllEffect } from "redux-saga/effects";

import { NewsActionType } from "../actions/newsActions";
import {
    fetchNews,
    fetchSources
} from "./newsSagas";

export function* rootSaga() {
    yield all([
        takeEvery(NewsActionType.NEWS_FETCH, fetchNews),
        takeEvery(NewsActionType.NEWS_SOURCES_FETCH, fetchSources)
    ]);
}
