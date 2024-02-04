export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const secret = config.secret
  const header = getRequestHeaders(event)
  const question = header["question"]
  const location = header["location"]

  const query = new URLSearchParams({
    question: question ?? "",
    location: location ?? "",
  })

  const response = await fetch(config.backendURL + `/ask?${query}`, {
    method: "GET",
    headers: {
      Authorization: secret,
    },
  })

  const answer = await response.json()
  return answer
})
