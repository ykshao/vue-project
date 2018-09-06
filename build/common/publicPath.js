function getBasePath () {
  let src = ''
  if (document.currentScript) {
    src = document.currentScript.src
  } else {
    const script = document.getElementsByTagName('script')
    if (script.length) {
      src = script[script.length - 1].src
    }
  }
  const lastPoint = src.lastIndexOf('/js/')
  if (lastPoint >= 0) {
    src = src.substring(0, lastPoint + 1)
  }
  return src
}

__webpack_public_path__ = getBasePath() // eslint-disable-line
