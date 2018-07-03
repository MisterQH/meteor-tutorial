import React from "react";

const AppLayout = ({ children }) => {
  return (
    <div className="container">
      <nav style={{ padding: 32 }}>
        <h2>Todo list</h2>
      </nav>
      {children}
    </div>
  );
};

export default AppLayout;
