import React, { useState, useEffect } from "react";
import { doAuthentication } from "../../utils/auth";
import UserProfile from "../users/UserProfile";
import BigButton from "../buttons/BigButton";
import "../../assets/css/pages/ProfilePage.css";

const ProfilePage = props => {
    const [isLogout, setIsLogout] = useState(false);
    const history = props.history;
    useEffect(() => {
        doAuthentication(props.history);
    }, [isLogout, props.history]);
    const onLogoutHandler = () => {
        window.localStorage.removeItem("token");
        setIsLogout(true);
    };
    const onClickChangePasswordHandler = () => {
        history.push("/profile/change_password");
    };
    const onChangeUsernameHandler = () => {
        history.push("/profile/change_username");
    };
    return (
        <div className="ProfilePage">
            <UserProfile
                history={props.history}
            />
            <div className="button-group">
                <BigButton
                    svg={null}
                    text="Change Password"
                    className="button"
                    onClickHandler={onClickChangePasswordHandler}
                />
                <BigButton
                    svg={null}
                    text="Change Username"
                    className="button"
                    onClickHandler={onChangeUsernameHandler}
                />
            </div>
            <div className="button-group">
                <BigButton
                    svg={null}
                    text="Sign out"
                    className="button sign-out"
                    onClickHandler={onLogoutHandler}
                />
            </div>
        </div>
    );
};

export default ProfilePage;
