import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./services/redux/Store";
import { getproduct } from "./services/redux/slices/ProductSlice";
import { ProductStateModel } from "./models/State";

// const MainLayout = lazy(() => import("./components/MainLayout"));
const HomeLayout = lazy(() => import("./components/HomeLayout"));
function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getproduct());
  }, []);

  const { isLoading, isError, productData } = useSelector(
    (state: ProductStateModel) => state.product
  );

  if (isLoading || productData == null) {
    return (
      <div className="center">
        <span className="loader"></span>
      </div>
    );
  } else if (isError) {
    return (
      <div className="center">
        <span> Error While Fetching Data</span>
      </div>
    );
  } else {
    return (
      <Suspense>
        <HomeLayout />
      </Suspense>
    );
  }
}

export default App;
