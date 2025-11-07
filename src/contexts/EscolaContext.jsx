// import React, { createContext, useState, useEffect, ReactNode } from 'react';

// interface User {
//   id: string;
//   username: string;
//   email: string;
//   first_name: string;
//   last_name: string;
//   role: string;
//   foto?: string;
// }

// interface Escola {
//   id: string;
//   nome: string;
//   logo?: string;
//   role?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   escola: Escola | null;
//   login: (username: string, password: string) => Promise<{ success: boolean; user: User }>;
//   logout: () => void;
//   loading: boolean;
// }

// export const AuthContext = createContext<AuthContextType | null>(null);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [escola, setEscola] = useState<Escola | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Carrega dados salvos ao iniciar
//     const savedToken = localStorage.getItem('access_token');
//     const savedUser = localStorage.getItem('user');
//     const savedEscola = localStorage.getItem('escola_ativa');

//     if (savedToken && savedUser) {
//       setToken(savedToken);
//       setUser(JSON.parse(savedUser));
//       if (savedEscola) {
//         setEscola(JSON.parse(savedEscola));
//       }
//     }
//     setLoading(false);
//   }, []);

//   const login = async (username: string, password: string) => {
//     try {
//       const response = await fetch('http://localhost:8000/api/auth/login/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password })
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         // Salva no localStorage
//         localStorage.setItem('access_token', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
        
//         setToken(data.token);
//         setUser(data.user);

//         // Busca dados da escola
//         await fetchEscolaData(data.token, data.user);

//         return { success: true, user: data.user };
//       } else {
//         throw new Error(data.message || 'Erro ao fazer login');
//       }
//     } catch (error) {
//       throw error;
//     }
//   };

//   const fetchEscolaData = async (authToken: string, userData: User) => {
//     try {
//       const response = await fetch(`http://localhost:8000/api/usuarios/${userData.id}/`, {
//         headers: {
//           'Authorization': `Token ${authToken}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.ok) {
//         const data = await response.json();
        
//         if (data.escolas && data.escolas.length > 0) {
//           const escolaAtiva = data.escolas[0];
//           setEscola(escolaAtiva);
//           localStorage.setItem('escola_ativa', JSON.stringify(escolaAtiva));
//         }
//       }
//     } catch (error) {
//       console.error('Erro ao buscar dados da escola:', error);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('escola_ativa');
//     setToken(null);
//     setUser(null);
//     setEscola(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, escola, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };