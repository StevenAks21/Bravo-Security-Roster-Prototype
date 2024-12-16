import React from "react";
import "./style/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Employees from "./pages/employees";
import EmployeesGet from "./pages/employees/employeesGet"
import EmployeesAdd from "./pages/employees/employeeAdd";
import EmployeesRemove from "./pages/employees/employeeRemove";
import Rosters from "./pages/rosters";
import RostersView from "./pages/rosters/rostersView";
import RequireAuth from "./auth/requireauth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/employees"
          element={
            <RequireAuth>
              <Employees />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/employees/get"
          element={
            <RequireAuth>
              <EmployeesGet />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/employees/add"
          element={
            <RequireAuth>
              <EmployeesAdd />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/employees/remove"
          element={
            <RequireAuth>
              <EmployeesRemove />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/rosters"
          element={
            <RequireAuth>
              <Rosters />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/rosters/view"
          element={
            <RequireAuth>
              <RostersView />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
