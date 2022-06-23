
# Image Processing API

![Capture](https://user-images.githubusercontent.com/30799773/175218927-16340288-132b-4d87-8bf5-aecbd4faccc4.PNG)
* An image processing api that's capable of:
   * Fetching required query parameters
   * Guiding user to enter the required valid query parameters
   * Creating & saving new resized images
   * Retrieving cached image if it's already been resized before
   * Testing it's endpoint and functionality

### Tech used:  TypeScript, Express, Node.js, Jasmine<br>

* **URL**
    <a href="#">/api/images?filename={{image-name}}&width={{width}}&height={{height}}</a>

* **Method**
  `GET`
  
* **URL Params**
   * **Required:**
      * `filename=[string]`
      * `width=[number]`
      * `height=[number]`

* **Success Response:**
  * **Code:** 201
    * In case a new resized image was created successfully.
  * **Code:** 200
    * In case a cached image was retrieved successfully.

* **Error Response:**
  * **Code:** 400
    * If queries weren't valid.
  * **Code:** 404
    * If the specified image name was not found in images source directory.


* **Available Scripts:**
  * Build server: ```"build": "npx tsc",``` 
  * Test server:  ```"jasmine": "jasmine",``` 
  * Build & Test: ```"test": "npm run build && npm run jasmine --silent",``` 
  * Start server: ```"start": "node dist/."```


* **Notes:**
  * Server auto creates the destination directory ```thumbs``` in the root directory after the first successful resizing.
  * Image to be resized must exist in ```images``` directory in root directory which pre-contains multiple ```JPG``` images to try them
  * Resizing only works for ```JPG``` image extensions


## Use case: Creates a resized image successfully

Resizes an image named ``fjord`` to become of 1000px width & 1000px height

* **URL:**
<a href="#">/api/images?filename=fjord&width=1000&height=1000</a>

* **Method:**
`GET`
  
* **URL Params**
   * **Required:**
      * `filename=[string]`
      * `width=[number]`
      * `height=[number]`
* **Success Response:**
  * **Code:** 201
    * In case a new resized image was created successfully.
* **Scripts:**
  * ```"start": "node dist/."```  Runs server
* **Notes:**
  * Requesting the same endpoint again will result to status code of 200 OK, because image has been created before and it's just being pulled from disk.


## Optimizations

* **Backlog:**
  * Add additional processing to accept and output other image formats than JPG.
  * Modify the thumbnail filename to include the image size to allow for multiple sizes of the same image.
  * Add in logging to record when images are processed or accessed.
  * Create a front-end for uploading more images to the full-size directory.
  * Create a front-end that displays a thumbnail directory.
  * Create a front-end that allows for the selection of how to process a selected image.


## Lessons Learned:

Learning to do something is one thing, and doing it is a totally different thing. Core Node.js modules like file system & path are a fundmentals to learn
when you first start working with Node, I don't remember how many times I went through them but I remember that when I tried using them in my project
it wasn't any where like reading about them.<br>
This project is my turning point towards **Learning by doing.**
