<template>
  <div class="person-card" @click="$emit('personClick', person)">
    <h4> {{ person?.name || "N/A" }} </h4>
    <b>Age:</b> {{ person?.age ?? "N/A" }} <br/> <!-- Using ?? operator here as 0 is a possible value and not considered a falsy value in this case-->
    <b>Eye Color:</b> {{ person?.eyeColor || "N/A" }} <br/>
    <b>Gender:</b> {{ person?.gender || "N/A" }} <br/>
  </div>
</template>

<script>
  export default {
    emits: ['personClick'],
    name: 'PersonCard',
    props: {
      person: {
        type: Object,
        default: () =>({}),
      },
    },
  };
</script>

<style scoped>
  .person-card {
    background: #e4e4e4;
    min-width: 100px;
    float: left;
    width: 300px;
    margin: 10px;
    padding: 15px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  .person-card:hover {
    background: #303030;
    color: #fff;
  }
</style>
