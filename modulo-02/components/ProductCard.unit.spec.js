import { shallowMount } from '@vue/test-utils';
import { makeServer } from '@/miragejs/server';
import ProductCard from './ProductCard.vue';

const mountProductCart = () => {
  const product = server.create('product', {
    title: 'relogio teste',
    price: '42.00',
    image: 'https://myimage.png',
  });

  const wrapper = shallowMount(ProductCard, {
    propsData: {
      product,
    },
  });

  return { wrapper, product };
};

describe('ProductCard', () => {
  let server;
  beforeAll(() => {
    server = makeServer({ environment: 'test' });
  });

  afterAll(() => {
    server.shutdown();
  });

  it('should match the snapshot', () => {
    const { wrapper } = mountProductCart();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should mount the component', () => {
    const { wrapper } = mountProductCart();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.text()).toContain('relogio teste');
    expect(wrapper.text()).toContain('$42.00');
  });

  it('should emmit an event on add item to cart', async () => {
    const { wrapper, product } = mountProductCart();

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted()['add-to-cart']).toBeTruthy();
    expect(wrapper.emitted()['add-to-cart'].length).toBe(1);
    expect(wrapper.emitted()['add-to-cart'][0]).toEqual([{ product }]);
  });
});
