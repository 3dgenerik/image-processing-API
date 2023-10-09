# image-processing-API

### Starting endpoint with two links (/api/images and /api/images?filename=fjord&width=200&height=200)
http://localhost:3000/

### Endpoint where you need to provide missing query parameters
http://localhost:3000/api/images

### Endpoint with correct parameters
http://localhost:3000/api/images?filename=fjord&width=200&height=200

Note: For filename query you need to provide some of the following image names:
    - encenadaport
    - fjord
    - icelandwaterfall
    - palmtunnel
    - santamonica

Also, it is very important to provide positiv integers for width and height values

### Endpoint with wrong filename
http://localhost:3000/api/images?filename=wrong-name&width=200&height=200

Error message: Filename "wrong-name" doesn't exist. Please use one of these filenames: encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica.
Status code: 422