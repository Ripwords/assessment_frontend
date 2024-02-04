<script lang="ts" setup>
const store = useStore()
const isMobile = ref(false)
const drawer = ref(false)
const filterResult = ref("")
const showIndex = computed(() => {
  // Filter the subway locations based on the search input lower cased
  if (filterResult.value == "")
    return store.storeData.map((loc: any) => loc.name)
  return store.storeData
    .filter((loc: any) =>
      loc.name.toLowerCase().includes(filterResult.value.toLowerCase())
    )
    .map((loc: any) => loc.name)
})

const { data: locations } = await useFetch("/api/getLocation")
store.storeData = locations.value
store.activeLocation = locations.value[0]["name"]
store.location = [
  locations.value[0]["info"]["coordinates"]["lat"],
  locations.value[0]["info"]["coordinates"]["lng"],
]

const updateSubway = (locName: string) => {
  store.activeLocation = locName

  // Get coordinates from the new active subway
  const subwayIndex = store.storeData.findIndex(
    (loc: any) => store.activeLocation == loc.name
  )

  const coords = store.storeData[subwayIndex]["info"]["coordinates"]
  store.location = [coords["lat"], coords["lng"]]
}

onMounted(async () => {
  isMobile.value = useQuasar().platform.is.mobile ?? false
  drawer.value = !isMobile.value
})
</script>

<template>
  <q-layout
    container
    view="hHh Lpr lff"
    class="h-[100vh] shadow-2 rounded-borders"
  >
    <q-header class="shadow-1 bg-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          name="menu"
          icon="menu"
          color="dark"
          @click="drawer = !drawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      bordered
      no-swipe-open
      :width="200"
      :breakpoint="640"
    >
      <q-item>
        <q-item-section>
          <Center> Subway Locations (KL) </Center>
        </q-item-section>
      </q-item>
      <q-input
        v-model="filterResult"
        type="search"
        filled
        label="search"
      ></q-input>
      <q-scroll-area class="fit relative">
        <q-list v-if="locations.length > 0">
          <q-separator />
          <template v-for="loc in locations" :key="loc.name">
            <q-item
              :class="showIndex.includes(loc.name) ? '' : 'hidden'"
              active-class="bg-[#6fbfa895] text-black"
              :active="loc.name == store.activeLocation"
              clickable
              v-ripple
              @click="updateSubway(loc.name)"
            >
              <q-item-section> {{ loc.name }} </q-item-section>
            </q-item>
            <q-separator
              :class="showIndex.includes(loc.name) ? '' : 'hidden'"
            />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page>
        <VitePwaManifest />
        <Home />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
