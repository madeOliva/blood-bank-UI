import React, { ReactNode, useEffect, useRef } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const userRole = localStorage.getItem('userRole');
  const alerted = useRef(false);

  useEffect(() => {
    if ((!userRole || !allowedRoles.includes(userRole)) && !alerted.current) {
      alert("No estás autorizado para acceder a esta página.");
      alerted.current = true;
    }
  }, [userRole, allowedRoles]);

  if (!userRole || !allowedRoles.includes(userRole)) {
    return null; // No muestra nada, no navega, no cambia de página
  }

  return <>{children}</>;
}
