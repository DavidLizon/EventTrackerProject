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
|Return type       | HTTP Method | URI                                                 | Request Body| Reason  |
|------------------|-------------|-----------------------------------------------------|-------------|---------|
| List \<Purchase\>| GET         | /api/purchases                                      |             | List    |
| Purchase         | GET         | /api/purchase/{id}                                  |             | Retrieve|
| Purchase         | GET         | /api/purchases/{keyword}                            |             | Retrieve|
| Purchase         | POST        | /api/purchases                                      | Recipe JSON | Create  |
| Purchase         | PUT         | /api/purchases/{id}                                 | Recipe JSON | Update  |
| Purchase         | DELETE      | /api/purchases/{id}                                 | Recipe JSON | Delete  |
| List \<Purchase\>| GET         | /api/purchases/date/{startDate}/{endDate}           |             | Retrieve|
| List \<Purchase\>| GET         | /api/purchases/arrivals/date/{startDate}/{endDate}  |             | Retrieve|
| List \<Purchase\>| GET         | /api/purchases/return/date/{startDate}/{endDate}    |             | Retrieve|
| List \<Store\>   | GET         | /api/store/{storeId}                                |             | Retrieve|
| List \<Store\>   | GET         | /api/"stores/{nameLike}"                            |             | Retrieve|
| store            | Post        | /api/store                                          | Recipe JSON | Create  |
| store            | Put         | /api/store/{id}                                     | Recipe JSON | Update  |




### Technologies Used
+ mySQL workbench, mySQL, JPA / Hibernate / JPQL, Java, Spring MVC Boot, Github, Gradel, Postman, Angular, HTML, CSS

### Lessons Learned
With this project the biggest lesson I learned was that of planning. I had planned and laid out the tables and columns prior to the start of the project and that planning really helped with being able to set up the project easily. That setup allowed me to focus and work through how the repository, service, serviceImpl, and controller interacted together. With that added time and understanding I was able to quickly identify problems when testing the GET, PUT, POST, and DELETE functions with Postman.

Dynamically creating using HTML and retrieving the data using an XMLHttpRequest was exciting and fun. I had a difficult time with the project having to deal with two tables. The biggest problem I had was getting values from one table to be used with another table while using GET requests with XMLHttpRequest. Parsing the responseText in the XMLHttpRequest and passing the data to a function worked well and I was able to iterate over the objects in the function but I was unable to use those objects outside of that function. I tried creating/creating and declaring a variable to store the data in both inside and outside of that function but any time I tried to use that variable outside of the function the contents became undefined. I suspect the problem has to deal with variable hoisting but everything I tried was unsuccessful. I really enjoyed dynamically creating elements and pages. My understanding of how to that works and increased greatly but I was not able to delve deeper or clean up the code due to hitting severe roadblock with not being able to access the data from the other table. Although it was difficult and time consuming it definitely made me appreciate and see the value in being able to use Angular to work with creating and manipulating the front-end.

Having a short introduction to Angular I believe I did pretty well working with and creating the front end. I ran into several issues with the syntax and format for passing/reading an object but with a little finesse I was able to work through the issue. The one thing that gave me the hardest time was implementing a datepicker and formatting the data from that object to a string to be passed back to the database. Even though I wasn't able to get all the functionality working or stying done that I wanted to for the project I believe I learned more by getting to work through the object and datepicker obstacles.
