import { Component } from 'react';

interface ItemCardProps {
  item: {
    id: number;
    name: string;
    price: number;
  };
  addItem: (item: { id: number; name: string; price: number; quantity: number }) => void;
}

class ItemCard extends Component<ItemCardProps> {
  handleAddItem = () => {
    const { id, name, price } = this.props.item;
    this.props.addItem({ id, name, price, quantity: 1 });
  };

  render() {
    const { name, price } = this.props.item;

    return (
      <div className="card">
        <div className="card-content">
          <h2>{name}</h2>
          <p>Price: ${price}</p>
          <button onClick={this.handleAddItem}>Add to Cart</button>
        </div>
      </div>
    );
  }
}

export default ItemCard;
