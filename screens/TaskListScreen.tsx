import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TaskItem from '../components/TaskItem';
import { useTaskContext } from '../context/TaskContext';
import { COLORS, SPACING, RADII } from '../constants/theme';
import { RootStackParamList, Task } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

export default function TaskListScreen({ navigation }: Props) {
  const { tasks, toggleComplete, deleteTask } = useTaskContext();

  const activeCount = tasks.filter((t) => !t.completed).length;

  const confirmDelete = (task: Task) => {
    Alert.alert(
      'Delete task',
      `Are you sure you want to delete "${task.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteTask(task.id) },
      ]
    );
  };

  const goToEdit = (task: Task) => {
    // Navigate to the same form screen, passing the task so it pre-fills as "Edit" mode
    navigation.navigate('TaskForm', { task });
  };

  const goToAdd = () => {
    // No task param -> screen renders in "Add" mode
    navigation.navigate('TaskForm');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tasks</Text>
        <Text style={styles.headerSubtitle}>
          {activeCount} task{activeCount !== 1 ? 's' : ''} remaining
        </Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={toggleComplete}
            onEdit={goToEdit}
            onDelete={confirmDelete}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyGlyph}>✓</Text>
            <Text style={styles.emptyText}>No tasks yet. Tap + to add one.</Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={goToAdd} activeOpacity={0.85}>
        <Text style={styles.fabPlus}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  list: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 100,
    paddingTop: SPACING.sm,
  },
  emptyWrap: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyGlyph: {
    fontSize: 40,
    color: COLORS.textMuted,
  },
  emptyText: {
    marginTop: SPACING.sm,
    color: COLORS.textMuted,
    fontSize: 15,
  },
  fab: {
    position: 'absolute',
    right: SPACING.lg,
    bottom: SPACING.lg,
    width: 58,
    height: 58,
    borderRadius: RADII.pill,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  fabPlus: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '400',
    lineHeight: 32,
  },
});
