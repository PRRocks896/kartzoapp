import React from 'react';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";
import Constant from '../../constant/constant';
import { Bar, Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';



class MonthlyRevenue extends React.Component {


    render() {
        return (
            <>
               <div className="ms-panel ms-panel-fh">
                                    <div className="ms-panel-header">
                                        <div className="d-flex justify-content-between">
                                            <div className="ms-header-text">
                                                <h6>Order Timing Chart</h6>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="ms-panel-body pt-0">
                                        <div className="d-flex justify-content-between ms-graph-meta">
                                            <ul className="ms-list-flex mt-3 mb-5">
                                                <li>
                                                    <span>Total Orders</span>
                                                    <h3 className="ms-count">703,49</h3>
                                                </li>
                                                <li>
                                                    <span>New Orders</span>
                                                    <h3 className="ms-count">95,038</h3>
                                                </li>
                                                <li>
                                                    <span>Repeat Orders</span>
                                                    <h3 className="ms-count">28,387</h3>
                                                </li>
                                                <li>
                                                    <span>Cancel Orders</span>
                                                    <h3 className="ms-count">260</h3>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <Bar
                                                data={this.state}
                                                options={{
                                                    title: {
                                                        display: true,
                                                        text: 'Average Rainfall per month',
                                                        fontSize: 20
                                                    },
                                                    legend: {
                                                        display: true,
                                                        position: 'right'
                                                    }
                                                }}
                                            />
                                        </div>
                                        {/* <canvas id="youtube-subscribers"></canvas> */}
                                    </div>
                                </div>
            </>
        );
    }
}

export default TimingChart;
