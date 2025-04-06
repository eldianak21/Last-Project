// // // src/Auth/AuthContext.jsx
// // import React, { createContext, useContext, useState } from 'react';

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //     const [isAuthenticated, setIsAuthenticated] = useState(false);

// //     const login = () => setIsAuthenticated(true);
// //     const logout = () => setIsAuthenticated(false);

// //     return (
// //         <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
// //             {children}
// //         </AuthContext.Provider>
// //     );
// // };

// // export const useAuth = () => useContext(AuthContext);

// // src/Auth/AuthContext.jsx

// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     const login = () => setIsAuthenticated(true);
//     const logout = () => setIsAuthenticated(false);

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token'); // Clear token on logout
        localStorage.removeItem('userRole');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);