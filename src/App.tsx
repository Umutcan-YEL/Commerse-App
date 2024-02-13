import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./services/redux/Store";
import { getproduct } from "./services/redux/slices/ProductSlice";
import { ProductStateModel } from "./models/State";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getproduct());
  }, []);

  const { isLoading, isError } = useSelector(
    (state: ProductStateModel) => state.product
  );

  if (isLoading) {
    return (
      <div className="center">
        <span className="loader"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="center">
        <span> Error While Fetching Data</span>
      </div>
    );
  }

  return <div>App</div>;
}

export default App;
