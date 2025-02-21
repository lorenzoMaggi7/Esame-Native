import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, SafeAreaView, Dimensions, Image, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window'); // Ottieni la larghezza dello schermo

// Importa direttamente il file JSON
const data = require('./data.json');  // Importa il file data.json

const App = () => {
  const [table, setTable] = useState("persona");
  const [dataList, setDataList] = useState([]);
  const [error, setError] = useState(null);

  // Funzione per caricare i dati dal file JSON
  const fetchData = () => {
    console.log("Tabella selezionata:", table);  // Log per il debug

    // Verifica se la tabella esiste nel file JSON
    if (data[table]) {
      setDataList(data[table]);
      setError(null);
    } else {
      setError("Tabella non trovata.");
      setDataList([]);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        
        {/* Logo in alto */}
        <Image
          source={require('./assets/accademia1.jpg')} // Inserisci il percorso del logo
          style={styles.logo}
        />
        
        <Text style={styles.header}>Benvenuto nell'Accademia</Text>

        {/* Sezione per selezionare la tabella e barra di ricerca */}
        <View style={styles.inputContainer}>
          <Text style={styles.sectionHeader}>Scegli una tabella:</Text>
          <TextInput
            style={[styles.input, { width: width * 0.8 }]} 
            value={table}
            onChangeText={setTable}
            placeholder="Inserisci il nome della tabella"
            placeholderTextColor="#b49b6a" // Colore del placeholder caldo
          />
          <Button
            title="Carica Dati"
            onPress={fetchData}
            color="#d1a15e" // Giallo dorato per il bottone
          />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Lista dei dati della tabella */}
        <FlatList
          data={dataList}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()} // Gestione dell'ID
          renderItem={({ item }) => (
            <View style={styles.row}>
              {/* Colonne per visualizzare i dati */}
              {Object.keys(item).map((key) => (
                <View style={styles.rowColumn} key={key}>
                  <Text style={styles.rowText} numberOfLines={1} ellipsizeMode="tail">{key}: {item[key]}</Text>
                </View>
              ))}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f1e3', // Colore di sfondo caldo beige
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20, // Aggiunto per evitare che l'ultimo elemento venga nascosto
  },
  logo: {
    width: width * 0.6,  // Impostato 60% della larghezza dello schermo
    height: 100,  // Impostato un'altezza di 100px
    resizeMode: 'contain', // Mantieni le proporzioni originali del logo
    marginBottom: 20,  // Spazio tra il logo e il titolo
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6c4f3d', // Colore marrone caldo per il titolo
    textAlign: 'center',
    marginVertical: 20,
    textShadowColor: '#d1a15e', // Leggera ombra dorata per aggiungere profondità
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  sectionHeader: {
    fontSize: 20,
    color: '#6c4f3d',
    marginBottom: 10,
    fontWeight: '600',
  },
  inputContainer: {
    alignItems: 'center',  // Centra orizzontalmente
    justifyContent: 'center', // Centra verticalmente
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#d1a15e', // Bordo giallo dorato
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center', // Centro il testo dell'input
    backgroundColor: '#fff7e6', // Colore di sfondo chiaro dell'input
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Rende la riga responsiva
    justifyContent: 'center', // Allinea al centro
    marginVertical: 10,
  },
  rowColumn: {
    width: width * 0.3, // Ogni colonna avrà una larghezza del 30% dello schermo
    marginHorizontal: 5, // Distanza tra le colonne
    marginVertical: 5,
    backgroundColor: '#fff4e6', // Colore di sfondo delle celle di dati
    borderRadius: 8,
    padding: 8,
    shadowColor: '#d1a15e', // Ombra dorata per le celle
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignItems: 'center', // Centra il contenuto della colonna
  },
  rowText: {
    fontSize: 14,
    color: '#6c4f3d', // Colore del testo marrone
    textAlign: 'center',
    padding: 5,
    flexShrink: 1, // Fa sì che il testo si accorci se troppo lungo
  },
});

export default App;
