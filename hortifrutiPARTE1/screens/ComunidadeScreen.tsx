import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ComunidadeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo à Comunidade Hortifruti!</Text>
      <Text style={styles.texto}>Participe de enquetes, deixe sugestões e interaja com outros clientes.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  texto: { fontSize: 16, textAlign: 'center' },
});
