[![Node.js CI](https://github.com/pg6301-fall2022/exam-ArnoldGonczlik/actions/workflows/node.js.yml/badge.svg)](https://github.com/pg6301-fall2022/exam-ArnoldGonczlik/actions/workflows/node.js.yml)

# Exam - ArnoldGonczlik

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
  - /api/orders
    - /placeorder
    - /getorders

I have not been able to do the entire task. I have no options to sort the dishes, or any allergens for each dish. Besides that I feel like I gain
points on how well I have separated admin/normal users, and where and how functionality is displayed.
It is intended that admins cannot place orders.
I really did end up spending way too much time trying to get Azure to work. I have set up CI to azure, and I did manage to get it packaged, turned into an artifact, uploaded, and saw my task run in the docker service, but in the end I was defeated by one error I could not get past. After being stuck for four hours I had to call it quits. I learned an extreme amount about app services, env variables, docker, devops, workflows and logging. So as a conclusion to this README I will add the error that got me: "2022-11-23T06:21:35.848608184Z npm ERR! code EEXIST
2022-11-23T06:21:35.856260772Z npm ERR! path /home/site/wwwroot/client/node_modules/.bin/prettier
2022-11-23T06:21:35.869933829Z npm ERR! Refusing to delete /home/site/wwwroot/client/node_modules/.bin/prettier: is outside /home/site/wwwroot/client/node_modules/prettier and not a link
2022-11-23T06:21:35.876669506Z npm ERR! File exists: /home/site/wwwroot/client/node_modules/.bin/prettier
2022-11-23T06:21:35.877232712Z npm ERR! Remove the existing file and try again, or run npm
2022-11-23T06:21:35.885937712Z npm ERR! with --force to overwrite files recklessly.
2022-11-23T06:21:36.025819913Z npm timing npm Completed in 251008ms
2022-11-23T06:21:36.026684123Z
2022-11-23T06:21:36.027585933Z npm ERR! A complete log of this run can be found in:
2022-11-23T06:21:36.034471612Z npm ERR!     /root/.npm/_logs/2022-11-23T06_21_35_987Z-debug.log
2022-11-23T06:21:36.092550677Z npm info lifecycle exam-arnoldgonczlik@1.0.0~build:client: Failed to exec build:client script
2022-11-23T06:21:36.103069397Z npm ERR! code ELIFECYCLE
2022-11-23T06:21:36.104270911Z npm ERR! errno 1
2022-11-23T06:21:36.113449416Z npm ERR! exam-arnoldgonczlik@1.0.0 build:client: `cd client && npm install && npm run build`
2022-11-23T06:21:36.114486728Z npm ERR! Exit status 1
2022-11-23T06:21:36.124580043Z npm ERR!
2022-11-23T06:21:36.124597543Z npm ERR! Failed at the exam-arnoldgonczlik@1.0.0 build:client script.
2022-11-23T06:21:36.124603543Z npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
2022-11-23T06:21:36.150382338Z npm timing npm Completed in 252133ms"

