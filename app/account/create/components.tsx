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

interface TwoFactorOptionsProps {
    enabled: boolean;
    method: '2fa_app' | 'sms' | null;
    onEnabledChange: (enabled: boolean) => void;
    onMethodChange: (method: '2fa_app' | 'sms') => void;
}

export function TwoFactorOptions({ enabled, method, onEnabledChange, onMethodChange }: TwoFactorOptionsProps) {
    return (
        <div>
            <div className="flex items-center mb-4">
                <input
                    type="checkbox"
                    id="enable2fa"
                    checked={enabled}
                    onChange={(e) => onEnabledChange(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="enable2fa" className="ml-2 text-sm font-medium text-gray-300">Enable Two-Factor Authentication</label>
            </div>
            {enabled && (
                <div className="ml-6">
                    <div className="flex items-center mb-4">
                        <input
                            type="radio"
                            id="2fa_app"
                            name="2fa_method"
                            value="2fa_app"
                            checked={method === '2fa_app'}
                            onChange={() => onMethodChange('2fa_app')}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="2fa_app" className="ml-2 text-sm font-medium text-gray-300">Authenticator App</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="sms"
                            name="2fa_method"
                            value="sms"
                            checked={method === 'sms'}
                            onChange={() => onMethodChange('sms')}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="sms" className="ml-2 text-sm font-medium text-gray-300">SMS</label>
                    </div>
                </div>
            )}
        </div>
    );
}