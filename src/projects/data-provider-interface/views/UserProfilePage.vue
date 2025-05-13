<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DataProviderInterfaceUserProfile',
  props: [],
  data() {
    return {
      values: {},
    }
  },
  computed: {
    ...mapGetters('auth', [
      'getUserName',
    ]),
  },
  created() {},
  methods: {},
}
</script>

<template>
  <div class="d-flex flex-column container-fluid justify-content-between content bg-transparent">
    <h1 class="small-headline">
      My Profile
    </h1>
    <div class="panel-body inf-content">
      <div class="row">
        <div class="col-md-12">
          <strong class="table-header">User Information</strong><br>
          <div class="table-responsive">
            <table class="table-user-information table">
              <tbody>
                <tr>
                  <td>
                    <strong>
                      <span class="glyphicon glyphicon-user text-primary" />
                      Name:
                    </strong>
                  </td>
                  <td class="text-primary">
                    {{ getUserName }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inf-content{
  border:1px solid #DDDDDD;
  -webkit-border-radius:10px;
  -moz-border-radius:10px;
  border-radius:10px;
  box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.3);
}

.table-header {
  padding: 0.75rem;
}
</style>
