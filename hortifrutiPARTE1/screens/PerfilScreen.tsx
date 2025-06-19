import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface RootStackParamList {
  Cartao: undefined;
  Conta: undefined;
  Telefone: undefined;
  Comunidade: undefined;
  CodigoEntrega: undefined;
  Conversas: undefined;
  Notificacoes: undefined;
}

const PerfilScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={60} color="#00b894" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.nome}>Area do usuario</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Telefone')}>
            <Text style={styles.addPhone}>+ Adicionar telefone de acesso</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.option} onPress={() => Alert.alert('Em breve!', 'Entrega mais segura estará disponível em breve.') }>
        <MaterialIcons name="local-shipping" size={24} color="#00b894" />
        <Text style={styles.optionText}>Entrega mais segura</Text>
        <Text style={styles.badge}>Novo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Conversas')}>
        <Ionicons name="chatbubbles-outline" size={24} color="#000" />
        <Text style={styles.optionText}>Conversas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Notificacoes')}>
        <Ionicons name="notifications-outline" size={24} color="#000" />
        <Text style={styles.optionText}>Notificações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Conta')}>
        <Ionicons name="person-outline" size={24} color="#000" />
        <Text style={styles.optionText}>Dados da conta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Cartao')}>
        <FontAwesome5 name="money-check-alt" size={20} color="#000" />
        <Text style={styles.optionText}>Pagamentos</Text>
        <Text style={styles.badge}>Novo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => Alert.alert('Em breve!', 'Área de Benefícios ainda em construção.') }>
        <Ionicons name="gift-outline" size={24} color="#000" />
        <Text style={styles.optionText}>Benefícios Hortifruti</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Comunidade')}>
        <Ionicons name="people-outline" size={24} color="#000" />
        <Text style={styles.optionText}>Comunidade Hortifruti</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('CodigoEntrega')}>
        <Ionicons name="qr-code-outline" size={24} color="#000" />
        <Text style={styles.optionText}>Código de entrega</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PerfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addPhone: {
    color: '#00b894',
    fontSize: 14,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
  },
  badge: {
    marginLeft: 'auto',
    backgroundColor: '#00b894',
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
});
