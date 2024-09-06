import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { AccountDetails, TextFieldProps } from "@/app/account/create/accountUtils";

export const useAccountCreation = () => {
  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateAccountDetails = (field: keyof AccountDetails, value: string | boolean) => {
    setAccountDetails(prev => ({ ...prev, [field]: value }));
  };

  const textFields: TextFieldProps[] = [
    { label: "Name", type: "text", value: accountDetails.name, setValue: (value: string) => updateAccountDetails('name', value) },
    { label: "Email", type: "email", value: accountDetails.email, setValue: (value: string) => updateAccountDetails('email', value) },
    { label: "Password", type: "password", value: accountDetails.password, setValue: (value: string) => updateAccountDetails('password', value) },
    { label: "Confirm Password", type: "password", value: accountDetails.confirmPassword, setValue: (value: string) => updateAccountDetails('confirmPassword', value) }
  ];

  const createAccount = async () => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    const { data, error } = await supabase.auth.signUp({
      email: accountDetails.email,
      password: accountDetails.password,
      options: {
        data: {
          name: accountDetails.name,
        }
      }
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      console.log('Account created successfully');
    }
  };

  return { accountDetails, updateAccountDetails, textFields, createAccount, errorMessage };
};
