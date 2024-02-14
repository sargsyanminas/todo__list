import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTask, editTask} from '../store/actions/task_items.js';
import moment from 'moment';

const TaskListScreen = ({navigation}: any) => {
  const tasks = useSelector((state: any) => state.tasksReducer.tasks);

  const [filterTitle, setFilterTitle] = useState(1);
  const [renderedState, setRenderedState] = useState([]);

  useEffect(() => {
    if (tasks) {
      if (filterTitle === 1) {
        setRenderedState(tasks);
      } else if (filterTitle === 2) {
        setRenderedState(tasks.filter((item: any) => item.done));
      } else {
        setRenderedState(tasks.filter((item: any) => !item.done));
      }
    }
  }, [tasks, filterTitle]);

  const dispatch = useDispatch();

  return (
    <View style={{paddingTop: 22, paddingHorizontal: 16}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 24,
        }}>
        <TouchableOpacity
          style={{
            borderRadius: 1,
            padding: 6,
            borderWidth: 1,
            borderColor: 'grey',
          }}
          onPress={() => setFilterTitle(1)}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 1,
            padding: 6,
            borderWidth: 1,
            borderColor: 'grey',
          }}
          onPress={() => setFilterTitle(2)}>
          <Text>Is Done</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 1,
            padding: 6,
            borderWidth: 1,
            borderColor: 'grey',
          }}
          onPress={() => setFilterTitle(3)}>
          <Text>Upcoming</Text>
        </TouchableOpacity>
      </View>

      {renderedState?.map((task: any) => (
        <View
          style={[styles.container, task?.done && {backgroundColor: 'aqua'}]}
          key={task.id}>
          {moment(`${task.date} ${task.time}`, 'DD.MM.YYYY HH:mm').format(
            'DD.MM.YYYY HH:mm',
          ) <= moment(new Date()).format('DD.MM.YYYY HH:mm') && (
            <Text style={{textAlign: 'right', color: 'red'}}>EXPIRED</Text>
          )}

          <Text>{task.title}</Text>
          <Text>{task.description}</Text>
          <Text>{task.date}</Text>
          <Text>{task.time}</Text>

          <Button
            title="Edit"
            onPress={() =>
              navigation.navigate('CreateEditScreen', {
                task: {...task},
              })
            }
          />

          <Button
            title={task.done ? 'Cancel' : 'Done'}
            onPress={() => {
              if (task.done) {
                dispatch(editTask(task.id, {...task, done: false}));
              } else {
                dispatch(editTask(task.id, {...task, done: true}));
              }
            }}
          />

          <Button
            color={'red'}
            title="Delete"
            onPress={() => {
              dispatch(deleteTask(task.id));
            }}
          />
        </View>
      ))}
      <Button
        title="Add Task"
        onPress={() => navigation.navigate('CreateEditScreen')}
      />
    </View>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 12,
    padding: 12,
    marginBottom: 6,
    backgroundColor: '#fff',
  },
});
