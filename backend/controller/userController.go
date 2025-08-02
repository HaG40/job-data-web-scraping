package controller

import (
	"encoding/json"
	"errors"
	"job-scraping-project/database"
	"job-scraping-project/models"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Register(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

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
			http.Error(w, "โปรดกรอกข้อมูลให้ครบถ้วน", http.StatusBadRequest)
			return
		}

		// Hash the password
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			http.Error(w, "The task can't be completed", http.StatusInternalServerError)
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

	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	type LoginRequest struct {
		EmailOrUsername string `json:"user"`
		Password        string `json:"password"`
	}

	if DB == nil {
		db := database.Connect()
		DB = db
	}

	if r.Method == http.MethodPost {

		var loginRequest LoginRequest
		if err := json.NewDecoder(r.Body).Decode(&loginRequest); err != nil {
			http.Error(w, "Invalid JSON: "+err.Error(), http.StatusBadRequest)
			return
		}

		if loginRequest.EmailOrUsername == "" || loginRequest.Password == "" {
			http.Error(w, "โปรดกรอกข้อมูลให้ครบถ้วน", http.StatusBadRequest)
			return
		}

		var user models.User
		authenticateUser := DB.Where("email = ? OR username = ?", loginRequest.EmailOrUsername, loginRequest.EmailOrUsername).First(&user)
		if authenticateUser.Error != nil {
			if errors.Is(authenticateUser.Error, gorm.ErrRecordNotFound) {
				http.Error(w, "ไม่พบอีเมลล์/ชื่อผู้ใช้ หรือ รหัสผ่าน", http.StatusNotFound)
				return
			} else {
				http.Error(w, "เกิดข้อผิดพลาด", http.StatusInternalServerError)
				return
			}
		}

		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginRequest.Password)); err != nil {
			http.Error(w, "รหัสผ่านไม่ถูกต้อง", http.StatusBadRequest)
			return
		}

		claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.RegisteredClaims{
			Issuer:    strconv.Itoa(int(user.ID)),
			Subject:   "user_" + user.Username,
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		})

		secret := os.Getenv("SECRET_KEY")
		if secret == "" {
			log.Fatal("Secret key is not set")
			return
		}

		token, err := claims.SignedString([]byte(secret))
		if err != nil {
			http.Error(w, "Token generation failed", http.StatusInternalServerError)
			return
		}

		http.SetCookie(w, &http.Cookie{
			Name:     "access-token",
			Value:    token,
			HttpOnly: true,
			Secure:   true,
			Path:     "/",
			SameSite: http.SameSiteLaxMode,
			MaxAge:   int(time.Now().Add(time.Hour * 24).Unix()),
		})

		user.Password = ""
		w.Header().Set("Content-Type", "application/json")
		// json.NewEncoder(w).Encode(user)
		json.NewEncoder(w).Encode(token)
		w.WriteHeader(http.StatusOK)

	} else {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}
}

func User(w http.ResponseWriter, r *http.Request) {

	type Profile struct {
		Username    string `json:"username"`
		Email       string `json:"email"`
		Description string `json:"description"`
	}

	if r.Method == http.MethodGet {
		userID, valid := r.Context().Value("userID").(string)
		if !valid {
			http.Error(w, "User ID not found in context", http.StatusInternalServerError)
			return
		}

		userIDString, err := strconv.ParseUint(userID, 10, 64)
		if err != nil {
			http.Error(w, "Invalid User ID", http.StatusBadRequest)
			return
		}

		var user models.User
		findUser := DB.First(&user, userIDString)
		if findUser.Error != nil {
			http.Error(w, "User ID not found", http.StatusNotFound)
			return
		}

		var profile Profile
		profile.Username, profile.Email, profile.Description = user.Username, user.Email, user.Description

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(profile)
		w.WriteHeader(http.StatusOK)

	} else {
		http.Error(w, "Only GET allowed", http.StatusMethodNotAllowed)
		return
	}
}

func ProtectedHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		userID, valid := r.Context().Value("userID").(string)
		if !valid {
			http.Error(w, "User ID not found in context", http.StatusInternalServerError)
			return
		}
		w.Write([]byte("User ID " + userID + " authorized"))
		w.WriteHeader(http.StatusOK)
	} else {
		http.Error(w, "Only GET allowed", http.StatusMethodNotAllowed)
		return
	}
}

func Logout(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		http.SetCookie(w, &http.Cookie{
			Name:     "access-token",
			Value:    "",
			HttpOnly: true,
			Secure:   true,
			Path:     "/",
			SameSite: http.SameSiteLaxMode,
			MaxAge:   -1,
		})

		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Logged out"))
	} else {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}
}
