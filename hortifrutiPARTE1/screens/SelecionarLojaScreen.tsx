import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  TextInput,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Exporta as lojas para outras telas (como ConversasScreen)
export const lojas = [
  { nome: 'HortiBom', imagem: require('../assets/images/loja1.png'), ativa: true },
  { nome: 'Loja do ze', imagem: require('../assets/images/loja2.png'), ativa: false },
  { nome: 'Frutas legais', imagem: require('../assets/images/loja3.webp'), ativa: false },
  { nome: 'Loja do antonio', imagem: require('../assets/images/loja4.png'), ativa: false },
  { nome: 'Horti do Bairro', imagem: require('../assets/images/loja5.jpg'), ativa: false },
  { nome: 'Lalalala', imagem: require('../assets/images/loja6.jpg'), ativa: false },
];

export default function SelecionarLojaScreen() {
  const navigation = useNavigation<any>();
  const [busca, setBusca] = useState('');

  const entrarNaLoja = (loja: (typeof lojas)[0]) => {
    if (loja.ativa) {
      navigation.navigate('HomeHortibom');
    } else {
      Alert.alert('Em breve!', `${loja.nome} ainda não está disponível.`);
    }
  };

  const lojasFiltradas = lojas.filter(loja =>
    loja.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Escolha sua loja</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar loja..."
        value={busca}
        onChangeText={setBusca}
      />

      <FlatList
        data={lojasFiltradas}
        keyExtractor={(item) => item.nome}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => entrarNaLoja(item)}>
            <Image source={item.imagem} style={styles.imagem} />
            <Text style={styles.nome}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Text style={styles.titulo}>Atalhos úteis</Text>
      <View style={styles.widgets}>
        <TouchableOpacity style={styles.widget} onPress={() => navigation.navigate('Cupons')}>
          <Ionicons name="gift-outline" size={24} color="#00b894" />
          <Text style={styles.widgetTexto}>Cupons</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.widget} onPress={() => navigation.navigate('Pedidos')}>
          <Ionicons name="receipt-outline" size={24} color="#00b894" />
          <Text style={styles.widgetTexto}>Pedidos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.widget} onPress={() => navigation.navigate('Cartao')}>
          <Ionicons name="card-outline" size={24} color="#00b894" />
          <Text style={styles.widgetTexto}>Cartões</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.widget} onPress={() => navigation.navigate('Conta')}>
          <Ionicons name="person-outline" size={24} color="#00b894" />
          <Text style={styles.widgetTexto}>Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.widget} onPress={() => navigation.navigate('Endereco')}>
          <Ionicons name="location-outline" size={24} color="#00b894" />
          <Text style={styles.widgetTexto}>Endereço</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    marginBottom: 16,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  imagem: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  widgets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  widget: {
    width: '48%',
    padding: 14,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  widgetTexto: {
    marginTop: 8,
    fontWeight: 'bold',
    color: '#333',
  },
});
