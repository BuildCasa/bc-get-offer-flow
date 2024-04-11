/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Given a script source URL, loads the script into the DOM
 * Returns a Promise that resolves when the script has loaded
 */
async function loadScript(src, options = {}) {
  return new Promise(function (resolve, reject) {
    const script = document.createElement('script')
    script.src = src

    if (options.defer) {
      script.defer = true
    } else if (options.async) {
      script.async = true
    }

    script.addEventListener('load', function () {
      resolve()
    })
    script.addEventListener('error', function (e) {
      reject(e)
    })
    document.body.appendChild(script)
  })
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { loadScript }
