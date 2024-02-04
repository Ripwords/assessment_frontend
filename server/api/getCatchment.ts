export default defineEventHandler(async (event) => {
  const headers = getRequestHeaders(event)
  const locName = headers["loc_name"]
  const radius = headers["radius"]
  const config = useRuntimeConfig()

  const query = new URLSearchParams({
    distance: radius ?? "0",
    store_name: locName ?? "",
  })

  const catchment = await fetch(
    config.backendURL + `/get-catchment-area?${query}`,
    {
      method: "GET",
      headers: {
        Authorization: config.secret,
      },
    }
  )

  const response = await catchment.json()

  return response
})
