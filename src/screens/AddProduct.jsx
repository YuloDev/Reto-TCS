import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputField from '../components/InputField';
import DateField from '../components/DateField';
import FormError from '../components/FormError';
import ActionButton from '../components/ActionButton';
import { createProduct, getProducts } from '../services/ProductService';

const AddProduct = ({ navigation }) => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: new Date(),
    date_revision: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  });
  const [errors, setErrors] = useState({});
  const [existingIds, setExistingIds] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    fetchExistingIds();
  }, []);

  const fetchExistingIds = async () => {
    try {
      const products = await getProducts();
      setExistingIds(products.map(p => p.id));
    } catch (error) {
      console.error('Error fetching existing IDs:', error);
    }
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'id':
        if (value.length < 3 || value.length > 10) {
          error = 'El ID debe tener entre 3 y 10 caracteres';
        } else if (existingIds.includes(value)) {
          error = 'Este ID ya existe';
        }
        break;
      case 'name':
        if (value.length < 5 || value.length > 100) {
          error = 'El nombre debe tener entre 5 y 100 caracteres';
        }
        break;
      case 'description':
        if (value.length < 10 || value.length > 200) {
          error = 'La descripción debe tener entre 10 y 200 caracteres';
        }
        break;
      case 'logo':
        if (!value) {
          error = 'El logo es requerido';
        }
        break;
      case 'date_release':
        if (new Date(value) < new Date()) {
          error = 'La fecha de lanzamiento debe ser igual o mayor a la fecha actual';
        }
        break;
    }
    return error;
  };

  const handleChange = (name, value) => {
    setProduct(prevState => ({ ...prevState, [name]: value }));
    const error = validateField(name, value);
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleDateChange = (selectedDate) => {
    setProduct(prevState => {
      const newState = { ...prevState, date_release: selectedDate };
      const revisionDate = new Date(selectedDate);
      revisionDate.setFullYear(revisionDate.getFullYear() + 1);
      newState.date_revision = revisionDate;
      return newState;
    });
    setErrors(prevErrors => ({ ...prevErrors, date_release: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(product).forEach(key => {
      const error = validateField(key, product[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const formattedProduct = {
          ...product,
          date_release: product.date_release.toISOString().split('T')[0],
          date_revision: product.date_revision.toISOString().split('T')[0],
        };
        const response = await createProduct(formattedProduct);
        if (response) {
          Alert.alert('Éxito', 'Producto creado correctamente');
          navigation.navigate('home');
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'No se pudo crear el producto');
        navigation.goBack();
      }
    }
  };

  const handleReset = () => {
    setProduct({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: new Date(),
      date_revision: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    });
    setErrors({});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Registro</Text>
      <ScrollView>
        <InputField
          label="ID"
          value={product.id}
          onChangeText={text => handleChange('id', text)}
          placeholder="Ingrese ID"
          error={errors.id}
        />
        <InputField
          label="Nombre"
          value={product.name}
          onChangeText={text => handleChange('name', text)}
          placeholder="Ingrese nombre"
          error={errors.name}
        />
        <InputField
          label="Descripción"
          value={product.description}
          onChangeText={text => handleChange('description', text)}
          placeholder="Ingrese descripción"
          multiline
          error={errors.description}
        />
        <InputField
          label="Logo"
          value={product.logo}
          onChangeText={text => handleChange('logo', text)}
          placeholder="Ingrese URL del logo"
          error={errors.logo}
        />
        <DateField
          label="Fecha de Lanzamiento"
          value={product.date_release}
          showPicker={showDatePicker}
          setShowPicker={setShowDatePicker}
          onDateChange={handleDateChange}
        />
        <InputField
          label="Fecha de Revisión"
          value={product.date_revision.toDateString()}
          onChangeText={() => { }} 
        />
        {Object.keys(errors).map(key => (
          errors[key] && <FormError key={key} message={errors[key]} />
        ))}
      </ScrollView>

      <ActionButton onPress={handleSubmit} title="Agregar" backgroundColor="#f9db4d" />
      <ActionButton onPress={handleReset} title="Reiniciar" backgroundColor="#cdd4e6" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default AddProduct;
