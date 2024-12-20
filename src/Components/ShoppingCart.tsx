import  { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../redux/store';
import { addItem, updateItem, removeItem } from '../redux/cartSlice';
import ItemCard from './ItemCard';

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface ShoppingCartProps {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateItem: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
}

class ShoppingCart extends Component<ShoppingCartProps> {
  availableItems = [
    { id: 1, name: 'Item 1', price: 865 },
    { id: 2, name: 'Item 2', price: 2300 },
    { id: 3, name: 'Item 3', price: 3100 },
    { id: 4, name: 'Item 4', price: 112 },
    { id: 5, name: 'Item 5', price: 256 },
    { id: 6, name: 'Item 6', price: 734 },
  ];

  handleUpdateItem = (id: number, quantity: number) => {
    if (quantity >= 0) {
      this.props.updateItem(id, quantity);
    }
  };

  incrementQuantity = (id: number, currentQuantity: number) => {
    this.handleUpdateItem(id, currentQuantity + 1);
  };

  decrementQuantity = (id: number, currentQuantity: number) => {
    if (currentQuantity > 0) {
      this.handleUpdateItem(id, currentQuantity - 1);
    }
  };

  handleRemoveItem = (id: number) => {
    this.props.removeItem(id);
  };

  calculateTotal = () => {
    return this.props.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  render() {
    return (
      <div>
        <h1>Shopping Cart</h1>
        <div className="item-list">
          {this.availableItems.map(item => (
            <ItemCard key={item.id} item={item} addItem={this.props.addItem} />
          ))}
        </div>
        <ul>
          {this.props.items.map(item => (
            <li key={item.id}>
              {item.name} - 
              <div className="quantity-controls">
                <button onClick={() => this.decrementQuantity(item.id, item.quantity)}>-</button>
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={e => this.handleUpdateItem(item.id, parseInt(e.target.value))}
                />
                <button onClick={() => this.incrementQuantity(item.id, item.quantity)}>+</button>
              </div> 
              - Price: ${item.price}
              <button onClick={() => this.handleRemoveItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <h3>Total: ${this.calculateTotal()}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  items: state.cart.items,
});

const mapDispatchToProps = {
  addItem,
  updateItem,
  removeItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
