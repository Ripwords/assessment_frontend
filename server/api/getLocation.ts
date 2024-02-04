export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const secret = config.secret
  const response = await fetch(config.backendURL + "/get-subway-locations", {
    method: "GET",
    headers: {
      Authorization: secret,
    },
  })

  const locations = await response.json()
  return locations
})
