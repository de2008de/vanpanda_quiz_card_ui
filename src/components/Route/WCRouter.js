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
import StudyPage from "../pages/StudyPage";
import FlashcardPage from "../pages/FlashcardPage";
import ScoreResultPage from "../pages/ScoreResultPage";
import SearchResultPage from "../search/SearchPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import ChangeUsernamePage from "../pages/ChangeUsernamePage";
import { isToggleOn } from "../../configs/FeatureToggle";

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

                {isToggleOn("CREDIT_PURCHASE_FEATURE") ? <Route path="/payment" component={PaymentPage} /> : null}

                <Route path="/studyCard/study" exact component={StudyPage} />
                <Route path="/studyCard/study/score" component={ScoreResultPage} />
                <Route path="/studyCard/flashcard" component={FlashcardPage} />
                <Route path="/search" exact component={SearchResultPage} />
                <Route path="/profile/change_password" exact component={ChangePasswordPage} />
                <Route path="/profile/change_username" exact component={ChangeUsernamePage} />
                <Redirect to="/mycard" />
            </Switch>
        </div>
    );
};

export default WCRouter;
