// screens/UsuarioContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface Usuario {
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
}

interface UsuarioContextType {
  usuario: Usuario;
  atualizarUsuario: (dados: Partial<Usuario>) => void;
}

const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export const UsuarioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario>({
    nome: 'Carlos',
    telefone: '',
    email: '',
    endereco: '',
  });

  const atualizarUsuario = (dados: Partial<Usuario>) => {
    setUsuario(prev => ({ ...prev, ...dados }));
  };

  return (
    <UsuarioContext.Provider value={{ usuario, atualizarUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error('useUsuario deve ser usado dentro de UsuarioProvider');
  }
  return context;
};
