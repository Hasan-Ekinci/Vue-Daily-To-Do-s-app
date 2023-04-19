<template>
  <div class="main">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseComponent",
};
</script>

<style>
.main {
  width: 85%;
  margin: 0 auto;
  cursor: default;
}

.pageHeader {
  font-size: 4rem;
  margin: 0 auto;
  text-align: center;
}

.bg--gray {
  background-color: var(--gray);
}

.bg--light-green {
  background-color: var(--light-green);
}

.bg--orange {
  background-color: var(--orange);
}

.bg--red {
  background-color: var(--red);
}

.bg--blue {
  background-color: var(--blue);
}

.border {
  border: 0.2rem solid var(--black);
  border-radius: 0.8rem;
}

.border--blue {
  border-color: var(--blue);
}

.border--green {
  border-color: var(--green);
}

.border--red {
  border-color: var(--red);
}

.mb-2 {
  margin-bottom: 2rem;
}

.mt-2 {
  margin-top: 2rem;
}

.p-05 {
  padding: 0.5rem;
}

.button {
  padding: 0.5rem;
}

.button:hover {
  background-color: var(--gray);
  cursor: pointer;
  color: black;
}

.button:active {
  background-color: var(--dark-gray);
  color: white;
}

.greenButton {
  background-color: var(--light-green);
}

.redButton {
  background-color: var(--red);
}

a {
  color: black;
  text-decoration: none;
}
</style>
