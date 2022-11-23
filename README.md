[![Node.js CI](https://github.com/pg6301-fall2022/exam-ArnoldGonczlik/actions/workflows/node.js.yml/badge.svg)](https://github.com/pg6301-fall2022/exam-ArnoldGonczlik/actions/workflows/node.js.yml)

# Exam - ArnoldGonczlik

I want to start off by saying it really hurts to add my .env file to GitHub, 
but I had no other option as I can't add GitHub secrets to a classroom.

- To run my application simply type:
  - npm run first-time
  
Login with username "clarence" for admin access.

* [x] Some form of Login and access control
* [x] Jest tests
* [x] Snapshot tests
* [ ] Simulate + jest.fn
* [x] Supertest
* [x] Github Actions with coverage report
* [ ] Deployment to cloud (in this case, Azure)
* [x] Mongodb
* [x] Navigating in the application using React Router (remember Express Middleware)
* [x] Reading data from the server (remember error handling)
* [x] Writing data to the server
* [ ] Websockets

All in all I ended up being quite proud of my project. I feel like I have some cool functionality that
works as you expect it to. If I have to point out something about my project, it would be that I am 
aware that my code is probably not optimal, and definitely not business logic proof, but it does work
and it is able to showcase a great deal of what I have learned during this course.

- My endpoints:
  - /api/users
    - /checkusername
    - /getuser
    - /createuser
  - /api/menu
    - /allitems
    - /namecontains
    - /additem
    - /deleteitem
    - /edititem

I have not been able to do the entire task. I have yet to add functionality to place an order, and
for the admins to view them. I also have no options to sort the dishes. Besides that I feel like i gain
points on how well I have separated admin/normal users, and where and how functionality is displayed.
It is intended that admins cannot place orders.

