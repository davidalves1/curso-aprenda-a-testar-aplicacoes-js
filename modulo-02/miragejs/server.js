import { Server } from 'miragejs';

export const makeServer = ({ environment = 'development' } = {}) => {
  return new Server({
    environment,
    routes() {
      this.namespace = 'api';
      // this.get('products', () => ({
      //   products: [
      //     {
      //       id: 123,
      //       title: 'Título',
      //       price: 20,
      //     },
      //   ],
      // }));
      this.get('/movies', () => {
        return ['Interstellar', 'Inception', 'Dunkirk'];
      });
    },
  });
};
