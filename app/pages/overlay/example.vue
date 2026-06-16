<template>
  <div class="overlay-container">
    <div class="alert-box">
      <h1>Lorem Ipsum</h1>
      <p>{{ OverlayKey }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const OverlayKey = route.query.key;
</script>

<style scoped>
.alert-box {
  background-color: rgba(15, 25, 28, 0.92);
  color: #E8EDF0;
  padding: 20px 40px;
  border-radius: 16px;
  border: 2px solid #13A8C7;
  text-align: center;
  font-family: 'Inter', sans-serif;
  animation: popIn 0.5s ease-out;
}

@keyframes popIn {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
