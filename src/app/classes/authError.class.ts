export class AuthError {
    private errorMessages: Record<string,  string>  = {
        "auth/credential-already-in-use" : "Email already in use",
        "auth/email-already-in-use" : "Email already in use",
        "auth/internal-error" : "Internal Error, please wait and try again",
        "auth/weak-password" : "Weak Password",
        "Error" : "Error, Please Try Again",
        "auth/too-many-requests": "Too many request, please try again later",
        "auth/invalid-credential": "Email/Password incorrect",
        "auth/invalid-email": "Invalid Email",
        "auth/missing-password": "Missing Password",
    }

    getMessage(error: string) {
        try{
            return this.errorMessages[error];
        } catch(error) {
            return "Unkown Error";
        }
    }
}