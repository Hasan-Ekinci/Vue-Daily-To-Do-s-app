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
}

.pageHeader {
    font-size: 4rem;
    margin: 0 auto;
    text-align: center;
}

.bg--light-green{
    background-color: var(--light-green);
}

.bg--orange{
    background-color: var(--orange
    );
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
</style>
