# Description
This repository contains the submission for Round 3 of the Bosch CodeRace competition. The project focuses on implementing a system that enhances safety during road crossings by connecting vehicles and providing real-time notifications and assistance.

## Features
### 1. Crossing Road Detection (No Other Vehicles Nearby): The system silently exchanges GPS signals with the server when the vehicle has not met the crossing road. There are no notifications during this event.

### 2. Approaching Crossing Road (No Other Vehicles Nearby): The system announces on the dashboard that the driver is approaching the crossing road, advising them to focus on the road ahead.

### 3. Approaching Crossing Road (Detecting Another Vehicle Nearby): The system exchanges information with other vehicles and displays a notification on the dashboard to alert the driver about approaching vehicles.
- Case 1: Driver Slows Down and Other Car Slows Down: When the driver slows down and the other car does the same, the driver can safely exit the crossing road. Communication with other vehicles is terminated during this event.

- Case 2: Driver Does Not Slow Down and Detects Potential Collision: If the driver does not slow down and the system detects a potential collision, the ADAS.EBA system is triggered. Alerts are displayed on the dashboard, and the Emergency Braking Assistant system flashes the brakes to allow the driver to focus on handling the situation.

## Usage
### To use the system:
- Go to our mmodel
- Click on dashboard
- Click run

## Costumer Journey
![image](https://github.com/vantoan1511/vantoan1511.github.io/assets/113485058/55022714-3111-497e-b19c-b50e5c387e1e)

## Dashboard
![image](https://github.com/vantoan1511/vantoan1511.github.io/assets/113485058/c992184c-82c5-481c-9914-54435a950599)
