<template>

  <h2>Exercise 4</h2>
  <h4>Statement</h4>
  <div class="statement">
    <p>
      Please update <span class="code">App.vue</span> in order to display a list
      of people aged from 25 to 35 years old, from the youngest to the oldest.
    </p>
    <p>
      Use Vuex store <span class="code">store/store.js</span> to retrieve the list
      of people, use the component <span class="code">components/List.vue</span>
      to display people's age and name, make use of the props and slot, use the
      functions in <span class="code">helpers/helpers.js</span> to filter and sort
      the data.
    </p>
  </div>
  <h4>Solution</h4>
  <div class="solution">
    <List :data="people" :sorting="sortByAge" :filtering="filterByAge(25, 35)">
      <template v-slot:default="{ item }">
        {{ item.name }} - {{ item.age }} years old
      </template>
    </List>
  </div>

</template>

<script>
  import List from './components/List.vue';
  import helpers from './helpers/helpers.js';

  export default {
    name: 'App',
    components: { 
      List,
    },
    computed: {
      people() {
        return this.$store.state.people

      },
    },
    methods: {
      fetchPeople() {
        this.$store.dispatch('getPeople')
          .then(() => {
            this.people = this.$store.state.people;
          });
      },
      filterByAge: helpers.filterByAge,
      sortByAge: helpers.sortByAge,
    },
    created() {
      this.$store.dispatch('getPeople');
    },
  };
</script>

<style lang="scss">

  .statement, .solution {
    border: 1px solid #dedede;
    padding: 0 0.5em;
    min-height: 40px;

    .code {
      color: #434343;
      background-color: #f9f9f9;
      padding: 0 5px;
    }
  }


</style>
