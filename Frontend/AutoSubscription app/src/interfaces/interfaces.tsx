

//interfaces

//SignUp form interface
export interface SignUpFormData { 
    first_name: string;
    last_name: string;
    user_email: string;
    hashed_password: string;
    user_age: number; // Change to 'number' if you want age to be a number
    role_id: number;
    
}

export interface FormData {
    formData: SignUpFormData[]; // This allows formData to be an array of User objects
  }

//Login Interface

export interface LoginFormData {
    user_email: string;
    hashed_password: string;
}

export interface User {
    id: number,
    first_name: string,
    last_name: string,
    user_email: string,
    user_age: number,
    role_id: number,
    
    
}