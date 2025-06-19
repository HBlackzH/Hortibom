import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  FlatList,
  ScrollView
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCarrinho } from '../screens/carrinhoScreen';
import { useHistorico } from '../screens/historicoScreen';
import { useUsuario } from '../screens/UsuarioScreen';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

export default function PagamentoScreen() {
  const navigation = useNavigation<any>();
  const { itens } = useCarrinho();
  const { adicionarPedido } = useHistorico();
  const { usuario } = useUsuario();
  const [metodo, setMetodo] = useState<string | null>(null);
  const [cartoes, setCartoes] = useState<any[]>([]);

  const opcoes = [
    'Cartão de Crédito',
    'Pix',
    'Dinheiro',
    'Apple Pay',
    'Google Pay',
    'Vale Refeição',
    'Boleto Bancário',
  ];

  useFocusEffect(
    useCallback(() => {
      const carregarCartoes = async () => {
        const dados = await AsyncStorage.getItem('cartoes');
        if (dados) setCartoes(JSON.parse(dados));
      };
      carregarCartoes();
    }, [])
  );

  const total = itens.reduce((acc, item) => {
    const preco = parseFloat(item.preco.replace(/[^\d,]/g, '').replace(',', '.'));
    return acc + preco * item.quantidade;
  }, 0);

  const confirmarPedido = () => {
    if (!metodo) {
      Alert.alert('Selecione um método de pagamento');
      return;
    }

    if (!usuario.endereco) {
      Alert.alert('Endereço não definido', 'Adicione um endereço antes de continuar');
      return;
    }

    const novoPedido = {
      id: uuidv4(),
      itens,
      metodoPagamento: metodo,
      total,
      data: new Date().toLocaleString('pt-BR'),
      endereco: usuario.endereco,
    };

    adicionarPedido(novoPedido);
    navigation.navigate('Pedidos');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.titulo}>Escolha o método de pagamento</Text>

        <FlatList
          data={opcoes}
          keyExtractor={(item) => item}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 10 }}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.botao, metodo === item && styles.botaoSelecionado]}
              onPress={() => setMetodo(item)}
            >
              <Text style={styles.textoBotao}>{item}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.enderecoBox}>
          <Text style={styles.enderecoLabel}>Endereço de entrega:</Text>
          {usuario.endereco ? (
            <Text style={styles.enderecoTexto}>{usuario.endereco}</Text>
          ) : (
            <Text style={{ color: 'gray' }}>Nenhum endereço definido</Text>
          )}
          <TouchableOpacity
            style={styles.alterarEndereco}
            onPress={() => navigation.navigate('Conta')}
          >
            <Text style={styles.alterarTexto}>+ Alterar ou adicionar novo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cartoesBox}>
          <Text style={styles.enderecoLabel}>Cartões salvos:</Text>
          {cartoes.length > 0 ? (
            cartoes.map((cartao, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.cartao, metodo === `**** ${cartao.numero.slice(-4)}` && styles.botaoSelecionado]}
                onPress={() => setMetodo(`**** ${cartao.numero.slice(-4)}`)}
              >
                <Text>{cartao.nome} - **** {cartao.numero.slice(-4)}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ color: 'gray' }}>Nenhum cartão salvo</Text>
          )}

          <TouchableOpacity
            style={styles.alterarEndereco}
            onPress={() => navigation.navigate('AdicionarCartao')}
          >
            <Text style={styles.alterarTexto}>+ Adicionar novo cartão</Text>
          </TouchableOpacity>
        </View>

        {metodo && (
          <TouchableOpacity style={styles.botaoConfirmar} onPress={confirmarPedido}>
            <Text style={styles.textoConfirmar}>Confirmar Pedido</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  botao: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  botaoSelecionado: {
    backgroundColor: '#00b894',
    borderColor: '#00b894',
  },
  textoBotao: { fontSize: 15, color: '#333', textAlign: 'center' },
  botaoConfirmar: {
    marginTop: 30,
    backgroundColor: '#0984e3',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoConfirmar: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  enderecoBox: {
    backgroundColor: '#f5f5f5',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  cartoesBox: {
    backgroundColor: '#f9f9f9',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  enderecoLabel: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 16,
  },
  enderecoTexto: {
    fontSize: 14,
    color: '#333',
  },
  alterarEndereco: {
    marginTop: 10,
  },
  alterarTexto: {
    color: '#0984e3',
    fontWeight: 'bold',
  },
  cartao: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
});
