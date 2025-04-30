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
  <footer class="bg-primary-bg text-white py-16 px-8">
    <div class="space-y-32 container mx-auto max-w-7xl">
      <!-- Main Footer Content -->
      <div class="flex flex-col md:flex-row flex-wrap xl:gap-10 gap-x-10 gap-y-20 justify-between">
        <!-- Seiten Section -->
        <div class="mr-10 w-full md:w-3/12 xl:w-2/12">
          <h3 class="font-semibold text-xl mb-4">
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
                  class="hover:text-secondary-hover text-white"
              >
                {{ link.text }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Wo du uns findest Section -->
        <div class="w-full md:w-3/12 xl:w-2/12">
          <h3 class="font-semibold text-xl mb-4">
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
                  class="hover:text-secondary-hover text-white"
              >
                {{ link.text }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Rechtliches Section -->
        <div class="mr-10 w-full md:w-3/12 xl:w-2/12">
          <h3 class="font-semibold text-xl mb-4">
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
                  class="hover:text-primary-hover text-white"
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
                  class="hover:text-secondary-hover text-white font-bold"
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
