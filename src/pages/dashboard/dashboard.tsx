import React from 'react';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";
import Constant from '../../constant/constant';
import { Bar, Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';



class Dashboard extends React.Component {
    state = {
        isOpen: true,
        labels: ['12AM', '2PM', '4PM',
            '6PM', '8PM', '10PM', '12PM', '2PM', '4PM',
            '6PM', '8PM', '10PM'],
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
            }
        ]
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <div className={this.state.isOpen == true ? "ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar" : "ms-body ms-primary-theme ms-has-quickbar"}>
                <div id="preloader-wrap">
                    <div className="spinner spinner-8">
                        <div className="ms-circle1 ms-child"></div>
                        <div className="ms-circle2 ms-child"></div>
                        <div className="ms-circle3 ms-child"></div>
                        <div className="ms-circle4 ms-child"></div>
                        <div className="ms-circle5 ms-child"></div>
                        <div className="ms-circle6 ms-child"></div>
                        <div className="ms-circle7 ms-child"></div>
                        <div className="ms-circle8 ms-child"></div>
                        <div className="ms-circle9 ms-child"></div>
                        <div className="ms-circle10 ms-child"></div>
                        <div className="ms-circle11 ms-child"></div>
                        <div className="ms-circle12 ms-child"></div>
                    </div>
                </div>

                <div className="ms-aside-overlay ms-overlay-left ms-toggler" data-target="#ms-side-nav" data-toggle="slideLeft"></div>
                <div className="ms-aside-overlay ms-overlay-right ms-toggler" data-target="#ms-recent-activity" data-toggle="slideRight"></div>

                <aside id="ms-side-nav" className="side-nav fixed ms-aside-scrollable ms-aside-left">

                    <div className="logo-sn ms-d-block-lg">
                        <a className="pl-0 ml-0 text-center" href="index-2.html">
                            <img src="./assets/images/kartzo-logo-216x62.png" alt="logo" />
                        </a>
                    </div>

                    <ul className="accordion ms-main-aside fs-14" id="side-nav-accordion">

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#dashboard" aria-expanded="false" aria-controls="dashboard"> <span><i className="material-icons fs-16">dashboard</i>Dashboard </span>
                            </a>
                            <ul id="dashboard" className="collapse" aria-labelledby="dashboard" data-parent="#side-nav-accordion">
                                <li> <a href="index-2.html">Costic</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#product" aria-expanded="false" aria-controls="product"> <span><i className="fa fa-archive fs-16"></i>Menus </span>
                            </a>
                            <ul id="product" className="collapse" aria-labelledby="product" data-parent="#side-nav-accordion">
                                <li> <a href="pages/product/productcata.html">Menu Catalogue</a>
                                </li>
                                <li> <a href="pages/product/productlist.html">Menu List</a>
                                </li>
                                <li> <a href="pages/product/productgrid.html">Menu Grid</a>
                                </li>
                                <li> <a href="pages/product/addproduct.html">Add Product</a>
                                </li>
                                <li> <a href="pages/product/productdetail.html">Product Detail</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="pages/orders.html"> <span><i className="fas fa-clipboard-list fs-16"></i>Orders</span>
                            </a>
                        </li>

                        <li className="menu-item">
                            <a href="pages/restaurants.html"> <span><i className="fa fa-tasks fs-16"></i>Restaurants List</span>
                            </a>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#invoice" aria-expanded="false" aria-controls="invoice"> <span><i className="fas fa-file-invoice fs-16"></i>Invoice </span>
                            </a>
                            <ul id="invoice" className="collapse" aria-labelledby="invoice" data-parent="#side-nav-accordion">
                                <li> <a href="pages/invoice/invoicedetail.html">Invoice Detail</a>
                                </li>
                                <li> <a href="pages/invoice/invoicelist.html">Invoice List</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#customer" aria-expanded="false" aria-controls="customer"> <span><i className="fas fa-user-friends fs-16"></i>Customers </span>
                            </a>
                            <ul id="customer" className="collapse" aria-labelledby="customer" data-parent="#side-nav-accordion">
                                <li> <a href="pages/customer/customersreview.html">Customers Review</a>
                                </li>
                                <li> <a href="pages/customer/customersreview.html">Customers List</a>
                                </li>
                                <li> <a href="pages/customer/social.html">Social Activity</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="pages/sales.html"> <span><i className="fa fa-briefcase fs-16"></i>Sales</span>
                            </a>
                        </li>

                        <li className="menu-item">
                            <a href="pages/widgets.html"> <span><i className="material-icons fs-16">widgets</i>Widgets</span>
                            </a>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#basic-elements" aria-expanded="false" aria-controls="basic-elements"> <span><i className="material-icons fs-16">filter_list</i>Basic UI Elements</span>
                            </a>
                            <ul id="basic-elements" className="collapse" aria-labelledby="basic-elements" data-parent="#side-nav-accordion">
                                <li> <a href="pages/ui-basic/accordions.html">Accordions</a>
                                </li>
                                <li> <a href="pages/ui-basic/alerts.html">Alerts</a>
                                </li>
                                <li> <a href="pages/ui-basic/buttons.html">Buttons</a>
                                </li>
                                <li> <a href="pages/ui-basic/breadcrumbs.html">Breadcrumbs</a>
                                </li>
                                <li> <a href="pages/ui-basic/badges.html">Badges</a>
                                </li>
                                <li> <a href="pages/ui-basic/cards.html">Cards</a>
                                </li>
                                <li> <a href="pages/ui-basic/progress-bars.html">Progress Bars</a>
                                </li>
                                <li> <a href="pages/ui-basic/preloaders.html">Pre-loaders</a>
                                </li>
                                <li> <a href="pages/ui-basic/pagination.html">Pagination</a>
                                </li>
                                <li> <a href="pages/ui-basic/tabs.html">Tabs</a>
                                </li>
                                <li> <a href="pages/ui-basic/typography.html">Typography</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#advanced-elements" aria-expanded="false" aria-controls="advanced-elements"> <span><i className="material-icons fs-16">code</i>Advanced UI Elements</span>
                            </a>
                            <ul id="advanced-elements" className="collapse" aria-labelledby="advanced-elements" data-parent="#side-nav-accordion">
                                <li> <a href="pages/ui-advanced/draggables.html">Draggables</a>
                                </li>
                                <li> <a href="pages/ui-advanced/sliders.html">Sliders</a>
                                </li>
                                <li> <a href="pages/ui-advanced/modals.html">Modals</a>
                                </li>
                                <li> <a href="pages/ui-advanced/rating.html">Rating</a>
                                </li>
                                <li> <a href="pages/ui-advanced/tour.html">Tour</a>
                                </li>
                                <li> <a href="pages/ui-advanced/cropper.html">Cropper</a>
                                </li>
                                <li> <a href="pages/ui-advanced/range-slider.html">Range Slider</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="pages/animation.html"> <span><i className="material-icons fs-16">format_paint</i>Animations</span>
                            </a>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#form-elements" aria-expanded="false" aria-controls="form-elements"> <span><i className="material-icons fs-16">input</i>Form Elements</span>
                            </a>
                            <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">
                                <li> <a href="pages/form/form-elements.html">Form Elements</a>
                                </li>
                                <li> <a href="pages/form/form-layout.html">Form Layouts</a>
                                </li>
                                <li> <a href="pages/form/form-validation.html">Form Validation</a>
                                </li>
                                <li> <a href="pages/form/form-wizard.html">Form Wizard</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#charts" aria-expanded="false" aria-controls="charts"> <span><i className="material-icons fs-16">equalizer</i>Charts</span>
                            </a>
                            <ul id="charts" className="collapse" aria-labelledby="charts" data-parent="#side-nav-accordion">
                                <li> <a href="pages/charts/chartjs.html">Chart JS</a>
                                </li>
                                <li> <a href="pages/charts/morris-charts.html">Morris Chart</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#tables" aria-expanded="false" aria-controls="tables"> <span><i className="material-icons fs-16">tune</i>Tables</span>
                            </a>
                            <ul id="tables" className="collapse" aria-labelledby="tables" data-parent="#side-nav-accordion">
                                <li> <a href="pages/tables/basic-tables.html">Basic Tables</a>
                                </li>
                                <li> <a href="pages/tables/data-tables.html">Data tables</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#popups" aria-expanded="false" aria-controls="popups"> <span><i className="material-icons fs-16">message</i>Popups</span>
                            </a>
                            <ul id="popups" className="collapse" aria-labelledby="popups" data-parent="#side-nav-accordion">
                                <li> <a href="pages/popups/sweet-alerts.html">Sweet Alerts</a>
                                </li>
                                <li> <a href="pages/popups/toast.html">Toast</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#icons" aria-expanded="false" aria-controls="icons"> <span><i className="material-icons fs-16">border_color</i>Icons</span>
                            </a>
                            <ul id="icons" className="collapse" aria-labelledby="icons" data-parent="#side-nav-accordion">
                                <li> <a href="pages/icons/fontawesome.html">Fontawesome</a>
                                </li>
                                <li> <a href="pages/icons/flaticons.html">Flaticons</a>
                                </li>
                                <li> <a href="pages/icons/materialize.html">Materialize</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#maps" aria-expanded="false" aria-controls="maps"> <span><i className="material-icons fs-16">map</i>Maps</span>
                            </a>
                            <ul id="maps" className="collapse" aria-labelledby="maps" data-parent="#side-nav-accordion">
                                <li> <a href="pages/maps/google-maps.html">Google Maps</a>
                                </li>
                                <li> <a href="pages/maps/vector-maps.html">Vector Maps</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#bonuspages" aria-expanded="false" aria-controls="bonuspages"> <span><i className="material-icons fs-16">insert_drive_file</i> Bonus Pages</span>
                            </a>
                            <ul id="bonuspages" className="collapse" aria-labelledby="bonuspages" data-parent="#side-nav-accordion">
                                <li> <a href="pages/dashboard/web-analytics.html"> Web Analytics </a>
                                </li>
                                <li> <a href="pages/dashboard/project-management.html">Stock Management</a>
                                </li>
                                <li> <a href="pages/dashboard/client-management.html">Client Management</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#pages" aria-expanded="false" aria-controls="pages"> <span><i className="material-icons fs-16">insert_drive_file</i>Pages</span>
                            </a>
                            <ul id="pages" className="collapse" aria-labelledby="pages" data-parent="#side-nav-accordion">
                                <li className="menu-item"> <a href="#" className="has-chevron" data-toggle="collapse" data-target="#authentication" aria-expanded="false" aria-controls="authentication">Authentication</a>
                                    <ul id="authentication" className="collapse" aria-labelledby="authentication" data-parent="#pages">
                                        <li> <a href="pages/prebuilt-pages/default-login.html">Default Login</a>
                                        </li>
                                        <li> <a href="pages/prebuilt-pages/modal-login.html">Modal Login</a>
                                        </li>
                                        <li> <a href="pages/prebuilt-pages/default-register.html">Default Registration</a>
                                        </li>
                                        <li> <a href="pages/prebuilt-pages/modal-register.html">Modal Registration</a>
                                        </li>
                                        <li> <a href="pages/prebuilt-pages/lock-screen.html">Lock Screen</a>
                                        </li>
                                    </ul>
                                </li>
                                <li> <a href="pages/prebuilt-pages/coming-soon.html">Coming Soon</a>
                                </li>
                                <li> <a href="pages/prebuilt-pages/error.html">Error Page</a>
                                </li>
                                <li className="menu-item"> <a href="pages/prebuilt-pages/faq.html"> FAQ </a>
                                </li>
                                <li className="menu-item"> <a href="pages/prebuilt-pages/portfolio.html"> Portfolio </a>
                                </li>
                                <li className="menu-item"> <a href="pages/prebuilt-pages/user-profile.html"> User Profile </a>
                                </li>
                                <li className="menu-item"> <a href="pages/prebuilt-pages/invoice.html"> Invoice </a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#apps" aria-expanded="false" aria-controls="apps"> <span><i className="material-icons fs-16">phone_iphone</i>Apps</span>
                            </a>
                            <ul id="apps" className="collapse" aria-labelledby="apps" data-parent="#side-nav-accordion">
                                <li> <a href="pages/apps/chat.html">Chat</a>
                                </li>
                                <li> <a href="pages/apps/email.html">Email</a>
                                </li>
                                <li> <a href="pages/apps/to-do-list.html">To-do List</a>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </aside>

                <aside id="ms-recent-activity" className="side-nav fixed ms-aside-right ms-scrollable">
                    <div className="ms-aside-header">
                        <ul className="nav nav-tabs tabs-bordered d-flex nav-justified mb-3" role="tablist">
                            <li role="presentation" className="fs-12"><a href="#activityLog" aria-controls="activityLog" className="active" role="tab" data-toggle="tab"> Activity Log</a>
                            </li>
                            <li>
                                <button type="button" className="close ms-toggler text-center" data-target="#ms-recent-activity" data-toggle="slideRight"><span aria-hidden="true">&times;</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="ms-aside-body">
                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane active fade show" id="activityLog">
                                <ul className="ms-activity-log">
                                    <li>
                                        <div className="ms-btn-icon btn-pill icon btn-light"> <i className="flaticon-gear"></i>
                                        </div>
                                        <h6>Update 1.0.0 Pushed</h6>
                                        <span> <i className="material-icons">event</i>1 January, 2019</span>
                                        <p className="fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, ula in sodales vehicula....</p>
                                    </li>
                                    <li>
                                        <div className="ms-btn-icon btn-pill icon btn-success"> <i className="flaticon-tick-inside-circle"></i>
                                        </div>
                                        <h6>Profile Updated</h6>
                                        <span> <i className="material-icons">event</i>4 March, 2018</span>
                                        <p className="fs-14">Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin...</p>
                                    </li>
                                    <li>
                                        <div className="ms-btn-icon btn-pill icon btn-warning"> <i className="flaticon-alert-1"></i>
                                        </div>
                                        <h6>Your payment is due</h6>
                                        <span> <i className="material-icons">event</i>1 January, 2019</span>
                                        <p className="fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, ula in sodales vehicula....</p>
                                    </li>
                                    <li>
                                        <div className="ms-btn-icon btn-pill icon btn-danger"> <i className="flaticon-alert"></i>
                                        </div>
                                        <h6>Database Error</h6>
                                        <span> <i className="material-icons">event</i>4 March, 2018</span>
                                        <p className="fs-14">Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin...</p>
                                    </li>
                                    <li>
                                        <div className="ms-btn-icon btn-pill icon btn-info"> <i className="flaticon-information"></i>
                                        </div>
                                        <h6>Checkout what's Trending</h6>
                                        <span> <i className="material-icons">event</i>1 January, 2019</span>
                                        <p className="fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, ula in sodales vehicula....</p>
                                    </li>
                                    <li>
                                        <div className="ms-btn-icon btn-pill icon btn-secondary"> <i className="flaticon-diamond"></i>
                                        </div>
                                        <h6>Your Dashboard is ready</h6>
                                        <span> <i className="material-icons">event</i>4 March, 2018</span>
                                        <p className="fs-14">Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin...</p>
                                    </li>
                                </ul> <a href="#" className="btn btn-primary d-block"> View All </a>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="body-content">

                    <nav className="navbar ms-navbar">
                        <div className="ms-aside-toggler ms-toggler pl-0" data-target="#ms-side-nav" data-toggle="slideLeft" onClick={this.toggleCollapse}> <span className="ms-toggler-bar bg-primary" onClick={this.toggleCollapse}></span>
                            <span className="ms-toggler-bar bg-primary"></span>
                            <span className="ms-toggler-bar bg-primary"></span>
                        </div>
                        <div className="logo-sn logo-sm ms-d-block-sm">
                            <a className="pl-0 ml-0 text-center navbar-brand mr-0" href="index-2.html">
                                <img src="./assets/images/kartzo-logo-84x41.png" alt="logo" /> </a>
                        </div>
                        <ul className="ms-nav-list ms-inline mb-0" id="ms-nav-options">
                            <li className="ms-nav-item ms-search-form pb-0 py-0">
                                <form className="ms-form" method="post">
                                    <div className="ms-form-group my-0 mb-0 has-icon fs-14">
                                        <input type="search" className="ms-form-input" name="search" placeholder="Search here..." value="" /> <i className="flaticon-search text-disabled"></i>
                                    </div>
                                </form>
                            </li>

                            <li className="ms-nav-item ms-nav-user dropdown">
                                <a href="#" id="userDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img className="ms-user-img ms-img-round float-right" src="./assets/img/costic/customer-6.jpg" alt="people" />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right user-dropdown" aria-labelledby="userDropdown">
                                    <li className="dropdown-menu-header">
                                        <h6 className="dropdown-header ms-inline m-0"><span className="text-disabled">Welcome, Anny Farisha</span></h6>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li className="ms-dropdown-list">
                                        <a className="media fs-14 p-2" href="pages/prebuilt-pages/user-profile.html"> <span><i className="flaticon-user mr-2"></i> Profile</span>
                                        </a>
                                        <a className="media fs-14 p-2" href="pages/apps/email.html"> <span><i className="flaticon-mail mr-2"></i> Inbox</span> <span className="badge badge-pill badge-info">3</span>
                                        </a>
                                        <a className="media fs-14 p-2" href="pages/prebuilt-pages/user-profile.html"> <span><i className="flaticon-gear mr-2"></i> Account Settings</span>
                                        </a>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li className="dropdown-menu-footer">
                                        <a className="media fs-14 p-2" href="pages/prebuilt-pages/lock-screen.html"> <span><i className="flaticon-security mr-2"></i> Lock</span>
                                        </a>
                                    </li>
                                    <li className="dropdown-menu-footer">
                                    <Link className="media fs-14 p-2" to="/"><span ><i className="flaticon-shut-down mr-2"></i>Logout</span></Link>
                                        
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div className="ms-toggler ms-d-block-sm pr-0 ms-nav-toggler" data-toggle="slideDown" data-target="#ms-nav-options"> <span className="ms-toggler-bar bg-primary"></span>
                            <span className="ms-toggler-bar bg-primary"></span>
                            <span className="ms-toggler-bar bg-primary"></span>
                        </div>
                    </nav>
                    <div className="ms-content-wrapper">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="db-header-title">Welcome, Anny</h1>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6">
                                <div className="ms-card ms-widget has-graph-full-width ms-infographics-widget">
                                    <span className="ms-chart-label bg-black"><i className="material-icons">arrow_upward</i> 3.2%</span>
                                    <div className="ms-card-body media">
                                        <div className="media-body">
                                            <span className="black-text"><strong>Sells Graph</strong></span>
                                            <h2>$8,451</h2>
                                        </div>
                                    </div>
                                    <Line
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
                                    {/* <canvas id="line-chart"></canvas> */}
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6">
                                <div className="ms-card ms-widget has-graph-full-width ms-infographics-widget">
                                    <span className="ms-chart-label bg-red"><i className="material-icons">arrow_downward</i> 4.5%</span>
                                    <div className="ms-card-body media">
                                        <div className="media-body">
                                            <span className="black-text"><strong>Total Visitors</strong></span>
                                            <h2>3,973</h2>
                                        </div>
                                    </div>
                                    <Line
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
                                    {/* <canvas id="line-chart-2"></canvas> */}
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6">
                                <div className="ms-card ms-widget has-graph-full-width ms-infographics-widget">
                                    <span className="ms-chart-label bg-black"><i className="material-icons">arrow_upward</i> 12.5%</span>
                                    <div className="ms-card-body media">
                                        <div className="media-body">
                                            <span className="black-text"><strong>New Users</strong></span>
                                            <h2>7,333</h2>
                                        </div>
                                    </div>
                                    <Line
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
                                    {/* <canvas id="line-chart-3"></canvas> */}
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6">
                                <div className="ms-card ms-widget has-graph-full-width ms-infographics-widget">
                                    <span className="ms-chart-label bg-red"><i className="material-icons">arrow_upward</i> 9.5%</span>
                                    <div className="ms-card-body media">
                                        <div className="media-body">
                                            <span className="black-text"><strong>Total Orders</strong></span>
                                            <h2>48,973</h2>
                                        </div>
                                    </div>
                                    <Line
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
                                    {/* <canvas id="line-chart-4"></canvas> */}
                                </div>
                            </div>

                            <div className="col-xl-6 col-md-12">
                                <div className="ms-panel">
                                    <div className="ms-panel-header">
                                        <div className="d-flex justify-content-between">
                                            <div className="align-self-center align-left">
                                                <h6>Recent Orders Requested</h6>
                                            </div>
                                            <button type="button" className="btn btn-primary">View All</button>
                                        </div>
                                    </div>
                                    <div className="ms-panel-body">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Food Item</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Product ID</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="ms-table-f-w"> <img src="./assets/img/costic/pizza.jpg" alt="people" /> Pizza </td>
                                                        <td>$19.99</td>
                                                        <td>67384917</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="ms-table-f-w"> <img src="./assets/img/costic/french-fries.jpg" alt="people" /> French Fries </td>
                                                        <td>$14.59</td>
                                                        <td>789393819</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="ms-table-f-w"> <img src="./assets/img/costic/cereals.jpg" alt="people" /> Multigrain Hot Cereal </td>
                                                        <td>$25.22</td>
                                                        <td>137893137</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="ms-table-f-w"> <img src="./assets/img/costic/egg-sandwich.jpg" alt="people" /> Fried Egg Sandwich </td>
                                                        <td>$11.23</td>
                                                        <td>235193138</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-md-12">
                                <div className="ms-panel ms-panel-fh">
                                    <div className="ms-panel-header new">
                                        <h6>Monthly Revenue</h6>
                                        <select className="form-control new" id="exampleSelect">
                                            <option value="1">January</option>
                                            <option value="2">February</option>
                                            <option value="3">March </option>
                                            <option value="4">April</option>
                                            <option value="5">May</option>
                                            <option value="1">June</option>
                                            <option value="2">July</option>
                                            <option value="3">August</option>
                                            <option value="4">September</option>
                                            <option value="5">October</option>
                                            <option value="4">November</option>
                                            <option value="5">December</option>
                                        </select>
                                    </div>
                                    <div className="ms-panel-body">
                                        <span className="progress-label"> <strong>Week 1</strong> </span>
                                        <div className="progress">
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '25%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>25%</div>
                                        </div>
                                        <span className="progress-label"> <strong>Week 2</strong> </span>
                                        <div className="progress">
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>50%</div>
                                        </div>
                                        <span className="progress-label"> <strong>Week 3</strong> </span>
                                        <div className="progress">
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '75%' }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>75%</div>
                                        </div>
                                        <span className="progress-label"> <strong>Week 4</strong> </span>
                                        <div className="progress">
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '40%' }} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}>40%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="ms-panel">
                                    <div className="ms-panel-header">
                                        <h6>Trending Orders</h6>
                                    </div>
                                    <div className="ms-panel-body">
                                        <div className="row">

                                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                                <div className="ms-card no-margin">
                                                    <div className="ms-card-img">
                                                        <img src="./assets/img/costic/food-5.jpg" alt="card_img" />
                                                    </div>
                                                    <div className="ms-card-body">
                                                        <div className="ms-card-heading-title">
                                                            <h6>Meat Stew</h6>
                                                            <span className="green-text"><strong>$25.00</strong></span>
                                                        </div>

                                                        <div className="ms-card-heading-title">
                                                            <p>Orders <span className="red-text">15</span></p>
                                                            <p>Income <span className="red-text">$175</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                                <div className="ms-card no-margin">
                                                    <div className="ms-card-img">
                                                        <img src="./assets/img/costic/food-2.jpg" alt="card_img" />
                                                    </div>
                                                    <div className="ms-card-body">
                                                        <div className="ms-card-heading-title">
                                                            <h6>Pancake</h6>
                                                            <span className="green-text"><strong>$50.00</strong></span>
                                                        </div>

                                                        <div className="ms-card-heading-title">
                                                            <p>Orders <span className="red-text">75</span></p>
                                                            <p>Income <span className="red-text">$275</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                                <div className="ms-card no-margin">
                                                    <div className="ms-card-img">
                                                        <img src="./assets/img/costic/food-4.jpg" alt="card_img" />
                                                    </div>
                                                    <div className="ms-card-body">
                                                        <div className="ms-card-heading-title">
                                                            <h6>Burger</h6>
                                                            <span className="green-text"><strong>$45.00</strong></span>
                                                        </div>

                                                        <div className="ms-card-heading-title">
                                                            <p>Orders <span className="red-text">85</span></p>
                                                            <p>Income <span className="red-text">$575</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                                <div className="ms-card no-margin">
                                                    <div className="ms-card-img">
                                                        <img src="./assets/img/costic/food-3.jpg" alt="card_img" />
                                                    </div>
                                                    <div className="ms-card-body">
                                                        <div className="ms-card-heading-title">
                                                            <h6>Saled</h6>
                                                            <span className="green-text"><strong>$85.00</strong></span>
                                                        </div>
                                                        <div className="ms-card-heading-title">
                                                            <p>Orders <span className="red-text">175</span></p>
                                                            <p>Income <span className="red-text">$775</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-7 col-md-12">
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
                            </div>


                            <div className="col-xl-5 col-md-12">
                                <div className="ms-panel ms-widget ms-crypto-widget">
                                    <div className="ms-panel-header">
                                        <h6>Favourite charts</h6>
                                    </div>
                                    <div className="ms-panel-body p-0">
                                        <ul className="nav nav-tabs nav-justified has-gap px-4 pt-4" role="tablist">
                                            <li role="presentation" className="fs-12"><a href="#btc" aria-controls="btc" className="active show" role="tab" data-toggle="tab"> Mon </a></li>
                                            <li role="presentation" className="fs-12"><a href="#xrp" aria-controls="xrp" role="tab" data-toggle="tab"> Tue </a></li>
                                            <li role="presentation" className="fs-12"><a href="#ltc" aria-controls="ltc" role="tab" data-toggle="tab"> Wed </a></li>
                                            <li role="presentation" className="fs-12"><a href="#eth" aria-controls="eth" role="tab" data-toggle="tab"> Thu </a></li>
                                            <li role="presentation" className="fs-12"><a href="#zec" aria-controls="zec" role="tab" data-toggle="tab"> Fri </a></li>
                                        </ul>
                                        <div className="tab-content">
                                            <div role="tabpanel" className="tab-pane active show fade in" id="btc">
                                                <div className="table-responsive">
                                                    <table className="table table-hover thead-light">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Restaurant Names</th>
                                                                <th scope="col">Qty</th>
                                                                <th scope="col">Orders</th>
                                                                <th scope="col">Profit</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Hunger House</td>
                                                                <td>8528</td>
                                                                <td className="ms-text-success">+17.24%</td>
                                                                <td>7.65%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Food Lounge</td>
                                                                <td>4867</td>
                                                                <td className="ms-text-danger">-12.24%</td>
                                                                <td>9.12%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Delizious</td>
                                                                <td>7538</td>
                                                                <td className="ms-text-success">+32.04%</td>
                                                                <td>14.29%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Netherfood</td>
                                                                <td>1614</td>
                                                                <td className="ms-text-danger">-20.75%</td>
                                                                <td>12.25%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Rusmiz</td>
                                                                <td>7538</td>
                                                                <td className="ms-text-success">+32.04%</td>
                                                                <td>14.29%</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div role="tabpanel" className="tab-pane fade" id="xrp">
                                                <div className="table-responsive">
                                                    <table className="table table-hover thead-light">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Restaurant Name</th>
                                                                <th scope="col">Qty</th>
                                                                <th scope="col">Orders</th>
                                                                <th scope="col">Profit</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Hunger House</td>
                                                                <td>8528</td>
                                                                <td className="ms-text-success">+17.24%</td>
                                                                <td>7.65%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Food Lounge</td>
                                                                <td>4867</td>
                                                                <td className="ms-text-danger">-12.24%</td>
                                                                <td>9.12%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Delizious</td>
                                                                <td>7538</td>
                                                                <td className="ms-text-success">+32.04%</td>
                                                                <td>14.29%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Netherfood</td>
                                                                <td>1614</td>
                                                                <td className="ms-text-danger">-20.75%</td>
                                                                <td>12.25%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Rusmiz</td>
                                                                <td>7538</td>
                                                                <td className="ms-text-success">+32.04%</td>
                                                                <td>14.29%</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div role="tabpanel" className="tab-pane fade" id="ltc">
                                                <div className="table-responsive">
                                                    <table className="table table-hover thead-light">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Restaurant Name</th>
                                                                <th scope="col">Qty</th>
                                                                <th scope="col">Orders</th>
                                                                <th scope="col">Profit</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Hunger House</td>
                                                                <td>8528</td>
                                                                <td className="ms-text-success">+17.24%</td>
                                                                <td>7.65%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Food Lounge</td>
                                                                <td>4867</td>
                                                                <td className="ms-text-danger">-12.24%</td>
                                                                <td>9.12%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Delizious</td>
                                                                <td>7538</td>
                                                                <td className="ms-text-success">+32.04%</td>
                                                                <td>14.29%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Netherfood</td>
                                                                <td>1614</td>
                                                                <td className="ms-text-danger">-20.75%</td>
                                                                <td>12.25%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Rusmiz</td>
                                                                <td>7538</td>
                                                                <td className="ms-text-success">+32.04%</td>
                                                                <td>14.29%</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div role="tabpanel" className="tab-pane fade" id="eth">
                                                <div className="table-responsive">
                                                    <table className="table table-hover thead-light">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Restaurant Name</th>
                                                                <th scope="col">Qty</th>
                                                                <th scope="col">Orders</th>
                                                                <th scope="col">Profit</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Hunger House</td>
                                                                <td>8528</td>
                                                                <td className="ms-text-success">+17.24%</td>
                                                                <td>7.65%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Food Lounge</td>
                                                                <td>4867</td>
                                                                <td className="ms-text-danger">-12.24%</td>
                                                                <td>9.12%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Delizious</td>
                                                                <td>7538</td>
                                                                <td className="ms-text-success">+32.04%</td>
                                                                <td>14.29%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Netherfood</td>
                                                                <td>1614</td>
                                                                <td className="ms-text-danger">-20.75%</td>
                                                                <td>12.25%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Rusmiz</td>
                                                                <td>7538</td>
                                                                <td className="ms-text-success">+32.04%</td>
                                                                <td>14.29%</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div role="tabpanel" className="tab-pane fade" id="zec">
                                                <div className="table-responsive">
                                                    <table className="table table-hover thead-light">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Restaurant Name</th>
                                                                <th scope="col">Qty</th>
                                                                <th scope="col">Orders</th>
                                                                <th scope="col">Profit</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Hunger House</td>
                                                                <td>8528</td>
                                                                <td className="ms-text-success">+17.24%</td>
                                                                <td>7.65%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Food Lounge</td>
                                                                <td>4867</td>
                                                                <td className="ms-text-danger">-12.24%</td>
                                                                <td>9.12%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Delizious</td>
                                                                <td>7538</td>
                                                                <td className="ms-text-success">+32.04%</td>
                                                                <td>14.29%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Netherfood</td>
                                                                <td>1614</td>
                                                                <td className="ms-text-danger">-20.75%</td>
                                                                <td>12.25%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Rusmiz</td>
                                                                <td>7538</td>
                                                                <td className="ms-text-success">+32.04%</td>
                                                                <td>14.29%</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="ms-panel">
                                    <div className="ms-panel-header">
                                        <h6>Total Earnings</h6>
                                    </div>
                                    <div className="ms-panel-body p-0">
                                        <div className="ms-quick-stats">
                                            <div className="ms-stats-grid">
                                                <i className="fa fa-star"></i>
                                                <p className="ms-text-dark">$8,033</p>
                                                <span>Today</span>
                                            </div>
                                            <div className="ms-stats-grid">
                                                <i className="fa fa-university"></i>
                                                <p className="ms-text-dark">$3,039</p>
                                                <span>Yesterday</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="ms-panel">
                                    <div className="ms-panel-header">
                                        <h6>Recently Placed Orders</h6>
                                    </div>
                                    <div className="ms-panel-body">
                                        <div className="table-responsive">
                                            <table className="table table-hover thead-primary">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Order ID</th>
                                                        <th scope="col">Order Name</th>
                                                        <th scope="col">Customer Name</th>
                                                        <th scope="col">Location</th>
                                                        <th scope="col">Order Status</th>
                                                        <th scope="col">Delivered Time</th>
                                                        <th scope="col">Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>French Fries</td>
                                                        <td>Jhon Leo</td>
                                                        <td>New Town</td>
                                                        <td><span className="badge badge-primary">Pending</span>
                                                        </td>
                                                        <td>10:05</td>
                                                        <td>$10</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Mango Pie</td>
                                                        <td>Kristien</td>
                                                        <td>Old Town</td>
                                                        <td><span className="badge badge-dark">Cancelled</span>
                                                        </td>
                                                        <td>14:05</td>
                                                        <td>$9</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>FrieD Egg Sandwich</td>
                                                        <td>Jack Suit</td>
                                                        <td>Oxford Street</td>
                                                        <td><span className="badge badge-success">Delivered</span>
                                                        </td>
                                                        <td>12:05</td>
                                                        <td>$19</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">4</th>
                                                        <td>Lemon Yogurt Parfait</td>
                                                        <td>Alesdro Guitto</td>
                                                        <td>Church hill</td>
                                                        <td><span className="badge badge-success">Delivered</span>
                                                        </td>
                                                        <td>12:05</td>
                                                        <td>$18</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">5</th>
                                                        <td>Spicy Grill Sandwich</td>
                                                        <td>Jacob Sahwny</td>
                                                        <td>palace Road</td>
                                                        <td><span className="badge badge-success">Delivered</span>
                                                        </td>
                                                        <td>12:05</td>
                                                        <td>$21</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">6</th>
                                                        <td>Chicken Sandwich</td>
                                                        <td>Peter Gill</td>
                                                        <td>Street 21</td>
                                                        <td><span className="badge badge-primary">Pending</span>
                                                        </td>
                                                        <td>12:05</td>
                                                        <td>$15</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-12">
                                <div className="ms-panel">
                                    <div className="ms-panel-header">
                                        <h6>New Resturant Listings</h6>

                                    </div>
                                    <div className="ms-panel-body">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6 col-sm-6">
                                                <div className="ms-card no-margin">
                                                    <div className="ms-card-body">
                                                        <div className="media fs-14">
                                                            <div className="mr-2 align-self-center">
                                                                <img src="./assets/img/costic/customer-1.jpg" className="ms-img-round" alt="people" />
                                                            </div>
                                                            <div className="media-body">
                                                                <h6>Hunger House </h6>
                                                                <div className="dropdown float-right">
                                                                    <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <i className="material-icons">more_vert</i>
                                                                    </a>
                                                                    <ul className="dropdown-menu dropdown-menu-right">
                                                                        <li className="ms-dropdown-list">
                                                                            <a className="media p-2" href="#">
                                                                                <div className="media-body">
                                                                                    <span>Sales</span>
                                                                                </div>
                                                                            </a>
                                                                            <a className="media p-2" href="#">
                                                                                <div className="media-body">
                                                                                    <span>Details</span>
                                                                                </div>
                                                                            </a>
                                                                            <a className="media p-2" href="#">
                                                                                <div className="media-body">
                                                                                    <span>Remove</span>
                                                                                </div>
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <p className="fs-12 my-1 text-disabled">30 seconds ago</p>
                                                            </div>

                                                        </div>
                                                        <ul className="ms-star-rating rating-fill rating-circle ratings-new">
                                                            <li className="ms-rating-item"> <i className="material-icons">star</i> </li>
                                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                                        </ul>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nunc velit, dictum eget nulla a, sollicitudin rhoncus orci. Vivamus nec commodo turpis.</p>
                                                    </div>
                                                    <div className="ms-card-img">
                                                        <img src="./assets/img/costic/food-1.jpg" alt="card_img" />
                                                    </div>
                                                    <div className="ms-card-footer text-disabled d-flex">
                                                        <div className="ms-card-options">
                                                            <i className="material-icons">favorite</i> 982
                              </div>
                                                        <div className="ms-card-options">
                                                            <i className="material-icons">comment</i> 785
                              </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-6">
                                                <div className="ms-card no-margin">
                                                    <div className="ms-card-body">
                                                        <div className="media fs-14">
                                                            <div className="mr-2 align-self-center">
                                                                <img src="./assets/img/costic/customer-2.jpg" className="ms-img-round" alt="people" />
                                                            </div>
                                                            <div className="media-body">
                                                                <h6>Food Lounge</h6>
                                                                <div className="dropdown float-right">
                                                                    <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <i className="material-icons">more_vert</i>
                                                                    </a>
                                                                    <ul className="dropdown-menu dropdown-menu-right">
                                                                        <li className="ms-dropdown-list">
                                                                            <a className="media p-2" href="#">
                                                                                <div className="media-body">
                                                                                    <span>Sales</span>
                                                                                </div>
                                                                            </a>
                                                                            <a className="media p-2" href="#">
                                                                                <div className="media-body">
                                                                                    <span>Details</span>
                                                                                </div>
                                                                            </a>
                                                                            <a className="media p-2" href="#">
                                                                                <div className="media-body">
                                                                                    <span>Remove</span>
                                                                                </div>
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <p className="fs-12 my-1 text-disabled">30 seconds ago</p>
                                                            </div>

                                                        </div>
                                                        <ul className="ms-star-rating rating-fill rating-circle ratings-new">
                                                            <li className="ms-rating-item"> <i className="material-icons">star</i> </li>
                                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                                        </ul>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nunc velit, dictum eget nulla a, sollicitudin rhoncus orci. Vivamus nec commodo turpis.</p>
                                                    </div>
                                                    <div className="ms-card-img">
                                                        <img src="./assets/img/costic/food-2.jpg" alt="card_img" />
                                                    </div>
                                                    <div className="ms-card-footer text-disabled d-flex">
                                                        <div className="ms-card-options">
                                                            <i className="material-icons">favorite</i> 982
                              </div>
                                                        <div className="ms-card-options">
                                                            <i className="material-icons">comment</i> 785
                              </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-6">
                                                <div className="ms-card no-margin">
                                                    <div className="ms-card-body">
                                                        <div className="media fs-14">
                                                            <div className="mr-2 align-self-center">
                                                                <img src="./assets/img/costic/customer-6.jpg" className="ms-img-round" alt="people" />
                                                            </div>
                                                            <div className="media-body">
                                                                <h6>Delizious </h6>
                                                                <div className="dropdown float-right">
                                                                    <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <i className="material-icons">more_vert</i>
                                                                    </a>
                                                                    <ul className="dropdown-menu dropdown-menu-right">
                                                                        <li className="ms-dropdown-list">
                                                                            <a className="media p-2" href="#">
                                                                                <div className="media-body">
                                                                                    <span>Sales</span>
                                                                                </div>
                                                                            </a>
                                                                            <a className="media p-2" href="#">
                                                                                <div className="media-body">
                                                                                    <span>Details</span>
                                                                                </div>
                                                                            </a>
                                                                            <a className="media p-2" href="#">
                                                                                <div className="media-body">
                                                                                    <span>Remove</span>
                                                                                </div>
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <p className="fs-12 my-1 text-disabled">30 seconds ago</p>
                                                            </div>

                                                        </div>
                                                        <ul className="ms-star-rating rating-fill rating-circle ratings-new">
                                                            <li className="ms-rating-item"> <i className="material-icons">star</i> </li>
                                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                                        </ul>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nunc velit, dictum eget nulla a, sollicitudin rhoncus orci. Vivamus nec commodo turpis.</p>
                                                    </div>
                                                    <div className="ms-card-img">
                                                        <img src="./assets/img/costic/food-3.jpg" alt="card_img" />
                                                    </div>
                                                    <div className="ms-card-footer text-disabled d-flex">
                                                        <div className="ms-card-options">
                                                            <i className="material-icons">favorite</i> 982
                              </div>
                                                        <div className="ms-card-options">
                                                            <i className="material-icons">comment</i> 785
                              </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-xl-6 col-md-12">
                                <div className="ms-panel ms-panel-fh">
                                    <div className="ms-panel-header">
                                        <div className="d-flex justify-content-between">
                                            <div className="align-self-center align-left">
                                                <h6>Recent Support Tickets</h6>
                                            </div>
                                            <a href="#" className="btn btn-primary"> View All</a>
                                        </div>
                                    </div>
                                    <div className="ms-panel-body p-0">
                                        <ul className="ms-list ms-feed ms-twitter-feed ms-recent-support-tickets">
                                            <li className="ms-list-item">
                                                <a href="#" className="media clearfix">
                                                    <img src="./assets/img/costic/customer-4.jpg" className="ms-img-round ms-img-small" alt="This is another feature" />
                                                    <div className="media-body">
                                                        <div className="d-flex justify-content-between">
                                                            <h6 className="ms-feed-user mb-0">Lorem ipsum dolor</h6>
                                                            <span className="badge badge-success"> Open </span>
                                                        </div> <span className="my-2 d-block"> <i className="material-icons">date_range</i> February 24, 2019</span>
                                                        <p className="d-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus lectus a facilisis bibendum. Duis quis convallis sapien ...</p>
                                                        <div className="d-flex justify-content-between align-items-end">
                                                            <div className="ms-feed-controls"> <span>
                                                                <i className="material-icons">chat</i> 16
                                  </span>
                                                                <span>
                                                                    <i className="material-icons">attachment</i> 3
                                  </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="ms-list-item">
                                                <a href="#" className="media clearfix">
                                                    <img src="./assets/img/costic/customer-1.jpg" className="ms-img-round ms-img-small" alt="This is another feature" />
                                                    <div className="media-body">
                                                        <div className="d-flex justify-content-between">
                                                            <h6 className="ms-feed-user mb-0">Lorem ipsum dolor</h6>
                                                            <span className="badge badge-success"> Open </span>
                                                        </div> <span className="my-2 d-block"> <i className="material-icons">date_range</i> February 24, 2019</span>
                                                        <p className="d-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus lectus a facilisis bibendum. Duis quis convallis sapien ...</p>
                                                        <div className="d-flex justify-content-between align-items-end">
                                                            <div className="ms-feed-controls"> <span>
                                                                <i className="material-icons">chat</i> 11
                                  </span>
                                                                <span>
                                                                    <i className="material-icons">attachment</i> 1
                                  </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="ms-list-item">
                                                <a href="#" className="media clearfix">
                                                    <img src="./assets/img/costic/customer-7.jpg" className="ms-img-round ms-img-small" alt="This is another feature" />
                                                    <div className="media-body">
                                                        <div className="d-flex justify-content-between">
                                                            <h6 className="ms-feed-user mb-0">Lorem ipsum dolor</h6>
                                                            <span className="badge badge-danger"> Closed </span>
                                                        </div> <span className="my-2 d-block"> <i className="material-icons">date_range</i> February 24, 2019</span>
                                                        <p className="d-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus lectus a facilisis bibendum. Duis quis convallis sapien ...</p>
                                                        <div className="d-flex justify-content-between align-items-end">
                                                            <div className="ms-feed-controls"> <span>
                                                                <i className="material-icons">chat</i> 21
                                  </span>
                                                                <span>
                                                                    <i className="material-icons">attachment</i> 5
                                  </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6 col-md-12">
                                <div className="ms-panel ms-panel-fh ms-widget ms-chat-conversations">
                                    <div className="ms-panel-header">
                                        <div className="ms-chat-header justify-content-between">
                                            <div className="ms-chat-user-container media clearfix">
                                                <div className="ms-chat-status ms-status-online ms-chat-img mr-3 align-self-center">
                                                    <img src="./assets/img/costic/customer-1.jpg" className="ms-img-round" alt="people" />
                                                </div>
                                                <div className="media-body ms-chat-user-info mt-1">
                                                    <h6>Heather Brown</h6>
                                                    <span className="text-disabled fs-12">
                                                        Active Now
                            </span>
                                                </div>
                                            </div>
                                            <ul className="ms-list ms-list-flex ms-chat-controls">
                                                <li data-toggle="tooltip" data-placement="top" title="Call"> <i className="material-icons">local_phone</i>
                                                </li>
                                                <li data-toggle="tooltip" data-placement="top" title="Video Call"> <i className="material-icons">videocam</i>
                                                </li>
                                                <li data-toggle="tooltip" data-placement="top" title="Add to Chat"> <i className="material-icons">person_add</i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="ms-panel-body ms-scrollable">
                                        <div className="ms-chat-bubble ms-chat-message ms-chat-outgoing media clearfix">
                                            <div className="ms-chat-status ms-status-online ms-chat-img">
                                                <img src="./assets/img/costic/customer-1.jpg" className="ms-img-round" alt="people" />
                                            </div>
                                            <div className="media-body">
                                                <div className="ms-chat-text">
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                </div>
                                                <p className="ms-chat-time">10:33 pm</p>
                                            </div>
                                        </div>
                                        <div className="ms-chat-bubble ms-chat-message ms-chat-incoming media clearfix">
                                            <div className="ms-chat-status ms-status-online ms-chat-img">
                                                <img src="./assets/img/costic/customer-2.jpg" className="ms-img-round" alt="people" />
                                            </div>
                                            <div className="media-body">
                                                <div className="ms-chat-text">
                                                    <p>I'm doing great, thanks for asking</p>
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
                                                </div>
                                                <p className="ms-chat-time">11:01 pm</p>
                                            </div>
                                        </div>
                                        <div className="ms-chat-bubble ms-chat-message ms-chat-outgoing media clearfix">
                                            <div className="ms-chat-status ms-status-online ms-chat-img">
                                                <img src="./assets/img/costic/customer-1.jpg" className="ms-img-round" alt="people" />
                                            </div>
                                            <div className="media-body">
                                                <div className="ms-chat-text">
                                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
                                                    <p>There are many variations of passages of Lorem Ipsum available</p>
                                                </div>
                                                <p className="ms-chat-time">11:03 pm</p>
                                            </div>
                                        </div>
                                        <div className="ms-panel-footer">
                                            <div className="ms-chat-textbox">
                                                <ul className="ms-list-flex mb-0">
                                                    <li className="ms-chat-vn"><i className="material-icons">mic</i>
                                                    </li>
                                                    <li className="ms-chat-input">
                                                        <input type="text" name="msg" placeholder="Enter Message" value="" />
                                                    </li>
                                                    <li className="ms-chat-text-controls ms-list-flex"> <span> <i className="material-icons">tag_faces</i> </span>
                                                        <span> <i className="material-icons">attach_file</i> </span>
                                                        <span> <i className="material-icons">camera_alt</i> </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default Dashboard;
