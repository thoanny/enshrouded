<script setup>
import { ref } from "vue";

const seoTitle = "Carte interactive";
const seoDescription =
  "Tous les points importants de la carte : tours des Anciens, puits d'élixir, sanctuaires de la Flamme, salles creuses, donjons, cryptes, grottes, mines...";

defineOgImageComponent("EnshroudedSeo", {
  headline: "Boîte à outils",
  title: seoTitle,
  description: seoDescription,
  icon: "/map-seo-img.png",
});

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
});

const modal = ref();
const modalContent = ref({
  type: null,
  data: null,
});
const map = ref();
const zoom = ref(4);
const zoomMin = 3;
const zoomMax = 6;
const customMarkers = ref([]);
const showGroupsList = ref(true);
const userMarkers = ref([]);

const addMarker = ref(false);

const createMarker = (e) => {
  console.log([e.latlng.lat, e.latlng.lng]);
  if (!addMarker.value) return;
  customMarkers.value.push(e.latlng);
};

const API = "https://api.lebusmagique.fr";

const { data } = await useFetch(`${API}/api/enshrouded/map`);

const getMarkerIcon = (marker, group) => {
  const markerChecked = userMarkers.value.indexOf(marker.uid) >= 0;
  if (marker.iconUrl) {
    if (markerChecked && marker.iconCheckedUrl) {
      return `${API}/${marker.iconCheckedUrl}`;
    }

    return `${API}/${marker.iconUrl}`;
  }

  if (group.iconUrl) {
    if (markerChecked && group.iconCheckedUrl) {
      return `${API}/${group.iconCheckedUrl}`;
    }
    return `${API}/${group.iconUrl}`;
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

const openModal = (type, data) => {
  modalContent.value = { type, data };
  modal.value.showModal();
};

const closeModal = () => {
  modalContent.value.type = null;
};

const updateUserMarkers = (uid) => {
  const idx = userMarkers.value.indexOf(uid);
  if (idx >= 0) {
    userMarkers.value.splice(idx, 1);
  } else {
    userMarkers.value.push(uid);
  }

  localStorage.setItem("map-user-markers", JSON.stringify(userMarkers.value));
};

onMounted(() => {
  const localUserMarkers = localStorage.getItem("map-user-markers");
  if (localUserMarkers) {
    userMarkers.value = JSON.parse(localUserMarkers);
  }
});
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
      class="!cursor-crosshair outline-none"
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
            <label
              class="btn btn-neutral btn-circle swap swap-rotate"
              v-if="data"
            >
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
            v-if="data"
            v-show="showGroupsList"
          >
            <div class="flex flex-col gap-1">
              <div class="form-control" v-for="group in data" :key="group.id">
                <label class="label cursor-pointer gap-4 p-0">
                  <span class="flex gap-1 items-center">
                    <img
                      :src="`${API}/${group.iconMenuUrl}`"
                      alt=""
                      class="h-7 w-7"
                      v-if="group.iconMenuUrl"
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
        :key="group.uid"
        :visible="group.visible"
      >
        <LMarker
          v-for="marker in group.markers"
          :key="marker.uid"
          :lat-lng="[marker.posX, marker.posY]"
          :options="{ riseOnHover: true }"
        >
          <LIcon
            :icon-url="getMarkerIcon(marker, group)"
            :icon-size="[60, 60]"
            :popup-anchor="[0, -25]"
          />
          <LPopup>
            <div
              class="aspect-video w-full relative flex items-center justify-center cursor-pointer"
              @click="openModal('video', marker.video)"
              v-if="marker.video"
            >
              <span
                class="btn btn-neutral btn-circle relative z-20 text-white no-animation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-6 h-6"
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
              </span>
              <img
                :src="`https://i3.ytimg.com/vi/${marker.video}/maxresdefault.jpg`"
                alt=""
                class="object-cover absolute w-full h-full z-10"
              />
            </div>
            <div
              class="aspect-video w-full relative flex items-center justify-center cursor-pointer"
              @click="
                openModal(
                  'image',
                  `${API}/media/cache/960x540${marker.imageUrl}`
                )
              "
              v-else-if="marker.imageUrl"
            >
              <span
                class="btn btn-neutral btn-circle relative z-20 text-white no-animation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-6 h-6"
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
              </span>
              <img
                :src="`${API}/media/cache/384x216${marker.imageUrl}`"
                alt=""
                class="object-cover absolute w-full h-full z-10"
              />
            </div>

            <div class="py-2 px-3">
              <h4>{{ marker.name }}</h4>
              <div v-if="marker.description">{{ marker.description }}</div>
              <div class="form-control" v-if="group.checked">
                <label
                  class="cursor-pointer label justify-start gap-1 p-0 pt-2 pb-1"
                >
                  <input
                    type="checkbox"
                    class="toggle toggle-success toggle-xs"
                    :checked="userMarkers.indexOf(marker.uid) >= 0"
                    @change="updateUserMarkers(marker.uid)"
                  />
                  <span class="label-text">Terminé</span>
                </label>
              </div>
            </div>
          </LPopup>
        </LMarker>
      </LLayerGroup>
    </LMap>
  </div>
  <dialog ref="modal" class="modal">
    <div class="modal-box max-w-4xl p-0 overflow-hidden border border-neutral">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle absolute right-2 top-2"
          @click="closeModal"
        >
          ✕
        </button>
      </form>
      <iframe
        width="560"
        height="315"
        class="w-full h-full aspect-video"
        :src="`https://www.youtube-nocookie.com/embed/${modalContent.data}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        v-if="modalContent.type === 'video'"
      ></iframe>
      <img
        :src="modalContent.data"
        alt=""
        v-else-if="modalContent.type === 'image'"
      />
      <div class="py-2 px-3" v-else>Error</div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="closeModal">close</button>
    </form>
  </dialog>
</template>

<style>
.leaflet-popup .leaflet-popup-content-wrapper {
  @apply bg-base-100 text-neutral-content rounded-none min-h-8 border border-base-100 min-w-80 max-w-80;
}

.leaflet-popup .leaflet-popup-content {
  @apply m-0 text-sm !w-full;
}

.leaflet-popup .leaflet-popup-content h4 {
  @apply text-base font-semibold;
}

.leaflet-popup .leaflet-popup-tip {
  @apply bg-base-100;
}

.leaflet-popup .leaflet-popup-close-button {
  @apply hidden !text-lg !bg-neutral rounded-full !text-neutral-content !w-8 !h-8 flex items-center justify-center !-top-2 !-right-2 z-30;
}

.leaflet-popup .leaflet-popup-close-button:hover {
  @apply !text-white;
}

.leaflet-marker-icon {
  @apply outline-none;
}
</style>
