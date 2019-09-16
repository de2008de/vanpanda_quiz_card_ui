import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import DetailPage from "../commons/DetailPage";
import HomePage from "../Home/HomePage";
import BookmarkPage from "../commons/BookmarkPage";

const WCRouter = () => {
    return (
        <div className="WCRouter">
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/detail" component={DetailPage} />
                <Route path="/bookmarks" component={BookmarkPage} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default WCRouter;
