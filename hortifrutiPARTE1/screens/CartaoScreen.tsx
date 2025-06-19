// Atualizado: CartaoScreen.tsx
import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';

const CartaoScreen: React.FC = () => {
  const [formasSalvas, setFormasSalvas] = useState<{ id: string; nome: string }[]>([]);
  const navigation = useNavigation<any>();

  const carregarCartoes = async () => {
    const salvos = await AsyncStorage.getItem('cartoes');
    const cartoes = salvos ? JSON.parse(salvos) : [];
    const formatados = cartoes.map((c: any, index: number) => ({
      id: String(index),
      nome: `${c.nome} **** ${c.numero.slice(-4)}`,
    }));
    setFormasSalvas(formatados);
  };


  const adicionarPagamento = () => {
    navigation.navigate('AdicionarCartao');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/mercadoPago.jpg')}
        style={styles.image}
      />
      <Text style={styles.title}>Peça seu Cartão de Crédito Mercado Pago</Text>
      <Text style={styles.text}>✔️ Parcelamento em até 18x sem juros</Text>
      <Text style={styles.text}>✔️ Anuidade grátis</Text>
      <Text style={styles.text}>✔️ Segurança e controle no app</Text>

      <View style={styles.button}>
        <Button title="Peça já" color="#0055FF" onPress={() => console.log("Botão pressionado")} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Formas de pagamento salvas:</Text>
        <FlatList
          data={formasSalvas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardItem}>
              <Text>{item.nome}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={{ color: 'gray' }}>Nenhum cartão salvo</Text>}
        />
        <TouchableOpacity style={styles.addButton} onPress={adicionarPagamento}>
          <Text style={styles.addButtonText}>+ Adicionar nova forma de pagamento</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartaoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    width: '60%',
  },
  section: {
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  addButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#0984e3',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
