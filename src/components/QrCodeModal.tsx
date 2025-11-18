import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { X } from 'lucide-react';

interface QrCodeModalProps {
  upiUrl: string;
  amount: number;
  onClose: () => void;
}

const QrCodeModal = ({ upiUrl, amount, onClose }: QrCodeModalProps) => {
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
        <CardHeader>
          <CardTitle className="text-center text-brand-yellow">Scan to Pay</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-white rounded-lg">
            <QRCodeSVG value={upiUrl} size={200} />
          </div>
          <div className="text-center">
            <p className="text-gray-300">Scan with any UPI app to pay</p>
            <p className="text-2xl font-bold text-white">₹{amount.toFixed(2)}</p>
          </div>
          <p className="text-xs text-gray-500 text-center px-4">
            This QR code contains the payment details for Sandeep (7337772694@ybl).
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QrCodeModal;
