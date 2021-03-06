const fs = require('fs')
const {
  getNodeDirByMeta,
  linkPath,
  ensureArchCorrect,
  getLocalVersions,
} = require('./utils')

function use(version, isChakraCore, arch) {
  // TODO: Find match version
  // 8 -> latest added 8.x.x
  arch = ensureArchCorrect(arch)
  const nodePath = getNodeDirByMeta(version, isChakraCore, arch)

  // Check if version exists
  if (!fs.existsSync(nodePath)) {
    console.log(`${version} ${arch} is not added`)
    console.log(`Run \`nn add ${version}\` to add it before using it.`)
  } else {
    try {
      fs.unlinkSync(linkPath)
    } catch (err) {}

    fs.symlinkSync(nodePath, linkPath, 'junction')
    console.log(`Now using node ${version} ${arch}`)
  }
}

module.exports = { use }
