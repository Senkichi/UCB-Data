from bs4 import BeautifulSoup
import requests
import pymongo
from splinter import Browser
from bs4 import BeautifulSoup
import pandas as pd
from flask_pymongo import PyMongo
from flask import Flask, render_template, redirect
import pymongo
import time

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/scrape"

# mongo
mongo = PyMongo(app)
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.scrapeDB


#################################################
# Flask Routes
#################################################

@app.route("/scrape")
def scrape():
    executable_path = {'executable_path': 'chromedriver.exe'}
    browser = Browser('chrome', **executable_path, headless=False)

    # URL of page to be scraped
    url = 'https://mars.nasa.gov/news/'

    browser.visit(url)

    html = browser.html

    time.sleep(10)
    soup = BeautifulSoup(html, 'html.parser')

    # pull first title/paragraph

    title = soup.find('div', class_="content_title").text

    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    paragraph = soup.find('div', class_="article_teaser_body").text

    print(title)
    print(paragraph)

    # FEATURED IMAGE

    url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(url)
    browser.click_link_by_id('full_image')

    time.sleep(10)

    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')

    featured_image_url = 'https://www.jpl.nasa.gov' + soup.find('img', class_='fancybox-image').get('src')
    print(featured_image_url)

    # Mars weather twitter

    url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(url)

    time.sleep(10)

    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')

    mars_weather = soup.find('p', class_='TweetTextSize TweetTextSize--normal js-tweet-text tweet-text').text

    # remove twitter link
    mars_weather = mars_weather.split('pic.twitter')[0]
    print(mars_weather)

    # mars facts
    url = 'https://space-facts.com/mars/'

    facts_df = pd.read_html(url)[0]
    facts_html = facts_df.to_html(header=False, index=False)

    # create results dictionary
    scrape_dict = {"title": title, "paragraph": paragraph,
                   "img_url": featured_image_url, "weather": mars_weather,
                   "facts_table": facts_html}

    # mongodb

    db.col.remove()
    db.col.insert_one(scrape_dict)

    time.sleep(10)

    return redirect("http://127.0.0.1:5000/")


@app.route("/")
def index():
    scrapes = db.col.find_one()
    return render_template("index.html", scrapes=scrapes), print(scrapes)


if __name__ == '__main__':
    app.run(debug=True)
