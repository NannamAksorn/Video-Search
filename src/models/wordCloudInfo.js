export default {
  namespace: 'wordCloudInfo',
  state: ['No data', ['no data'], [], []],

  reducers: {
    set(state, { payload: wordCloudInfo }) {
      return wordCloudInfo;
    },
  },
};
