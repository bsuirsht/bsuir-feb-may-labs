import Axios from "axios";
import * as qs from "qs";

export const client = Axios.create({
    baseURL: process.env.API_URL,
    paramsSerializer: (params) => {
        const serializedParams = qs.stringify(params, {arrayFormat: "repeat"});
        return `${serializedParams}&pageSize=40&apiKey=${process.env.API_KEY}`;
    },
});
