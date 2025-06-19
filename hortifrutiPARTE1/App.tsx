// App.tsx corrigido com navegação para SelecionarLoja e Home real (HortiBom)
import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-get-random-values';

// Contextos
import { CarrinhoProvider } from './screens/carrinhoScreen';
import { HistoricoProvider } from './screens/historicoScreen';
import { UsuarioProvider } from './screens/UsuarioScreen';

// Telas
import HomeScreen from './screens/HomeScreen';
import CartaoScreen from './screens/CartaoScreen';
import PerfilScreen from './screens/PerfilScreen';
import CuponsScreen from './screens/CuponsScreen';
import Pesquisa from './screens/Pesquisa';
import PedidosScreen from './screens/pedidosScreen';
import ProdutoScreen from './screens/ProdutoScreen';
import CarrinhoScreen from './screens/carrinhoScreen';
import PagamentoScreen from './screens/PagamentoScreen';
import ContaScreen from './screens/ContaScreen';
import EnderecoScreen from './screens/enderecoScreen';
import AdicionarCartaoScreen from './screens/AdicionarCartao';
import SelecionarLojaScreen from './screens/SelecionarLojaScreen';
import ConversasScreen from './screens/ConversasScreen';
import NotificacoesScreen from './screens/NotificacoesScreen';
import ComunidadeScreen from './screens/ComunidadeScreen';
import CodigoEntregaScreen from './screens/CodigoEntregaScreen';
import TelefoneScreen from './screens/TelefoneScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const PerfilStack = createNativeStackNavigator();

interface TabBarIconProps {
  color: string;
  size: number;
}

// Navegação do Perfil
const PerfilStackScreen: React.FC = () => (
  <PerfilStack.Navigator>
    <PerfilStack.Screen
      name="PerfilHome"
      component={PerfilScreen}
      options={{ title: 'Perfil' }}
    />
    <PerfilStack.Screen
      name="Cartao"
      component={CartaoScreen}
      options={{ title: 'Pagamento com Cartão' }}
    />
    <PerfilStack.Screen
      name="Conta"
      component={ContaScreen}
      options={{ title: 'Dados da Conta' }}
    />
  </PerfilStack.Navigator>
);

// Abas principais
const TabScreens: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }: TabBarIconProps) => {
        let iconName: string;

        switch (route.name) {
          case 'Início':
            iconName = 'home';
            break;
          case 'Busca':
            iconName = 'search';
            break;
          case 'Pedidos':
            iconName = 'receipt';
            break;
          case 'Perfil':
            iconName = 'person';
            break;
          case 'Cupons':
            iconName = 'gift-outline';
            break;
          default:
            iconName = 'home';
        }

        return (
          <Ionicons
            name={iconName as keyof typeof Ionicons.glyphMap}
            size={size}
            color={color}
          />
        );
      },
      tabBarActiveTintColor: '#00b894',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Início" component={SelecionarLojaScreen} />
    <Tab.Screen name="Busca" component={Pesquisa} />
    <Tab.Screen name="Pedidos" component={PedidosScreen} />
    <Tab.Screen name="Perfil" component={PerfilStackScreen} />
    <Tab.Screen name="Cupons" component={CuponsScreen} />
  </Tab.Navigator>
);

// App principal
const App: React.FC = () => {
  return (
    <UsuarioProvider>
      <CarrinhoProvider>
        <HistoricoProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Tabs">
              <Stack.Screen
                name="Tabs"
                component={TabScreens}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Produto"
                component={ProdutoScreen}
                options={{ title: 'Detalhes do Produto' }}
              />
              <Stack.Screen
                name="Carrinho"
                component={CarrinhoScreen}
                options={{ title: 'Carrinho' }}
              />
              <Stack.Screen
                name="Pagamento"
                component={PagamentoScreen}
                options={{ title: 'Pagamento' }}
              />
              <Stack.Screen
                name="Conta"
                component={ContaScreen}
                options={{ title: 'Dados da Conta' }}
              />
              <Stack.Screen
                name="Endereco"
                component={EnderecoScreen}
                options={{ title: 'Endereço de Entrega' }}
              />
              <Stack.Screen
                name="AdicionarCartao"
                component={AdicionarCartaoScreen}
                options={{ title: 'Novo Cartão' }}
              />
              <Stack.Screen
                name="SelecionarLoja"
                component={SelecionarLojaScreen}
                options={{ title: 'Lojas' }}
              />
              <Stack.Screen
                name="HomeHortibom"
                component={HomeScreen}
                options={{ title: 'HortiBom' }}
              />
              <Stack.Screen name="Conversas" 
                component={ConversasScreen} 
              />
              <Stack.Screen name="Notificacoes" 
                component={NotificacoesScreen} 
              />
              <Stack.Screen name="Comunidade" 
                component={ComunidadeScreen} 
              />
              <Stack.Screen name="CodigoEntrega" 
                component={CodigoEntregaScreen} 
              />
              <Stack.Screen name="Telefone" 
                component={TelefoneScreen} 
              />

            </Stack.Navigator>
          </NavigationContainer>
        </HistoricoProvider>
      </CarrinhoProvider>
    </UsuarioProvider>
  );
};

export default App;
