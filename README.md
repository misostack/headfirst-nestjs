# NestJS

## Sample Project

> CS2 : https://github.com/misostack/roadmap 
> 
> Project name : CRM Software
> 
> - Manage **customers**
> - Manage **marketing campaigns**(**email**, facebook posts) with analytics based on GA
> - Online support: **Q&A**, **Discusion**, Chat Application & Service
> - Blog with posts and categories
> - Support Multilanguage

> The system have the following parts : 
> - A website : server side rendering
> - An API Service
> - An Admin Web Application: manage things customers, marketing campaigns, Q&A, **system users**, settings, ...
> - A web application for Online Support

> Analyze: 
> - In a discussion, there is a lot **comments** from customers
> - The chat application support direct chat by creating a room(**chat room**) for **employees** and a customer

## REST API Design Pattern

1. Identity Object Model

- Customer
- Employee
- Marketing Campaign
- **Question** and Answer ( answer is value object )
- Discussion
- Comment
- Chat Room
- System user

2. Create Model URIs ( uniform resource identifier )

> HTTP Methods

**GET**

- Retreive the data from a server at a specified resource.

> How to test GET? At a basic level, these things should be validated
> - A valid GET request returns a 200 status code
> - Ensure that a GET request to a specific resource returns the correct data. For example, GET /users returns a list of users.
> - GET is often the default method in HTTP clients, so creating tests for these resources should be simple with any tool you choose.

**POST**

- In web services, POST requests are used to **send data to the API server** to 
**create** or **update** resource. The data sent to the server is stored in the
**request body** of the HTTP Request.
- The data can be JSON, XML, or query parameters and etc ...
- It's worth noting that a **POST** request is **non-idempotent**

> How to test **POST** request? 
> - Create a resource with a **POST** request and ensure a **200** status is returned
> - Next, make a **GET** request for that resource
> - Add tests that ensure **POST** request fail with incorrect or ill-formatted data


```xml
POST /articles HTTP/1.1
<article>
    <title>blue stapler</title>
    <price currency="eur">7.50</price>
</article>

HTTP/1.1 201 Created
Location: /articles/63636
```

**PUT**

- Similar to POST, **PUT** requests are used to send data to the API to create or update a resource. The difference is that **PUT requests are idempotent** 

- HEAD
- DELETE
- PATCH
- OPTIONS

## Refs

### Typescript

- https://www.typescriptlang.org/docs/handbook/decorators.html

> - Class Decorator
> - Method Decorator
> - Property Decorator
> - Parameter Decorator

### REST APIs

- https://restfulapi.net/rest-api-design-tutorial-with-example/#object-model
- http://restcookbook.com/HTTP%20Methods/idempotency/
- https://assertible.com/blog/7-http-methods-every-web-developer-should-know-and-how-to-test-them
- https://nordicapis.com/understanding-idempotency-and-safety-in-api-design/
- https://blog.runscope.com/posts/6-common-api-errors
- https://assertible.com/blog/4-common-api-errors-how-to-test-them
- https://www.moesif.com/blog/api-guide/api-design-guidelines/

## Words

> Idempotence : When performing an operation again gives the same results