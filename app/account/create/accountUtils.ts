
export interface AccountDetails {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
}

export const validateAccountDetails = (details: AccountDetails): { isValid: boolean; errorMessage: string } => {
    const nameRegex = /^[a-zA-Z\s'-]{2,30}$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;

    if (!nameRegex.test(details.name)) {
        return { isValid: false, errorMessage: "Name is invalid" };
    }
    if (!emailRegex.test(details.email)) {
        return { isValid: false, errorMessage: "Email is invalid" };
    }
    if (!passwordRegex.test(details.password)) {
        return { isValid: false, errorMessage: "Password is invalid" };
    }
    if (details.password !== details.confirmPassword) {
        return { isValid: false, errorMessage: "Passwords do not match" };
    }
    if (!details.termsAccepted) {
        return { isValid: false, errorMessage: "You must accept the terms and conditions" };
    }

    return { isValid: true, errorMessage: "" };
}