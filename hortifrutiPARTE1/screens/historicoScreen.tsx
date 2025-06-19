import React, { createContext, useContext, useState } from 'react';

interface Produto {
  nome: string;
  preco: string;
  imagem: any;
  quantidade: number;
}

interface Pedido {
  id: string;
  itens: Produto[];
  metodoPagamento: string;
  total: number;
  data: string;
  status?: 'Entregue' | 'Cancelado';
}

interface HistoricoContextType {
  pedidos: Pedido[];
  adicionarPedido: (pedido: Pedido) => void;
  cancelarPedido: (id: string) => void;
  removerPedido: (id: string) => void;
}

const HistoricoContext = createContext<HistoricoContextType | undefined>(undefined);

export const HistoricoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const adicionarPedido = (pedido: Pedido) => {
    setPedidos(prev => [...prev, pedido]);
  };

  const cancelarPedido = (id: string) => {
    setPedidos(prev =>
      prev.map(p => (p.id === id ? { ...p, status: 'Cancelado' } : p))
    );
  };

  const removerPedido = (id: string) => {
    setPedidos(prev => prev.filter(p => p.id !== id));
  };

  return (
    <HistoricoContext.Provider
      value={{
        pedidos,
        adicionarPedido,
        cancelarPedido,
        removerPedido
      }}
    >
      {children}
    </HistoricoContext.Provider>
  );
};

export const useHistorico = () => {
  const context = useContext(HistoricoContext);
  if (!context) {
    throw new Error('useHistorico deve ser usado dentro de HistoricoProvider');
  }
  return context;
};
