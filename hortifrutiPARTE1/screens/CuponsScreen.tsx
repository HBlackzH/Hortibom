import * as React from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const CuponsScreen: React.FC = () => {
  const [progress, setProgress] = useState(30);

  const handleCupomClick = () => {
    alert("Cupom Resgatado!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Logo */}
        <Image
          source={require('../assets/images/banner.png')}
          style={styles.logo}
        />

        {/* Favoritos da Galera */}
        <Text style={styles.title}>Favoritos da Galera</Text>
        <View style={styles.favoritesContainer}>
          <View style={styles.favoriteItem}>
            <Image source={require('../assets/images/banner2.png')} style={styles.favoriteImage} />
            <Text>Frutas Secas</Text>
          </View>
          <View style={styles.favoriteItem}>
            <Image source={require('../assets/images/fruta2.jpg')} style={styles.favoriteImage} />
            <Text>Frutas Vermelhas</Text>
          </View>
          <View style={styles.favoriteItem}>
            <Image source={require('../assets/images/frutasVermelhas.png')} style={styles.favoriteImage} />
            <Text>Frutas Classicas</Text>
          </View>
        </View>

        {/* Resgate Cupom */}
        <TouchableOpacity style={styles.cupomButton} onPress={handleCupomClick}>
          <Text style={styles.cupomButtonText}>Resgate Cupom</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${progress}%` }]} />
          </View>
        </TouchableOpacity>

        {/* Loja Destaque */}
        <View style={styles.storeContainer}>
          <Image source={require('../assets/images/loja2.png')} style={styles.storeImage} />
          <Text style={styles.storeTitle}>Loja do Seu Zé</Text>
          <Text style={styles.storeSubtitle}>Está perto de você!</Text>
        </View>

        {/* Botões de Promoção */}
        <View style={styles.promoContainer}>
          <TouchableOpacity style={styles.promoButtonOrange}>
            <Text>50% De Desconto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.promoButtonYellow}>
            <Text>Frete Grátis</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CuponsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 70,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  favoritesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  favoriteItem: {
    alignItems: 'center',
  },
  favoriteImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
  cupomButton: {
    backgroundColor: '#00b894',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  cupomButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#dfe6e9',
    borderRadius: 5,
    marginTop: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#6c5ce7',
    borderRadius: 5,
  },
  storeContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: '#f1f2f6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  storeImage: {
    width: '100%',
    height: 150,
  },
  storeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  storeSubtitle: {
    marginHorizontal: 10,
    color: '#636e72',
    marginBottom: 10,
  },
  promoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  promoButtonOrange: {
    backgroundColor: '#d63031',
    padding: 15,
    borderRadius: 8,
  },
  promoButtonYellow: {
    backgroundColor: '#fdcb6e',
    padding: 15,
    borderRadius: 8,
  },
});
