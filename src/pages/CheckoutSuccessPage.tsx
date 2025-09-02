import React, { useEffect } from 'react';

const CheckoutSuccessPage: React.FC = () => {
  useEffect(() => {
    console.log('🎉 CheckoutSuccessPage loaded - sending success message to parent');
    // Send message to parent window that checkout was successful
    if (window.opener) {
      console.log('📨 Sending checkout-success message to parent window');
      window.opener.postMessage('checkout-success', window.location.origin);
      console.log('🪟 Closing popup window');
      window.close();
    } else {
      console.log('🔄 No opener found, redirecting directly to dashboard');
      // Fallback: redirect to dashboard if not in popup
      window.location.href = '/dashboard';
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-slate-600">Processing your subscription...</p>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;