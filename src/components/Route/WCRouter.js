import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import DetailPage from "../commons/DetailPage";
import HomePage from "../Home/HomePage";
import BookmarkPage from "../commons/BookmarkPage";
import AddStudyCardPage from '../commons/AddStudyCardPage';
import SuccessPage from "../commons/SuccessPage";
import LoginPage from "../commons/LoginPage";
import SignUpPage from "../commons/SignUpPage";
import ProfilePage from "../commons/ProfilePage";
import PaymentPage from "../commons/PaymentPage";
import PaymentCompletedPage from "../payment/PaymentCompletedPage";
import PublicProfilePage from "../commons/PublicProfilePage";
import StudyPage from "../commons/StudyPage";
import FlashcardPage from "../commons/FlashcardPage";
import StudyPageResult from "../commons/StudyPageResult";
import ExplorePage from "../explore/ExplorePage";
import SearchResultPage from "../explore/SearchPage";

const WCRouter = () => {
    return (
        <div className="WCRouter">
            <Switch>
                <Route path="/" exact component={ExplorePage} />
                <Route path="/my_home" exact component={HomePage} />
                <Route path="/detail" component={DetailPage} />
                <Route path="/bookmarks" component={BookmarkPage} />
                <Route path="/addStudyCard" component={AddStudyCardPage} />
                <Route path="/success" component={SuccessPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignUpPage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/user/publicProfile" component={PublicProfilePage} />
                <Route path="/paymentCompleted" component={PaymentCompletedPage} />
                <Route path="/payment" component={PaymentPage} />
                <Route path="/studyCard/study" exact component={StudyPage} />
                <Route path="/studyCard/study/result" component={StudyPageResult} />
                <Route path="/studyCard/flashcard" component={FlashcardPage} />
                <Route path="/search" exact component={SearchResultPage} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default WCRouter;
