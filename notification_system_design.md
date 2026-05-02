# Notification System Design

## Stage 1: API Design

For the notification system, we can define some basic endpoints.

GET /notifications  
→ used to fetch notifications for a userr  

POST /notifications  
→ used to create or send a new notification  

Fields in a notification:
- id  
- student_id  
- type (Placement / Event / Result)  
- message  
- createdAt  
- isRead . 

The idea here is to keep things simple so frontend can use it easily without too much confusion. Also naming should be consistent otherwise it might get messy later.

## Stage 2: Database Design

We can use a table called `notifications`.

Columns:
- id (Primary Key)  
- student_id  
- type  
- message  
- createdAt  
- isRead (boolean)  

Indexes:
- student_id (for filtering)
- createdAt (for sorting)

Thiis structure is simple and should work fine even if data increases, atleast for most normal cases.

## Stage 3: Query Optimization

Problem:
Fetching unread notifications might become slow when there is large amount of data.

Solution:
We can add a composite index on:
(student_id, isRead)

Query:

SELECT * FROM notifications  
WHERE student_id = ? AND isRead = false  
ORDER BY createdAt DESC;

This basiocally reduces unnecessary scanning and makes it faster.

## Stage 4: Performance Improvements

Some improvements we can do:

- Pagination (don’t fetch everything at once)  
- Caching (Redis can be used for frequent data)  
- Lazy loading (load more when needed)  
- Sending only required fields  

These changes help reduce load and improve responce time.


## Stage 5: System Reliability Fix

Problem:
When sending notifications to many users, some requests might fail in between.

Solution:
- Usse message queue (RabbitMQ or Kafka)  
- Process things asynchronously  
- Add retry mechanism  
- Use dead-letter queue for failed ones  

Flow:
Request → Queue → Worker → Send  

This makes system more reliable and avoids failures to some extent.


## Stage 6: Implementation

For implementation:
- Notifications are fetched from API  
- Sorted based on priority (Placement > Event > Others)  
- Top 10 notifications are returnedd 

this part was already implemented in the code so not explaining again