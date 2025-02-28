import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [activities, setActivities] = useState([]);

  const loadActivities = async () => {
    try {
      const storedActivities = await AsyncStorage.getItem('activities');
      const activitiesArray = storedActivities ? JSON.parse(storedActivities) : [];
      setActivities(activitiesArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadActivities();
    });
    return unsubscribe;
  }, [navigation]);

  const deleteActivity = async (id) => {
    Alert.alert(
      'Confirmar',
      'Deseja realmente excluir esta atividade?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedActivities = activities.filter((activity) => activity.id !== id);
              await AsyncStorage.setItem('activities', JSON.stringify(updatedActivities));
              setActivities(updatedActivities);
            } catch (error) {
              console.error(error);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemContainer} 
      onPress={() => navigation.navigate('ActivityInfo', { id: item.id })}
    >
      <View style={styles.itemRow}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <View style={styles.itemIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('EditActivity', { id: item.id })}>
            <MaterialIcons name="edit" size={24} color="#2980b9" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteActivity(item.id)}>
            <MaterialIcons name="delete" size={24} color="#e74c3c" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Atividades</Text>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma atividade cadastrada.</Text>}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddActivity')}>
        <Text style={styles.addButtonText}>+ Nova Atividade</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#F5F6FA' 
  },
  title: { 
    fontSize: 28, 
    marginBottom: 20, 
    textAlign: 'center', 
    color: '#404E82', 
    fontWeight: 'bold' 
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 20, 
    fontSize: 16 
  },
  itemContainer: { 
    backgroundColor: '#fff',
    padding: 15, 
    borderRadius: 6, 
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  itemTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#2980b9' 
  },
  itemIcons: { 
    flexDirection: 'row' 
  },
  icon: { 
    marginLeft: 15 
  },
  addButton: { 
    backgroundColor: '#2980b9', 
    padding: 15, 
    borderRadius: 6, 
    alignItems: 'center', 
    marginTop: 20 
  },
  addButtonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});
