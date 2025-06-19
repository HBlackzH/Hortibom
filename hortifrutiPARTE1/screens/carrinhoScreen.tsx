import React, { createContext, useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Produto {
  nome: string;
  preco: number;
  imagem: any;
  quantidade: number;
}

interface CarrinhoContextType {
  itens: Produto[];
  adicionarItem: (item: Produto) => void;
  removerItem: (nome: string) => void;
  atualizarQuantidade: (nome: string, novaQtd: number) => void;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

// PROVIDER
export const CarrinhoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [itens, setItens] = useState<Produto[]>([]);

  const adicionarItem = (novoItem: Produto) => {
    setItens(prev =>
      prev.find(item => item.nome === novoItem.nome)
        ? prev.map(item =>
            item.nome === novoItem.nome
              ? { ...item, quantidade: item.quantidade + novoItem.quantidade }
              : item
          )
        : [...prev, novoItem]
    );
  };

  const removerItem = (nome: string) => {
    setItens(prev => prev.filter(item => item.nome !== nome));
  };

  const atualizarQuantidade = (nome: string, novaQtd: number) => {
    if (novaQtd <= 0) return removerItem(nome);
    setItens(prev =>
      prev.map(item =>
        item.nome === nome ? { ...item, quantidade: novaQtd } : item
      )
    );
  };

  return (
    <CarrinhoContext.Provider value={{ itens, adicionarItem, removerItem, atualizarQuantidade }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) throw new Error('useCarrinho deve ser usado dentro de CarrinhoProvider');
  return context;
};

// TELA DE CARRINHO
const CarrinhoScreen = () => {
  const { itens, atualizarQuantidade, removerItem } = useCarrinho();
  const navigation = useNavigation<any>();

  const total = itens.reduce((acc, item) => {
    const precoUnit = item.preco;
    return acc + precoUnit * item.quantidade;
  }, 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>Hortifruti</Text>
      <Text style={styles.title}>Itens adicionados</Text>

      {itens.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <Image source={item.imagem} style={styles.image} />
          <View style={{ flex: 1 }}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.preco}>R$ {item.preco}</Text>

            <View style={styles.quantidadeRow}>
              <TouchableOpacity onPress={() => atualizarQuantidade(item.nome, item.quantidade - 1)}>
                <Text style={styles.qtdBtn}>-</Text>
              </TouchableOpacity>

              <Text style={styles.qtdValor}>{item.quantidade}</Text>

              <TouchableOpacity onPress={() => atualizarQuantidade(item.nome, item.quantidade + 1)}>
                <Text style={styles.qtdBtn}>+</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => removerItem(item.nome)}>
                <Text style={styles.remover}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total com entrega grátis</Text>
        <Text style={styles.totalValor}>R$ {total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Pagamento')}
      >
        <Text style={styles.botaoTexto}>Continuar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CarrinhoScreen;

// ESTILOS
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  logo: { fontSize: 28, fontWeight: 'bold', alignSelf: 'center', marginVertical: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  image: { width: 50, height: 50, borderRadius: 8, marginRight: 12 },
  nome: { fontSize: 16, fontWeight: '600' },
  preco: { fontSize: 14, color: 'green' },
  quantidadeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  qtdBtn: {
    backgroundColor: '#dfe6e9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 18,
    fontWeight: 'bold',
  },
  qtdValor: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 6,
  },
  remover: {
    color: 'red',
    marginLeft: 10,
    fontSize: 14,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 20,
    paddingTop: 12,
  },
  totalLabel: { fontSize: 14, color: '#888' },
  totalValor: { fontSize: 20, color: 'green', fontWeight: 'bold' },
  botao: {
    backgroundColor: '#00b894',
    padding: 16,
    borderRadius: 10,
    marginTop: 24,
    alignItems: 'center',
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
