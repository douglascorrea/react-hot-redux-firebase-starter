import * as types from "./actionTypes";
import { ajaxCallError, beginAjaxCall } from "./ajaxStatusActions";
import firebaseApi from "../api/firebase";

const serverPath = "/chat/rooms";

export const createRoom = name => async dispatch => {
  try {
    dispatch(beginAjaxCall());
    await firebaseApi.databaseSet(`${serverPath}/${name}`, { public: true });
  } catch (error) {
    dispatch(ajaxCallError());
    // @TODO better error handling
    throw error;
  }
};

export const watchRooms = () => async dispatch =>
  firebaseApi.Subscribe(serverPath, "child_added", (room, name) =>
    dispatch({ type: types.CHAT_CREATED_ROOM_SUCCESS, name, room })
  );

export const unwatchRooms = () => () =>
  firebaseApi.Unsubscribe(serverPath, "child_added");

export const enterRoom = (email, room) => async dispatch => {
  try {
    dispatch(beginAjaxCall());
    await firebaseApi.databasePush(`${serverPath}/${room}/users`, email);
  } catch (error) {
    dispatch(ajaxCallError());
    // @TODO better error handling
    throw error;
  }
};

export const leaveRoom = (email, room) => async dispatch => {
  try {
    dispatch(beginAjaxCall());
    const key = Object.keys(
      (await firebaseApi.GetKeyByValueOnce(
        `${serverPath}/${room}/users`,
        email
      )).val()
    )[0];
    await firebaseApi.databaseSet(`${serverPath}/${room}/users/${key}`, null);
  } catch (error) {
    dispatch(ajaxCallError());
    // @TODO better error handling
    throw error;
  }
};

export const sendMessage = (email, message, room) => async dispatch => {
  try {
    dispatch(beginAjaxCall());
    await firebaseApi.databasePush(`${serverPath}/${room}/messages`, {
      author: email,
      content: message
    });
  } catch (error) {
    dispatch(ajaxCallError());
    // @TODO better error handling
    throw error;
  }
};

export const watchRoom = room => dispatch => {
  firebaseApi.Subscribe(`${serverPath}/${room}/users`, "child_added", email =>
    dispatch({ type: types.CHAT_ENTERED_ROOM_SUCCESS, email, room })
  );
  firebaseApi.Subscribe(`${serverPath}/${room}/users`, "child_removed", email =>
    dispatch({ type: types.CHAT_LEFT_ROOM_SUCCESS, email, room })
  );
  firebaseApi.Subscribe(
    `${serverPath}/${room}/messages`,
    "child_added",
    message =>
      dispatch({ type: types.CHAT_NEW_MESSAGE_ROOM_SUCCESS, message, room })
  );
};

export const unwatchRoom = room => () => {
  firebaseApi.Unsubscribe(`${serverPath}/${room}/users`, "child_added");
  firebaseApi.Unsubscribe(`${serverPath}/${room}/users`, "child_removed");
  firebaseApi.Unsubscribe(`${serverPath}/${room}/messages`, "child_added");
};
