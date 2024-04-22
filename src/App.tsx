import { Suspense } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary as ErrorBoundaryContainer } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ErrorBoundary } from "./Common/Features";
import { LayoutDefault } from "./Common/Layout";
import CommonRoutes from "./App/Routers/CommonRoutes";
import { store } from "./App/store";

import "./locales/config";

const App = () => {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <ErrorBoundaryContainer FallbackComponent={ErrorBoundary}>
          <Suspense>
            <BrowserRouter>
              <LayoutDefault>
                <CommonRoutes />
              </LayoutDefault>
              {/* <AxiosProvider /> */}
            </BrowserRouter>
          </Suspense>
        </ErrorBoundaryContainer>
      </HelmetProvider>
      <ToastContainer />
    </Provider>
  );
};

export default App;
