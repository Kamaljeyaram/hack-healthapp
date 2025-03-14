import React from 'react';
import { TextInput, StyleSheet, View, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  darkMode?: boolean;
}

const Input = ({ style, darkMode = false, ...props }: InputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          darkMode ? styles.darkInput : styles.lightInput,
          style
        ]}
        placeholderTextColor={darkMode ? '#888888' : '#999999'}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  lightInput: {
    backgroundColor: '#FFFFFF',
    color: '#333333',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  darkInput: {
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#333333',
  }
});

export default Input;