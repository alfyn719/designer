const fetchFileText = async (
  path: string,
) => {
  const response = await fetch(path)
  const { ok, status } = response

  if (!ok) {
    throw new Error(`maskResource - fileTextFetcher: fetch file with the entry ${path}, Status: ${status}`)
  }

  return response.text()
}

export {
  fetchFileText,
}
