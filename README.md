# MovieIAM
Role based authorization system example

## Installation

MovieIAM requires Node.js to run.

1.Install dependencies
```sh
npm install 
```
2.Run Server
```sh
npm start 

```
You can browse the apis at http://localhost:3000

## API Docs
**1. Authenticate User**
----
  Returns data about user and authentication token.

* **URL:**
  /user/authenticate

* **Method:**
  `POST`
  
* **Parameters**
  
  * **body:** required <br />
    **Example Value:**  `{"username":"User123","password":"Password123"}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />`{
    "username": "user", `<br />
    `"role_name": "Admin", `<br />
    `"token": "eyJhbGciOiJIUzI1NiIsI.eyJuVXNliOiTU2MTQ0MzI3MH0.Zs7m-mB0N_9ksampletoken"
}`
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{"message": "Username or password is incorrect"}`

**2. Get Movie**
----
  Returns data about movie by name.

* **URL:**
  /movie/:moviename

* **Method:**
  `GET`
 
* **Headers:** required <br />
    `Authorization:Bearer token `
 
* **Parameters**
  
  * **URL params:** required <br />
    `moviename=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />`{
        "genre": [
            "Action",
            " Adventure",
            " Fantasy",
            " Sci-Fi"
        ],
        "_id": "5d0f3d8f99ab9c34245c998f",
        "name": "Star Wars",
        "imdb_score": 8.8,
        "director": "George Lucas",
        "popularity": 88,
    }`
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{"message": "Unauthorised"}`

   OR
  
  * **Code:** 401 <br />
    **Content:** `{"message": "Invalid Token"}`
    
   OR
  
  * **Code:** 403 <br />
    **Content:** `{"message": "Cant find movie with this name"}`
    

**3. List Movies**
----
  Returns list of all movies.

* **URL:**
  /movie/list

* **Method:**
  `GET`
 
* **Headers:** required <br />
    `Authorization:Bearer token `
 
* **Parameters**
    None
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />`[
    {
        "genre": [
            "Action",
            " Adventure",
            " Fantasy",
            " Sci-Fi"
        ],
        "_id": "5d0f3d8f99ab9c34245c998f",
        "name": "Star Wars",
        "imdb_score": 8.8,
        "director": "George Lucas",
        "popularity": 88
        
    },
    {
        "genre": [
            "Adventure",
            " Fantasy",
            " Horror"
        ],
        "_id": "5d0f3d8f99ab9c34245c9992",
        "name": "King Kong",
        "imdb_score": 8,
        "director": "Merian C. Cooper",
        "popularity": 80
    }]`
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{"message": "Unauthorised"}`

   OR
  
  * **Code:** 401 <br />
    **Content:** `{"message": "Invalid Token"}`
    
   OR
  
  * **Code:** 403 <br />
    **Content:** `{"message": "Cant find movies"}`
  

**4. Add movie**
----

* **URL:**
  /movie

* **Method:**
  `POST`
 
* **Headers:** required <br />
    `Authorization:Bearer token `
 
* **Parameters**
  
  * **body:** required <br />
    **Example Value:**  `{
    "99popularity": 83.0,
    "director": "Victor Fleming",
    "genre": [
      "Adventure",
      " Family",
      " Fantasy",
      " Musical"
    ],
    "imdb_score": 8.3,
    "name": "test1"
}`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** <br />`{{ message: 'Movie created successfully' }}`
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{"message": "Unauthorised Access"}`

   OR
  
  * **Code:** 401 <br />
    **Content:** `{"message": "Invalid Token"}`
    
   OR
  
  * **Code:** 401 <br />
    **Content:** `{"message": "Invalid request payload"}`

   OR
  
  * **Code:** 409 <br />
    **Content:** `{"message": "Movie already exists with this name"}`
    
    
 **5. Update movie**
----
  
* **URL:**
  /movie/:moviename

* **Method:**
  `PUT`
 
* **Headers:** required <br />
    `Authorization:Bearer token `
 
* **Parameters**
  
  * **URL params:** required <br />
    `moviename=[string]`
  
  * **body:** required <br />
    **Example Value:**  `{
    "director": "Victor Fleming2",
    "genre": [
      "Adventure",
      " Family",
      " Fantasy",
      " Musical",
      "Drama"
    ],
    "imdb_score": 9.3
}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />`{{ message: 'Movie successfully updated' }}`
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{"message": "Unauthorised Access"}`

   OR
  
  * **Code:** 401 <br />
    **Content:** `{"message": "Invalid Token"}`

   OR
  
  * **Code:** 403 <br />
    **Content:** `{"message": "Movie not found with this name"}`
    


 **6. Delete movie**
----
  
* **URL:**
  /movie/:moviename

* **Method:**
  `DELETE`
 
* **Headers:** required <br />
    `Authorization:Bearer token `
 
* **Parameters**
  
  * **URL params:** required <br />
    `moviename=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />`{{ message: 'Movie deleted succesfully' }}`
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{"message": "Unauthorised Access"}`

   OR
  
  * **Code:** 401 <br />
    **Content:** `{"message": "Invalid Token"}`

   OR
  
  * **Code:** 403 <br />
    **Content:** `{"message": "Movie not found with this name"}`
    
    

 **7. Change Policies**
----
  Changes the Roles and permissions of user

* **URL:**
  /policy/:username

* **Method:**
  `PUT`
 
* **Headers:** required <br />
    `Authorization:Bearer token `
 
* **Parameters**
  
  * **URL params:** required <br />
    `username=[string]`
  
  * **body:** required <br />
    **Example Value:**  <br />
    `{`<br />
	  `   "role_name": "Moderators",                          //give role to change `<br />
	  `   "addMovies": ["Oklahoma!","Stagecoach"],            //list movies to grant access`<br />
	  `   "removeMovies": ["The Wizard of Oz","Star Wars"]    //list movies to revoke access `<br />
    `}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />`{{ message: 'Policy Updated Successfully' }}`
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{"message": "unauthorized access to change permissions"}`

   OR
  
  * **Code:** 401 <br />
    **Content:** `{"message": "Invalid Token"}`

   OR
  
  * **Code:** 403 <br />
    **Content:** `{"message": "User does not exist"}`
    
   OR
  
  * **Code:** 403 <br />
    **Content:** `{"message": "Invalid Role name"}`
    
