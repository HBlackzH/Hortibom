import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificacoesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Notificações</Text>
      <Text style={styles.texto}>Você ainda não tem nenhuma notificação.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold' },
  texto: { fontSize: 16, color: 'gray', marginTop: 10 },
});

