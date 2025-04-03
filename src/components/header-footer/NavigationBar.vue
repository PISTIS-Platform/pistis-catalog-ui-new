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
  { to: '/twins', label: 'landing-page.header.findTwins' },
  { to: '/info', label: 'landing-page.header.firstSteps' },
  { to: '/about', label: 'landing-page.header.about' },
  { to: '/datasets', label: 'landing-page.header.findAll' },
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
          class="header-icon-container leading-[1.625rem]"
          :class="{ active: isActive && isExactActive }"
          :href="href"
          @click="navigate"
      >
        {{ $t(link.label) }}
      </a>
    </RouterLink>
  </div>
</template>

<style scoped>
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
  @apply text-fg text-base font-semibold hover:text-primary-hover leading-[1.625rem];
}

#thenavguy.nav-links a.active,
#thenavguy.nav-links a .active {
  @apply border-b-[3px] border-spacing-4 border-primary-pressed font-semibold text-base leading-[1.625rem] ;
}

#thenavguy.nav-links.vertical a.active,
#thenavguy.nav-links.vertical a .active {
  @apply border-l-[2.5px] border-b-0 pl-2;
}
</style>
