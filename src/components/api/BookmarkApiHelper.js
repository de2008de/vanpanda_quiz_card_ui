import axios from "axios";
import ServerConfig from "../../configs/ServerConfig";

const bookmarkApi = "/api/v1/bookmark";
const token = window.localStorage.getItem("token");

export const getBookmarks = () => {
    const headers = {
        token: token
    };
    return axios
        .get(ServerConfig.api.ip + bookmarkApi, {
            headers: headers
        });
};

export const addBookmark = id => {
    const headers = {
        token: token
    };
    return axios
        .post(
            ServerConfig.api.ip + bookmarkApi,
            {
                concept_card_id: id
            },
            { headers: headers }
        );
};

export const deleteBookmark = id => {
    const headers = {
        token: token
    };
    return axios
        .delete(ServerConfig.api.ip + bookmarkApi, {
            headers: headers,
            data: {
                concept_card_id: id
            }
        });
};

export const convertBookmarkArrayToMap = bookmarks => {
    const bookmarkMap = {};
    bookmarks.forEach(oBookmark => {
        bookmarkMap[oBookmark.conceptCardId] = oBookmark;
    });
    return bookmarkMap;
};