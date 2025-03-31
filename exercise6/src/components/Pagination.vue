<template>

  <div class="pagination">
    <ul>
      <li :class="{disabled: currentPage === 0}" data-cy="go-to-previous-page" @click="changePage(currentPage-1)" >&lt;</li>
      <li v-for="p in pages" :key="p" :class="{active: p === currentPage}" :data-cy="'go-to-page-'+(p+1)" @click="changePage(p)" >{{ p + 1 }}</li>
      <li :class="{disabled: currentPage === pages.length - 1}" data-cy="go-to-next-page" @click="changePage(currentPage+1)" >&gt;</li>
    </ul>
  </div>

</template>

<script>

  export default {
    name: 'Pagination',
    emits: ['update:offset'],
    props: {
      limit: {type: Number, default: 10},
      offset: {type: Number, default: 0},
      total: {type: Number, default: 0},
    },
    computed: {
      pages() {
        return new Array(Math.ceil(this.total / this.limit))
          .fill()
          .map((_, i)=>i);
      },
      currentPage() {
        return (this.offset / this.limit);
      },
    },
    methods: {
      changePage(page) {
        this.$emit('update:offset', (page) * this.limit);
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
