# Step 1: Use official Node.js image with version 18.17.1 as base
FROM node:18.17.1 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install the dependencies inside the container
RUN npm install

# Step 5: Copy the rest of your project files to the container
COPY . .

# Step 6: Build the NestJS app
RUN npm run build

# Step 7: Set the environment variable for production (optional)
ENV NODE_ENV=production

# Step 8: Expose the port the app will run on
EXPOSE 3000

# Step 9: Run the application
CMD ["npm", "run", "start"]
