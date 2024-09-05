"use client"
import { useState } from "react"
import { AccountDetails } from "./accountUtils"
import { TextFieldProps, TextField, TermsCheckbox, CreateAccountButton, AlertDestructive } from "./components"
import { createClient } from "@supabase/supabase-js"

function CreateAccountPage() {
    const [accountDetails, setAccountDetails] = useState<AccountDetails>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false
    })
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const updateAccountDetails = (field: keyof AccountDetails, value: string | boolean) => {
        setAccountDetails(prev => ({ ...prev, [field]: value }))
    }

    const createAccount = async () => {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
        const { data, error } = await supabase.auth.signUp({
            email: accountDetails.email,
            password: accountDetails.password,
            options: {
                data: {
                    name: accountDetails.name,
                }
            }
        })

        if (error) {
            setErrorMessage(error.message)
        } else {
            console.log('Account created successfully')
        }
    }   
    const textFields: TextFieldProps[] = [
        { label: "Name", type: "text", value: accountDetails.name, setValue: (value: string) => updateAccountDetails('name', value) },
        { label: "Email", type: "email", value: accountDetails.email, setValue: (value: string) => updateAccountDetails('email', value) },
        { label: "Password", type: "password", value: accountDetails.password, setValue: (value: string) => updateAccountDetails('password', value) },
        { label: "Confirm Password", type: "password", value: accountDetails.confirmPassword, setValue: (value: string) => updateAccountDetails('confirmPassword', value) }
    ]

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
                            {textFields.map((field, index) => (
                                <TextField key={index} {...field} />
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
        </section>
    )
}

export default CreateAccountPage

