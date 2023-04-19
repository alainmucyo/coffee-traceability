
# Coffee Supply Chain Management
This project is a coffee supply chain management system that handles user registration, login, and management of coffee producers, suppliers, and shipments. It provides secure authentication and allows users to track the movement of coffee shipments through the supply chain.

---

## Getting Started
1. git clone this repository & cd to the project directory

## Pre-requisites

* Nodejs v14 or greater
* Git
* VSCode, Webstorm or even any other code editor of your preferred choice.
* MySQL

## Installing

* Install [Nodejs](https://nodejs.org/en/) if you don't have it installed.

* Install [git](https://www.digitalocean.com/community/tutorials/how-to-contribute-to-open-source-getting-started-with-git)
  , (optional) if you dont have it installed.

* Install [MySQL](https://www.mysql.com)

## Run the project

#### Using VSCode
The instructions below work on both services.
1. Make sure you have both folders,
2. Launch VSCode editor,
3. Make copy of `.env.example` to `.env`,
4. On account service, set your MySQL DB credentials.
5. You can set the `NODE_PORT` you want to use in the `.env` file, if you don't set it, it will run on `3000` by default.
6. Congratulations! You have successfully launched the Coffee Supply Chain Management system!

### Launch with Docker

> For this, you need to have [Docker](https://www.docker.com/) installed in your system.

1. Run `docker build -t <image-name> .` to build the docker image
2. Run `docker run -p 3000:3000 <image-name>` to run the image. This will expose port `3000`


### To check if the API is up and running.

Just call this endpoint: `http://localhost:3000/` using a GET method `SWAGGER` API doc.

## Testing

Run `npm test`

## Built With

* [Nestjs](https://nestjs.com/)
* [Typeorm](https://typeorm.io)

## Licence

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).