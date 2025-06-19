import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Image,
  TouchableOpacity, ScrollView, Alert, TextInput, Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabaseClient';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  imagem_url: string;
}

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [novoProduto, setNovoProduto] = useState({ nome: '', preco: '', descricao: '', imagem_url: '' });

  const buscarProdutos = async () => {
    const { data, error } = await supabase.from('produtos').select('*');
    if (!error && data) setProdutos(data);
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  const removerProduto = async (id: string) => {
    await supabase.from('produtos').delete().eq('id', id);
    buscarProdutos();
  };

  const adicionarProduto = async () => {
    const precoNum = parseFloat(novoProduto.preco.replace(',', '.'));
    if (!novoProduto.nome || isNaN(precoNum) || !novoProduto.imagem_url) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    await supabase.from('produtos').insert({
      nome: novoProduto.nome,
      preco: precoNum,
      descricao: novoProduto.descricao,
      imagem_url: novoProduto.imagem_url,
    });

    setModalVisible(false);
    setNovoProduto({ nome: '', preco: '', descricao: '', imagem_url: '' });
    buscarProdutos();
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../assets/images/banner2.png')} style={styles.banner} />

      <TouchableOpacity
        style={styles.btnAdicionar}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.btnAdicionarTexto}>+ Adicionar Produto</Text>
      </TouchableOpacity>

      <View style={styles.cardLoja}>
        <Text style={styles.nomeLoja}>HortiBom - Taguatinga</Text>
        <Text style={styles.descLoja}>Entrega rastreável • 1.0 km • Mín R$ 20,00</Text>
        <Text style={styles.infoLoja}>⭐ 4.9 (11 avaliações) • 🥇 Nível 4 de 5</Text>
        <Text style={styles.entrega}>Entrega • Hoje, 35-45 min • <Text style={{ color: 'green' }}>Grátis</Text></Text>
      </View>

      <Text style={styles.sectionTitle}>Destaques</Text>

      <View style={styles.grid}>
        {produtos.map((item, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate('Produto', { produto: item })}>
              <Image source={{ uri: item.imagem_url }} style={styles.cardImg} />
              <Text style={styles.cardPreco}>R$ {item.preco.toFixed(2)}</Text>
              <Text numberOfLines={2} style={styles.cardNome}>{item.nome}</Text>
            </TouchableOpacity>
            <View style={styles.cardButtons}>
              <TouchableOpacity style={styles.btnRemover} onPress={() =>
                Alert.alert('Confirmar', 'Remover este produto?', [
                  { text: 'Cancelar', style: 'cancel' },
                  { text: 'Remover', onPress: () => removerProduto(item.id) }
                ])}>
                <Text style={styles.btnText}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Novo Produto</Text>

          <TextInput placeholder="Nome" style={styles.input}
            value={novoProduto.nome}
            onChangeText={(v) => setNovoProduto({ ...novoProduto, nome: v })} />

          <TextInput placeholder="Preço" style={styles.input}
            value={novoProduto.preco}
            onChangeText={(v) => setNovoProduto({ ...novoProduto, preco: v })}
            keyboardType="numeric" />

          <TextInput placeholder="Descrição" style={styles.input}
            value={novoProduto.descricao}
            onChangeText={(v) => setNovoProduto({ ...novoProduto, descricao: v })} />

          <TextInput placeholder="URL da imagem (https://...)" style={styles.input}
            value={novoProduto.imagem_url}
            onChangeText={(v) => setNovoProduto({ ...novoProduto, imagem_url: v })} />

          <TouchableOpacity onPress={adicionarProduto} style={styles.btnSalvar}>
            <Text style={styles.btnText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.btnCancelar}>
            <Text style={styles.btnText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  banner: { width: '100%', height: 180 },
  cardLoja: { padding: 16 },
  nomeLoja: { fontWeight: 'bold', fontSize: 18 },
  descLoja: { color: '#555', marginTop: 4 },
  infoLoja: { color: '#888', marginTop: 2 },
  entrega: { color: '#333', marginTop: 6 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
  },
  card: {
    width: '44%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  cardImg: { width: '100%', height: 100, borderRadius: 8 },
  cardPreco: { fontWeight: 'bold', marginTop: 5 },
  cardNome: { fontSize: 14, color: '#333' },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  btnRemover: {
    backgroundColor: '#e74c3c',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  btnAdicionar: {
    backgroundColor: '#2ecc71',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  btnAdicionarTexto: {
    color: '#fff',
    fontWeight: 'bold'
  },
  btnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6
  },
  btnSalvar: {
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10
  },
  btnCancelar: {
    backgroundColor: '#888',
    padding: 12,
    borderRadius: 6
  }
});
