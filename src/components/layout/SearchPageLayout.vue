<script setup lang="ts"></script>

<template>
  <div class="container relative mx-auto grid grid-cols-1 sm:grid-cols-[minmax(auto,20rem)_1fr]">
    <div
      name="sidebar"
      class="relative hidden sm:block sm:max-w-96 lg:min-w-[420px]"
    >
      <div
        name="stickysidey"
        class="sticky top-0 h-screen"
      >
        <slot name="sidebar">
          <div class="">
            sidebar
          </div>
        </slot>
      </div>
    </div>
    <div
      name="content"
      class="flex flex-col overflow-x-auto"
    >
      <section class="sm:hidden">
        <slot name="hamburger">
          hamburger
        </slot>
      </section>
      <div class="mt-[15px] flex-none px-6 py-[1.875rem]">
        <slot name="top">
          <div>A</div>
        </slot>
      </div>
      <div class="flex-1">
        <slot>
          <div class="h-[1000px]">
            C
          </div>
          <div class="h-[1000px]">
            D
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
