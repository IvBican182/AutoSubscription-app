

//interfaces

//SignUp form interface
export interface SignUpFormData {
    firstName: string;
    lastName: string;
    age: number; // Change to 'number' if you want age to be a number
    role: string;
    email: string;
    password: string;
}

//Login Interface

export interface LoginFormData {
    email: string;
    password: string;
}