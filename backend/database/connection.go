package database

import (
	"job-scraping-project/models"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	dsn := "host=localhost user=postgres password=JorJayDB dbname=UsersDB port=5432 sslmode=disable TimeZone=Asia/Bangkok"

	DB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Database connection failed to initialize")
		return
	}

	DB.AutoMigrate(models.User{})
}
