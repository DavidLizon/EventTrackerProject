# EventTrackerProject

## Overview
At this time this application is used to track the purchase, arrival (if ordered online), and return date of a purchase as well as what store the purchase was made from. The application also tracks if the purchase has arrived and if the return date of the purchase has passed. You are able to create new purchases and update previous purchases as timelines change and purchases arrive.

#### How to return


### REST API
Go to http://<IP Address>/8080/PurchaseTracker/api/purchases


### HTML/JavaScript Front Learned
Go to http://<IP Address>/8080/PurchaseTracker/index.html

### Angular Front End

### REST API Reference
|Return type       | HTTP Method | URI                                                 | Request Body| Reason   |
|------------------|-------------|-----------------------------------------------------|-------------|----------|
| List \<Purchase\>| GET         | /api/purchases                                      |             | List     |
| Purchase         | GET         | /api/purchases/{id}                                 |             | Retrieve |
| Purchase         | POST        | /api/purchases                                      | Recipe JSON | Create   |
| Purchase         | PUT         | /api/purchases/{id}                                 | Recipe JSON | Update   |
| Purchase         | DELETE      | /api/purchases/{id}                                 | Recipe JSON | Delete   |
| List \<Purchase\>| GET         | /api/purchases/date/{startDate}/{endDate}           |             | List     |
| List \<Purchase\>| GET         | /api/purchases/arrivals/date/{startDate}/{endDate}  |             | List     |
| List \<Purchase\>| GET         | /api/purchases/return/date/{startDate}/{endDate}    |             | List     |
|---------------------------------------------------------------------------------------------------------------|
| List \<Store\>   | GET         | /api/store/{storeId}                                |             | List     |
| List \<Store\>   | GET         | /api/"stores/{nameLike}"                            |             | Retrieve |
| store            | Post        | /api/store                                          | Recipe JSON | Create   |
| store            | Put         | /api/store/{id}                                     | Recipe JSON | Update   |


### Technologies Used
+ mySQL workbench, mySQL, JPA / Hibernate / JPQL, Java, Spring MVC Boot, Github, Gradel, Postman

### Lessons Learned
With this project the biggest lesson I learned was that of planning. I had planned and laid out the tables and columns prior to the start of the project and that planning really helped with being able to set up the project easily. That setup allowed me to focus and work through how the repository, service, serviceImple, and controller interacted together. With that added time and understanding I was able to quickly identify problems when testing the GET, PUT, POST, and DELETE functions with Postman.
