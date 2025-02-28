import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ActivityInfoScreen({ route, navigation }) {
  const { id } = route.params;
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const storedActivities = await AsyncStorage.getItem('activities');
        const activities = storedActivities ? JSON.parse(storedActivities) : [];
        const act = activities.find(act => act.id === id);
        if (act) {
          setActivity(act);
        } else {
          Alert.alert('Erro', 'Atividade não encontrada!');
          navigation.goBack();
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadActivity();
  }, [id, navigation]);

  if (!activity) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  // Formata a data para o padrão brasileiro (dd/mm/aaaa)
  const formattedDate = new Date(activity.date).toLocaleDateString('pt-BR');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Atividade</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{activity.name}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Responsável:</Text>
        <Text style={styles.value}>{activity.responsible}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Data de Entrega:</Text>
        <Text style={styles.value}>{formattedDate}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.value}>{activity.description}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#F5F6FA',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
  },
  title: { 
    fontSize: 26, 
    marginBottom: 20, 
    color: '#404E82', 
    textAlign: 'center', 
    fontWeight: 'bold' 
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#2980b9',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#2980b9',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
