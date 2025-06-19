import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useHistorico } from '../screens/historicoScreen';

export default function PedidosScreen() {
  const { pedidos, cancelarPedido, removerPedido } = useHistorico();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>MEUS PEDIDOS</Text>

      {pedidos.length === 0 ? (
        <Text style={styles.vazio}>Você ainda não fez nenhum pedido.</Text>
      ) : (
        <>
          <Text style={styles.subTitle}>Últimos Pedidos</Text>
          <View style={styles.popularContainer}>
            {pedidos.slice(-2).reverse().map((pedido) => (
              <View key={pedido.id} style={styles.popularCard}>
                <View style={[styles.circle, { backgroundColor: '#7BED8D' }]} />
                <Text style={styles.storeName}>Pedido #{pedido.id.slice(0, 5)}</Text>
                <Text style={styles.storeStatusAberto}>{pedido.metodoPagamento}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.subTitle}>Histórico</Text>
          {pedidos.slice().reverse().map((pedido) => (
            <View key={pedido.id} style={styles.orderCard}>
              <Text style={styles.date}>{pedido.data}</Text>

              <View style={styles.orderHeader}>
                <Image source={pedido.itens[0].imagem} style={styles.orderImage} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.orderTitle}>Pedido #{pedido.id.slice(0, 5)}</Text>
                  <Text style={[
                    styles.orderStatus,
                    pedido.status === 'Cancelado' ? { color: 'red' } : { color: 'green' }
                  ]}>
                    {pedido.status || 'Entregue'}
                  </Text>
                </View>
                <Text style={styles.arrow}>{'>'}</Text>
              </View>

              <Text style={[
                styles.success,
                pedido.status === 'Cancelado' && { color: 'red' }
              ]}>
                {pedido.status === 'Cancelado'
                  ? 'Pedido cancelado'
                  : `Pedido concluído | Total R$ ${(pedido.total / 100).toFixed(2)}`}
              </Text>

              <View style={styles.orderFooter}>
                <TouchableOpacity onPress={() => alert('Ajuda clicada')}>
                  <Text style={styles.link}>Ajuda</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert(`Pedido feito em ${pedido.data}`)}>
                  <Text style={styles.link}>Detalhes</Text>
                </TouchableOpacity>
                {pedido.status !== 'Cancelado' && (
                  <TouchableOpacity onPress={() => cancelarPedido(pedido.id)}>
                    <Text style={[styles.link, { color: 'red' }]}>Cancelar</Text>
                  </TouchableOpacity>
                )}
              </View>

              {pedido.status === 'Cancelado' && (
                <TouchableOpacity
                  style={styles.removerX}
                  onPress={() => removerPedido(pedido.id)}
                >
                  <Text style={styles.removerXTexto}>✕ Remover da lista</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#333'
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },
  vazio: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 40,
    fontSize: 16
  },
  popularContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popularCard: {
    width: '48%',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    padding: 12,
    alignItems: 'center',
    elevation: 2,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 6,
  },
  storeName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  storeStatusAberto: {
    color: 'green',
    fontSize: 12,
  },
  date: {
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginBottom: 20,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12
  },
  orderTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderStatus: {
    fontSize: 13,
    marginTop: 2,
  },
  arrow: {
    fontSize: 18,
    color: '#999',
  },
  success: {
    fontWeight: 'bold',
    marginBottom: 12,
    marginLeft: 4
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  link: {
    color: '#0984e3',
    fontWeight: 'bold',
  },
  removerX: {
    marginTop: 12,
    alignItems: 'center',
  },
  removerXTexto: {
    color: 'red',
    fontWeight: 'bold',
  },
});
