# image-processing-API


### Starting endpoint with two links (/api/images and /api/images?filename=fjord&width=200&height=200)
http://localhost:3000/

<br />

### Endpoint where you need to provide missing query parameters
http://localhost:3000/api/images
<br />

### Endpoint with correct parameters
http://localhost:3000/api/images?filename=fjord&width=200&height=200
This will rescale fjord.jpg image to 200x200px and save (if doesn't exist) it to thumb folder (fjord_thumb_200x200.jpg).
Note: For filename query you need to provide some of the following image names:
    - encenadaport
    - fjord
    - icelandwaterfall
    - palmtunnel
    - santamonica

Also, it is very important to provide positiv integers for width and height values

<br />

### Endpoint with wrong filename
http://localhost:3000/api/images?filename=wrong-name&width=200&height=200
Error message: Filename "wrong-name" doesn't exist. Please use one of these filenames: encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica.
Status code: 422

<br />

### Endpoint with wrong width and height (NaN or less then 1)
http://localhost:3000/api/images?filename=fjord&width=0&height=0
Error message: Invalid request: width, height has invalid parameter values. Please use positive integer instead..
Status code: 422

<br />

### Endpoint where filename, width and height has null value
http://localhost:3000/api/images?filename=&width=&height=
Error message: You need to provide missing query parameters: filename, width, height
Status code: 422

<br />

### Endpoint where filename has null value
http://localhost:3000/api/images?filename=&width=200&height=200
Error message: You need to provide missing query parameters: filename
Status code: 422

<br />

### Endpoint where width has null value
http://localhost:3000/api/images?filename=fjord&width=&height=200
Error message: You need to provide missing query parameters: width
Status code: 422

<br />

### Endpoint where height has null value
http://localhost:3000/api/images?filename=fjord&width=200&height=0
Error message: You need to provide missing query parameters: height
Status code: 422

<br />

## NOTE:
Priority is given to errors with null query parameters.