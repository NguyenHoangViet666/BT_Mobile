import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { formatPrice } from '../utils/formatPrice';

// Default export: module có một component chính; name, price là props chỉ đọc.
export default function ProductCard({ name, price, onPress }) {
  const content = (
    <>
      <View style={styles.icon}><Text style={styles.iconText}>SP</Text></View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{formatPrice(price)}</Text>
      </View>
      {onPress ? <Text style={styles.arrow}>›</Text> : null}
    </>
  );

  return onPress ? (
    <Pressable accessibilityRole="button" accessibilityLabel={`Xem ${name}`}
      onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      {content}
    </Pressable>
  ) : <View style={styles.card}>{content}</View>;
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 10 },
  pressed: { opacity: 0.65 },
  icon: { width: 46, height: 46, borderRadius: 13, backgroundColor: '#e0f2fe', alignItems: 'center', justifyContent: 'center' },
  iconText: { color: '#0369a1', fontWeight: '800' },
  info: { flex: 1, marginHorizontal: 14 },
  name: { color: '#0f172a', fontSize: 16, fontWeight: '600', marginBottom: 6 },
  price: { color: '#0369a1', fontSize: 16, fontWeight: '700' },
  arrow: { color: '#64748b', fontSize: 28 },
});
