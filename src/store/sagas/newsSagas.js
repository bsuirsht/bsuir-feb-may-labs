import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import { client } from "../../httpClient/client";
import * as NewsActions from "../actions/newsActions";

export function* fetchNews(action) {
    try {
        let response = yield call(() => client.get("/top-headlines", {
            params: {
                language: action.payload.language,
                sources: action.payload.sources,
                q: action.payload.searchQuery
            }
        }));

        if (response && response.data) {
            action.promise.resolve();
            const { articles } = response.data;
            return yield put(NewsActions.actionNewsFetchComplete(articles));
        } else {
            action.promise.reject();
            return yield put(NewsActions.actionNewsError());
        }
    } catch (e) {
        toast.error(e.toString());
        action.promise.reject();
        return yield put(NewsActions.actionNewsError(e));
    }
}

export function* fetchSources(action) {
    try {
        let response = yield call(() => client.get("/sources", {
            params: {
                language: action.payload.language,
                sources: action.payload.sources,
                q: action.payload.searchQuery
            }
        }));

        if (response && response.data) {
            action.promise.resolve();
            const { sources } = response.data;
            return yield put(NewsActions.actionNewsSourcesFetchComplete(sources));
        } else {
            action.promise.reject();
            return yield put(NewsActions.actionNewsError());
        }
    } catch (e) {
        toast.error(e.toString());
        action.promise.reject();
        return yield put(NewsActions.actionNewsError(e));
    }
}
