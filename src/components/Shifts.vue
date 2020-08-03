<template>
  <div v-if="shiftInfo.loading">
    <div id="overlay">
      <div class="cv-spinner">
        <span class="spinner"></span>
      </div>
    </div>
  </div>
  <div v-else style="margin-top: 30px">
    <h2>Text "shifts" to +447401231124</h2>
    <b-card-group>
      <b-card
        bg-variant="light"
        class="text-center"
        v-bind:key="day.day"
        v-for="day in shiftInfo.shifts"
        :class="{'updated': day.isUpdated}"
      >
        <b-card-title>{{day.day}}</b-card-title>
        <b-card-body :body-bg-variant="alertVariant(day.shifts.am)">
          <b-card-text>Morning Shift assigned to {{fixName(day.shifts.am.assignee)}} at {{day.shifts.am.timestamp}}</b-card-text>
        </b-card-body>
        <b-card-body :body-bg-variant="alertVariant(day.shifts.pm)">
          <b-card-text>Evening Shift assigned to {{fixName(day.shifts.pm.assignee)}} at {{day.shifts.pm.timestamp}}</b-card-text>
        </b-card-body>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: "Shifts",
  props: {
    shiftInfo: Object,
  },
  methods: {
    fixName(name) {
      if (name === null) {
        return "Nobody";
      } else {
        return name;
      }
    },
    alertVariant(shift) {
      if (shift.isUpdated) {
        return "success";
      } else {
        return shift.assignee ? "" : "warning";
      }
    },
  },
};
</script>

<style scoped>
.updated {
  background: greenyellow;
}

#overlay {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  /* display: none; */
  background: rgba(0, 0, 0, 0.6);
}
.cv-spinner {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 4px #ddd solid;
  border-top: 4px #2e93e6 solid;
  border-radius: 50%;
  animation: sp-anime 0.8s infinite linear;
}
@keyframes sp-anime {
  100% {
    transform: rotate(360deg);
  }
}
/* .is-hide {
  display: none;
} */
</style>
