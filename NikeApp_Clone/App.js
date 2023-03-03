import { StripeProvider } from '@stripe/stripe-react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './src/Navigation';
import { store } from './src/store'

export default function App() {
  return (
    <Provider 
      store={store}
      style={styles.container}
    >
      <StripeProvider publishableKey="pk_test_51MhbeFBu9fDzE6LP3UEjoslFRR3g3EeFPIuSgtNJdYEd0YEcr8apSSW31TunaXOmTW64Qopt7APJmWkXaRRZ7rQz00hulTTMcr">

        <Navigation />

      </StripeProvider>

      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
