import React, {useState} from 'react';
// import { NavLink as RouterNavLink } from "react-router-dom";
import {
    Collapse,
    Container,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import '@fortawesome/fontawesome-free/css/all.css';
//import {useSelector} from "react-redux";
//import {getAccountFromIdToken} from "../redux/auth/selectors";

// interface IUserAvatarProps extends React.HTMLProps<JSX.Element> {
//     user: any
// }

// function UserAvatar(props: IUserAvatarProps) {
//     // If a user avatar is available, return an img tag with the pic
//     if (props.user.avatar) {
//         return <img
//             src={props.user.avatar} alt="user"
//             className="rounded-circle align-self-center mr-2"
//             style={{width: '32px'}} />;
//     }
//
//     // No avatar available, return a default icon
//     // todo: use FontAwesomeIcon
//     return <i
//         className="far fa-user-circle fa-lg rounded-circle align-self-center mr-2"
//         style={{width: '32px'}} />;
// }
//
// interface IAuthNavItemProps extends React.HTMLProps<JSX.Element> {
//     isAuthenticated: boolean;
//     user: any;
//     authButtonMethod: any
// }

// function AuthNavItem(props: IAuthNavItemProps) {
//     // If authenticated, return a dropdown with the user's info and a
//     // sign out button
//     const name = useSelector(getAccountFromIdToken)
//     if (props.isAuthenticated) {
//         return (
//             <UncontrolledDropdown>
//                 <DropdownToggle nav caret>
//                     <UserAvatar user={props.user}/>
//                 </DropdownToggle>
//                 <DropdownMenu right>
//                     <h5 className="dropdown-item-text mb-0">{name}</h5>
//                     <p className="dropdown-item-text text-muted mb-0">{props.user.email}</p>
//                     <DropdownItem divider />
//                     <DropdownItem onClick={props.authButtonMethod}>Sign Out</DropdownItem>
//                 </DropdownMenu>
//             </UncontrolledDropdown>
//         );
//     }
//
//     // Not authenticated, return a sign in link
//     return (
//         <NavItem>
//             <NavLink onClick={props.authButtonMethod}>Sign In</NavLink>
//         </NavItem>
//     );
// }
//
// interface INavBarOwnProps {
//     isAuthenticated: boolean;
//     authButtonMethod: any;
// }

// type NavBarProps = INavBarOwnProps;

export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div>
            <Navbar color="dark" dark expand="md" fixed="top">
                <Container>
                    <NavbarBrand href="/" className="mr-auto">Tycherion</NavbarBrand>
                    {/*<NavbarToggler onClick={toggle} />*/}
                    {/*<Collapse isOpen={isOpen} navbar>*/}
                    {/*    <Nav className="mr-auto" navbar>*/}
                    {/*        <NavItem>*/}
                    {/*            /!*<RouterNavLink to="/" className="nav-link" exact>Home</RouterNavLink>*!/*/}
                    {/*        </NavItem>*/}
                    {/*        <NavItem>*/}
                    {/*            /!*<RouterNavLink to="/recordings" className="nav-link" exact>Recordings</RouterNavLink>*!/*/}
                    {/*        </NavItem>*/}
                    {/*        <NavItem>*/}
                    {/*            /!*<RouterNavLink to="/uploads" className="nav-link" exact>Uploads</RouterNavLink>*!/*/}
                    {/*        </NavItem>*/}


                    {/*    </Nav>*/}
                    {/*    <Nav className="justify-content-end" navbar>*/}
                    {/*        /!*<NavItem>*!/*/}
                    {/*        /!*    <NavLink href="https://developer.microsoft.com/graph/docs/concepts/overview" target="_blank">*!/*/}
                    {/*        /!*        <i className="fas fa-external-link-alt mr-1" />*!/*/}
                    {/*        /!*        Docs*!/*/}
                    {/*        /!*    </NavLink>*!/*/}
                    {/*        /!*</NavItem>*!/*/}
                    {/*        /!*<AuthNavItem*!/*/}
                    {/*        /!*    isAuthenticated={isAuthenticated}*!/*/}
                    {/*        /!*    authButtonMethod={authButtonMethod}*!/*/}
                    {/*        /!*    user={{}} />*!/*/}
                    {/*    </Nav>*/}
                    {/*</Collapse>*/}
                </Container>
            </Navbar>
        </div>
    );
}

// export class NavBarOld extends React.Component<NavBarProps, INavBarState> {
//     constructor(props: NavBarProps) {
//         super(props);
//
//         this.toggle = this.toggle.bind(this);
//         this.state = {
//             isOpen: false
//         };
//     }
//
//     toggle(): void {
//         this.setState({
//             isOpen: !this.state.isOpen
//         });
//     }
//
//     render(): ReactNode {
//
//         return (
//             <div>
//                 <Navbar color="dark" dark expand="md" fixed="top">
//                     <Container>
//                         <NavbarBrand href="/">Media Recorder Test</NavbarBrand>
//                         <NavbarToggler onClick={this.toggle} />
//                         <Collapse isOpen={this.state.isOpen} navbar>
//                             <Nav className="mr-auto" navbar>
//                                 <NavItem>
//                                     <RouterNavLink to="/" className="nav-link" exact>Home</RouterNavLink>
//                                 </NavItem>
//                                 <NavItem>
//                                     <RouterNavLink to="/uploads" className="nav-link" exact>Uploads</RouterNavLink>
//                                 </NavItem>
//                                 {/*{calendarLink}*/}
//                             </Nav>
//                             <Nav className="justify-content-end" navbar>
//                                 {/*<NavItem>*/}
//                                 {/*    <NavLink href="https://developer.microsoft.com/graph/docs/concepts/overview" target="_blank">*/}
//                                 {/*        <i className="fas fa-external-link-alt mr-1" />*/}
//                                 {/*        Docs*/}
//                                 {/*    </NavLink>*/}
//                                 {/*</NavItem>*/}
//                                 <AuthNavItem
//                                     isAuthenticated={this.props.isAuthenticated}
//                                     authButtonMethod={this.props.authButtonMethod}
//                                     user={this.props.user} />
//                             </Nav>
//                         </Collapse>
//                     </Container>
//                 </Navbar>
//             </div>
//         );
//     }
// }