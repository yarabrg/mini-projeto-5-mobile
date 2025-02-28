import React, { useState } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import DatePickerComponent from '../components/DatePickerComponent';

export default function AddActivityScreen({ navigation }) {
  const [name, setName] = useState('');
  const [responsible, setResponsible] = useState('');
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (!name || !responsible || !date || !description) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }
    try {
      const storedActivities = await AsyncStorage.getItem('activities');
      const activities = storedActivities ? JSON.parse(storedActivities) : [];
      const newActivity = { id: uuidv4(), name, responsible, date: date.toISOString(), description };
      activities.push(newActivity);
      await AsyncStorage.setItem('activities', JSON.stringify(activities));
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao salvar atividade:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nova Atividade</Text>
      
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Nome da Atividade</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da atividade"
          value={name}
          onChangeText={setName}
        />
      </View>
      
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Responsável</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do responsável"
          value={responsible}
          onChangeText={setResponsible}
        />
      </View>
      
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Data de Entrega</Text>
        <DatePickerComponent date={date} setDate={setDate} />
      </View>
      
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Digite a descrição da atividade"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F6FA',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: '#404E82',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2980b9',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 10,
  },
  backButton: {
    backgroundColor: '#1c5980',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
