package controller

import (
	"encoding/json"
	"job-scraping-project/scrapers"

	"net/http"
)

var jobCards []scrapers.JobCard

func HandlerInit(data []scrapers.JobCard) {
	jobCards = data
}

func JobsHandler(w http.ResponseWriter, r *http.Request) {
	JobJSON, err := json.Marshal(jobCards)
	if r.Method == http.MethodGet {
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
		}
		w.Header().Set("Content-type", "application/json")
		w.Write(JobJSON)
	}
}
