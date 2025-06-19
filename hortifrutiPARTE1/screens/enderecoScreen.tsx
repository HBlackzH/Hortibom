// screens/EnderecoScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUsuario } from './UsuarioScreen';

export default function EnderecoScreen() {
  const navigation = useNavigation<any>();
  const { usuario, atualizarUsuario } = useUsuario();
  const [novoEndereco, setNovoEndereco] = useState(usuario.endereco || '');

  const salvar = () => {
    if (!novoEndereco.trim()) {
      Alert.alert('Atenção', 'Preencha o endereço corretamente.');
      return;
    }

    atualizarUsuario({ endereco: novoEndereco });
    Alert.alert('Endereço Atualizado', 'Seu novo endereço foi salvo com sucesso!');
    navigation.goBack(); // volta para tela anterior
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Informe seu endereço</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu endereço"
        value={novoEndereco}
        onChangeText={setNovoEndereco}
      />

      <TouchableOpacity style={styles.botao} onPress={salvar}>
        <Text style={styles.botaoTexto}>Salvar Endereço</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 24,
  },
  botao: {
    backgroundColor: '#00b894',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
