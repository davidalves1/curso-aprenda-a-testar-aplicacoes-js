import { shallowMount } from '@vue/test-utils';
import ProductCard from './ProductCard.vue';
import { makeServer } from '../miragejs/server';

describe('ProductCard - unit', () => {
  let server;
  beforeAll(() => {
    server = makeServer({ environment: 'test' });
  });

  afterAll(() => {
    server.shutdown();
  });

  it('should mount the component', () => {
    const wrapper = shallowMount(ProductCard, {
      propsData: {
        product: server.create('product'),
      },
    });

    expect(wrapper.vm).toBeDefined();
  });
});
