<script setup>
import Typography from '../components/base/typography/Typography.vue'
</script>

<template>
  <div class="container mx-auto max-w-(--breakpoint-xl) mx-auto px-4 py-12 lg:px-6 lg:py-12 ml-50 mt-10">
    <Typography
      as="h1"
      variant="by-heading-1"
      class="max-w-(--breakpoint-xl) mx-auto py-8"
    >
      404 Not Found
    </Typography>
    <Typography
      class="block"
      as="p"
      variant="paragraph-1"
    >
      <a
        href="/"
        class="by-link text-primary-70 hover:underline"
      >
        Die angeforderte Seite wurde nicht gefunden. Sie können es erneut von der Homepage aus versuchen.
      </a>
    </Typography>
    <Typography
      class="block"
      as="p"
      variant="paragraph-1"
    >
      <a
        href="/"
        class="by-link text-primary-70 hover:underline"
      >
        Kontaktieren Sie uns bezüglich dieser Fehlermeldung.
      </a>
    </Typography>
  </div>
</template>
