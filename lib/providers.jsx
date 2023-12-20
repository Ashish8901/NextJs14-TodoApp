"use client";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { reduxStore } from "./redux/store";
let persistor = persistStore(reduxStore);
export function Providers({ children }) {
  return (
    <Provider store={reduxStore}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
}
