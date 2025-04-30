<script setup lang="ts">

</script>

<template>
  <div class="container relative mx-auto mx-auto max-w-content-max mt-10">

    <section class="container relative mx-auto text-gray-600 body-font">
      <div class="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center mb-20">
        <div
          class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 class="title-font sm:text-5xl text-3xl mb-4 font-bold text-primary-100">Welcome to piveau
          </h1>
          <p class="mb-8 leading-relaxed text-pri"><strong>Unlock the Power of Public Sector Data</strong>
            <br>
            piveau is a comprehensive data management ecosystem that streamlines the entire data lifecycle — from
            collection and aggregation to publication and reuse.
          </p>
          <div class="flex justify-center">
            <RouterLink to="/datasets">
            <button
              class="inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-40 rounded text-lg">Get
              Started</button>
              </RouterLink>
            <button
              class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
          
              <a
    href="https://doc.piveau.eu/general/quick-start/"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-block w-full h-full"
  >Documentation </a> 
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right spacing" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg>    </button>
          </div>
        </div>
        <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img class="object-cover object-center rounded" alt="hero"
            src="https://bootstrapmade.com/content/demo/FlexStart/assets/img/hero-img.png">
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
</style>
