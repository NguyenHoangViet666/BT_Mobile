import React, { useEffect, useState } from 'react';
import { BackHandler, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import ProductCard from './components/ProductCard';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';

export default function App() {
  const [tab, setTab] = useState('list');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!selectedProduct) return false;
      setSelectedProduct(null);
      return true;
    });
    return () => subscription.remove();
  }, [selectedProduct]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f5f9" />
      <View style={styles.app}>
        {selectedProduct ? (
          <ProductDetailScreen {...selectedProduct} onBack={() => setSelectedProduct(null)} />
        ) : (
          <>
            <View style={styles.tabs}>
              {[['easy', 'Bài dễ · ProductCard'], ['list', 'Product List']].map(([value, label]) => (
                <Pressable key={value} onPress={() => setTab(value)} accessibilityRole="tab"
                  accessibilityState={{ selected: tab === value }} style={[styles.tab, tab === value && styles.activeTab]}>
                  <Text style={[styles.tabText, tab === value && styles.activeText]}>{label}</Text>
                </Pressable>
              ))}
            </View>
            {tab === 'list' ? <ProductListScreen onSelectProduct={setSelectedProduct} /> : (
              <ScrollView contentContainerStyle={styles.demo}>
                <Text style={styles.title}>Tái sử dụng ProductCard</Text>
                <Text style={styles.subtitle}>Cùng một component, ba bộ props khác nhau.</Text>
                <ProductCard name="Tai nghe Bluetooth" price={590000} />
                <ProductCard name="Bàn phím cơ" price={890000} />
                <ProductCard name="Chuột không dây" price={350000} />
              </ScrollView>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f1f5f9', paddingTop: StatusBar.currentHeight || 0 },
  app: { flex: 1, width: '100%', maxWidth: 600, alignSelf: 'center' },
  tabs: { flexDirection: 'row', margin: 20, marginBottom: 0, padding: 4, backgroundColor: '#e2e8f0', borderRadius: 12 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 9 },
  activeTab: { backgroundColor: '#fff' },
  tabText: { color: '#64748b', fontSize: 13, fontWeight: '600' },
  activeText: { color: '#0369a1' },
  demo: { padding: 20 },
  title: { color: '#0f172a', fontWeight: '800', fontSize: 26, marginBottom: 10 },
  subtitle: { color: '#64748b', lineHeight: 22, marginBottom: 24 },
});
