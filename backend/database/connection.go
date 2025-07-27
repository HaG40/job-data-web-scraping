package database

import (
	"job-scraping-project/models"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect() *gorm.DB {
	dsn := "host=localhost user=postgres password=JorJayDB dbname=UsersDB port=5432 sslmode=disable TimeZone=Asia/Bangkok"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Database connection failed to initialize")
		return nil
	}

	db.AutoMigrate(models.User{})

	return db
}
