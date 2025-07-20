package controller

import (
	"encoding/json"
	"job-scraping-project/scrapers"
	"net/http"
	"strconv"
)

func contains(slice []string, value string) bool {
	for _, v := range slice {
		if v == value {
			return true
		}
	}
	return false
}

func JobsHandler(w http.ResponseWriter, r *http.Request) {
	// GET method
	if r.Method == http.MethodGet {

		w.Header().Set("Content-type", "application/json")

		keyword := r.URL.Query().Get("keyword")
		pageStr := r.URL.Query().Get("page")
		source := r.URL.Query()["source"]
		if pageStr == "" {
			pageStr = "1"
		}
		page, err := strconv.Atoi(pageStr)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
		}

		// collect data
		var data []scrapers.JobCard
		if len(source) == 0 {
			data = append(data, scrapers.ScrapingJobbkk(keyword, page)...)
			data = append(data, scrapers.ScrapingJobthai(keyword, page)...)
			data = append(data, scrapers.ScrapingJobTH(keyword, page)...)
		} else {
			if contains(source, "jobbkk") {
				data = append(data, scrapers.ScrapingJobbkk(keyword, page)...)
			}
			if contains(source, "jobthai") {
				data = append(data, scrapers.ScrapingJobthai(keyword, page)...)
			}
			if contains(source, "jobth") {
				data = append(data, scrapers.ScrapingJobTH(keyword, page)...)
			}
		}

		// convert to json
		if len(data) != 0 {
			json.NewEncoder(w).Encode(data)
			w.WriteHeader(http.StatusOK)
		} else {
			w.Write([]byte("No data available"))
			w.WriteHeader(http.StatusNoContent)
		}

	}
}
