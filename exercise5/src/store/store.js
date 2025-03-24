import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    people: [],
  },
  mutations: {
    savePeople(state, people) {
      state.people = people;
    },
  },
  actions: {
    getPeople(context) {
      fetch('https://suade.org/filehosting/challenges/people.json')
        .then((response)=>{
          return response.json();
        })
        .then((people)=>{
          context.commit('savePeople', people);
        });
    },
  },
});
