"use client";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const update = () => {
      setHidden(
        document.body.classList.contains('popup-open') ||
        document.body.classList.contains('mobile-menu-open')
      );
    };
    const observer = new MutationObserver(update);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  if (hidden) return null;

  return (
    <a
      href="https://wa.me/923356960094?text=Hi%20I%20want%20to%20know%20more%20about%20your%20services"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition z-50"
    >
      <MessageCircle size={22} />
      Chat with us
    </a>
  );
}
