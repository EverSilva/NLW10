import { NativeBaseProvider, StatusBar } from "native-base";
import { THEME } from './src/style/theme';
import { 
  useFonts, 
  Roboto_400Regular, 
  Roboto_500Medium, 
  Roboto_700Bold 
} from '@expo-google-fonts/roboto'

import { Pools } from './src/screens/Pools';
import { Loading } from './src/components/Loading';

import { AuthProvider } from './src/contexts/AuthContext'


export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular, Roboto_500Medium, Roboto_700Bold
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {
          fontsLoaded ? <Pools/> : <Loading/>
        }
      </AuthProvider>
    </NativeBaseProvider>
  );
}
