<template>
  <div class="mb-0 navbar-container bg-primary">
      <nav id="piveau-header" class="navbar flex flex-row justify-center items-center fixed-top pl-4 py-3">
          <div class="left-point flex flex-col">
              <slot name="logo">
                  <a class="navbar-brand" href="/"><img src="../../assets/images/PISTIS_logo_white.png" class="h-8"></a>
              </slot>
              <ul
                  :class="`${navEnabled ? 'link-container link-container-open' : 'link-container link-container-closed'}`">
                  <li class="nav-link">
                      <a :href="`https://${factoryPrefix}.pistis-market.eu`">Home</a>
                  </li>
                  <li class="nav-link">
                      <a :href="`https://${factoryPrefix}.pistis-market.eu/data`">Data Ingestion</a>
                  </li>
                  <li class="nav-link">
                      <a :href="`https://${factoryPrefix}.pistis-market.eu/srv/catalog/datasets?locale=en&catalog=my-data&page=1`">My Data</a>
                  </li>
                  <li class="nav-link">
                      <a href="https://pistis-market.eu/srv/catalog/datasets?locale=en">Marketplace</a>
                  </li>
                  <li class="nav-link">
                      <a :href="`https://${factoryPrefix}.pistis-market.eu/market`">Market Insights</a>
                  </li>
              </ul>
          </div>

          <button @click="toggleNav" class="toggler" type="button">
              <span v-if="navEnabled">&#x2715;</span>
              <span v-else>&#8801;</span>
          </button>
      </nav>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, watch } from 'vue'
import { useAuthStore } from '../../stores/authStore'
// import { useRuntimeEnv } from '@piveau/piveau-hub-ui-modules';
// const { appContext } = getCurrentInstance();

const authStore = useAuthStore()
const token = ref(authStore.user.token)

// const ENV = useRuntimeEnv()

const factoryPrefix = ref('develop')

// const pistisMode = ENV.api.pistisMode;


// reactive state
const navEnabled = ref(false)

// functions that mutate state and trigger updates
function toggleNav() {
  navEnabled.value = !navEnabled.value
}



const getUserFactory = async () => {
try {
  // TODO: link as ENV variable, and add the access token once keycloak is intigrated
  const response = await fetch('https://pistis-market.eu/srv/factories-registry/api/factories/user-factory', {
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json()    
  factoryPrefix.value = data.factoryPrefix
  

} catch (error) {
  console.error("Error getting data:", error);
}
};

onMounted(() => {
 getUserFactory()   
})

watch(authStore, (newToken) => {
  if (newToken) {
    token.value = authStore.user.token
    getUserFactory()
  }
})
</script>

<style lang="scss" scoped>
.navbar-container {
//   background: #5632d0 !important;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  .toggler {
      color: #fff !important;
      background-color: transparent;
      font-size: 2rem;
      padding: 0;
      margin-right: 1rem;
      border: none;
      position: absolute;
      top: .3rem;
      right: .8rem
  }

  .right-point {
      display: flex;
      justify-content: space-between;
      width: 100%;
      gap: 1rem;
      align-items: center;
      font-size: 1.2rem;
      margin-right: 0.2rem;

      &-closed {
          display: none;
      }

      .bell {
          color: #c5c8ff;
          border: 1px solid transparent;
          border-radius: 100%;
          padding: .5rem .6rem;
          cursor: pointer;
          transition: .5s;

          &:hover {
              color: #fff;
              border: 1px solid #fff
          }
      }

      .sign-out {
          display: flex;
          gap: 1rem;
          align-items: center;

          .user {
              background-color: #c5c8ff;
              padding: .6rem .7rem;
              cursor: pointer;
              border-radius: 100%;
              color: #71717a;
          }

          .arrow {
              color: #a2a4ff;
              font-size: .8rem;
          }
      }
  }


  .left-point {
      display: flex;
      flex-direction: column;
      align-items: flex-start;


      .link-container {
          padding: .4rem;
          display: flex;
          flex-direction: column;
          margin: 0;
          gap: 1rem;

          .nav-link {
              font-size: 1rem !important;
          }

          &-closed {
              display: none;
          }
      }

      // .link-container-closed {

      // }

      // .link-container-open {
      //     display: flex;
      //     padding: .4rem;
      //     flex-direction: column;
      //     margin: 0;
      //     gap: 1rem;
      // }
  }
}

#piveau-header {
  position: relative;
}

.piveau-logo {
  max-height: 55px;
  width: auto;
  padding-top: 10px;
  padding-bottom: 10px;
}

.nav-link {
  color: #fff !important;
  font-weight: 500;
  cursor: pointer;
  padding: .5rem .75rem !important;

  a {
      text-decoration: none;
      color: #fff;
      font-weight: 500;
  }

  &:hover {
      background-color: #613debbf !important;
      border-radius: 0.375rem;
  }
}

.router-link-active {
  color: #fff !important;
  font-size: 1rem;
  background-color: #462ba8;
  border-radius: 0.375rem;
  padding: .5rem .75rem !important;

  &:hover {
      color: rgba(250, 250, 250, 0.9) !important;
  }
}

.sub-nav {
  background-color: transparent !important;
  height: 3rem;
  display: flex;
  align-items: end;
  gap: 2rem;
  list-style-type: none;
  color: #18181b;
  font-size: .875rem;
  line-height: 1.25rem;
  padding-bottom: 0 !important;
  -webkit-box-shadow: 0px 11px 40px -14px #D4D4D8;
  box-shadow: 0px 11px 40px -14px #D4D4D8;
  border-bottom: .1px solid #d4d4d8;

  li {
      padding-bottom: .8rem;
      border-bottom: 2px solid transparent;
  }

  li:hover {
      border-bottom: 2px solid #613deb;
      cursor: pointer;
  }

  .active {
      border-bottom: 2px solid #613deb;
  }
}

@media screen and (min-width: 667px) {
  .navbar-container {
      display: flex;
      justify-content: center;
    //   background: #5632d0 !important;
  }

  .navbar {
      width: 98%;

      .toggler {
          display: none;
      }

      .left-point {
          flex-direction: row;
          justify-content: center;
          align-items: center;


          .link-container {
              flex-direction: row;
              margin-left: 1rem;
              font-size: 1rem;
          }

          .link-container-closed {
              flex-direction: row !important;
              display: flex !important;
          }
      }
  }

  .right-point {
      margin-right: 3rem;
      width: auto !important;

      &-closed {
          display: flex !important;
      }
  }

}
</style>
