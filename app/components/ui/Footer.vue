<template>
  <footer class="footer">
    <p class="footer__text">© {{ new Date().getFullYear() }} My Portfolio</p>
  </footer>
</template>

<style scoped>
.footer {
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  text-align: center;
}

.footer__text {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}
</style>

