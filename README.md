
# Spring Weather App

The Weather App is a simple web application that allows users to retrieve and display current weather information for a specific location. It consists of a backend built with Spring Boot and a frontend built with React, Vite, and Tailwind CSS.

Live Frontend: [https://spring-weather-frontend.vercel.app/](https://spring-weather-frontend.vercel.app/)

Live API Endpoint: [https://weather-4syw.onrender.com/api/weather?location=london](https://weather-4syw.onrender.com/api/weather?location=london)

## Features

- Enter a location and retrieve current weather data
- Display temperature, humidity, and wind speed for the selected location

## Prerequisites

Before running the application, ensure that you have the following installed:

- Java Development Kit (JDK)
- Node.js and npm (Node Package Manager)
- Docker (optional, for running the backend using Docker)

## Getting Started

### Backend Setup

#### Option 1: Running Without Docker

1. Clone the repository: `git clone https://github.com/mshivam019/spring-weather-app`
2. Navigate to the backend directory: `cd spring-weather-app`
3. Set the OpenWeatherMap API key as an environment variable:
   - Linux/Mac: `export API_KEY=<your_api_key>`
   - Windows: `set API_KEY=<your_api_key>`
4. Build the backend: `./mvnw clean package`
5. Run the backend: `./mvnw spring-boot:run`

The backend server will start running on `http://localhost:8081`.

#### Option 2: Running with Docker

1. Clone the repository: `git clone https://github.com/mshivam019/spring-weather-app`
2. Navigate to the backend directory: `cd spring-weather-app`
3. Build the Docker image: `docker build -t weather-app-backend .`
4. Run the Docker container:
   - Linux/Mac: `docker run -p 8081:8081 -e API_KEY=<your_api_key> -e PORT=8081 weather-app-backend`
   - Windows (PowerShell): `docker run -p 8081:8081 -e API_KEY=<your_api_key> -e PORT=8081 weather-app-backend`

The backend server will start running on `http://localhost:8081`.

### Frontend Setup
1. Clone the repository: `git clone https://github.com/mshivam019/spring-weather-frontend` 
2. Navigate to the frontend directory: `cd spring-weather-frontend`
3. Install dependencies: `npm install`
4. Start the frontend development server: `npm run dev`

The frontend server will start running on `http://localhost:5173`.

## Usage

1. Open your web browser and navigate to `http://localhost:5173`.
2. Enter a location in the search input.
3. Click the "Search" button to retrieve the current weather data for the specified location.
4. The temperature, humidity, and wind speed will be displayed on the page.

