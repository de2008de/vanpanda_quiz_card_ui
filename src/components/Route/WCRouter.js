import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import DetailPage from "../commons/DetailPage";
import HomePage from "../Home/HomePage";
import BookmarkPage from "../commons/BookmarkPage";
import AddStudyCardPage from '../commons/AddStudyCardPage';
import SuccessPage from "../commons/SuccessPage";

const WCRouter = () => {
    return (
        <div className="WCRouter">
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/detail" component={DetailPage} />
                <Route path="/bookmarks" component={BookmarkPage} />
                <Route path="/addStudyCard" component={AddStudyCardPage} />
                <Route path="/success" component={SuccessPage} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default WCRouter;
