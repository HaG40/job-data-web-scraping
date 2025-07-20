package main

import (
	"net/http"
)

func main() {
	router.setUpRoutes()
	http.ListenAndServe(":8888", nil)
}
