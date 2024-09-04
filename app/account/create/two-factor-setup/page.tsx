import { Suspense } from 'react';
import TwoFactorSetupClient from './TwoFactorSetupClient';

async function getTwoFactorSetupData() {
  // Simulating an API call or database query
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    qrCodeUrl: 'https://example.com/qr-code.png',
    method: '2fa_app' as const,
  };
}

export default async function TwoFactorSetupPage() {
  const { qrCodeUrl, method } = await getTwoFactorSetupData();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TwoFactorSetupClient qrCodeUrl={qrCodeUrl} method={method} />
    </Suspense>
  );
}
