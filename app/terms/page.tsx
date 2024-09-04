import React from 'react';

function TermsAndConditions() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-100">Terms and Conditions</h1>
      <div className="prose max-w-none bg-gray-800 shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">1. Acceptance of Terms</h2>
        <p className="mb-6 text-gray-300">By accessing and using this website and our services, you accept and agree to be bound by the terms and provisions of this agreement.</p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-200">2. Use of Website and Services</h2>
        <p className="mb-6 text-gray-300">You agree to use the website and our services for lawful purposes only and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website and services.</p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-200">3. Data Storage and Security</h2>
        <p className="mb-6 text-gray-300">By using our services, you agree that we may store data related to your business in our Supabase database. We ensure that all stored data is encrypted to maintain the highest level of security and protect your information.</p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-200">4. Intellectual Property</h2>
        <p className="mb-6 text-gray-300">All trademarks, copyright, database rights and other intellectual property rights in the materials on this website and within our services are owned by us or our licensors.</p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-200">5. Limitation of Liability</h2>
        <p className="mb-6 text-gray-300">While we implement robust security measures, we will not be liable for any direct, indirect or consequential loss or damage arising under these terms and conditions or in connection with our website and services, except where such limitation is prohibited by law.</p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-200">6. Privacy and Data Protection</h2>
        <p className="mb-6 text-gray-300">Use of this website and our services is also governed by our Privacy Policy, which is incorporated into these terms and conditions by this reference. We are committed to protecting your data through encryption and secure storage practices.</p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-200">7. Changes to Terms</h2>
        <p className="mb-6 text-gray-300">We reserve the right to modify these terms at any time. Please review these terms periodically for changes. Your continued use of our services after changes are posted constitutes your acceptance of the updated terms.</p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-200">8. Data Ownership</h2>
        <p className="mb-6 text-gray-300">You retain all rights to your data. Our storage and encryption of your data in the Supabase database does not transfer ownership of your data to us.</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;