import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image,
  TouchableOpacity, SafeAreaView, TextInput, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useCarrinho } from '../screens/carrinhoScreen';
import { supabase } from '../lib/supabaseClient'; 

export default function ProdutoScreen() {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { produto } = route.params as any;
  const [quantidade, setQuantidade] = useState(1);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [novoPreco, setNovoPreco] = useState(String(produto.preco));

  const { adicionarItem } = useCarrinho();

  const precoBase = produto.preco || 0;
  const total = (precoBase * quantidade).toFixed(2);

  const handleAdicionarAoCarrinho = () => {
    adicionarItem({
      nome: produto.nome,
      preco: produto.preco.toFixed(2),
      imagem: produto.imagem_url,
      quantidade,
    });
    navigation.navigate('Carrinho');
  };

  const handleAtualizarPreco = async () => {
    const precoFormatado = parseFloat(novoPreco);
    if (isNaN(precoFormatado)) {
      Alert.alert('Erro', 'Digite um valor válido para o preço.');
      return;
    }

    const { error } = await supabase
      .from('produtos')
      .update({ preco: precoFormatado })
      .eq('id', produto.id);

    if (error) {
      Alert.alert('Erro ao atualizar preço', error.message);
    } else {
      Alert.alert('Sucesso', 'Preço atualizado com sucesso!');
      produto.preco = precoFormatado;
      setModoEdicao(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: produto.imagem_url }} style={styles.image} />
      <Text style={styles.nome}>{produto.nome}</Text>

      {modoEdicao ? (
        <View>
          <TextInput
            style={styles.inputPreco}
            value={novoPreco}
            onChangeText={setNovoPreco}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={handleAtualizarPreco} style={styles.btnCarrinho}>
            <Text style={styles.btnText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.precoRow}>
          <Text style={styles.preco}>R$ {precoBase.toFixed(2)}</Text>
          <TouchableOpacity onPress={() => setModoEdicao(true)}>
            <Text style={styles.linkEditar}>Editar</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.infoRow}>
        <Text style={styles.tagInfo}>🚚 Free Delivery</Text>
        <Text style={styles.tagInfo}>⏱️ 20–30 min</Text>
        <Text style={styles.tagInfo}>⭐ 4.5</Text>
      </View>

      <Text style={styles.descricaoTitulo}>descrição</Text>
      <Text style={styles.descricaoTexto}>
        {produto.descricao || `O ${produto.nome.toLowerCase()} é uma fruta deliciosa, fresca e ideal para seu consumo diário.`}
      </Text>

      <View style={styles.quantidadeRow}>
        <TouchableOpacity onPress={() => setQuantidade(q => Math.max(1, q - 1))}>
          <Ionicons name="remove-circle-outline" size={32} color="#000" />
        </TouchableOpacity>
        <Text style={styles.quantidade}>{quantidade}</Text>
        <TouchableOpacity onPress={() => setQuantidade(q => q + 1)}>
          <Ionicons name="add-circle-outline" size={32} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.finalRow}>
        <Text style={styles.total}>R$ {total}</Text>
        <TouchableOpacity style={styles.btnCarrinho} onPress={handleAdicionarAoCarrinho}>
          <Text style={styles.btnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  image: { width: '100%', height: 220, borderRadius: 12 },
  nome: { fontSize: 24, fontWeight: 'bold', marginTop: 16 },
  precoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  preco: { fontSize: 20, color: 'green', marginVertical: 4 },
  linkEditar: { color: '#0984e3', fontWeight: 'bold', marginLeft: 12 },
  inputPreco: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
    marginVertical: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  tagInfo: { fontSize: 13, color: '#555' },
  descricaoTitulo: { fontSize: 16, fontWeight: 'bold', marginTop: 20 },
  descricaoTexto: { fontSize: 14, color: '#555', marginTop: 8 },
  quantidadeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 20,
  },
  quantidade: { fontSize: 20, fontWeight: 'bold', marginHorizontal: 16 },
  finalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: { fontSize: 20, fontWeight: 'bold', color: '#2ecc71' },
  btnCarrinho: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
});
