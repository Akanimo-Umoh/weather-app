# Frontend Mentor - Weather App Solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Live Link](#live-link)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Search for weather information by entering a location in the search bar
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between Imperial and Metric measurement units via the units dropdown 
- Toggle between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./src/design/desktop-design-metric.jpg)

### Live Link

[Check the live site here](https://weather-app-seven-eta-32.vercel.app/)

## My process

### Built with

- Vite + React
- Tailwind CSS
- Shadcn UI components
- TypeScript
- Axios for API calls
- Open Meteo API
- Accessibility features (ARIA, keyboard navigation)

### What I learned

- Working with the Open Meteo API was challenging at first, but I got the hang of it by reading the API docs.
- Implemented full accessibility support with ARIA roles and keyboard navigation.
- Learned how to integrate Tailwind, Shadcn components, and React state management in a complex UI project.

### Continued development

- Improve state management for a cleaner architecture.
- Enhance accessibility even further with more detailed ARIA labeling and focus management.

### Useful resources

- [Open Meteo API Documentation](https://open-meteo.com/) - For fetching weather data.
- YouTube tutorials by Thomas Sankara for general frontend development inspiration.

## Author

- Website - [Akanimo Umoh](https://akanimo-umoh.vercel.app)
- Frontend Mentor - [@Akanimo-Umoh](https://www.frontendmentor.io/profile/Akanimo-Umoh)
- Twitter - [@Umoh____](https://www.twitter.com/umoh____)

## Acknowledgments

- Thanks to Open Meteo API for providing a reliable and free weather data source.
- Inspired by various tutorials and documentation that helped me handle API calls, accessibility and UI state management.
