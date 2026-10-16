import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { formatPrice } from '../utils/formatPrice';

// Nhận trực tiếp id, name, price qua props từ component cha App.
export default function ProductDetailScreen({ id, name, price, onBack }) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Pressable onPress={onBack} accessibilityRole="button" style={styles.back}>
        <Text style={styles.backText}>‹ Quay lại danh sách</Text>
      </Pressable>
      <Text style={styles.badge}>THÔNG TIN SẢN PHẨM</Text>
      <Text style={styles.heading}>Product Detail</Text>
      <View style={styles.art}><Text style={styles.artText}>SP</Text></View>
      <View style={styles.card}>
        <Text style={styles.label}>MÃ SẢN PHẨM</Text>
        <Text style={styles.id}>{id}</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.label}>GIÁ BÁN</Text>
        <Text style={styles.price}>{formatPrice(price)}</Text>
        <Text style={styles.note}>Sản phẩm thuộc danh sách dữ liệu mẫu của bài luyện tập 8.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 40 },
  back: { alignSelf: 'flex-start', paddingVertical: 14, marginBottom: 14 },
  backText: { color: '#0369a1', fontSize: 16, fontWeight: '600' },
  badge: { color: '#0369a1', fontWeight: '800', fontSize: 11, marginBottom: 10 },
  heading: { fontSize: 32, fontWeight: '800', color: '#0f172a', marginBottom: 24 },
  art: { height: 190, backgroundColor: '#e0f2fe', borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  artText: { fontSize: 64, color: '#0369a1', fontWeight: '800' },
  card: { padding: 24, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0' },
  label: { color: '#64748b', fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  id: { color: '#334155', fontSize: 15, marginTop: 6 },
  name: { color: '#0f172a', fontSize: 26, fontWeight: '800', marginVertical: 22 },
  price: { color: '#0369a1', fontSize: 30, fontWeight: '800', marginTop: 8 },
  note: { color: '#64748b', fontSize: 14, lineHeight: 22, marginTop: 24 },
});
