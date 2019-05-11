export default {
  namespace: 'searches',
  state: [
    { key: 0, name: '7 Ways to Improve Your NEGOTIATION SKILLS - #7Ways.mp4', pos: [(0, '')] },
    { key: 1, name: 'Ch. 0 If The World Were A Village.mp4', pos: [(0, '')] },
    { key: 2, name: 'Conducting Effective Negotiations.mp4', pos: [(0, '')] },
    { key: 3, name: 'Design Thinking - Tim Brown, CEO and President of IDEO.mp4', pos: [(0, '')] },
    { key: 4, name: 'Designing Your Life Bill Burnett TEDxStanford.mp4', pos: [(0, '')] },
    { key: 5, name: 'Getting Started with microbit Part 1 Say Hello.mp4', pos: [(0, '')] },
    {
      key: 6,
      name: 'Getting Started with microbit Part 4 Remote Burglar Alarm.mp4',
      pos: [(0, '')],
    },
  ],

  reducers: {
    set(state, { payload: updatedSearches }) {
      return updatedSearches;
    },
  },
};
