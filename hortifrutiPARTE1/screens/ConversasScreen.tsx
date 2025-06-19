// ConversasScreen com bot de resposta
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lojas } from './SelecionarLojaScreen';

export default function ConversasScreen() {
  const [pesquisa, setPesquisa] = useState('');
  const [conversaAtiva, setConversaAtiva] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState('');
  const [conversas, setConversas] = useState<Record<string, string[]>>({});

  useEffect(() => {
    AsyncStorage.getItem('conversas').then(data => {
      if (data) setConversas(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('conversas', JSON.stringify(conversas));
  }, [conversas]);

  const enviarMensagem = () => {
    if (!mensagem.trim() || !conversaAtiva) return;

    const novaMensagem = [...(conversas[conversaAtiva] || []), `👤 Você: ${mensagem}`];
    setConversas(prev => ({ ...prev, [conversaAtiva]: novaMensagem }));
    setMensagem('');

    // Resposta do bot simulada
    setTimeout(() => {
      setConversas(prev => ({
        ...prev,
        [conversaAtiva]: [...(prev[conversaAtiva] || []), `🤖 Bot: Bem vindo a nossa loja, aguarde que ja iremos te atender!!! 😉`]
      }));
    }, 1000);
  };

  const lojasFiltradas = lojas.map(loja => loja.nome)
    .filter(nome => nome.toLowerCase().includes(pesquisa.toLowerCase()));

  const renderConversa = () => (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <FlatList
        style={styles.chatContainer}
        data={conversas[conversaAtiva!] || []}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={[styles.bubble, item.includes('Você') ? styles.bubbleUser : styles.bubbleBot]}>{item}</Text>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={mensagem}
          onChangeText={setMensagem}
        />
        <TouchableOpacity style={styles.sendButton} onPress={enviarMensagem}>
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );

  if (conversaAtiva) return renderConversa();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Conversas com Lojas</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar loja..."
        value={pesquisa}
        onChangeText={setPesquisa}
      />
      {lojasFiltradas.map((nome) => (
        <TouchableOpacity key={nome} style={styles.lojaItem} onPress={() => setConversaAtiva(nome)}>
          <Text style={styles.lojaNome}>{nome}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  searchInput: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 10, marginBottom: 15
  },
  lojaItem: {
    padding: 12, borderBottomWidth: 1, borderColor: '#eee'
  },
  lojaNome: { fontSize: 16 },
  chatContainer: { flex: 1, padding: 20 },
  bubble: {
    padding: 10, borderRadius: 8, marginBottom: 10, maxWidth: '80%'
  },
  bubbleUser: {
    backgroundColor: '#dff9fb', alignSelf: 'flex-end'
  },
  bubbleBot: {
    backgroundColor: '#eee', alignSelf: 'flex-start'
  },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', padding: 10
  },
  input: {
    flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10
  },
  sendButton: {
    marginLeft: 10, backgroundColor: '#00b894', padding: 10, borderRadius: 8
  },
  sendText: { color: '#fff', fontWeight: 'bold' }
});
