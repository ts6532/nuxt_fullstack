<template>
  <header class="header">
    <nav class="header__nav">
      <NuxtLink to="/" class="header__brand">My Portfolio</NuxtLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header__brand {
  font-weight: 700;
  text-decoration: none;
  color: inherit;
}
</style>

