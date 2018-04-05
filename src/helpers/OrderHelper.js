import { FSArray } from '../modules/fs-foundation';

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
  }
};
