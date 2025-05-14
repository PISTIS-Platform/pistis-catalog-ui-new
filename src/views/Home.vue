<script setup lang="ts">

</script>

<template>
  <div class="">
    <section class="bg-white">
      <div class="max-w-(--breakpoint-xl) mx-auto w-screen px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div class="mx-auto max-w-prose text-center">
          <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl">
            Unlock the Power of Public Sector Data with
            <strong class="text-primary"> piveau </strong>
          </h1>

          <p class="mt-4 text-pretty text-base text-gray-700 sm:text-lg/relaxed">
            <strong>piveau</strong> is a comprehensive <strong> data management ecosystem </strong>that streamlines the
            entire data lifecycle — from
            <strong>collection and aggregation to publication and reuse</strong>.
          </p>

          <div class="mt-4 flex justify-center gap-4 sm:mt-6">
            <a class="inline-block rounded-3xl border  bg-primary px-5 py-3 font-medium text-white shadow-xs transition-colors hover:bg-primary-hover"
              href="/datasets">
              Explore Demo
            </a>

            <button
              class="ml-2 inline-flex rounded-3xl text-gray-700 bg-gray-100 border-0 py-3 px-6 focus:outline-hidden hover:bg-gray-200 text-lg">
              <a href="https://doc.piveau.eu/general/introduction/" target="_blank" rel="noopener noreferrer"
                class="inline-block size-full">Documentation </a>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-arrow-right spacing" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
              </svg>
            </button>

          </div>
        </div>
      </div>
    </section>

    <section
      class="overflow-hidden bg-[url(https://images.unsplash.com/photo-1601952899827-3db57e7943f7?q=80&w=1586&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-bottom bg-no-repeat">
      <div class="bg-black/50 p-8 md:p-12 lg:px-16 lg:py-24">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-black sm:text-3xl md:text-5xl">Try our new Theme Generator</h2>

          <p class="mt-5">
            Adapt piveau to your visual framework with our new theme generator.
          </p>

          <div class="mt-4 sm:mt-8">
            <a href="/themer"
              class="inline-block rounded-full bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-primary-hover">
              Try the Theme Generator
            </a>
          </div>
        </div>
      </div>
    </section>


    <section class="mt-10 mb-15">
      <div class="p-8 md:p-12 lg:px-16 lg:py-24">
        <div class="mx-auto max-w-lg text-center">
          <h2 class="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
            Join the piveau Community
          </h2>

          <p class="hidden text-gray-500 sm:mt-4 sm:block dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae dolor officia blanditiis
            repellat in, vero, aperiam porro ipsum laboriosam consequuntur exercitationem incidunt
            tempora nisi?
          </p>
        </div>

        <div class="mx-auto mt-8 max-w-xl">
          <form action="#" class="sm:flex sm:gap-4">
            <div class="sm:flex-1">
              <label for="email" class="sr-only">Email</label>

              <input type="email" placeholder="Email address"
                class="w-full rounded-3xl bg-white p-3 transition focus:ring-primary focus:outline-none" />
            </div>

            <button type="submit"
              class="group mt-4 flex w-full items-center justify-center gap-2 rounded-3xl bg-primary px-5 py-3 text-white hover:bg-primary-hover sm:mt-0 sm:w-auto">
              <span class="text-sm font-medium"> Sign Up </span>

              <svg class="size-5 shadow-sm rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>



  </div>
</template>

<style scoped>
.spacing {
  margin-top: 7px;
  margin-left: 5px;
}

body {
  background-color: #fff;
}
</style>
