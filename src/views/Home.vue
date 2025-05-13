<script setup lang="ts">

</script>

<template>
  <div class="">
    <section class="bg-white lg:grid lg:h-screen lg:place-content-center">
      <div class="max-w-(--breakpoint-xl) mx-auto w-screen px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div class="mx-auto max-w-prose text-center">
          <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl">
            Unlock the Power of Public Sector Data with
            <strong class="text-primary"> piveau </strong>
          </h1>

          <p class="mt-4 text-pretty text-base text-gray-700 sm:text-lg/relaxed">
            <strong>piveau</strong> is a comprehensive data management ecosystem that streamlines the entire <strong>data lifecycle </strong>— from
            <strong>collection</strong> and <strong>aggregation</strong> to <strong>publication</strong> and <strong>reuse</strong>.
          </p>

          <div class="mt-4 flex justify-center gap-4 sm:mt-6">
            <a
              class="shadow-xs inline-block rounded-sm  border bg-primary px-5 py-3 font-medium text-white transition-colors hover:bg-primary-hover"
              href="/datasets"
            >
              Explore Datasets
            </a>

            <button
              class="focus:outline-hidden ml-4 inline-flex rounded-sm border-0 bg-gray-100 px-6 py-3 text-lg text-gray-700 hover:bg-gray-200"
            >
              <a
                href="https://doc.piveau.eu/general/quick-start/"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block size-full"
              >Documentation </a>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right spacing" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
              </svg>
            </button>
          </div>
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
