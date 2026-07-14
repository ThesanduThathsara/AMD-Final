import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADII } from '../constants/theme';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

// Renders a single task row with:
//  - a checkbox circle to toggle "complete"
//  - title + description
//  - an edit button (navigates to the form screen in edit mode)
//  - a delete button (removes the task, with a confirm step handled by parent)
//
// NOTE: uses plain Unicode glyphs (✓ / ✎ / ✕) instead of an icon font
// library, so there's no expo-font/@expo/vector-icons dependency to break.
export default function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  return (
    <View style={[styles.card, task.completed && styles.cardCompleted]}>
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        style={styles.checkboxWrap}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View style={[styles.checkbox, task.completed && styles.checkboxChecked]}>
          {task.completed && <Text style={styles.checkmark}>✓</Text>}
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
        <TouchableOpacity onPress={() => onEdit(task)} style={styles.iconBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.editGlyph}>✎</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task)} style={styles.iconBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.deleteGlyph}>✕</Text>
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
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
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
  editGlyph: {
    fontSize: 16,
    color: COLORS.primary,
  },
  deleteGlyph: {
    fontSize: 16,
    color: COLORS.danger,
    fontWeight: '700',
  },
});
