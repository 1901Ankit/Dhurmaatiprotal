import { configureStore } from "@reduxjs/toolkit";

import modalreducer from "../reducer/modal";
const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("userState", JSON.stringify(getState().user));
    return result;
  };
};

export default configureStore({
  reducer: {
    modal: modalreducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(localStorageMiddleware),
});
