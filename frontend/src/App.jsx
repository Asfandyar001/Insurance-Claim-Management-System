import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Active from "./pages/Active.jsx";
import Closed from "./pages/Closed.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute> <MainLayout /> </ProtectedRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/active" element={<Active />} />
          <Route path="/closed" element={<Closed />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
