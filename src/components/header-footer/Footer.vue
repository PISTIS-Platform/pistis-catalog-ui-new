<template>
  <footer>
      <div class="container">
          <a class="flex-shrink-0" href="/"><img src="../../assets/images/eu_flag.jpeg" class="h-8 w-auto block"></a>
          <p>
              This project has received funding from the European Union under Grant Agreement n° 101093016. Views and
              opinions expressed are however those of the author(s) only and do not necessarily reflect those of the
              European Union or the European Commission. Neither the European Union nor the granting authority can be
              held responsible for them.
          </p>
      </div>
  </footer>
</template>


<style lang="scss">
footer {
  background-color: #3b2b84;
  color: #fff;
  z-index: 1000;
  width: 100%;
  display: flex;
  align-items: center;

  .container {
      max-width: 1210px;
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      align-items: flex-start;
      font-size: .82rem;
      font-weight: 500;
      padding: .9rem;
      width: 100%;
      margin-right: auto;
      margin-left: auto;
      p {
          margin: 0
      }
  }
}

@media screen and (min-width:800px) {
  footer {
      .container {
          // padding: .9rem 0;
          align-items: center;
      }
  }
}
</style>