<template>

  <ul v-if="paginatedData.length">
    <li v-for="item in paginatedData" :key="item._id">
      {{ item.name }}
    </li>
  </ul>
  <!-- Giving feedback to user if list is empty -->
  <p v-else>No results found</p>
  <div class="pagination">
    <ul>
      <li :class="{disabled: currentPage === 0}" @click="changePage(currentPage-1)">&lt;</li>
      <li v-for="p in pages" :key="p" :class="{active: p === currentPage}" @click="changePage(p)">{{ p + 1 }}</li>
      <li :class="{disabled: currentPage === pages.length - 1}" @click="changePage(currentPage+1)">&gt;</li>
    </ul>
  </div>

</template>

<script>

  export default {
    name: 'List',
    emits: ["pageChanged"],
    props: {
      data: { 
        type: Array, 
        default: () => [],
      },
      options: {
        type: Object,
        default: () => ({ 
          limit: 25, 
          offset: 0,
        }),
      },
    },
    computed: {
      // sort data by name
      sortedData() {
        //Using .slice() to create a copy off "data" prop, and sort that
        //Using localeCompare to compare strings as it will return -1, 0 or 1
        return this.data.slice().sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
      },
      // paginate data
      paginatedData() {
        return this.sortedData.slice(this.options.pagination.offset, this.options.pagination.offset + this.options.pagination.limit);
      },
      // list of pages to display
      pages() {
        return new Array(Math.ceil(this.data.length / this.options.pagination.limit))
          .fill()
          .map((_, i)=>i);
      },
      // currently displayed page
      currentPage() {
        return (this.options.pagination.offset / this.options.pagination.limit);
      },
    },
    methods: {
      changePage(page) {
        this.$emit("pageChanged", page);
      },
    },
  };

</script>

<style scoped lang="scss">

  .pagination ul {
    list-style: none;
    user-select: none;

    li {
      display: inline-block;
      padding: 0 4px;
      cursor: pointer;
      color: #888;

      &:hover {
        color: #000;
        font-weight: bold;
      }
      &.active{
        color: #000;
        font-weight: bold;
        pointer-events:none;
      }
      &.disabled {
        color: #ddd;
        pointer-events:none;
      }
    }
  }

</style>
