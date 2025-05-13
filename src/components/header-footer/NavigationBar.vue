<!-- NavigationLinks.vue -->
<script setup>
const props = defineProps({
  direction: {
    type: String,
    default: 'horizontal',
    validator: value => ['horizontal', 'vertical'].includes(value),
  },
})

const links = [
  { to: '/', label: 'landing-page.header.home' },
  { to: '/datasets', label: 'landing-page.header.datasets' },
  { to: '/catalogues', label: 'landing-page.header.catalogues' },
]
</script>

<template>
  <div
    id="thenavguy"
    class="nav-links"
    :class="{ vertical: direction === 'vertical' }"
  >
    <RouterLink
      v-for="(link, index) in links"
      :key="index"
      v-slot="{ href, navigate, isActive, isExactActive }"
      :to="link.to"
    >
      <a
        class="header-icon-container text-base leading-[1.625rem] text-fg hover:text-primary-hover"
        :class="{ active: isActive && isExactActive }"
        :href="href"
        @click="navigate"
      >
        {{ link.label ? $t(link.label) : link.name }}
      </a>
    </RouterLink>
  </div>
</template>

<style>
#thenavguy.nav-links {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

#thenavguy.nav-links.vertical {
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

#thenavguy.nav-links a {
  color: var(--fg);
  font-size: 1rem;
  line-height: 1.625rem;
  transition: color 0.2s;
  /* @apply text-fg text-base hover:text-primary-hover leading-[1.625rem]; */
}
#thenavguy.nav-links a:hover {
  color: var(--primary-hover);
}

#thenavguy.nav-links a.active,
#thenavguy.nav-links a .active {
  border-bottom-width: 3px;
  border-spacing: 1rem;
  border-color: var(--primary);
  font-size: 1rem;
  line-height: 1.625rem;
  /* @apply border-b-[3px] border-spacing-4 border-primary text-base leading-[1.625rem] ; */
}

#thenavguy.nav-links.vertical a.active,
#thenavguy.nav-links.vertical a .active {
  border-left-width: 2.5px;
  border-bottom-width: 0;
  padding-left: 0.5rem;
  /* @apply border-l-[2.5px] border-b-0 pl-2; */
}
</style>
