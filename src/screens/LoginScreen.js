import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const theme = useTheme();
  
  const handleLogin = () => {
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => navigation.navigate('Home'))
      .catch((err) => Alert.alert('Login Failed', err));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Text 
        variant="titleLarge" 
        style={[styles.title, { color: theme.dark ? '#fff' : theme.colors.text }]}
      >
        Login
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        mode="outlined"
        secureTextEntry
      />
      <Button 
        mode="contained" 
        onPress={handleLogin} 
        style={styles.button}
        labelStyle={{ color: theme.dark ? '#fff' : undefined }}
      >
        Login
      </Button>
      {error && <Text style={[styles.error, { color: theme.colors.error, textAlign: 'center' }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  error: {
    marginTop: 16,
  },
});

export default LoginScreen;