
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginPage from './LoginPage'
import RegistrationPage from "./RegistrationPage"
import FotgotPass from "./ForgotPassword"
import Welcome from "./Welcome"
import NavigationDrawerStructure from './NavigationDrawerStructure'
import Logout from './Logout'
import CreateNote from './CreateNote'
import EditNote from './EditeNote'
import DialogReminder from './DialogReminder'
import Search from './SearchNotes'
import Deleted from './DeleteNotePage'
import KeyChainExample from './KeyChainExample'


const MainNavigator = createStackNavigator(
  {
    SignIn: { screen: LoginPage, navigationOptions: { header: null } },
    signOut: { screen: Logout, navigationOptions: { header: null } },
    SignUp: RegistrationPage,
    ForgotPass: FotgotPass,
    Drawer: { screen: NavigationDrawerStructure, navigationOptions: { header: null } },
    CreateNote: { screen: CreateNote, navigationOptions: { header: null } },
    EditNote: { screen: EditNote, navigationOptions: { header: null } },
    DialogReminder: DialogReminder,
    Search: { screen: Search, navigationOptions: { header: null } },
    // Deleted : {screen : Deleted,navigationOptions:{header : null}},
    KeyChainExample: { screen: KeyChainExample, navigationOptions: { header: null } },
  },
  {
    initialRouteName: 'Drawer',
  }
);

const AppContainer = createAppContainer(MainNavigator);
export default AppContainer;