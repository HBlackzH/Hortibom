import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CodigoEntregaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Seu código de entrega</Text>
      <Text style={styles.codigo}>#123456</Text>
      <Text style={styles.instrucao}>Apresente esse código ao entregador para confirmar o recebimento.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold' },
  codigo: { fontSize: 36, marginVertical: 20, color: '#0984e3' },
  instrucao: { fontSize: 16, textAlign: 'center' },
});