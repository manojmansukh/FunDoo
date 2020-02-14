
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import SplashScreen from './SplashScreen'
import ScreenLock from './ScreenLock'
import NavigationStack from './NavigationStack'

const AppNavigator = createSwitchNavigator({
    SplashScreen: SplashScreen,
    ScreenLock: ScreenLock,
    NavigationStack: NavigationStack,
});

AppContainer = createAppContainer(AppNavigator);
export default AppContainer;