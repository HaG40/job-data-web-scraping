package controller

import (
	"encoding/json"
	"errors"
	"job-scraping-project/database"
	"job-scraping-project/models"
	"net/http"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Register(w http.ResponseWriter, r *http.Request) {

	if DB == nil {
		db := database.Connect()
		DB = db
	}

	if r.Method == http.MethodPost {
		var user models.User
		if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
			http.Error(w, "Invalid JSON: "+err.Error(), http.StatusBadRequest)
			return
		}

		if user.Username == "" || user.Email == "" || user.Password == "" {
			http.Error(w, "All fields are required", http.StatusBadRequest)
			return
		}

		// Hash the password
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			http.Error(w, "Failed to hash password", http.StatusInternalServerError)
			return
		}
		user.Password = string(hashedPassword)

		if err := DB.Create(&user).Error; err != nil {
			http.Error(w, "Database error: "+err.Error(), http.StatusInternalServerError)
			return
		}

		user.Password = ""
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(user)
		w.WriteHeader(http.StatusOK)

	} else {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

}

func Login(w http.ResponseWriter, r *http.Request) {

	if DB == nil {
		db := database.Connect()
		DB = db
	}

	if r.Method == http.MethodPost {

		type Input struct {
			EmailOrUsername string `json:"user"`
			Password        string `json:"password"`
		}
		var input Input
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid JSON: "+err.Error(), http.StatusBadRequest)
			return
		}

		var user models.User
		doesExist := DB.Where("email = ? OR username = ?", input.EmailOrUsername, input.EmailOrUsername).First(&user)
		if doesExist.Error != nil {
			if errors.Is(doesExist.Error, gorm.ErrRecordNotFound) {
				w.WriteHeader(http.StatusNotFound)
			} else {
				w.WriteHeader(http.StatusInternalServerError)
			}
		}

		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
			w.WriteHeader(http.StatusBadRequest)
		}

		user.Password = ""
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(user)
		w.WriteHeader(http.StatusOK)

	} else {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}
}
