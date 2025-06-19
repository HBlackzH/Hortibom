import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function TelefoneScreen() {
  const [telefone, setTelefone] = useState('');

  const salvarTelefone = () => {
    if (telefone.trim().length < 10) {
      Alert.alert('Digite um telefone válido');
      return;
    }
    Alert.alert('Telefone salvo com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Adicione seu telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu número"
        keyboardType="phone-pad"
        value={telefone}
        onChangeText={setTelefone}
      />
      <TouchableOpacity style={styles.botao} onPress={salvarTelefone}>
        <Text style={styles.botaoTexto}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderBottomWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 },
  botao: { backgroundColor: '#00b894', padding: 15, borderRadius: 10 },
  botaoTexto: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
