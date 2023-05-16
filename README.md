### Note

- This repo is about scraping medium website . it has many functionalities like
  - There is search bar where user can get blogs based on there search
  - If the 404 error is thrown then there is history bar where you can get past searched tags

### `If you'd like to run in your local machine`

step 1 : Open Terminal

step 2 : git clone https://github.com/rakshith572/medium_web_scraper_node.js.git

step 3 : cd -GoComet_Backend_Assignment

step 4 : npm install

step 5 : assign your mongoDB URI for the variable "MONGO_URI" in .env file

step 6 : node app.js

step 7 : open http://localhost:5000/ to view in your browser

### `working`
app.js - Handle the incoming requests like /search/:tag(search for tag) ,  /blog/:id(return blogs with id), /history(get past searched tags)

connect.js - connects to MongoDB

getBlog.js - gets the blog with given id . If the Blog is in database then we will not make addition request to medium.com

getBlogWithtag.js - returns the list of blog results by scraping medium.com . If we previously searched for the blogs we do not need to make additional request

getHistory.js = return past searched history

schema.js - schema for blogs of searched tag

schemaBlog.js - schema for information of blogs

schemaHistory.js - schma for past searched tags

### `ER Diagram`

![Screenshot (36)](https://github.com/rakshith572/-GoComet_Backend_Assignment/assets/70801081/d8f254e9-72f4-4d29-b5b1-4a36eb97f040)




