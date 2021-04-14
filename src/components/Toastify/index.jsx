/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

export default class Toastify extends Component {
    render() {
        return (
            <div className="d-flex df-jcspb">
                <div className="mr-3">
                <i className={this.props.className} />
                </div>
                <span> {this.props.description}</span>
            </div>
        )
    }
}

