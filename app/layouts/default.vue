<template>
  <div class="layout">
    <Header />
    <main class="layout__content">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout__content {
  flex: 1;
  padding: 24px;
}
</style>
