import * as React from "react";
import PropTypes from "prop-types";

const LOAD_PER_CLICK = 5;

class LoadMoreButton extends React.Component {
    render() {
        return (
            <button onClick={this.handleClick}>
                Load More
            </button>
        );
    }

    handleClick = () => {
        this.props.loadMore(LOAD_PER_CLICK);
    }
}

LoadMoreButton.propTypes = {
    loadMore: PropTypes.func.isRequired,
};

export default LoadMoreButton;
