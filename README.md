# EventTrackerProject

## Overview
This application is used to track purchases, either in person or online, and keeping track of if the purchase has been delivered and latest return date.

#### How to return


### REST API
Go to http://<IP Address>/8080/PurchaseTracker/api/purchases


### HTML/JavaScript Front Learned
Go to http://<IP Address>/8080/PurchaseTracker/index.html

### Angular Front End

### REST API Reference
|Return type       | HTTP Method | URI                                       | Request Body| Reason  |
|------------------|-------------|-------------------------------------------|-------------|---------|
| List \<Purchase\>| GET         | /api/purchases                            |             | List    |
| Purchase         | GET         | /api/purchases/{id}                       |             | Retrieve|
| Purchase         | POST        | /api/purchases                            | Recipe JSON | Create  |
| Purchase         | PUT         | /api/purchases/{id}                       | Recipe JSON | Update  |
| Purchase         | DELETE      | /api/purchases/{id}                       | Recipe JSON | Delete  |
| List \<Purchase\>| GET         | /api/purchases/date/{startDate}/{endDate} |             | List    |
| List \<Purchase\>| GET         | /api/arrivals/date/{startDate}/{endDate}  |             | List    |
| List \<Purchase\>| GET         | /api/return/date/{startDate}/{endDate}    |             | List    |

### Technologies Used

### Lessons Learned
