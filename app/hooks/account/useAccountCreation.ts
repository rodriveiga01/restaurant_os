import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

interface AccountCreationState {
  accountDetails: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
  };
  errorMessage: string | null;
  successMessage: string | null;
  showVerificationDialog: boolean;
  verificationStatus: 'pending' | 'verified' | 'error';
}

  /**
   * Hook for creating an account with Supabase.
   *
   * @returns An object with the following properties:
   * - `accountDetails`: The current values of the account details.
   * - `updateAccountDetails`: A function to update the account details.
   * - `createAccount`: A function to create the account in Supabase.
   * - `errorMessage`: The error message if the account creation failed.
   * - `successMessage`: The success message if the account creation succeeded.
   * - `showVerificationDialog`: A boolean indicating whether to show the verification dialog.
   * - `textFields`: An array of text fields for the account details.
   * - `verificationStatus`: The status of the verification process.
   */
export const useAccountCreation = () => {
  const [accountDetails, setAccountDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const textFields = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      value: accountDetails.name,
      setValue: (value: string) => setAccountDetails({ ...accountDetails, name: value })
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      value: accountDetails.email,
      setValue: (value: string) => setAccountDetails({ ...accountDetails, email: value })
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      value: accountDetails.password,
      setValue: (value: string) => setAccountDetails({ ...accountDetails, password: value })
    },
    {
      label: 'Confirm Password',
      name: 'confirmPassword',
      type: 'password',
      value: accountDetails.confirmPassword,
      setValue: (value: string) => setAccountDetails({ ...accountDetails, confirmPassword: value })
    },
  ];

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'error'>('pending');

  const updateAccountDetails = (field: keyof typeof accountDetails, value: string | boolean) => {
    setAccountDetails((prev) => ({ ...prev, [field]: value }));
  };

  const createAccount = async () => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase.auth.signUp({
        email: accountDetails.email,
        password: accountDetails.password,
        options: {
          data: {
            name: accountDetails.name,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage('Account created successfully!');
        setShowVerificationDialog(true);
        setVerificationStatus('verified');
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setErrorMessage('An error occurred while creating the account.');
      setVerificationStatus('error');
    }
  };

  return {
    accountDetails,
    updateAccountDetails,
    createAccount,
    errorMessage,
    successMessage,
    showVerificationDialog,
    textFields,
    verificationStatus,
    setShowVerificationDialog,
  };
};

export default useAccountCreation;