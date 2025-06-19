import * as React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const FrutasVermelhasScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Image source={require('../assets/images/frutasVermelhas.png')} style={styles.image} />
      <Text style={styles.title}>Frutas Vermelhas</Text>
      <Text style={styles.description}>
        As frutas vermelhas são ricas em antioxidantes e trazem muitos benefícios para a saúde, 
        além de serem deliciosas para consumo em diversas receitas.
      </Text>
      <Text style={styles.price}>Faixa de Preço: R$ 8,90</Text>
    </ScrollView>
  );
};

export default FrutasVermelhasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
});
