function getLogin(req, res, next) {
  res.render("index", {
    title: "Login Here"
  })
}

export { getLogin }
