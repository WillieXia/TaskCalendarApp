export default function parseError(err) {
  let displayError = ''
  if (err.response && err.response.data && err.response.data.error) {
    displayError = err.response.data.error
  } else {
    displayError = 'An unknown error occured'
  }
  return displayError
}