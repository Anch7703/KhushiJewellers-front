// auth/notification.js
import React, { useState } from "react";

export const Notification = ({ type, message, onClose }) => {
  if (!message) return null;

  const colors = {
    success: "green",
    error: "red",
    info: "blue",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "15px 25px",
        backgroundColor: colors[type] || "gray",
        color: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        zIndex: 9999,
      }}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          marginLeft: "15px",
          background: "transparent",
          border: "none",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        X
      </button>
    </div>
  );
};

export const useNotification = () => {
  const [notification, setNotification] = useState({ message: "", type: "" });

  const showNotification = (message, type = "info", duration = 3000) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, duration);
  };

  const NotificationComponent = () => (
    <Notification
      message={notification.message}
      type={notification.type}
      onClose={() => setNotification({ message: "", type: "" })}
    />
  );

  return [showNotification, NotificationComponent];
};
