<script setup>
const seitenLinks = [
  { to: '/', text: 'Home' },
  { to: '/datasets', text: 'Datasets' },
  { to: '/catalogues', text: 'Catalogues' },
]

const socialLinks = [
  { href: '...', text: 'LinkedIn' },
]

const rechtlichesLinks = [
  { to: '#', text: 'Imprint' },
  { to: '#', text: 'Data Privacy' },
]

const loginLinks = [
  { to: '/app', text: 'Login' },
  { to: '/contact', text: 'Contact' },
]
</script>

<template>
  <footer class="bg-primary-bg px-8 py-16 text-white">
    <div class="container mx-auto max-w-7xl space-y-32">
      <!-- Main Footer Content -->
      <div class="flex flex-col flex-wrap justify-between gap-x-10 gap-y-20 md:flex-row xl:gap-10">
        <!-- Seiten Section -->
        <div class="mr-10 w-full md:w-3/12 xl:w-2/12">
          <h3 class="mb-4 text-xl font-semibold">
            Sitemap
          </h3>
          <ul class="flex flex-col gap-0">
            <li
              v-for="link in seitenLinks"
              :key="link.text"
              class="text-copy-sm"
            >
              <RouterLink
                :to="link.to"
                class="text-white hover:text-secondary-hover"
              >
                {{ link.text }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Wo du uns findest Section -->
        <div class="w-full md:w-3/12 xl:w-2/12">
          <h3 class="mb-4 text-xl font-semibold">
            Social Media
          </h3>
          <ul class="flex flex-col gap-0">
            <li
              v-for="link in socialLinks"
              :key="link.text"
              class="text-copy-sm"
            >
              <a
                :href="link.href"
                target="_blank"
                class="text-white hover:text-secondary-hover"
              >
                {{ link.text }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Rechtliches Section -->
        <div class="mr-10 w-full md:w-3/12 xl:w-2/12">
          <h3 class="mb-4 text-xl font-semibold">
            Legal
          </h3>
          <ul class="flex flex-col gap-0">
            <li
              v-for="link in rechtlichesLinks"
              :key="link.text"
              class="text-copy-sm"
            >
              <RouterLink
                :to="link.to"
                class="text-white hover:text-primary-hover"
              >
                {{ link.text }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Login Section -->
        <div class="w-full md:w-3/12 xl:w-2/12">
          <ul class="flex flex-col gap-4">
            <li
              v-for="link in loginLinks"
              :key="link.text"
              class="text-copy-sm"
            >
              <RouterLink
                :to="link.to"
                class="font-bold text-white hover:text-secondary-hover"
              >
                {{ link.text }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Logo Section -->
      <!-- <div class="flex flex-wrap justify-center md:items-center items-start flex-col gap-6 md:flex-row">
        <a href="https://www.stmd.bayern.de/">
          <img
              src=""
              alt="Piveau"
              class="h-14 max-h-[110px]"
          >
        </a>
      </div> -->
    </div>
  </footer>
</template>
