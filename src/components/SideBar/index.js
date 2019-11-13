import React, { Component } from 'react'
import styles from '../../styles/sidebar.css'
import {
    Button,
    Navbar,
    NavDropdown,
    FormControl,
    Form,
    Nav,
    Card,
    ListGroup
} from 'react-bootstrap';
export default class SideBar extends Component {
    render() {
        return (
            <div style={{ width: 250, display: 'flex', justifyContent: 'flex-start', paddingLeft: 25, paddingTop: 50, textAlign: 'left', height: '100%', backgroundColor: '#343a40', left: 0, top: 0, position: 'fixed' }}>
                <Nav defaultActiveKey="/home" className="flex-column">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/test">Test</Nav.Link>
                    {this.props.children}
                </Nav>
            </div>
        )
    }
}
