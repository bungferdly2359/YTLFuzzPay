import { colors } from '../constants';

export const OrderHelper = {
  getOrdersInfo: (orders, customers, dishes) => {
    return orders.map(o => {
      const customer = customers.find(c => c.uid === o.uid) || {};
      return {
        ...o,
        customer: {
          name: customer.userName,
          imageURL: customer.imageURL
        },
        menu: (o.menu || []).map(m => {
          const { name = 'Dish not found' } = dishes.find(d => d.did === m.did) || {};
          return {
            ...m,
            name: m.quantity > 1 ? `${name} (${m.quantity})` : name
          };
        })
      };
    });
  },
  getCartItemDescription: cartItem => {
    const { optionIndexes = [], additional = '', dish } = cartItem;
    const descArr = [];
    if (optionIndexes.length > 0) {
      descArr.push(`Extra : ${optionIndexes.map(i => dish.options[i].name).join(', ')}`);
    }
    if (additional.length > 0) {
      descArr.push(`Notes : ${additional}`);
    }
    return descArr.join('\n');
  },
  orderStatus: {
    pending: 0,
    preparing: 1,
    collecting: 2,
    completed: 3,
    cancelled: 4
  },
  orderStatusDisplay: ['Pending', 'Preparing', 'Collecting', 'Completed', 'Cancelled'],
  orderStatusColor: [colors.lightOrange, colors.lightOrange, colors.lightOrange, colors.green, colors.red],
  paymentMethod: ['Cash']
};
