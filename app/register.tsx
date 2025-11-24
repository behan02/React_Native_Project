import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import * as Yup from 'yup';

import { ThemedText } from '@/components/themed-text';

const schema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().min(6, 'Min 6 chars').required('Password is required'),
});

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>💪 Join FitBuddy</ThemedText>
        <ThemedText style={styles.subtitle}>Start your fitness journey today</ThemedText>
      </View>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={schema}
        onSubmit={async (values) => {
          // Dummy register — just alert and navigate to login
          Alert.alert('Success! 🎉', 'Account created. You can now sign in');
          router.replace('/login');
        }}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.form}>
            <View>
              <ThemedText style={styles.label}>Username</ThemedText>
              <TextInput
                placeholder="Choose a username"
                placeholderTextColor="#999"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                style={styles.input}
                autoCapitalize="none"
              />
            </View>
            <View>
              <ThemedText style={styles.label}>Password</ThemedText>
              <TextInput
                placeholder="Minimum 6 characters"
                placeholderTextColor="#999"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                style={styles.input}
              />
            </View>
            <View style={styles.buttonPrimary}>
              <Button title="Create Account" onPress={() => handleSubmit()} color="#000" />
            </View>
            <View style={styles.buttonSecondary}>
              <Button title="Already have an account? Sign in" onPress={() => router.replace('/login')} color="#000" />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    gap: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  buttonPrimary: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  buttonSecondary: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});
