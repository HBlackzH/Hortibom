import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { nome: 'Morango', color: '#7ED957' },
  { nome: 'Melancia', color: '#FAD6A5' },
  { nome: 'Banana', color: '#FFF5BA' },
  { nome: 'Manga', color: '#FDEAA8' },
];

const pedidosHortiBom = [
  {
    nome: 'Frutas cictricas',
    descricao: 'Cesta de frutas citricas.',
    imagem: require('../assets/images/fruta1.avif'),
  },
  {
    nome: 'Combo Tropical',
    descricao: 'Frutas tropicais selecionadas.',
    imagem: require('../assets/images/frutasExoticas.png'),
  },
  {
    nome: 'Maçã Nacional',
    descricao: 'Maçã vermelha direto do produtor.',
    imagem: require('../assets/images/frutaClassicas.png'),
  },
];

export default function SearchScreen() {
  const [busca, setBusca] = useState('');
  const [historico, setHistorico] = useState<string[]>([]);
  const navigation = useNavigation<any>();

  const pedidosFiltrados = pedidosHortiBom.filter((pedido) =>
    pedido.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleSearchSubmit = () => {
    const termo = busca.trim();
    if (termo && !historico.includes(termo)) {
      setHistorico([termo, ...historico]);
    }
    Keyboard.dismiss();
  };

  const removerHistoricoItem = (item: string) => {
    setHistorico(historico.filter((h) => h !== item));
  };

  const irParaProduto = (pedido: any) => {
    navigation.navigate('HomeHortibom', { produtoSelecionado: pedido });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <TextInput
          placeholder="Buscar pedidos..."
          style={styles.searchInput}
          value={busca}
          onChangeText={setBusca}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {categories.map((cat, index) => (
          <View key={index} style={[styles.category, { backgroundColor: cat.color }]}>
            <Text>{cat.nome}</Text>
          </View>
        ))}
      </ScrollView>

      {historico.length > 0 && (
        <>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pesquisas recentes</Text>
            <TouchableOpacity onPress={() => setHistorico([])}>
              <Text style={styles.deleteText}>Limpar</Text>
            </TouchableOpacity>
          </View>

          {historico.map((item, index) => (
            <View key={index} style={styles.searchItem}>
              <Ionicons name="search" size={18} color="gray" />
              <Text style={styles.searchText}>{item}</Text>
              <TouchableOpacity onPress={() => removerHistoricoItem(item)}>
                <Ionicons name="close" size={18} color="gray" />
              </TouchableOpacity>
            </View>
          ))}
        </>
      )}

      <Text style={styles.sectionTitle}>
        {busca.length > 0 ? 'Resultados encontrados' : 'Pedidos do HortiBom'}
      </Text>

      {pedidosFiltrados.length === 0 && busca.length > 0 ? (
        <Text style={styles.noResults}>Nenhum item encontrado.</Text>
      ) : (
        pedidosFiltrados.map((pedido, index) => (
          <TouchableOpacity key={index} onPress={() => irParaProduto(pedido)} style={styles.orderItem}>
            <Image source={pedido.imagem} style={styles.image} />
            <View>
              <Text style={styles.orderTitle}>{pedido.nome}</Text>
              <Text style={styles.orderDescription}>{pedido.descricao}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="orange" />
                <Text style={styles.ratingText}>4.9</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.ratingText}>190m</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  categories: { flexDirection: 'row', marginBottom: 16 },
  category: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginRight: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, marginVertical: 8 },
  deleteText: { color: 'orange' },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 10,
  },
  searchText: { flex: 1, fontSize: 14 },
  orderItem: { flexDirection: 'row', marginVertical: 10, gap: 10 },
  image: { width: 60, height: 60, borderRadius: 10 },
  orderTitle: { fontWeight: 'bold' },
  orderDescription: { color: 'gray' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 12 },
  dot: { marginHorizontal: 4 },
  noResults: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
