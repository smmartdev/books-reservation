# NestJS + MariaDB Project

This project is designed to test how NestJS connects and interacts with MariaDB.

## Getting Started

Follow these steps to get the project up and running:

# Setup MariaDB on Windows

Follow these steps to install and configure MariaDB on Windows:

## 1. **Download MariaDB**  
Go to the official MariaDB website: [https://mariadb.org/download/](https://mariadb.org/download/) and download the Windows installer.

## 2. **Install MariaDB**  
Run the installer and follow the instructions. During the installation, ensure that you select the following components:
- **MariaDB Server**
- **MariaDB Client**
- **MariaDB Tools** (optional but recommended)

You will be prompted to set a password for the **root** user during the installation. Make sure to remember this password as it will be required to access the MariaDB server later.

## 3. **Start MariaDB Server**  
Once the installation is complete, MariaDB should automatically start. If it's not started, you can manually start it by:
1. Opening a **Command Prompt** window.
2. Navigate to this folder:
```bash
   C:\Program Files\MariaDB 11.7\bin
```
3. Typing the following command and pressing Enter:

```bash
   mysql -u root -p
```
4. If you can see "MariaDB [(none)]>" in the propmt this means Mariadb is working well.
5. Exit mariaDB by typing exit.
```bash
   exit
```



1. **Clone the Project**  
   Clone this repository to your local machine:
   ```bash
   git clone https://github.com/smmartdev/test-nestjs-mariadb-crud.git
   ```

2. **Install Dependencies**  
   Install the required dependencies:
   ```bash
   npm install
   ```

3. **Start the Application**  
   Run the application:
   ```bash
   npm run start
   ```

4. **Test the Endpoints**  
   Use Postman or the `.rest` file to test the endpoints.

## Run the project using docker image
#### Step 1: Build the Docker image
docker build -t nestjs-app .

#### Step 2: Run the Docker container and map port 3000 to your local machine
docker run -p 3000:3000 nestjs-app



## Author

**Ahmad Alhirthani**
