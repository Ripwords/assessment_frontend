<script lang="ts" setup>
const store = useStore()

const subwayIndex = computed(() => {
  return store.storeData.findIndex(
    (loc: any) => store.activeLocation == loc.name
  )
})

const navigationLinks = computed(() => {
  // Get the directions for the active location

  return store.storeData[subwayIndex.value]["direction"]
})

const redirect = (link: string) => {
  window.open(link, "_blank")
}
</script>

<template>
  <Center class="mb-3 p-3">
    <q-card>
      <q-card-section class="text-h6">
        {{ store.activeLocation }}
      </q-card-section>
      <div class="px-5">
        <strong>Address:</strong>
        <div>
          {{ store.storeData[subwayIndex]["info"]["address"] }}
        </div>
        <br />
        <strong>Operating Hours:</strong>
        <div
          v-for="i in store.storeData[subwayIndex]['info']['operating_hours']"
          :key="i"
        >
          {{ i }}
        </div>
      </div>
      <q-card-actions class="flex justify-end">
        <q-btn @click="redirect(navigationLinks['waze'])">
          <Icon size="24" name="mdi:waze" />
        </q-btn>
        <q-btn @click="redirect(navigationLinks['gmap'])">
          <Icon size="24" name="logos:google-maps" />
        </q-btn>
      </q-card-actions>
    </q-card>
  </Center>
</template>
