# we are using nodejs as base image (its a basic source to run application)
FROM node:22

# we are creating a directory just like mkdir app
WORKDIR /app

# copying the files (package.json and package-lock.json) to current directory(/app)
COPY package*.json .

# installing the dependency(create a node_modules folder) into directory(/app)
RUN npm install

# copying all the files and folder to app directory
# 1st dot is for all files and folder 
# 2nd dot is for current directory
COPY . .

# providing env variables
ENV PORT=5000

# PORT expose so that system can send request to docker so that it can give response
EXPOSE 5000

# to run code we have to pass the start command in cmd
CMD [ "node","index.js" ]

# if we create a script in package.json
# CMD [ "npm","start" ]

# docker build -t app . -> building the app named image in docker
# docker run -p 5000:5000 app -> it run the docker application -> it will show no reflection if you do any changes in the current file