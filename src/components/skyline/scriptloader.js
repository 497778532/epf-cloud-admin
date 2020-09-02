function loadScriptAsyncEx(url) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script')
    script.id = encodeURI(url)
    script.type = 'text/javascript'
    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
    script.onload = function () {
      resolve()
    }
    script.onerror = function () {
      reject()
    }
  })
}

function removeScriptAsyncEx(url) {
  return new Promise(function (resolve, reject) {
    var script = document.getElementById(encodeURI(url))
    if (script) {
      document.getElementsByTagName('head')[0].removeChild(script)
      resolve()
    } else {
      reject()
    }
  })
}

export {
  loadScriptAsyncEx,
  removeScriptAsyncEx
}
