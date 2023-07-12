"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "./provider/authProvider";

interface ProviderWrapperProps {
  children: ReactNode;
}

const ProviderWrapper: React.FC<ProviderWrapperProps> = ({ children }) => {
  return (
    <AuthProvider>
      <Provider store={store}>{children}</Provider>
    </AuthProvider>
  );
};

export default ProviderWrapper;
