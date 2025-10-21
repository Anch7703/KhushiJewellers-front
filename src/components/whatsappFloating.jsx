import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppFloating.css";

const WhatsAppFloating = () => {
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER; // store number

  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsAppFloating;
