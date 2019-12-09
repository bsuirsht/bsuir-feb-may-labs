import * as React from "react";
import PropTypes from "prop-types";

import { uniqkey } from "../../../helpers/uniqkey";

const PLACEHOLDER = "---";

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || ""
        }
    }
    render() {
        let { data } = this.props;
        if (!data) {
            return null;
        }
        if (this.props.withEmpty) {
            data = [{
                name: PLACEHOLDER,
                value: ""
            }, ...data];
        }

        const items = data.map((item) => (
            <option key={uniqkey()} value={item.value}>
                {item.name}
            </option>
        ));

        return (
            <select onChange={this.handleChange} value={this.state.value}>
                {items}
            </select>
        );
    }

    handleChange = (e) => {
        const value = e.currentTarget.value;
        this.setState({
            value
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(value);
            }
        })
    };
}

Dropdown.propTypes = {
    withEmpty: PropTypes.bool,
    onChange: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.any
    })).isRequired,
    value: PropTypes.string,
};

export default Dropdown;
