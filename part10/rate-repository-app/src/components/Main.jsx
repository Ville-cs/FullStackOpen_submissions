import { View } from 'react-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';
import { Route, Routes, Navigate } from 'react-router-native';

const Main = () => {
  return (
    <View>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* <RepositoryList /> */}
    </View>
  );
};

export default Main;
