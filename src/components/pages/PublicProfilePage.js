import React from "react";
import UserProfile from "../users/UserProfile";
import qs from "query-string";

const PublicProfilePage = props => {
    const userId = qs.parse(props.location.search).id;

    return (
        <div>
            <UserProfile
                id={userId}
                history={props.history}
                isPublic={true}
            />
        </div>
    );
}

export default PublicProfilePage;
