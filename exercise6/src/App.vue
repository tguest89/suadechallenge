<template>

  <h2>Exercise 6</h2>
  <h4>Statement</h4>
  <div class="statement">
    <p>
      You'll find a VueJS app running, as well as some Cypress e2e tests.
      However some of them are failing (<span class="code">cypress/integration/4_features_interactions.js</span>).
    </p>
    <p>
      Running `npm run exercise6` will start a server with hot module reloading on port 8080,
      as well as Cypress ready for testing.
    </p>
    <p>
      Please ensure all tests are passing and not empty, to do so, do what you think is relevant: either update the
      tests, or update the code, depending on what you think is wrong.
    </p>
  </div>
  <h4>Solution</h4>
  <div class="solution">
    <div class="data-container">
      <input v-model="searchString" type="text" placeholder="Search" data-cy="search-input"/>
      <TableComponent v-model:sorting="sorting" :rows="paginatedData" :cols="data.columns" />
      <Pagination v-model:offset="pagination.offset" :limit="pagination.limit" :total="filteredData.length"/>
    </div>
  </div>

</template>

<script>

  import people from './assets/people.json';
  import Pagination from './components/Pagination';
  import TableComponent from './components/TableComponent';

  export default {
    name: 'App',
    components: {TableComponent, Pagination},
    data() {
      return {
        searchString: '',
        data: {
          people: people,
          columns: [
            {key: 'name', label: 'Name'},
            {key: 'age', label: 'Age'},
            {key: 'eyeColor', label: 'Eye Color'},
            {key: 'gender', label: 'Gender'}],
        },
        sorting: {
          key: 'none',
          direction: 'none',
        },
        pagination: {
          offset: 0,
          limit: 10,
        },
      };
    },
    computed: {
      filteredData() {
        return this.data.people
          .filter((person)=>{
            if (!this.searchString) {
              return true;
            } else {
              return Object.values(person)
                .slice(1, -2) // get rid of ID and nested objects
                .join(' ')
                .toLowerCase()
                .includes(this.searchString.toLowerCase());
            }
          });
      },
      sortedData() {
        if (this.sorting.key === 'none' || this.sorting.direction === 'none') {
          return this.filteredData;
        } else {
          return this.filteredData
            .slice()
            .sort((a, b)=>{
              if (a[this.sorting.key] < b[this.sorting.key]) {
                return this.sorting.direction === 'desc' ? 1 : -1;
              } else if (a[this.sorting.key] > b[this.sorting.key]) {
                return this.sorting.direction === 'desc' ? -1 : 1;
              }
              return 0;
            });
        }
      },
      paginatedData() {
        return this.sortedData
          .slice(this.pagination.offset, this.pagination.offset + this.pagination.limit);
      },
    },
    watch: {
      searchString() {
        this.pagination.offset = 0;
      },
      sorting: {
        handler() {
          this.pagination.offset = 0;
        },
      },
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

  .data-container {
    text-align: center;
  }

</style>
