
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import SplashScreen from './SplashScreen'
import Lock from './Lock'
import NavigationStack from './NavigationStack'

const AppNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    Lock: Lock,
    NavigationStack: NavigationStack,
});

AppContainer = createAppContainer(AppNavigator);
export default AppContainer;