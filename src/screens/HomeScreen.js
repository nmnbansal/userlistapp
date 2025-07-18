import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersList, resetUsers } from '../redux/slices/userSlice';
import { logoutUser } from '../redux/slices/authSlice';
import UserCard from '../components/UserCard';
import LoadingSpinner from '../components/LoadingSpinner';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { users, page, totalPages, loading: usersLoading, error } = useSelector((state) => state.users);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [refreshing, setRefreshing] = React.useState(false);
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchUsersList(1));
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(resetUsers());
    dispatch(fetchUsersList(1)).finally(() => setRefreshing(false));
  }, [dispatch]);

  const loadMoreUsers = () => {
    if (page <= totalPages && !usersLoading) {
      dispatch(fetchUsersList(page));
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        dispatch(resetUsers());
        navigation.navigate('Login');
      });
  };

  if (authLoading) return <LoadingSpinner />;
  if (usersLoading && users.length === 0) return <LoadingSpinner />;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Text style={[styles.title, { color: theme.dark ? '#fff' : theme.colors.text }]}>Users</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserCard user={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreUsers}
        onEndReachedThreshold={0.5}
        ListFooterComponent={usersLoading && users.length > 0 ? <LoadingSpinner /> : null}
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