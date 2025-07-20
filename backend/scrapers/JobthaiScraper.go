package scrapers

import (
	"strconv"
	"strings"

	"github.com/gocolly/colly"
)

var jobthaiCards []JobCard

func ScrapingJobthai(keywrd string, page int) []JobCard {

	if jobthaiCards != nil {
		jobthaiCards = nil
	}

	keywrd = strings.Join((strings.Split(strings.TrimSpace(keywrd), " ")), "+")
	pageStr := strconv.Itoa(page)

	var scrapeURL string
	if keywrd == "" {
		scrapeURL = "https://www.jobthai.com/หางาน/งานทั้งหมด/" + pageStr
	} else {
		scrapeURL = "https://www.jobthai.com/th/jobs?keyword=" + keywrd + "&page=" + pageStr
	}

	c := colly.NewCollector(colly.AllowedDomains("www.jobthai.com", "jobthai.com"))

	c.OnHTML("a[ga-name]", func(h *colly.HTMLElement) {
		selection := h.DOM
		var tmpCard JobCard
		tmpCard.Title = strings.TrimSpace(selection.Find("div.hcawrC div.gXNyXH h2.hHthyd").Text())
		tmpCard.Company = strings.TrimSpace(selection.Find("div.hcawrC div.gXNyXH span.icuLsB").Text())
		tmpCard.Location = strings.TrimSpace(selection.Find("div.hcawrC div.kjOLtL h3#location-text").Text())
		if tmpCard.Location == "" {
			tmpCard.Location = strings.TrimSpace(selection.Find("div.hcawrC div.kjOLtL span#location-text").Text())
		}
		tmpCard.Salary = strings.TrimSpace(selection.Find("div.hcawrC div.kjOLtL span#salary-text").Text())

		scrapedAttribute := h.Attr("href")
		tmpCard.URL = "https://www.jobthai.com" + scrapedAttribute
		tmpCard.Source = "jobthai.com"

		// fmt.Println(tmpCard.Title + "\n" + tmpCard.Company + "\n" + tmpCard.Location + "\n" + tmpCard.Salary + "\n" + tmpCard.URL + "\n" + tmpCard.Source + "\n")

		jobthaiCards = append(jobthaiCards, tmpCard)
	})

	c.Visit(scrapeURL)

	return jobthaiCards
}
