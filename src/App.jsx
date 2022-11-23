import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { FormProduct, ListItems } from "./pages";
import { store } from "./store";
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ListItems />} />
            <Route path="add-product" element={<FormProduct />} />
            <Route path="edit-product/:id" element={<FormProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
