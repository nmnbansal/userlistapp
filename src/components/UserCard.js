import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const UserCard = ({ user }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium">{`${user.first_name} ${user.last_name}`}</Text>
        <Text variant="bodyMedium">{user.email}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default UserCard;