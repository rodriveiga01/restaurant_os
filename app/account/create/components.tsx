import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

export interface TextFieldProps {
    label: string;
    type: string;
    value: string;
    setValue: (value: string) => void;
}

export function TextField({ label, type, value, setValue }: TextFieldProps) {
    return (
        <div>
            <label htmlFor={label} className="block mb-2 text-sm font-medium text-white">{label}</label>
            <input
                type={type}
                name={label}
                id={label}
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={label}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}

interface TermsCheckboxProps {
    checked: boolean;
    onChange: (value: boolean) => void;
}

export function TermsCheckbox({ checked, onChange }: TermsCheckboxProps) {
    return (
        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input
                    id="terms"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-primary-600 ring-offset-gray-800"
                />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-300">
                    I accept the <a className="font-medium text-primary-500 hover:underline" href="/terms">Terms and Conditions</a>
                </label>
            </div>
        </div>
    );
}

interface CreateAccountButtonProps {
    onClick: () => void;
}

export function CreateAccountButton({ onClick }: CreateAccountButtonProps) {
    return (
        <button
            type="submit"
            onClick={onClick}
            className="w-full text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
            Create an account
        </button>
    );
}

interface AlertDestructiveProps {
    message: string;
}

export function AlertDestructive({ message }: AlertDestructiveProps) {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (message) {
            const timer = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress <= 0) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prevProgress - (100 / 30);
                });
            }, 100);

            const hideTimer = setTimeout(() => {
                setProgress(0);
            }, 3000);

            return () => {
                clearInterval(timer);
                clearTimeout(hideTimer);
            };
        }
    }, [message]);

    return (
        <AnimatePresence>
            {message && progress > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-3/4 mx-auto relative"
                >
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{message}</AlertDescription>
                    </Alert>
                    <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-1 bg-red-500"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}