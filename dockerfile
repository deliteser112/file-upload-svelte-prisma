# Use an official Node.js image as the base image
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files into the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Build the app for production (if needed)
RUN npm run build

# Command to run the app when the container starts
CMD ["npm", "run", "preview"]