<script lang="ts" setup>
const map = ref(false)
const radius = ref(5)
const store = useStore()

const catchmentStores = ref()
const catchmentList = computed(() => {
  if (!catchmentStores.value) return []
  return catchmentStores.value["catchment_area"][store.activeLocation]
})
const catchmentListCoords = computed(() => {
  return catchmentList.value.map((locName: string) => {
    const subwayIndex = store.storeData.findIndex(
      (loc: any) => locName == loc.name
    )
    return store.storeData[subwayIndex]["info"]["coordinates"]
  })
})

const url = "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
const subdomains: String | String[] | undefined = ["mt0", "mt1", "mt2", "mt3"]

onMounted(() => {
  setTimeout(() => {
    dispatchEvent(new Event("resize"))
    map.value = true
  }, 0)
})

watchDeep(
  [() => store.location, radius],
  async () => {
    catchmentStores.value = await $fetch("/api/getCatchment", {
      headers: {
        radius: `${radius.value}`,
        loc_name: store.activeLocation,
      },
    })
  },
  { immediate: true }
)
</script>

<template>
  <div class="w-full pb-10">
    <div v-show="map" class="w-[100%] h-[50vh] px-5">
      <LMap
        ref="mapRef"
        :use-global-leaflet="false"
        :options="{ attributionControl: false }"
        :zoom="12"
        :center="store.location"
      >
        <LTileLayer
          :url="url"
          :subdomains="subdomains"
          :minZoom="2"
          :noWrap="true"
          :maxZoom="22"
        />
        <LMarker
          v-if="catchmentList"
          :latLng="coords"
          v-for="coords in catchmentListCoords"
          :key="coords"
        />
        <LMarker :latLng="store.location" />
        <LCircle
          :latLng="store.location"
          :radius="radius * 1000"
          :opacity="0.3"
        />
      </LMap>
    </div>
    <div class="mt-3 flex items-center justify-end">
      <div>
        Radius (km):
        <q-input
          class="w-[100px]"
          v-model.number="radius"
          filled
          type="number"
        />
      </div>
    </div>
  </div>
</template>
