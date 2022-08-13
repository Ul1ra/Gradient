# How to view this Gradient
* This full stack application was done in 1 week by a team of 4 people including me, so it's not finished, it worked better before this version
* This project is a clone-like Instagram SPA where you can login and create an account, see your friends and posts that you create with your profile
* Gradient was built on the Gitlab CI/CD pipeline with a runner through a Nginx server on a droplet on DigitalOcean


## What you will need (I use a linux distro, so please Google how to install the following on your machine):
- npm & Node.js
- Docker Engine
- Python 3

## Instructions
1. `git clone https://github.com/Ul1ra/Gradient` or git@github.com:Ul1ra/Gradient.git
2. cd to the frontend/ folder and `npm install`
3. Return to the Gradient/ folder and `docker build -t fusion-backend:latest .`
4. Now do `docker-compose up -d` in the same folder
5. Return to frontend/ folder and enter `npm start`

## Further Viewing
* If you would like to Login to the website, the Email JWT doesn't work anymore, but you could create a user if logged into the backend docker volume:
  1. In the terminal enter the following `docker exec -ti gradient-backend bash`
  2. Now to create a user type the following into the terminal `python manage.py createsuperuser`
      - Follow the step (doesn't have to be your real one). You may get an error, but it will still work
  3. Go back on the`localhost:3000/` and on the top right, hit the 'Login' button
  4. Once logged in, you can create a Restaurant, fill all the required fields and click 'Create' 
  5. Now click on Restaurants and see your Restaurant there.



### To close the docker volumes, just do the following:
* To stop the docker volumes, just enter `docker-compose down` and they will stop 
