import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { X, QrCode, Smartphone } from 'lucide-react';

interface MobilePaymentModalProps {
  upiUrl: string;
  amount: number;
  onClose: () => void;
}

const MobilePaymentModal = ({ upiUrl, amount, onClose }: MobilePaymentModalProps) => {
  const [showQr, setShowQr] = useState(false);

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <Card 
        className="w-full max-w-sm bg-gray-800 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        <CardHeader className="text-center">
          <CardTitle className="text-brand-yellow">Mobile Payment</CardTitle>
          <p className="text-gray-300 mt-1">You are about to pay</p>
          <p className="text-3xl font-bold text-white">₹{amount.toFixed(2)}</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 px-6 pb-6">
          {showQr ? (
            <>
              <div className="p-4 bg-white rounded-lg">
                <QRCodeSVG value={upiUrl} size={180} />
              </div>
              <p className="text-xs text-gray-400 text-center">Scan with another device or UPI app.</p>
              <button
                onClick={() => setShowQr(false)}
                className="text-sm text-brand-yellow hover:underline"
              >
                Use UPI App instead
              </button>
            </>
          ) : (
            <>
              <a
                href={upiUrl}
                className="w-full flex items-center justify-center bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition-colors text-lg"
              >
                <Smartphone className="w-6 h-6 mr-3" />
                Pay with UPI App
              </a>
              <p className="text-gray-400 text-sm">or</p>
              <button
                onClick={() => setShowQr(true)}
                className="w-full flex items-center justify-center bg-gray-700 text-white font-bold py-2.5 px-4 rounded-md hover:bg-gray-600 transition-colors"
              >
                <QrCode className="w-5 h-5 mr-2" />
                Display QR Code
              </button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MobilePaymentModal;
