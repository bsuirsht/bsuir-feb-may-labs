import * as React from "react";
import { Provider } from "react-redux";

import { store } from "../store/store";

import NewsContainer from "../containers/NewsContainer";
import NewsItem from "./NewsUI/NewsItem/NewsItem";
import TopPanel from "./NewsUI/TopPanel/TopPanel";
import { uniqkey } from "../helpers/uniqkey";
import LoadMoreButton from "./NewsUI/LoadMoreButton/LoadMoreButton";

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <NewsContainer>
                    {this.renderNewsUI}
                </NewsContainer>
            </Provider>
        );
    }

    renderNewsUI = (props) => {
        return (
            <>
                <TopPanel {...props} />
                <div id="news-container">
                    {props.visibleNews.map((item) => (
                        <NewsItem key={uniqkey()} item={item} />
                    ))}
                </div>
                <div id="load-more-container">
                    <LoadMoreButton {...props} />
                </div>
            </>
        );
    };
}

export default App;
