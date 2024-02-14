import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {addTask, editTask} from '../store/actions/task_items.js';
import moment from 'moment';

const CreateEditScreen = ({route, navigation}: any) => {
  const dispatch = useDispatch();
  const {task} = route?.params || {};
  const taskId = route?.params?.task?.id || null;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(false);
  console.log(taskId, 'taskId');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDate(task.date);
      setTime(task.time);
    }
  }, [task]);

  const saveTask = () => {
    if (
      moment(date, 'DD.MM.YYYY').format('DD.MM.YYYY') === 'Invalid date' ||
      moment(time, 'HH:mm').format('HH:mm') === 'Invalid date' ||
      !title ||
      !description
    ) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2400);
      return;
    }

    const newTask = {
      id: taskId ? taskId : Math.random().toString(),
      title,
      description,
      date,
      time,
    };

    if (taskId) {
      dispatch(editTask(taskId, newTask));
    } else {
      dispatch(addTask(newTask));
    }

    navigation.goBack();
  };

  return (
    <View style={{paddingHorizontal: 16, paddingTop: 24}}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Time"
        value={time}
        onChangeText={setTime}
      />
      <Button title="Save Task" onPress={saveTask} />
      {error && (
        <Text style={{color: 'red', fontSize: 14, textAlign: 'center'}}>
          Проверьте поля на правильность
        </Text>
      )}
    </View>
  );
};

export default CreateEditScreen;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 54,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 4,
    paddingHorizontal: 12,
  },
});
