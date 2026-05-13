import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

export default function PrivateRoute({ children }: Props) {
    return isAuthenticated() ? children : <Navigate to="/" />;
}