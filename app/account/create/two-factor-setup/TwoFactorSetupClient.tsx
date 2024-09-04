'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface TwoFactorSetupClientProps {
    qrCodeUrl: string;
    method: '2fa_app' | 'sms';
}

const TwoFactorSetupClient: React.FC<TwoFactorSetupClientProps> = ({ qrCodeUrl, method }) => {
    const [verificationCode, setVerificationCode] = useState('');
    const router = useRouter();

    const handleSetup = async () => {
      try {
        const response = await fetch('/api/two-factor-setup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ verificationCode, method }),
        });

        if (response.ok) {
          router.push('/account/dashboard');
        } else {
          // Handle error
          console.error('Failed to set up 2FA');
        }
      } catch (error) {
        console.error('Error setting up 2FA:', error);
      }
    };

    const handleCancel = () => {
      router.push('/account/create');
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-gray-800">
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-white">Two-Factor Authentication Setup</h3>
            <div className="mt-2 px-7 py-3">
              {method === '2fa_app' ? (
                <div>
                  <p className="text-sm text-gray-300">Scan this QR code with your authenticator app:</p>
                  <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 mx-auto mt-4" />
                </div>
              ) : (
                <p className="text-sm text-gray-300">Enter the code sent to your phone:</p>
              )}
              <input
                type="text"
                className="mt-4 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white w-full"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            <div className="items-center px-4 py-3">
              <button
                onClick={handleSetup}
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Verify and Complete Setup
              </button>
              <button
                onClick={handleCancel}
                className="mt-3 px-4 py-2 bg-gray-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default TwoFactorSetupClient;
