import React, { Component } from "react";
import { searchStudyCard, renderStudyCards } from "../api/StudyCardsApiHelper";
import CircularProgress from '@material-ui/core/CircularProgress';
import { debounce } from "../../helpers/general";
import CloseIcon from '@material-ui/icons/Close';
import SearchBar from "./SearchBar";
import GoTopIcon from "../commons/GoTopButton";
import {
    cacheSearchState,
    getCachedSearchState,
    clearCachedSearchState,
    cacheVerticalScrollPosition,
    getCachedVerticalScrollPosition,
    clearCachedVerticalScrollPosition
} from "../../helpers/cacheHelper";

const styles = {
    searchBarWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "auto",
        margin: "0.5rem 0.5rem 1rem 1rem"
    },
    iconOnRightOfSearchBar: {
        marginLeft: "0.5rem"
    },
    loaderWrapper: {
        display: "flex",
        justifyContent: "center"
    },
    goTopButtonWrapper: {
        position: "fixed",
        bottom: "15%",
        right: "5%",
        zIndex: 1000
    }
};

class SearchResultPage extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.cachedSearchState = getCachedSearchState();
        this.defaultState = {
            currentSearchResultPage: 0,
            searchResult: [],
            isSearchingResult: false,
            searchKeyword: "",
            isLoadingMore: false,
            hasMoreResult: true,
            isLoadingFirstPage: true
        };
        this.searchState = this.cachedSearchState || this.defaultState;
        this.searhBarAutoFocus = this.cachedSearchState ? false : true;
        this.state = {
            ...this.searchState
        }
    }

    componentDidMount() {
        this._isMounted = true;
        const fnCallBack = (entries, observer) => {
            entries.forEach(this.onIntersectingBottom.bind(this));
        }
        const oOberserverOptions = {}
        const oIntersectionObserver = new IntersectionObserver(fnCallBack, oOberserverOptions);
        const oObservee = document.querySelector("#observee");
        oIntersectionObserver.observe(oObservee);
        document.querySelector(".SearchBar input").value = this.state.searchKeyword;
        const verticalScrollPosition = getCachedVerticalScrollPosition();
        if (verticalScrollPosition) {
            const ScrollableContainer = ".AppShell";
            document.querySelector(ScrollableContainer).scrollTo(0, verticalScrollPosition);
        }
        if (this.searhBarAutoFocus) {
            const searchBarInput = ".SearchBar input";
            document.querySelector(searchBarInput).focus();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        clearTimeout(this._debounceTimeout);
        if (this.hasClearedSearchState) {
            clearCachedSearchState();
            clearCachedVerticalScrollPosition();
        } else {
            const currentState = Object.assign({}, this.state);
            if (this.state.isSearchingResult || this.state.isLoadingMore) {
                if (this.state.isLoadingFirstPage) {
                    currentState.searchKeyword = "";
                }
                currentState.currentSearchResultPage = currentState.currentSearchResultPage - 1;
                currentState.isSearchingResult = false;
                currentState.isLoadingMore = false;
            }
            cacheSearchState(currentState);
            cacheVerticalScrollPosition();
        }
    }

    getFirstPageSearchResult = (keyword) => {
        const firstPage = 0;
        this.setState({
            isSearchingResult: true,
            searchKeyword: keyword,
            currentSearchResultPage: firstPage,
            hasMoreResult: true,
            isLoadingFirstPage: true
        });
        searchStudyCard(keyword, firstPage)
            .then(response => {
                if (!this._isMounted) {
                    return;
                }
                const studyCards = response.data.data;
                this.setState({
                    searchResult: studyCards,
                    isSearchingResult: false,
                    isLoadingFirstPage: false
                });
            });
    };

    loadMoreSearchResult = page => {
        if (!this.state.hasMoreResult) {
            return;
        }
        this.setState({
            isLoadingMore: true,
            currentSearchResultPage: page,
        });
        searchStudyCard(this.state.searchKeyword, page)
            .then(response => {
                if (!this._isMounted) {
                    return;
                }
                const studyCards = response.data.data;
                if (!studyCards || studyCards.length === 0) {
                    this.setState({
                        hasMoreResult: false,
                        isLoadingMore: false
                    });
                    return;
                }
                this.setState({
                    searchResult: this.state.searchResult.concat(studyCards),
                    isLoadingMore: false
                });
            });
    };

    onIntersectingBottom = (entry) => {
        if (entry.isIntersecting) {
            if (!this.state.isLoadingFirstPage) {
                this.loadMoreSearchResult(this.state.currentSearchResultPage + 1);
            }
        }
    }

    onClickSearchCloseIcon = () => {
        this.hasClearedSearchState = true;
        this.props.history.goBack();
    };

    getOnChangeSearchTextHandler = () => {
        const debounceInterval = 600;
        const debouncedGetFirstPageSearchResult = debounce(this.getFirstPageSearchResult, debounceInterval);
        const onChangeHandler = e => {
            const keyword = e.target.value;
            const firstPage = 0;
            const timeout = debouncedGetFirstPageSearchResult(keyword, firstPage);
            this._debounceTimeout = timeout;
        };
        return onChangeHandler;
    };

    renderSearchResult = () => {
        if (this.state.isSearchingResult) {
            return (
                <div style={styles.loaderWrapper}>
                    <CircularProgress />
                </div>
            );
        } else if (!this.state.searchResult || this.state.searchResult.length === 0) {
            return (
                <div style={{ textAlign: "center" }}>
                    No Result
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        {renderStudyCards(this.state.searchResult)}
                        {this.state.isLoadingMore ?
                            <div style={styles.loaderWrapper}>
                                <CircularProgress />
                            </div>
                            :
                            <div style={{ textAlign: "center" }}>
                                No More Result
                            </div>
                        }
                    </div>
                </div>
            );
        }
    };

    renderObjectOnRightOfSearchBar = () => {
        return (
            <CloseIcon style={styles.iconOnRightOfSearchBar} onClick={this.onClickSearchCloseIcon} />
        );
    };

    render() {
        return (
            <div>
                <div style={styles.searchBarWrapper}>
                    <SearchBar
                        onChangeHandler={(this.getOnChangeSearchTextHandler())}
                    />
                    {this.renderObjectOnRightOfSearchBar()}
                </div>
                {this.renderSearchResult()}
                <div style={styles.goTopButtonWrapper}>
                    <GoTopIcon />
                </div>
                <div id="observee">
                </div>
            </div>
        );
    }
};

export default SearchResultPage;
