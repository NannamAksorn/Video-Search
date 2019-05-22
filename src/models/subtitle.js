export default {
  namespace: 'subtitle',
  state: null,
  reducers: {
    set(state, { payload: sid }) {
      return sid;
    },
  },
};
