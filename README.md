# end-project-MERN-bank-api

MERN app for bank crud, with database management, and some ML features

technologies: MERN, handwriting OCR with a python script, and face recognition with faceapi.js.

features:

- manage bank database and transactions, with 3 main collections: clients, bacnkaccounts, and tansactions log history.
- manage login for the bank manager with webcam login.
- manage input with either keyboard or stylus pen, in two languages: hebrew and english.

implementation notes:

- the mern app backend will seat on mongodb atlas cloud.
- the pictures will seat on the coud too for now. in case the memory will exeed the 500mb permitted, I'll find another solution.
- authentication - first part is to study the authentication with tokening, and then think about maybe authenticating transactions with the client face -
  only if the program will have also a part for the client login. need to consider this, and also the implocations on the database usage limits.
- the OCR will be written in python and then connected to the backend.(still need to figure out how)'

current timeline:

- today: finding the way to use the handwriting ocr, and integrate it correctly to the node app.
- maybe make the program choose between languages based on the input. (can it be done?)
- fixing all bugs in the backend in the original bank project.
  getting it approved by the staff after I can show them it's possible.

# MERN-boilerplate-restapi

fullstack simple rest-api with mongodb(as mongoose), and express routing in nodejs. simple UI with react, and deploy in heroku

content:

- server side with restapi - MVC style bankapi. 3 routers, models, and controllers - for the client transaction and bankAccount collections.
- client - simple UI for the api with react app and axios for the requests.

demo: https://mern-app-boilerplate.herokuapp.com/
