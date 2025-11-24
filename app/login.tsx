import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { ActivityIndicator, Button, StyleSheet, TextInput, View } from 'react-native';
import * as Yup from 'yup';

import { ThemedText } from '@/components/themed-text';
import { login } from '@/store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

const schema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const status = useAppSelector((s) => s.auth.status);
  const error = useAppSelector((s) => s.auth.error);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>💪 FitBuddy</ThemedText>
        <ThemedText style={styles.subtitle}>Your fitness companion</ThemedText>
      </View>

      <Formik
        initialValues={{ username: 'kminchelle', password: '0lelplR' }}
        validationSchema={schema}
        onSubmit={async (values) => {
          try {
            const res = await dispatch(login(values));
            if (login.fulfilled.match(res)) {
              router.replace('/(tabs)');
            }
          } catch (e) {
            // handled by slice
          }
        }}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.form}>
            <View>
              <ThemedText style={styles.label}>Username</ThemedText>
              <TextInput
                placeholder="Enter username"
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
                placeholder="Enter password"
                placeholderTextColor="#999"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                style={styles.input}
              />
            </View>
            {error && (
              <View style={styles.errorBox}>
                <ThemedText style={styles.errorText}>⚠️ {error}</ThemedText>
              </View>
            )}
            {status === 'loading' ? (
              <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
            ) : (
              <>
                <View style={styles.buttonPrimary}>
                  <Button title="Sign In" onPress={() => handleSubmit()} color="#000" />
                </View>
                <View style={styles.buttonSecondary}>
                  <Button title="Create Account" onPress={() => router.push('/register')} color="#000" />
                </View>
              </>
            )}
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
    fontSize: 36,
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
  errorBox: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
  },
  loader: {
    marginVertical: 20,
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
