import axiosClient from '../api/axiosClient';

// Helper function to save session data (JWT token and user role)
const saveUserSession = (token, role) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role);
};

// --- 1. User Registration (Requirement 3.1.1) ---
export const registerUser = async (formData) => {
    try {
        // Targets the /auth/users/ endpoint, customized by CustomUserCreateSerializer
        const response = await axiosClient.post('/auth/users/', { 
            
            // CORE DJOSER FIELDS (Flat)
            username: formData.username,
            email: formData.username,      
            password: formData.password,
            
            // CRITICAL FIX: Nest custom fields inside user_data to match serializer source logic
           user_data: {
                firstname: formData.firstName, 
                lastname: formData.lastName,
                role: formData.role,
                community_id: 2, // <--- ADD THIS LINE FOR TESTING
            }
        });
        
        const { token, role } = response.data; 
        saveUserSession(token || 'DUMMY_TOKEN', role || formData.role); 

        return response.data;

    } catch (error) {
        // Throw detailed API errors
        throw error.response ? error.response.data : error.message;
    }
};

// --- 2. User Login (Requirement 3.1.3) ---
export const loginUser = async (username, password) => {
    try {
        // Djoser endpoint for token authentication
        const response = await axiosClient.post('/auth/token/login/', {
            username,
            password,
        });

        // Djoser returns a 'auth_token' field
        const token = response.data.auth_token;
        
        // --- CRITICAL STEP: Retrieve User Role after successful login ---
        // Placeholder call: Retrieve custom User model data to get the role.
        const userDetailsResponse = await axiosClient.get(`/users/me/`, {
             headers: {
                 Authorization: `Token ${token}`
             }
        });
        
        const role = userDetailsResponse.data.role; // Assuming Django returns the role field
        
        saveUserSession(token, role); 
        
        return { success: true, role };

    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// --- 3. Logout ---
export const logoutUser = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
};