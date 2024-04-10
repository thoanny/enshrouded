<script setup>
import { ref } from "vue";

const seoTitle = "Carte interactive";
const seoDescription =
  "Tous les points importants de la carte : tours des Anciens, puits d'élixir, sanctuaires de la Flamme, salles creuses, donjons, cryptes, grottes, mines...";

defineOgImageComponent("EnshroudedSeo", {
  headline: "Boîte à outils",
  title: seoTitle,
  description: seoDescription,
  icon: "/img/map-seo-img.png",
});

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
});

const map = ref();
const zoom = ref(4);
const zoomMin = 3;
const zoomMax = 6;
const customMarkers = ref([]);
const showGroupsList = ref(true);

const addMarker = ref(false);

const createMarker = (e) => {
  console.log([e.latlng.lat, e.latlng.lng]);
  if (!addMarker.value) return;
  customMarkers.value.push(e.latlng);
};

const data = ref([
  {
    id: "ancient-spire",
    name: "Tours des Anciens",
    visible: true,
    icon: "ancient-spire.png",
    iconChecked: "ancient-spire-checked.png",
    checked: false,
    markers: [
      {
        id: "as01",
        coords: [-23.644524198573677, -74.02587890625001],
        name: "Tour des Anciens - Hautes patûres",
        image: null,
      },
      {
        id: "as02",
        coords: [26.175158990178133, -64.66552734375001],
        name: "Tour des Anciens - Bois envoûtés",
        description: "xxx yyy tour 02",
        image: null,
      },
      {
        id: "as03",
        coords: [-33.57801474614399, -30.739746093750004],
        name: "Tour des Anciens - Mornes plaines",
        description: "xxx yyy tour 03",
        image: null,
      },
      {
        id: "as04",
        coords: [29.935895213372444, 27.026367187500004],
        name: "Tour des Anciens - Plateaux nomades",
        image: null,
      },
      {
        id: "as05",
        coords: [-8.928487062665504, 77.73925781250001],
        name: "Tour des Anciens - Regs exaltés",
        image: null,
      },
    ],
  },
  {
    id: "cave",
    name: "Grottes",
    visible: false,
    icon: "cave.png",
    iconChecked: "cave-checked.png",
    markers: [
      {
        id: "c01",
        coords: [11.26461221250444, 25.576171875],
        name: "Caverne 01",
        description: "xxx yyy caverne 01",
        image: null,
      },
    ],
  },
  {
    id: "dungeon",
    name: "Donjons",
    visible: false,
    icon: "dungeon.png",
    iconChecked: "dungeon-checked.png",
    markers: [
      {
        id: "d01",
        coords: [-14.093957177836224, 21.533203125000004],
        name: "Donjon 01",
        description: "xxx yyy donjon 01",
        image: null,
      },
    ],
  },
  {
    id: "elixir-well",
    name: "Puits d'élixir",
    visible: true,
    icon: "elixir-well.png",
    iconChecked: "elixir-well-checked.png",
    checked: true,
    markers: [
      {
        id: "elixir-well-01",
        coords: [-32.546813173515154, -64.02832031250001],
        name: "Puit d'élixir 01",
        image: null,
      },
      {
        id: "elixir-well-02",
        coords: [-41.211721510547875, -84.44091796875],
        name: "Puit d'élixir 02",
        image: null,
      },
      {
        id: "elixir-well-03",
        coords: [-26.45090222367262, -64.73144531250001],
        name: "Puit d'élixir 03",
        image: null,
      },
      {
        id: "elixir-well-04",
        coords: [-22.350075806124853, -78.50830078125001],
        name: "Puit d'élixir 04",
        image: null,
      },
      {
        id: "elixir-well-05",
        coords: [-13.923403897723347, -92.373046875],
        name: "Puit d'élixir 05",
        image: null,
      },
      {
        id: "elixir-well-06",
        coords: [-6.970049417296218, -84.68261718750001],
        name: "Puit d'élixir 06",
        image: null,
      },
      {
        id: "elixir-well-07",
        coords: [13.774066408054827, -96.7236328125],
        name: "Puit d'élixir 07",
        image: null,
      },
      {
        id: "elixir-well-08",
        coords: [39.04478604850143, -89.62646484375001],
        name: "Puit d'élixir 08",
        image: null,
      },
      {
        id: "elixir-well-08",
        coords: [-43.436965965218235, -50.60302734375001],
        name: "Puit d'élixir 08",
        image: null,
      },
      {
        id: "elixir-well-09",
        coords: [-32.73184089686568, -43.70361328125001],
        name: "Puit d'élixir 09",
        image: null,
      },
      {
        id: "elixir-well-10",
        coords: [35.37113502280101, -39.37500000000001],
        name: "Puit d'élixir 10",
        image: null,
      },
    ],
  },
  {
    id: "flame",
    name: "Flamme",
    visible: false,
    icon: "flame.png",
    iconChecked: "flame-checked.png",
    markers: [
      {
        id: "f01",
        coords: [-0.3515602939922709, 28.4765625],
        name: "Flamme 01",
        description: "xxx yyy flamme 01",
        image: null,
      },
    ],
  },
  {
    id: "flame-shrine",
    name: "Sanctuaires de la Flamme",
    visible: false,
    icon: "flame-shrine.png",
    iconChecked: "flame-shrine-checked.png",
    markers: [
      {
        id: "fs01",
        coords: [-12.46876014482322, -15.117187500000002],
        name: "Flame Shrine 01",
        description: "xxx yyy flame shrine 01",
        image: null,
      },
    ],
  },
  {
    id: "mine",
    name: "Mines",
    visible: false,
    icon: "mine.png",
    iconChecked: "mine-checked.png",
    markers: [
      {
        id: "m01",
        coords: [4.039617826768437, -18.984375000000004],
        name: "Mine 01",
        description: "xxx yyy mine 01",
        image: null,
      },
    ],
  },
  {
    id: "ancient-obelisk",
    name: "Obélisques anciens",
    visible: false,
    icon: "ancient-obelisk.png",
    iconChecked: "ancient-obelisk-checked.png",
    markers: [
      {
        id: "m01",
        coords: [24.44714958973082, 23.5546875],
        name: "Obélisque ancien 01",
        description: "xxx yyy Obélisque ancien 01",
        image: null,
      },
    ],
  },
  {
    id: "enemy-camp",
    name: "Camps ennemis",
    visible: false,
    icon: "enemy-camp.png",
    iconChecked: "enemy-camp-checked.png",
    markers: [
      {
        id: "m01",
        coords: [14.689881366618774, -7.470703125000001],
        name: "Obélisque ancienne 01",
        description: "xxx yyy Obélisque ancienne 01",
        image: null,
      },
    ],
  },
  {
    id: "hollow-hall",
    name: "Salles creuses",
    visible: true,
    icon: "hollow-hall.png",
    iconChecked: "hollow-hall-checked.png",
    markers: [
      {
        id: "hollow-hall-01",
        coords: [-39.04478604850143, -97.3828125],
        name: "Salles creuses des Hautes patûres",
        image: null,
      },
      {
        id: "hollow-hall-02",
        coords: [31.952162238024975, -95.84472656250001],
        name: "Salles creuses des Bois envoûtés",
        image: null,
      },
    ],
  },
  {
    id: "survivor-camp",
    name: "Camps de survivants",
    visible: false,
    icon: "survivor-camp.png",
    iconChecked: "survivor-camp-checked.png",
    markers: [
      {
        id: "m01",
        coords: [12.211180191503997, 9.931640625000002],
        name: "Obélisque ancienne 01",
        description: "xxx yyy Obélisque ancienne 01",
        image: null,
      },
    ],
  },
  {
    id: "tomb",
    name: "Cryptes",
    visible: false,
    icon: "tomb.png",
    iconChecked: "tomb-checked.png",
    markers: [
      {
        id: "m01",
        coords: [-13.923403897723347, 0.26367187500000006],
        name: "Obélisque ancienne 01",
        description: "xxx yyy Obélisque ancienne 01",
        image: null,
      },
    ],
  },
]);

const getMarkerIcon = (marker, group) => {
  if (marker.icon) {
    if (marker.checked && marker.iconChecked) {
      return `img/map/${marker.iconChecked}`;
    }

    return `img/map/${marker.icon}`;
  }

  if (group.icon) {
    if (marker.checked && group.iconChecked) {
      return `img/map/${group.iconChecked}`;
    }
    return `img/map/${group.icon}`;
  }

  return `img/map/default.png`;
};

const setZoom = (direction) => {
  if ("in" === direction) {
    if (zoom.value < zoomMax) {
      zoom.value++;
    }
  }

  if ("out" === direction) {
    if (zoom.value > zoomMin) {
      zoom.value--;
    }
  }
};
</script>

<template>
  <div
    style="height: calc(100dvh - 5rem - 2.25rem); width: calc(100% + 2rem)"
    class="-mx-4 -my-4 relative"
  >
    <button
      @click="addMarker = !addMarker"
      class="btn absolute top-20 right-4 hidden"
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
      :options="{ zoomControl: false }"
      @click="createMarker($event)"
      class="!cursor-crosshair"
    >
      <LTileLayer
        url="https://api.lebusmagique.fr/uploads/api/enshrouded/map-tiles/{z}/{x}/{y}.jpg"
        layer-type="base"
        name="Embervale"
        :no-wrap="true"
      />

      <LControl position="topleft">
        <div class="flex flex-col gap-2">
          <div class="flex gap-1" style="zoom: 0.85">
            <label class="btn btn-neutral btn-circle swap swap-rotate">
              <input
                type="checkbox"
                :checked="showGroupsList"
                @change="showGroupsList = !showGroupsList"
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8 swap-off"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8 swap-on"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </label>
            <button @click="setZoom('in')" class="btn btn-neutral btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-7 h-7"
              >
                <path
                  d="M9 6a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 9 6Z"
                />
                <path
                  fill-rule="evenodd"
                  d="M2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Zm7-5.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button @click="setZoom('out')" class="btn btn-neutral btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-7 h-7"
              >
                <path
                  d="M6.75 8.25a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Z"
                />
                <path
                  fill-rule="evenodd"
                  d="M9 2a7 7 0 1 0 4.391 12.452l3.329 3.328a.75.75 0 1 0 1.06-1.06l-3.328-3.329A7 7 0 0 0 9 2ZM3.5 9a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            class="bg-base-200 rounded-box py-3 px-4 w-full max-w-xs text-sm"
            v-show="showGroupsList"
          >
            <div class="flex flex-col gap-1">
              <div class="form-control" v-for="group in data" :key="group.id">
                <label class="label cursor-pointer gap-4 p-0">
                  <span class="flex gap-1 items-center">
                    <img
                      :src="`img/map/${group.id}-symbol.svg`"
                      alt=""
                      class="h-7 w-7"
                    />
                    <span class="label-text">
                      {{ group.name }}
                      <span class="badge badge-neutral badge-xs">{{
                        group.markers.length
                      }}</span>
                    </span>
                  </span>

                  <input
                    type="checkbox"
                    class="toggle toggle-xs toggle-success"
                    :checked="group.visible"
                    @change="group.visible = !group.visible"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </LControl>

      <LLayerGroup name="custom" :visible="true">
        <LMarker
          v-for="(latLng, idx) in customMarkers"
          :key="idx"
          :lat-lng="latLng"
        >
          <LPopup>{{ latLng }}</LPopup>
        </LMarker>
      </LLayerGroup>

      <LLayerGroup
        v-for="group in data"
        :key="group.id"
        :visible="group.visible"
      >
        <LMarker
          v-for="marker in group.markers"
          :key="marker.id"
          :lat-lng="marker.coords"
        >
          <LIcon
            :icon-url="getMarkerIcon(marker, group)"
            :icon-size="[60, 60]"
            :popup-anchor="[0, -25]"
          />
          <LPopup>
            <h4>{{ marker.name }}</h4>
            <div>{{ marker.description }}</div>
            <div class="form-control" v-if="group.checked">
              <label
                class="cursor-pointer label justify-start gap-1 p-0 pt-2 pb-1"
              >
                <input
                  type="checkbox"
                  class="toggle toggle-success toggle-xs"
                  :checked="marker.checked"
                  @change="marker.checked = !marker.checked"
                />
                <span class="label-text">Terminé</span>
              </label>
            </div>
          </LPopup>
        </LMarker>
      </LLayerGroup>
    </LMap>
  </div>
</template>

<style>
.leaflet-popup .leaflet-popup-content-wrapper {
  @apply bg-base-100 text-neutral-content py-2 px-3 rounded-none min-h-8 border border-base-100;
}

.leaflet-popup .leaflet-popup-content {
  @apply m-0 mr-5 text-sm;
}

.leaflet-popup .leaflet-popup-content h4 {
  @apply text-base font-semibold;
}

.leaflet-popup .leaflet-popup-tip {
  @apply bg-base-100;
}

.leaflet-popup .leaflet-popup-close-button {
  @apply !text-lg !bg-neutral rounded-full !text-neutral-content !w-8 !h-8 flex items-center justify-center !-top-2 !-right-2;
}

.leaflet-popup .leaflet-popup-close-button:hover {
  @apply !text-white;
}
</style>
