// screens/AdicionarCartaoScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function AdicionarCartaoScreen() {
  const [numero, setNumero] = useState('');
  const [nome, setNome] = useState('');
  const [validade, setValidade] = useState('');
  const navigation = useNavigation<any>();

  const salvarCartao = async () => {
    if (!numero || !nome || !validade) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    const novoCartao = { numero, nome, validade };
    const salvos = await AsyncStorage.getItem('cartoes');
    const cartoes = salvos ? JSON.parse(salvos) : [];
    cartoes.push(novoCartao);
    await AsyncStorage.setItem('cartoes', JSON.stringify(cartoes));
    Alert.alert('Cartão salvo!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Número do Cartão</Text>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={setNumero} />
      <Text style={styles.label}>Nome Impresso</Text>
      <TextInput style={styles.input} onChangeText={setNome} />
      <Text style={styles.label}>Validade</Text>
      <TextInput style={styles.input} placeholder="MM/AA" onChangeText={setValidade} />
      <TouchableOpacity style={styles.botao} onPress={salvarCartao}>
        <Text style={styles.botaoTexto}>Salvar Cartão</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontWeight: 'bold', marginTop: 12 },
  input: { borderBottomWidth: 1, padding: 8, marginBottom: 10 },
  botao: { marginTop: 20, backgroundColor: '#0984e3', padding: 12, borderRadius: 8 },
  botaoTexto: { textAlign: 'center', color: '#fff', fontWeight: 'bold' },
});
