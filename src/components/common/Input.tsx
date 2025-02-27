import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  error?: boolean;
}

const Input: React.FC<Props> = ({ style, error, ...props }) => {
  return (
    <TextInput
      style={[
        styles.input,
        error && styles.inputError,
        style
      ]}
      placeholderTextColor="#999"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  inputError: {
    borderColor: '#ff6b6b',
    borderWidth: 1,
  },
});

export default Input;