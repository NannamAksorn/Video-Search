export default {
  namespace: 'language',
  state: localStorage.getItem('lang'),
  reducers: {
    set(state, { payload: lang }) {
      localStorage.setItem('lang', lang);
      return lang;
    },
  },
};
