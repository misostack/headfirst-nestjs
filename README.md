# NestJS

## Sample Project

> Project Name: Lol Ranking System API

> **Audience Users**:
>
> - Register, Login, Reset Password, Change Password, Update Email, Update profile
> - Add to favorites: league, club, player
> - Votes for : leagues, clubs, players
> - Comments on : match details page, club pages
> - Add friends

> **Club Users**:
> 
> - Register, Login, Reset Password, Change Password, Update Email, Update profile
> - Manage players: CRUD
> - Manage matches: CRUD
> - Manage matches: CRUD, games, match results
> - Manage games: CRUD
> - Manage locations

> **System Users**:
> 
> - Manage **Users** and **System Users**
> - Manage **Groups** and **Permissions**
> - Manage leagues: CRUD
> - Manage clubs: CRUD
> - Manage champions: CRUD
> - Auth: Login, Reset Password, Change Password, Update Email or Profile
> - System Settings

### Design

1.Entities

- User
- League
- Club
- Player
- Match
- Game
- Location

2.Model URIs

**Version 1**
- Prefix : v1

**Users**

- Document: /users/{id} /users/member /users/system
- Collection : /users
-

```javascript
GET /users
GET /users/{id}
POST /users
PUT /users/{id}
POST /users/register
POST /users/login
GET|POST /users/logout
```

## Ok, so where to start

- https://github.com/misostack/cs1-headfirst-angular/tree/test/ddd-sample
- https://www.avatto.com/study-material/software-engineering-cohesion
- https://docs.nestjs.com/techniques/authentication
- https://developers.google.com/admin-sdk/directory/v1/guides/manage-roles
- https://auth0.com/docs/api/management/guides/apis/enable-rbac

```json
{
    "base": [
        {
            "services": [
                "LogService",
                "MailService",
                "PDFService",
                "QueueService",
                "ScheduleService"
            ]
        }
    ],
    // ranking feature module
    "modules": [
        {
            "base": [
                {
                    "models": [
                        "PDFTemplate" // Entity
                        "PDFReport" // Entity
                    ],
                    "services": [
                        "MailService",
                        "LogService",
                        "PDFService",
                    ],
                }
            ]
        },
        {
            "web": [
                // controllers base dir
                {
                    "controllers": [
                        // /web : display logo with welcome message
                        {"home": ["index"]}
                        // /web/pdf/:templateId ==> view html template with mock data                        
                        // /web/pdf/:templateId/:reportId ==> view html template with report data
                        {"pdf": ["index", "report"]}

                    ]
                },
                // views base dir : hbs or ejs ( prefered esj )
                {
                    "views": [
                        "index.hbs",
                        "pdf.hbs",
                        "pdf-report.hbs",
                    ]
                },
                // dev assets base dir
                {
                    "assets": [
                        "webpack",
                        "scss",
                        "js",
                        "images",
                    ]
                }
                // public assets base dir
                { 
                    "public": [
                        // .gitignore this folder
                        // each build, need to compile assets
                        {
                            "dist": ["style.css", "main.js", "images"]
                        },
                    ] 
                },
            ]
        },
        {
            "rbac": [
                {
                    "models": {
                        "RoleBaseDTO": [
                            "UserTypes : Constant"
                            "RoleBaseResourceAccess(resource) : Decorator"
                            "RoleBaseResourceAccessPolicy : Service"
                        ],
                        "RoleBaseResourceAccess": [
                            {
                                "me": [
                                    {
                                        "default": {
                                            "privileges": ['ME_RETRIEVE', 'ME_UPDATE', 'ME_DELETE'],
                                            "fields": ['firstName','lastName', 'email'],
                                        }                                
                                    }
                                ],
                                "users": [
                                    {
                                        "default": {
                                            "privileges": ['USERS_RETRIEVE'],
                                            "fields": ['id', 'firstName','lastName','email']
                                        },
                                        "admin": {
                                            "privileges": ['USERS_RETRIEVE', 'USERS_CREATE','USERS_UPDATE','USERS_DELETE'],
                                            "fields": [...USERS_AVAILABLE_FIELDS]
                                        },                                       
                                    }
                                ],
                                "settings": [
                                    {
                                        "admin": {
                                            "privileges": ['SETTINGS_ALL']
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        {
            "base": [
                {
                    "controllers": [
                        "base"
                    ]
                }
            ]
        }
        {
            "user": [
                {
                    "middlewares": [
                        "AuthMiddleWare" // load user and permissions
                    ],
                    "controllers": [
                        "auth",
                        "users"
                    ],
                    "models": [                                                
                        "User", // entity
                        "UserDTO", // class: AudienceUser, ClubUser, SystemUser
                        "UserService", // allow CRUD, search
                        "AuthService", // allow login/logout/forget-password/reset-password
                        // Facades: 
                        // - Interact with application layers. Eg: controller
                        // - Interact with system layers. Eg: MailService
                        "UserFacade",
                        "AuthFacade",
                    ],
                }
            ]
        }
        {
            "example": [
                { 
                    "controllers": [
                        // collection
                        "categories",
                        "items",
                        // store
                        // favorites/{userId}/categories
                        // favorites/{userId}/items
                        "favorites"
                    ],
                    "models": [
                        "Category", "Item", // entity
                        "CategoryDTO", "ItemDTO", // class
                        "CategoryService", "ItemService", // allow CRUD, Search
                        // facades
                        "CategoryFacade",
                        "ItemFacade",
                    ] 
                }
            ]
        }
    ]
}
```

**Design Patterns**:

- https://www.javatpoint.com/factory-method-design-pattern

**Definition**:

- https://github.com/misostack/ezsystemdesign

**Template Engine**:

- https://handlebarsjs.com/guide/#installation
- https://ejs.co/#install

**Sum up**

1. Login

> Use POST
> return what you need

```json
POST /api/v1/users/login
Content-Type: application/json
Accept : application/json
{"userid" : "admin1", "password" : "pswd"}
// Success
{
    "token_type": "bearer",
    "access_token": "{a JWT token}",
    "expired_in": 3600, // seconds
    "refresh_token": "a random hashed which stored in db",
}

// Error
Status Code : 401 Unauthorised
{
    "code":401,
    "error":"invalid_token",
    "error_description":"The access token provided has expired."
}
```

2. Logout

**From IBM**

- https://www.ibm.com/support/knowledgecenter/SSWPVP_4.0.0/com.ibm.sklm.doc/reference/ref/ref_ic_rest_service.html
- Login : https://www.ibm.com/support/knowledgecenter/SSWPVP_4.0.0/com.ibm.sklm.doc/reference/ref/ref_ic_rest_login_service.html
- Logout : https://www.ibm.com/support/knowledgecenter/SSWPVP_4.0.0/com.ibm.sklm.doc/reference/ref/ref_ic_rest_logout_service.html

**Log out with JWT?**

- https://medium.com/devgorilla/how-to-log-out-when-using-jwt-a8c7823e8a6

> If we need a strict logout
> The idea is creating a blacklist tokens that has TTL option on documents which would be set to the amount of time left until the token is expired. **Redis** is a good option for this, that will allow fast in memory access to the list. Then in middleware authorized, we can check if the provided token is in **The Blacklist**

**Why need the blacklist tokens?**

- When we need to invalidate all the current user's JWT tokens. Eg: when a user change his/her authentication's identity or password. Or a system need to support strict logout.

3. Refresh Token

- https://medium.com/quick-code/jwt-access-and-refresh-token-with-vapor-3-85a0aee5291b
- https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/

**Some refs**:

- https://dzone.com/articles/four-most-used-rest-api-authentication-methods
- https://stackoverflow.com/questions/36294359/is-logout-useless-on-a-rest-api
- https://backendless.com/docs/rest/users_logout.html
- https://rocket.chat/docs/developer-guides/rest-api/authentication/logout/
- https://documentation.commvault.com/commvault/v11/article?p=45754.htm
- https://docs.bmc.com/docs/ars1902/authentication-and-permissions-in-the-rest-api-847208964.html
- https://dzone.com/articles/four-most-used-rest-api-authentication-methods
- https://www.ibm.com/support/knowledgecenter/SSWPVP_4.0.0/com.ibm.sklm.doc/reference/ref/ref_ic_rest_logout_service.html
- https://www.apiopscycles.com/rest-api-design-guide

## Public vs Private APIs

- https://stackoverflow.com/questions/3231570/excluding-private-data-in-restful-response
- https://spectrum.chat/graphql/general/splitting-a-graphql-api-between-public-private~d84a2d9c-e052-422f-aedc-21c0ecc642eb
- https://dev.to/paurakhsharma/flask-rest-api-part-3-authentication-and-authorization-5935
- https://dev.to/paurakhsharma/flask-rest-api-part-5-password-reset-2f2e

## Final Project

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

**URIs**

> - URI = scheme "://" authority "/" path [ "?" query ] [ "#" fragment ] 
> - Forward slash separator (/) must be used to indicate a hierarchical
relationship
> - A trailing forward slash (/) should not be included in URIs
> - Hyphens (-) should be used to improve the readability of URIs
> - Underscores (_) should not be used in URIs
> - Lowercase letters should be preferred in URI paths
> - File extensions should not be included in URIs

**URI Authority Design**

> - **Consistent subdomain names** should be used for your APIs : The top-level domain and first subdomain names (e.g., soccer.restapi.org) of an API
should identify its **service owner**
> - The full domain name of an API should add a sub-
domain named api.Eg: http://api.soccer.restapi.org
> - Consistent subdomain names should be used for your client **developer
portal**. Many REST APIs have an associated website, known as a developer portal, to help on-board new clients with documentation, forums, and self-service provisioning of secure
API access keys. If an API provides a developer portal, by convention it should have a
subdomain labeled developer. Eg : **http://developer.soccer.restapi.org**


**Archtypes**

> - A REST API is composed of four distinct resource archetypes: **document**, **collection**, **store**, and **controller**
> - In order to communicate a **clear and clean** **resource model** to its clients,
a REST API should **align** each resource with **only one** of these arche-
types

1. **Document**

> - A **document**’s state representation typically includes both **fields with values** and
**links to other related resources**.
> - Document type is the **conceptual base archetype** of the other resource archetypes.
> - The three other resource archetypes can be viewed as specializations of
the document archetype.

> A document may have child resources that represent its specific subordinate concepts.
With its ability to bring many different resource types together under a single parent,
a document is a logical candidate for a REST API’s root resource, which is also known
as the docroot. Eg: http://api.blog.ezapi.site

```javascript
http://api.blog.ezapi.site/categories/rest-api/posts/headfirst-restapi
http://api.blog.ezapi.site/categories/rest-api/posts/headfirst-restapi/comments/1
```

2. **Collection**

> A collection resource is a **server-managed directory of resources**

> Clients may propose new resources to be added to a collection. However, it is up to the collection to choose to create a new resource, or not. A collection resource chooses what it wants to contain and also decides the URIs of each contained resource.

```javascript
http://api.blog.ezapi.site/categories
http://api.blog.ezapi.site/categories/rest-api/posts
http://api.blog.ezapi.site/categories/rest-api/posts/headfirst-restapi/comments
```

3. **Store**

> A store is a **client-managed resource repository**

> A store resource lets an API client put resources in, get them back out, and decide when to delete them

> On their own, stores do not create new resources; therefore a store never generates new URIs. Instead, each stored resource has a URI that was chosen by a client when it was initially put into the store

```javascript
PUT /users/123/favorites/headfirst-restapi
```

4. **Controller**

> A controller resource models a **procedural concept**. Controller resources are like exe-cutable functions, with parameters and return values; inputs and outputs

> REST API relies on controllerresources to perform application-specific actions that cannot be logically mapped to one of the standard methods ( create, retrieve, update and delete, aka CRUD)

> Controller names typically appear as the last segment in a URI path, with no child
resources to follow them in the hierarchy. The example below shows a controller re-
source that allows a client to resend an alert to a user:

```javascript
POST /alerts/245743/resend
```

**Identifier Design with URIs**


> WRML diagram of a URI’s associated resource model

```javavascript
{collection-c}/{store-s}/{document-d}

It means "c" contains "s" which stores "d"
```

**Rules**

- A **singular noun** should be used for **document names**

> /categories/rest-api

- A **plural noun** should be used for **collection names**

> /categories

- A **plural noun** should be used for **store names**

> /artists/bigbang/playlists

- A **verb or verb phrase** should be used for **controller names**

> /users/register
> /categories/123/copy

> - **Variable path segments** may be substituted with **identity-based values**

> /categories/{categoryId}/posts/{postId}/comments/{commentId}

> A REST API’s clients must consider URIs to be the only meaningful
resource identifiers. Although other backend system identifiers (such as
database IDs) may appear in a URI’s path, they are meaningless to client
code. By establishing URIs as the only IDs, a REST API’s backend im-
plementation may evolve over time without impacting its existing
clients.

> - **CRUD function names** should **not be used in URIs**

> For example, this API interaction design is preferred:

```javascript
DELETE /users/1234
```

> The following anti-patterns exemplify **what not to do:**

```javascript
GET /deleteUser?id=1234
GET /deleteUser/1234
DELETE /deleteUser/1234
POST /users/1234/delete
```

> URI Query Design

```javascript
http://api.ezapi.site/users/misostack/send-sms
http://api.ezapi.site/users/misostack/send-sms?text=hello
```

> - **The query component** of a URI may be used to **filter collections or stores**

```javascript
GET /customers
GET /customers?email=leesanghyok
```

> - **The query component** of a URI should be used to **paginate collection or store results**

```javascript
GET /customers?pageSize=25&pageStartIndex=50
```

> - When the complexity of a client’s pagination (or filtering) requirements exceeds the
simple formatting capabilities of the query part, consider designing a special controller
resource that partners with a collection or store

```javascript
GET /customers/search
```


## Design steps

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
**create** a new resource **with-in collection** or **execute controllers**. The data sent to the server is stored in the **request body** of the HTTP Request.
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

- Similar to POST, **PUT** requests are used to send data to the API to **add a new resource to store** or **update a resource**. The difference is that **PUT requests are idempotent**

- When a client needs to replace an existing Resource entirely, they can use PUT.

> How to test **PUT** request? 

> - Repeatedly cally a PUT request always returns the same result 
> - After updating a resource with a PUT request, a GET request for that resource should return the new data
> - PUT requests should fail if invalid data is supplied in the request -- nothing should be updated

**PATCH**

- When clients want to do a partial update, they can use HTTP PATCH.

> How to test **PATCH** request?

> - A successful PATCH request should return a 2xx status code.
> - PATCH requests should fail if invalid data is supplied in the request -- nothing should be updated.

**DELETE**

- The DELETE method is exactly as it sounds: delete the resource at the specified URL. This method is one of the more common in RESTful APIs so it's good to know how it works.

> If a new user is created with a POST request to /users, and it can be retrieved with a GET request to /users/{{userid}}, then making a DELETE request to /users/{{userid}} will completely remove that user.

> How to test **DELETE** request?

> - Create a new user with a POST request to /users
> - With the user id returned from the POST, make a DELETE request to /users/{{userId}}
> - A subsequent GET request to /users/{{userId}} should return a 404 not found status code.
> - Sending a DELETE request to an unknown resource should return a non-200 status code.

**HEAD**

- The HEAD method is almost identical to GET, except without the response body. In other words, if GET /users returns a list of users, then HEAD /users will make the same request but won't get back the list of users.

> It's worth pointing out that not every endpoint that supports GET will support HEAD - it completely depends on the API you're testing.


> Testing an API with HEAD requests

- Making API requests with HEAD methods is actually an effective way of simply verifying that a resource is available. It is good practice to have a test for HEAD requests everywhere you have a test for GET requests (as long as the API supports it)

> - Verify and check HTTP headers returned from a HEAD request
> - Make assertions against the status code of HEAD requests
> - Test requests with various query parametesr to ensure the API responds

> Another useful case for HEAD requests is API smoke testing - make a HEAD request against every API endpoint to ensure they're available.
> Eg : https://rollout.io/blog/add-post-deploy-smoke-tests-to-any-codeship-pipeline/

**OPTIONS**

- Return data describing what other methods and operations the server supports at the given URL

```bash
curl -i -X OPTIONS http://api.blog.ezapi.site/categories
```

> How to test OPTIONS request?

> - Primarily, check the response headers and status code of the request
> - Test endpoints that don't support OPTIONS, and ensure they fail appropriately

## Refs

### Books should be read

- REST API Design Rulebook

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
- https://www.restapitutorial.com/lessons/httpmethods.html
- https://www.baeldung.com/http-put-patch-difference-spring
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD
- https://www.restapitutorial.com/lessons/httpmethods.html

### Interesting topics

- - https://docs.microsoft.com/en-us/onedrive/developer/rest-api/concepts/http-verb-tunneling?view=odsp-graph-online
- https://softwareengineering.stackexchange.com/questions/171412/rest-api-rule-about-tunneling

> For example, if the DELETE verb is blocked by a firewall, your application can tunnel the verb to the API to ensure that your app can still delete a file.

> But then a lot of frameworks use tunneling to expose REST interfaces via HTML forms, since <form> knows only about GET and POST. My most recent example is a MethodRewriteMiddleware for flask (submitted by the author of the framework): http://flask.pocoo.org/snippets/38/.

```http
POST /drive/items/{item-id} HTTP/1.1
Host: api.onedrive.com
X-HTTP-Method-Override: DELETE
```

## Words

> Idempotence : When performing an operation again gives the same results
> WRML : Web Resource Modeling Language


## NestJS

- DB : https://docs.nestjs.com/techniques/database
- Migration : https://blog.theodo.com/2019/05/an-overview-of-nestjs-typeorm-release-your-first-application-in-less-than-30-minutes/
- https://sequelize.org/v5/manual/migrations.html
- https://typeorm.io/#/migrations
- https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f
- https://github.com/Theodo-UK/nestjs-admin
- https://kscerbiakas.lt/nest-js-migrations-in-typeorm/
- https://codersera.com/blog/how-to-integrate-dotenv-with-nestjs-and-typeorm/
- https://stackoverflow.com/questions/53207719/migrations-been-added-to-root-folder-not-migration-folder
- https://stackoverflow.com/questions/47861633/versioning-nestjs-routes
- https://trilon.io/blog/nestjs-swagger-4-whats-new
- https://dev.to/itnext/adding-live-documentation-to-your-rest-api-with-swagger-and-nest-js-211e
- https://stackoverflow.com/questions/59368042/how-to-enable-nestjs-swagger-4-x-plugin

## Nest Router

- https://github.com/nestjsx/nest-router

## API Docs

- https://docs.nestjs.com/recipes/swagger

##  Hooks

- https://requestbin.com/?gclid=Cj0KCQjwjcfzBRCHARIsAO-1_OqTv7UUZe8L9HJgdBAmi21-_vagcTq7xPCR9ahM19KF74z63tbIhOAaAoaCEALw_wcB
- https://codeburst.io/whats-a-webhook-1827b07a3ffa
- https://webhook.site/#!/eccb700d-b8a0-4043-b4f1-7649d7755276
- https://zapier.com/blog/what-are-webhooks/
- https://coconut.co/how-to-create-webhooks
- http://www.ultrahook.com/

# Ref

0. Rapid

- https://github.com/lujakob/nestjs-realworld-example-app/tree/master/src/article

1. DTO && Validations

**Example**

- User Entity fields:
- Ref : https://stackoverflow.com/questions/20958/list-of-standard-lengths-for-database-fields
- https://www.codemag.com/Article/2001081/Nest.js-Step-by-Step-Part-3-Users-and-Authentication
- https://stackoverflow.com/questions/59544204/nestjs-hashing-password
- https://tea.ch/article/authentication-with-passport-jwt/
- https://github.com/lujakob/nestjs-realworld-example-app/blob/master/src/article/article.entity.ts
- https://jameshalsall.co.uk/posts/why-soft-deletes-are-evil-and-what-to-do-instead
- https://docs.nestjs.com/recipes/cqrs

> Let the database do it jobs, so forget about soft-deletes, use Audit Log instead
> 
> - https://github.com/varunon9/audit-logging-framework

```php
<?php
 
class GroupManager
{
    // ...
 
    public function delete(Group $group)
    {
        $this->orm->remove($group);
        $this->eventDispatcher->dispatch('entity_deleted', new EntityDeleteEvent($group));
        $this->orm->flush();
    }
 
    // ...
}


class AuditLogListener
{
    // ...

    public function onEntityDelete(EntityDeletedEvent $event)
    {
        $entity = $event->getEntity();
        $content = $this->serializer->serialize($entity);

        $currentUser = $this->security->getCurrentUser();

        $auditEntry = new AuditEntry();
        $auditEntry->setContent($content)
                   ->setUser($currentUser)
                   ->setEntityClass(get_class($entity))
                   ->setCreated(new \DateTime());

        $this->auditManager->createEntry($auditEntry);
    }
    
    // ...
}

```

```json
[
    {"id": [int, auto_increment, PK]},
    {"email": [string, required, isEmail, unique, length(320)]},
    {"username": [string, not_required, unique, length(60)]}
    {"firstName": [string, required, length(50),]}
    {"lastName": [string, required, length(50),]}
    {"password": [string, required, length(50)]} // required but do not store in DB, let it empty
    {"passwordHash": [string]},
    {"isActive": [true|false]}, // means this user exists but not activated, admin can als active/deactivate user
    //
    {"createdAt": [timestamp, auto]}, // means this user exists but not activated, admin can als 
    {"updatedAt": [timestamp, auto]}    
]
```

- Hash Lib : https://www.npmjs.com/package/bcrypt
- Strategy:
```
- Find user find identity( email, active: )
- If not exists return error
- If exists, check hashed(inputPassword) === user.passwordHash
```

# Roadmap

## S0

- Setup common things: application structure, routes sample

## S1

> /api/users

- [ ] Define Routes - 1h
- [ ] Define Models-DTO - 1h
- [ ] Define Sample Data for all endpoints - 1h
- [ ] Define Models-Entity - 1h
- [ ] Define Models-Service - 1h
- [ ] Define Models-Facade - 1h
- [ ] Define DB Migration - 1h
- [ ] Define DB Seed - 1h
- [ ] Integrate all - 1h
- [ ] Update API Doc - 1h
- [ ] Test by CURL - 1h
- [ ] Test with Postman - 1h

==> Average : 12 hours/resources without RABC, unit tests, integration tests

## S2

> /api/auth

- [ ] Define Routes
- [ ] Define Models-DTO
- [ ] Define Sample Data for all endpoints
- [ ] Define Models-Entity
- [ ] Define Models-Service
- [ ] Define Models-Facade
- [ ] Define DB Migration ( in case needed )
- [ ] Update API Doc
- [ ] Test by CURL
- [ ] Test with Postman

## S3

> RABC

## Deployment

- https://medium.com/@liangjunjiang/deploy-nestjs-app-into-production-ecbb313278ee
- https://stackoverflow.com/questions/53939919/what-is-the-right-way-of-production-deployment-of-nestjs-application
- https://www.joshmorony.com/deploying-a-production-nestjs-server-on-heroku/
- https://www.joshmorony.com/category/nest-js-tutorials
- https://dev.to/carlillo/part-7-deploy-backend-nestjs-dockerdocker-compose-3cmb
- https://dev.to/antogarand/deploying-a-nestjs-application-on-aws-beanstalk-4no1