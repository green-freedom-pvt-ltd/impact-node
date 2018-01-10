

module.exports = function(options) {
  return function(req, res, next) {
    // This is responsible for all authenticatio
    console.log("This request is being autheticated")
    next()
  }
}