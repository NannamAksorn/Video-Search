export default {
  namespace: 'selectVideo',
  state: [],

  reducers: {
    set(state, { payload: selectedVideo }) {
      return selectedVideo;
    },
  },
};
