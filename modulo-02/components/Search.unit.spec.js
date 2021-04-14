import { shallowMount } from '@vue/test-utils';
import Search from './Search.vue';

const mountComponent = () => {
  return shallowMount(Search);
};

describe('Search', () => {
  it('should mount component', () => {
    const wrapper = mountComponent();

    expect(wrapper.vm).toBeDefined();
  });

  it('should emit an event on search', async () => {
    const wrapper = mountComponent();
    const input = wrapper.find('input[type="search"]');
    const form = wrapper.find('form');
    const term = 'termo para busca';

    await input.setValue(term);
    await form.trigger('submit');

    expect(wrapper.emitted()['do-search']).toBeTruthy();
    expect(wrapper.emitted()['do-search'].length).toBe(1);
    expect(wrapper.emitted()['do-search'][0]).toEqual([{ term }]);
  });
});
