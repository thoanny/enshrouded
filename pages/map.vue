<template>
  <div
    style="height: calc(100dvh - 5rem - 2.25rem); width: calc(100% + 2rem)"
    class="-mx-4 -my-4"
  >
    <button
      @click="addMarker = !addMarker"
      class="btn absolute top-20 right-4"
      :class="{ 'btn-primary': !addMarker, 'btn-success': addMarker }"
      style="z-index: 410"
    >
      Ajout de marqueur : {{ addMarker }}
    </button>
    <LMap
      ref="map"
      :zoom="zoom"
      :max-zoom="6"
      :min-zoom="3"
      :center="[0, 0]"
      :maxBounds="[
        [85, -180],
        [-85, 180],
      ]"
      @click="createMarker($event)"
    >
      <LTileLayer
        url="https://api.lebusmagique.fr/uploads/api/enshrouded/map-tiles/{z}/{x}/{y}.jpg"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        layer-type="base"
        name="Embervale"
        :no-wrap="true"
      />
      <LMarker v-model:lat-lng="coords" draggable>
        <LIcon
          icon-url="img/elixir-well.png"
          :icon-size="[60, 60]"
          :popup-anchor="[0, -25]"
        />
        <LPopup>{{ coords }}</LPopup>
      </LMarker>

      <LMarker :lat-lng="[0, 0]">
        <LIcon
          icon-url="img/flame-checked.png"
          :icon-size="[60, 60]"
          :popup-anchor="[0, -30]"
        />
        <LPopup>center</LPopup>
      </LMarker>

      <LLayerGroup :visible="true">
        <LMarker :lat-lng="[50, 50]"> </LMarker>
      </LLayerGroup>

      <LLayerGroup name="custom" :visible="true">
        <LMarker
          v-for="(latLng, idx) in customMarkers"
          :key="idx"
          :lat-lng="latLng"
        >
          <LPopup>{{ latLng }}</LPopup>
        </LMarker>
      </LLayerGroup>
    </LMap>
  </div>
</template>

<script setup>
import { ref } from "vue";
const map = ref();
const zoom = ref(4);
const coords = ref([48.283193, 103.776855]);
const customMarkers = ref([]);

const addMarker = ref(false);

const createMarker = (e) => {
  if (!addMarker.value) return;
  console.log(e, e.lat, e.latlng);
  customMarkers.value.push(e.latlng);
};
</script>

<style>
body {
  margin: 0;
}
</style>
