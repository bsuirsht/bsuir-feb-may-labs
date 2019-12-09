import * as React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import Dropdown from "../Dropdown/Dropdown";

class TopPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            language: "en",
            sources: ""
        }
    }
    static get languages() {
        return [
            {name: "en", value: "en"},
            {name: "ru", value: "ru"},
            {name: "de", value: "de"},
            {name: "fr", value: "fr"},
            {name: "it", value: "it"},
            {name: "jp", value: "jp"}
        ];
    }

    render() {
        const sources = this.props.sources.map((source) => ({
            name: source.name,
            value: source.id
        }));

        return (
            <div className="panel">
                <div className="controls-container">
                    <input
                        type="search"
                        onChange={this.handleSetSearchQuery}
                        value={this.state.searchQuery}
                        autoComplete="off"
                    />
                    <button onClick={this.handleSearch}>
                        Search
                    </button>
                </div>
                <div>
                    <Dropdown
                        data={sources}
                        onChange={this.handleSourceChange}
                        value={this.state.sources}
                        withEmpty
                    />
                </div>
                <div>
                    <Dropdown
                        data={TopPanel.languages}
                        onChange={this.handleLanguageChange}
                        value={this.state.language}
                    />
                </div>
            </div>
        );
    }

    handleSearch = async () => {
        await this.props.fetchNews();
    };

    handleSetSearchQuery = (e) => {
        const value = e.currentTarget.value;
        this.setState({
            searchQuery: value
        }, () => {
            this.props.actionSetSearchQuery(value);
        });
    };

    handleSourceChange = (value) => {
        this.setState({
            sources: value
        }, () => {
            this.props.actionSetSources(value);
        });
    };

    handleLanguageChange = (value) => {
        this.props.actionSetLanguage(value);

        this.setState({
            sources: value
        }, async () => {
            await this.props.fetchSources();
            toast.success("News Sources successfully updated!");
        });
    };
}

TopPanel.propTypes = {
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string
        })
    ),
    actionSetLanguage: PropTypes.func,
    actionSetSources: PropTypes.func,
    actionSetSearchQuery: PropTypes.func,
    fetchSources: PropTypes.func.isRequired,
    fetchNews: PropTypes.func.isRequired,
};

export default TopPanel;
