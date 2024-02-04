export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const secret = config.secret
  const question = getRequestHeader(event, "question")

  const query = new URLSearchParams({
    question: question ?? "",
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
