import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function ProductListScreen({ onSelectProduct }) {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.badge}>BÀI LUYỆN TẬP 8 · MỨC TRUNG BÌNH</Text>
          <Text style={styles.title}>Product List</Text>
          <Text style={styles.subtitle}>10 sản phẩm · Chạm để xem chi tiết</Text>
        </View>
      }
      renderItem={({ item }) => (
        <ProductCard name={item.name} price={item.price}
          onPress={() => onSelectProduct({ id: item.id, name: item.name, price: item.price })} />
      )}
      ListFooterComponent={<Text style={styles.footer}>Dữ liệu mẫu · Giá tính bằng VNĐ</Text>}
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 32 },
  header: { marginBottom: 24 },
  badge: { fontSize: 11, color: '#0369a1', fontWeight: '800', marginBottom: 12 },
  title: { fontSize: 32, fontWeight: '800', color: '#0f172a' },
  subtitle: { color: '#64748b', fontSize: 14, marginTop: 8 },
  footer: { color: '#64748b', textAlign: 'center', paddingVertical: 12, fontSize: 12 },
});
