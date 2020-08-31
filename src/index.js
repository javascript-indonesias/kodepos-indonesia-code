import './components/appbar-component';
import './components/list-item-component';
import MainView from './views/main-view';
import '../node_modules/animate.css/animate.css';
import './styles/main.css';

import 'bulma/css/bulma.min.css';

const mainView = new MainView();
mainView.initSearchComponent();
