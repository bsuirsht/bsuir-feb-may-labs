import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { awaitify } from "../helpers/awaitify";
import * as NewsActions from "../store/actions/newsActions";

class NewsContainer extends React.Component {
    get injectedProps() {
        return {
            news: this.props.news,
            sources: this.props.sources,
            searchParams: this.props.searchParams,
            visibleNews: this.props.visibleNews,

            fetchNews: this.fetchNews,
            fetchSources: this.fetchSources,
            loadMore: this.loadMore,
            actionSetLanguage: this.actionSetLanguage,
            actionSetSources: this.actionSetSources,
            actionSetSearchQuery: this.actionSetSearchQuery,
        }
    }

    async componentDidMount() {
        await this.fetchNews();
        await this.fetchSources();
    }

    render() {
        return this.props.children(this.injectedProps);
    }

    fetchNews = async () => {
        await awaitify(
            (resolve, reject) => this.props.fetchNews(
                this.props.searchParams,
                resolve,
                reject
            )
        );
    };

    fetchSources = async () => {
        await awaitify(
            (resolve, reject) => this.props.fetchSources(
                this.props.searchParams,
                resolve,
                reject
            )
        );
    };

    loadMore = (count) => {
        this.props.loadMore(count);
    };

    actionSetLanguage = (count) => {
        this.props.actionSetLanguage(count);
    };

    actionSetSources = (count) => {
        this.props.actionSetSources(count);
    };

    actionSetSearchQuery = (count) => {
        this.props.actionSetSearchQuery(count);
    };
}

const mapStateToProps = (state) => ({
    news: state.newsReducer.news,
    sources: state.newsReducer.sources,
    searchParams: state.newsReducer.searchParams,
    visibleNews: state.newsReducer.visibleNews,
});

const mapDispatchToProps = (dispatch) => ({
    fetchNews: (
        request, resolve, reject
    ) => dispatch(
        NewsActions.actionNewsFetch(request, resolve, reject)
    ),
    fetchSources: (
        request, resolve, reject
    ) => dispatch(
        NewsActions.actionNewsSourcesFetch(request, resolve, reject)
    ),
    loadMore: (count) => dispatch(NewsActions.actionLoadMore(count)),
    actionSetLanguage: (language) => dispatch(NewsActions.actionSetLanguage(language)),
    actionSetSources: (sources) => dispatch(NewsActions.actionSetSources(sources)),
    actionSetSearchQuery: (query) => dispatch(NewsActions.actionSetSearchQuery(query)),
});

NewsContainer.propTypes = {
    children: PropTypes.func.isRequired,

    news: PropTypes.arrayOf(
        PropTypes.shape({
            urlToImage: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
            url: PropTypes.string
        })
    ),
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
        })
    ),
    searchParams: PropTypes.shape({
        language: PropTypes.string,
        sources: PropTypes.string,
        searchQuery: PropTypes.string
    }),
    visibleNews: PropTypes.arrayOf(
        PropTypes.shape({
            urlToImage: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
            url: PropTypes.string
        })
    ),

    fetchNews: PropTypes.func.isRequired,
    fetchSources: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,
    actionSetLanguage: PropTypes.func,
    actionSetSources: PropTypes.func,
    actionSetSearchQuery: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);
