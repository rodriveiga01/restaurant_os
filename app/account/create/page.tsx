"use client"
import { TextField, TermsCheckbox, CreateAccountButton, AlertDestructive, TextFieldProps, VerificationDialog } from "./components";
import { useAccountCreation } from "@/app/hooks/account/useAccountCreation";
import { v4 as uuidv4 } from 'uuid';
function CreateAccountPage() {
    const { accountDetails, updateAccountDetails,
        textFields, createAccount, errorMessage, showVerificationDialog, setShowVerificationDialog } = useAccountCreation();

    const handleCloseVerificationDialog = () => {
        setShowVerificationDialog(false);
    };

    return (
        <section className="bg-gray-900 p-5">
            {errorMessage && <AlertDestructive message={errorMessage} />}
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-gray-800 rounded-lg shadow border border-gray-700 md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                            Create an account
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            {textFields.map((field: { label: string; name: string; type: string; } & TextFieldProps) => (
                                <TextField key={uuidv4()} {...field} />
                            ))}
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm text-gray-400">At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character</label>
                            </div>
                            <TermsCheckbox
                                checked={accountDetails.termsAccepted}
                                onChange={(value: boolean) => updateAccountDetails('termsAccepted', value)}
                            />
                            <CreateAccountButton onClick={createAccount} />
                        </div>
                    </div>
                </div>
            </div>
            {showVerificationDialog && (
                <VerificationDialog
                    isOpen={showVerificationDialog}
                    onClose={handleCloseVerificationDialog}
                />
            )}
        </section>
    )
}

export default CreateAccountPage;
