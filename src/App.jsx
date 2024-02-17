import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TasksPage from "./pages/TasksPage";
import SingleTaskPage from "./pages/SingleTaskPage";
import NotFound from "./pages/NotFound";
import SharedLayout from "./components/SharedLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/:id" element={<SingleTaskPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
