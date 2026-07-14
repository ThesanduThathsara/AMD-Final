import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADII } from '../constants/theme';

// Renders a single task row with:
//  - a checkbox circle to toggle "complete"
//  - title + description
//  - an edit button (navigates to the form screen in edit mode)
//  - a delete button (removes the task, with a confirm step handled by parent)
//
// Props: task, onToggle(id), onEdit(task), onDelete(task)
export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <View style={[styles.card, task.completed && styles.cardCompleted]}>
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        style={styles.checkboxWrap}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View style={[styles.checkbox, task.completed && styles.checkboxChecked]}>
          {task.completed && <Ionicons name="checkmark" size={16} color="#fff" />}
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textWrap} onPress={() => onEdit(task)} activeOpacity={0.7}>
        <Text style={[styles.title, task.completed && styles.titleCompleted]} numberOfLines={1}>
          {task.title}
        </Text>
        {!!task.description && (
          <Text style={[styles.description, task.completed && styles.titleCompleted]} numberOfLines={2}>
            {task.description}
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(task)} style={styles.iconBtn}>
          <Ionicons name="pencil" size={18} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task)} style={styles.iconBtn}>
          <Ionicons name="trash" size={18} color={COLORS.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADII.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardCompleted: {
    backgroundColor: COLORS.completedBg,
  },
  checkboxWrap: {
    marginRight: SPACING.sm,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  textWrap: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textMuted,
  },
  description: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
  },
  iconBtn: {
    padding: SPACING.xs,
    marginLeft: SPACING.xs,
  },
});
