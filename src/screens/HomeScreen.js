import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersList, resetUsers } from '../redux/slices/userSlice';
import { logout } from '../redux/slices/authSlice';
import UserCard from '../components/UserCard';
import LoadingSpinner from '../components/LoadingSpinner';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { users, page, totalPages, loading, error } = useSelector((state) => state.users);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    dispatch(fetchUsersList(1));
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(resetUsers());
    dispatch(fetchUsersList(1)).finally(() => setRefreshing(false));
  }, [dispatch]);

  const loadMoreUsers = () => {
    if (page <= totalPages && !loading) {
      dispatch(fetchUsersList(page));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  if (loading && users.length === 0) return <LoadingSpinner />;

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>Users</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserCard user={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreUsers}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && users.length > 0 ? <LoadingSpinner /> : null}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button mode="contained" onPress={handleLogout} style={styles.button}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 16,
  },
  button: {
    marginVertical: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default HomeScreen;