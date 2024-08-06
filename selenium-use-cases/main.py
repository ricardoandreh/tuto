import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

user_home_dir = os.path.expanduser("~")
chrome_binary_path = os.path.join(user_home_dir, "chrome-linux64", "chrome")
chromedriver_path = os.path.join(user_home_dir, "chromedriver-linux64", "chromedriver")

options = Options()
options.add_argument("--headless")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.binary_location = chrome_binary_path

service = Service(chromedriver_path)

with webdriver.Chrome(service=service, options=options) as driver:
    driver.get("https://www.scrapethissite.com/")

    tagline = driver.find_element(By.CSS_SELECTOR, "#hero > div > div > div > p")
    print(f"{tagline.text}")
