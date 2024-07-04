import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

const Detail = ({ route }) => {
  const { item } = route.params;

  const renderInfoRow = (label, value, isBold = false) => (
    <View style={styles.infoRow}>
      <Text>{label}</Text>
      <Text style={isBold ? styles.boldText : null}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.idText}>ID: {item.id}</Text>
        <Text style={styles.boldText}>Información extra</Text>
      </View>

      <View>
        {renderInfoRow('Nombre', item.name, true)}
        {renderInfoRow('Descripción', item.description, true)}
        <Text>Logo</Text>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.logo }} style={styles.logo} />
        </View>
        {renderInfoRow('Fecha liberación', item.date_release, true)}
        {renderInfoRow('Fecha revisión', item.date_revision, true)}
      </View>

      <View>
        <Pressable style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar</Text>
        </Pressable>
        <Pressable style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  logo: {
    width: 200,
    height: 100,
  },
  idText: {
    fontSize: 24,
    color: 'black',
  },
  boldText: {
    fontWeight: 'bold',
    color: 'black',
  },
  editButton: {
    backgroundColor: '#cdd4e6',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  editButtonText: {
    color: '#4a587b',
  },
  deleteButton: {
    backgroundColor: '#c30f0f',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#ededf1',
  },
});

export default Detail;