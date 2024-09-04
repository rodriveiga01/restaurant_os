"use client";
import { useState } from "react";
import { AccountDetails, AccountValidator } from "./accountUtils";
import { TextFieldProps, TextField, TermsCheckbox, CreateAccountButton, TwoFactorOptions } from "./components";
import TwoFactorSetup from "./two-factor-setup/TwoFactorSetupClient";

function CreateAccountPage() {
    const [accountDetails, setAccountDetails] = useState<AccountDetails>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
        twoFactorEnabled: false,
        twoFactorMethod: null
    });
    const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);

    const updateAccountDetails = (field: keyof AccountDetails, value: string | boolean | '2fa_app' | 'sms' | null) => {
        setAccountDetails((prev: any) => ({ ...prev, [field]: value }));
    };

    const onCreateAccount = async () => {
        const validator = new AccountValidator();
        const validationResult = validator.validateAccountDetails(accountDetails);
        if (validationResult.isValid) {
            if (accountDetails.twoFactorEnabled) {
                setShowTwoFactorSetup(true);
            } else {
                // Proceed with account creation without 2FA
                // TODO: Implement account creation logic
            }
        } else {
            alert(validationResult.errorMessage);
        }
    };

    const textFields: TextFieldProps[] = [
        { label: "Name", type: "text", value: accountDetails.name, setValue: (value: string | boolean) => updateAccountDetails('name', value) },
        { label: "Email", type: "email", value: accountDetails.email, setValue: (value: string | boolean) => updateAccountDetails('email', value) },
        { label: "Password", type: "password", value: accountDetails.password, setValue: (value: string | boolean) => updateAccountDetails('password', value) },
        { label: "Confirm Password", type: "password", value: accountDetails.confirmPassword, setValue: (value: string | boolean) => updateAccountDetails('confirmPassword', value) }
    ];

    return (
        <section className="bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-gray-800 rounded-lg shadow border border-gray-700 md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                            Create an account
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            {textFields.map((field, index) => (
                                <TextField key={index} {...field} />
                            ))}
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm text-gray-400">At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character</label>
                            </div>
                            <TwoFactorOptions
                                enabled={accountDetails.twoFactorEnabled}
                                method={accountDetails.twoFactorMethod}
                                onEnabledChange={(value) => updateAccountDetails('twoFactorEnabled', value)}
                                onMethodChange={(value) => updateAccountDetails('twoFactorMethod', value)}
                            />
                            <TermsCheckbox
                                checked={accountDetails.termsAccepted}
                                onChange={(value: string | boolean) => updateAccountDetails('termsAccepted', value)}
                            />
                            <CreateAccountButton onClick={onCreateAccount} />
                        </div>
                    </div>
                </div>
            </div>
            {showTwoFactorSetup && accountDetails.twoFactorMethod && (
                <TwoFactorSetup
                    method={accountDetails.twoFactorMethod} qrCodeUrl={""}                />
            )}
        </section>
    )
}export default CreateAccountPage