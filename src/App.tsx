import  { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ShoppingCart from './Components/ShoppingCart';
import './app.css';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <ShoppingCart />
        </div>
      </Provider>
    );
  }
}

export default App;
