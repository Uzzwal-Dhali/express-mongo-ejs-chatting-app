function getUsers(req, res, next) {
  res.render("users", {
    title: "All Users"
  })
}

export { getUsers }
