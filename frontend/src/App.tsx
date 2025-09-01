import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewDemand from "./pages/CreateDemand";
import CreateProvider from "./pages/CreateProvider";
import Providers from "./pages/ProviderList";
import TechnicalActions from "./pages/TechnicalHistory";
import CreateAction from "./pages/CreateAction";
import Actions from "./pages/Actions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/demands" element={<Home />} />
        <Route path="/demands/create" element={<NewDemand />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/providers/create" element={<CreateProvider />} />
        <Route path="/actions" element={<TechnicalActions />} />
        <Route path="/actions/history" element={<Actions />} />
        <Route path="/actions/create" element={<CreateAction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
