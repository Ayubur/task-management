import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./helpers/requireAuth";
import {
    Login,
    Dashboard,
    MemberLists,
    CreateMember,
    EditMember,
    TaskLists,
    CreateTask,
    EditTask,
    MemberDetails
} from "./pages";
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Dashboard />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/tasks"
                    element={
                        <RequireAuth>
                            <TaskLists />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/tasks/create"
                    element={
                        <RequireAuth>
                            <CreateTask />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/tasks/edit/:id"
                    element={
                        <RequireAuth>
                            <EditTask />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/member"
                    element={
                        <RequireAuth>
                            <MemberLists />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/member/create"
                    element={
                        <RequireAuth>
                            <CreateMember />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/member/edit/:id"
                    element={
                        <RequireAuth>
                            <EditMember />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/member/:id"
                    element={
                        <RequireAuth>
                            <MemberDetails />
                        </RequireAuth>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

