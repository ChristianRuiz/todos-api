FROM node:10
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --pure-lockfile
# If you are building your code for production
# Copy app source
COPY . .

# Build and run app
CMD yarn start