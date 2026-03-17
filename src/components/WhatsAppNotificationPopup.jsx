'use client';

const WhatsAppNotificationPopup = ({ isOpen, onClose, userName, userEmail, userPhone, screenshotUrl }) => {
  if (!isOpen) return null;

  const handleSendWhatsApp = () => {
    const adminWhatsApp = '923390115530';
    
    const message = `Hi Admin,

I have completed my registration for Aptitude Counsel Test.

*User Details:*
Name: ${userName}
Email: ${userEmail}
Phone: ${userPhone}

*Payment Proof Screenshot:*
I am sending the screenshot now.

Please approve my payment so I can start the test.

Thank you!`;

    const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab (or WhatsApp app on mobile)
    window.open(whatsappUrl, '_blank');
    
    // Close popup after opening WhatsApp
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl cursor-pointer duration-300"
        >
          ✕
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#14442E] text-center mb-3">
          📱 Important: Send Screenshot to Admin
        </h2>

        {/* Message */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4 rounded">
          <p className="text-yellow-800 font-semibold mb-2">
            ⚠️ This step is MANDATORY
          </p>
          <p className="text-yellow-700 text-sm">
            You must send your payment screenshot to admin via WhatsApp to complete your registration.
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">What to do:</h3>
          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
            <li>Click the button below to open WhatsApp</li>
            <li>A message will be pre-filled for you</li>
            <li><strong>Attach your payment screenshot</strong></li>
            <li>Click Send in WhatsApp</li>
            <li>Admin will approve your payment</li>
          </ol>
        </div>

        {/* User Info Preview */}
        <div className="bg-blue-50 p-3 rounded-lg mb-4 text-xs">
          <p className="text-gray-700">
            <strong>Your details that will be sent:</strong><br />
            Name: {userName}<br />
            Email: {userEmail}<br />
            Phone: {userPhone}
          </p>
        </div>

        {/* WhatsApp Button */}
        <button
          onClick={handleSendWhatsApp}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Open WhatsApp & Send Screenshot
        </button>

        {/* Note */}
        <p className="text-xs text-gray-500 text-center mt-3">
          WhatsApp will open in a new tab. Don't forget to attach your screenshot!
        </p>
      </div>
    </div>
  );
};

export default WhatsAppNotificationPopup;
