import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import DetailPage from "../pages/DetailPage";
import MyCardPage from "../pages/MyCardPage";
import BookmarkPage from "../pages/BookmarkPage";
import AddStudyCardPage from '../pages/AddStudyCardPage';
import SuccessPage from "../pages/SuccessPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ProfilePage from "../pages/ProfilePage";
import PaymentPage from "../pages/PaymentPage";
import PaymentCompletedPage from "../payment/PaymentCompletedPage";
import PublicProfilePage from "../pages/PublicProfilePage";
import StudyPage from "../pages/MultipleChoicePage";
import FlashcardPage from "../pages/FlashcardPage";
import StudyPageResult from "../pages/StudyPageResult";
import SearchResultPage from "../search/SearchPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";

const WCRouter = () => {
    return (
        <div className="WCRouter">
            <Switch>
                <Route path="/mycard" exact component={MyCardPage} />
                <Route path="/detail" component={DetailPage} />
                <Route path="/bookmarks" component={BookmarkPage} />
                <Route path="/addStudyCard" component={AddStudyCardPage} />
                <Route path="/success" component={SuccessPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignUpPage} />
                <Route path="/profile" exact component={ProfilePage} />
                <Route path="/user/publicProfile" component={PublicProfilePage} />
                <Route path="/paymentCompleted" component={PaymentCompletedPage} />
                <Route path="/payment" component={PaymentPage} />
                <Route path="/studyCard/study" exact component={StudyPage} />
                <Route path="/studyCard/study/result" component={StudyPageResult} />
                <Route path="/studyCard/flashcard" component={FlashcardPage} />
                <Route path="/search" exact component={SearchResultPage} />
                <Route path="/profile/change_password" exact component={ChangePasswordPage} />
                <Redirect to="/mycard" />
            </Switch>
        </div>
    );
};

export default WCRouter;
