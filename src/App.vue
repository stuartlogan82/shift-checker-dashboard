<template>
  <div id="app">
    <Header v-on:reset-roster="resetRoster" />
    <Shifts :shift-info="shiftInfo" />
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Pusher from "pusher-js";

import Shifts from "./components/Shifts.vue";
import Header from "./components/Header";
const base_url = process.env.VUE_APP_BASE_API_URL;

export default {
  name: "App",
  components: {
    Shifts,
    Header,
  },
  data() {
    return {
      shiftInfo: {
        loading: true,
        shifts: [],
      },
    };
  },
  methods: {
    async fetchShifts() {
      const response = await axios.get(`${base_url}/api/shifts`, {
        auth: {
          username: process.env.VUE_APP_API_USERNAME,
          password: process.env.VUE_APP_API_PASSWORD,
        },
      });
      const data = response.data;
      await new Promise((r) => setTimeout(r, 2000));
      return data;
    },
    subscribe() {
      let pusher = new Pusher(process.env.VUE_APP_PUSHER, { cluster: "eu" });
      pusher.subscribe("shifts");
      pusher.bind("shift_updated", (data) => {
        this.shiftInfo.shifts = data.data;
        this.shiftInfo.loading = false;
        this.shiftInfo.shifts.map((shift) => {
          for (var key in shift.shifts) {
            Vue.set(shift.shifts[key], "isUpdated", false);
          }
        });
      });
    },
    async resetRoster() {
      this.shiftInfo.loading = true;
      await new Promise((r) => setTimeout(r, 2000));
      await axios.get(`${base_url}/api/reset_shifts`, {
        auth: {
          username: process.env.VUE_APP_API_USERNAME,
          password: process.env.VUE_APP_API_PASSWORD,
        },
      });
    },
    setUpdated(day, time) {
      setTimeout(() => {
        Vue.set(day.shifts[time], "isUpdated", false);
      }, 5000);
    },
  },
  created() {
    this.fetchShifts().then((shifts) => {
      this.shiftInfo.shifts = shifts;
      this.shiftInfo.loading = false;
      shifts.map((shift) => {
        for (var key in shift.shifts) {
          Vue.set(shift.shifts[key], "isUpdated", false);
        }
      });
    });

    this.subscribe();
  },
  watch: {
    "shiftInfo.shifts": {
      deep: true,

      handler(newValue, oldValue) {
        if (oldValue.length > 0) {
          newValue.map((day, index) => {
            for (var key in day.shifts) {
              if (
                day.shifts[key].timestamp !==
                oldValue[index].shifts[key].timestamp
              ) {
                Vue.set(day.shifts[key], "isUpdated", true);
                this.setUpdated(day, key);
              }
            }
          });
        }
      },
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
