import { Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useState } from 'react';

export default function App() {
  
  const [textItem, setTextItem] = useState('');
  const [itemList, setItemList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  
  const onHandlerChangeItem = (text) => setTextItem(text); 
  const onHandlerAddItem = () => {
    setItemList(currentItems => [...currentItems, { id: Math.random()*10, value: textItem}])
    //opciones para crear id unicos: id: itemList.length + 1 -> Los crea de manera secuencial
    //opcion 2 Date.now() -> Utiliza la fecha con hora y decimas de segundo lo que hace que sean unicos
    setTextItem('')
  }
  
  const onHandlerDeleteItem = id => {
    setItemList(currentItems => currentItems.filter(item => item.id !== id))
    setItemSelected({})
    setModalVisible(!modalVisible)
  }
  const onHandlerModal = id => {
    setItemSelected(itemList.find(item => item.id === id))
    setModalVisible(!modalVisible)
  }
  
  return (
    <View style={styles.screen}>
      <View style={styles.titleBackground}>
      <Text style={styles.listTitle}>Lista del Super</Text>
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modal}>
          <View style={styles.modalView}>
            <View style={styles.modalTitle}>
              <Text>
                Modal
              </Text>
            </View>
            <View style={styles.modalMessage}>
              <Text>Estas seguro que deseas borrar?</Text>
            </View>
            <View style={styles.modalMessage}>
              <Text style={styles.modalItem}>{itemSelected.value}</Text>
            </View>
            <View style={styles.modalButton}>
              <Button onPress={() => onHandlerDeleteItem(itemSelected.id)} title='Confirmar'/>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <TextInput
          placeholder='Escribe aqui'
          style={styles.input}
          value={textItem}
          onChangeText={onHandlerChangeItem}
        />
        <Button title='Add' style={styles.button} onPress={onHandlerAddItem} disabled={textItem.length === 0 ?
        true : false}/>
      </View>
      <FlatList
        data={itemList}
        renderItem={data => (
          <TouchableOpacity onPress={() => onHandlerModal(data.item.id)} style={styles.item}>
              <Text>{data.item.value}</Text>
          </TouchableOpacity>
        )}
        //showsVerticalScrollIndicator={false}
        indicatorStyle="black"
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listTitle:{
    color: 'blue',
    fontSize: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    fontStyle: 'italic',
    
  },
  titleBackground:{
    backgroundColor: 'pink',
    width: '100%',
    height: '35%',
    borderRadius: 10,
    padding: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column'
  },
  screen: {
    marginTop: '10%',
    padding: 30,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'    
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'black',
    borderWidth: 1
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginTop: '10%',
    height: 50
    
  },
  modalTitle: {
    backgroundColor: '#ccc',
    color: 'white',
    fontSize: 18,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    backgroundColor: 'white',
    width: '80%',
    height: '50%',
    borderRadius: 10,
    padding: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column'
  },
  modalMessage: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtom: {
    marginTop: 15
  },
  modalItem: {
    fontSize: 30
  }
});
