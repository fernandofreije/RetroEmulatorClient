import Vue from 'vue';
import Login from '@/components/Login';

describe('Login.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Login);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('img.full-logo').exists()).toBeTruly();
    expect(vm.$el.querySelector('a.to-register').exists()).toBeTruly();
    expect(vm.$el.querySelector('a.to-register').textContent)
      .toEqual('Sign up');
    expect(vm.$el.querySelector('form.login').exists()).toBeTruly();
    expect(vm.$el.querySelector('input.user-input').exists()).toBeTruly();
    expect(vm.$el.querySelector('input.user-input').textContent)
      .toEqual('');
    expect(vm.$el.querySelector('input.pass-input').exists()).toBeTruly();
    expect(vm.$el.querySelector('input.pass-input').textContent)
      .toEqual('');
    expect(vm.$el.querySelector('button#login-buton').exits()).toBeTruly();
  });
});
