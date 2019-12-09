import * as React from "react";
import PropTypes from "prop-types";

class NewsItem extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <div className="news-item" onClick={this.handleRedirect(item.url)}>
                <div className="image-container">
                    <img src={item.urlToImage} alt="news item photo" />
                </div>
                <div className="text-container">
                    <div className="title">{item.title || "..."}</div>
                    <div className="description">{item.description || "No Description"}</div>
                    <div className="link-container">
                        <a href={item.url} target="_blank">
                            Read more
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    handleRedirect = (url) => () => {
        window.open(url, "_blank");
    }
}

NewsItem.propTypes = {
    item: PropTypes.shape({
        urlToImage: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string
    }).isRequired
};

export default NewsItem;
