<script lang="ts" setup>
const { enter } = useMagicKeys()
const search = ref("")
const answer = ref()

watch(enter, async (v) => {
  if (v && search.value !== "") {
    answer.value = await $fetch("/api/runModel", {
      headers: {
        question: search.value,
        location: useStore().activeLocation,
      },
    })

    answer.value = answer.value ? answer.value["response"] : "No answer found"

    search.value = ""
  }
})

watch(answer, async () => {
  // If answer.length is larger than 0, wait 5 seconds and clear the answer
  if (answer.value) {
    setTimeout(() => {
      answer.value = null
    }, 7000)
  }
})
</script>

<template>
  <div class="w-full">
    <q-input
      standout="bg-secondary"
      type="search"
      label="Ask me!"
      v-model="search"
    >
      <template v-slot:append>
        <q-btn>
          <q-icon name="search" />
        </q-btn>
      </template>
    </q-input>
    <q-card v-show="answer">
      <q-card-section>
        <strong>Answer:</strong>
        <p>{{ answer }}</p>
      </q-card-section>
    </q-card>
  </div>
</template>
