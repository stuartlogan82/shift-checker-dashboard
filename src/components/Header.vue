<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-brand href="#">Roster Magic</b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-button variant="danger" @click="$emit('reset-roster')">Reset Roster</b-button>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: "Header",
};
</script>