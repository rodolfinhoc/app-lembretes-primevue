<template>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
}
body {
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #adb5bd5d;
}
::-webkit-scrollbar-thumb {
  background-color: #41b883;
  border-radius: 20px;
  border: 3px black;
}

</style>
