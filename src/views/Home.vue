<script setup lang="ts">

</script>

<template>
  <div>

    <!-- ////////////////////// -->
    <!-- Hero Section Prototype -->
    <!-- ////////////////////// -->

    
    <!-- Idea: 
         Put search on the first page with "What is piveau?" as search example. 
         On our demo we could have a sample of own datasets with "what is piveea", 
         "how to set up piveau", "Gitlab resources of pivea", "latest Docker images", "full Dumentation", 
         "what is MQA?", "what is Consus?", "pivea paper" ...
         
         >> so users can find all resources related to piveau and the data management ecosystem
         >> and we can use the search function to show how it works
     -->


    <!-- Note: This is only a prototype/draft, open for feedback, ideas and further design/decelopment-->
    <section class="bg-surface">
      <div class="max-w-(--breakpoint-xl) mx-auto w-screen px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32 bg-surface">
        <div class="mx-auto max-w-prose text-center">
          <h1 class="text-4xl font-bold text-surface-text sm:text-5xl">
            Unlock the Power of Public Sector Data with
            <span class="text-primary"> piveau </span>
          </h1>

          <p class="mt-4  text-surface-light sm:text-lg/relaxed">
            <strong>piveau</strong> is a comprehensive <strong> data management ecosystem </strong>that streamlines the
            entire data lifecycle — from
            <strong>collection and aggregation to publication and reuse</strong>.
          </p>

          <div class="mt-4 flex justify-center gap-4 sm:mt-6">
            <button class="mt-4">
            <a class="inline-block rounded-3xl bg-primary px-5 py-3 font-medium text-primary-text transition-colors hover:bg-primary-hover"
              href="/datasets">
              Explore Demo
            </a>
          </button>
            <button type="submit"
              class="mt-4 flex w-m items-center justify-center gap-2 rounded-3xl px-5 py-3 text-gray-700 bg-gray hover:bg-primary-hover">
              <span class="font-medium">  <a href="https://doc.piveau.eu/general/introduction/" target="_blank" rel="noopener noreferrer"
                class="inline-block size-full"> Documentation </a> </span>

              <svg class="size-4 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ////////////////////////////////// -->
    <!-- Theme Generator Section Prototype  -->
    <!-- ////////////////////////////////// -->

    <!-- Note: This is only a prototype/draft, open for feedback, ideas and further design/decelopment. We can also remove it completly when going live! -->
    <section
      class="overflow-hidden bg-[url(https://images.unsplash.com/photo-1601952899827-3db57e7943f7?q=80&w=1586&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-bottom bg-no-repeat">
      <div class="p-8 md:p-12 lg:px-16 lg:py-24">
        <div class="text-center">
          <h2 class="text-2xl font-black [color:#141414] sm:text-3xl md:text-5xl">Try our new Theme Generator</h2>

          <p class="mt-5 [color:#171717]">
            Adapt piveau to your visual framework with our new theme generator.
          </p>

          <div class="mt-4 sm:mt-8">
            <a href="/themer"
              class="inline-block rounded-full bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-primary-hover">
              Try Theme Generator
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ////////////////////////////////// -->
    <!--        Newsletter Prototype        -->
    <!-- ////////////////////////////////// -->

    <section class="p-10 pb-18 bg-surface">
      <div class="p-8 md:p-12 lg:px-16 lg:py-24">
        <div class="mx-auto max-w-lg text-center">
          <h2 class="text-2xl font-bold text-surface-text md:text-3xl dark:text-white">
            Join the piveau Community
          </h2>

          <p class="hidden text-surface-light sm:mt-4 sm:block dark:text-gray-400">
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
                class="w-full text-surface-text bg-surface rounded-3xl border border-gray p-3 transition focus:ring-primary focus:outline-none" />
            </div>

            <button type="submit"
              class="group mt-4 flex w-m items-center justify-center gap-2 rounded-3xl bg-primary px-5 py-3 text-white hover:bg-primary-hover sm:mt-0 sm:w-auto">
              <span class="text-sm font-medium"> Sign Up </span>

              <svg class="size-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none"
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

</style>
