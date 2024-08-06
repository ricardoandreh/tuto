import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

user_home_dir = os.path.expanduser("~")
chrome_binary_path = os.path.join(user_home_dir, "chrome-linux64", "chrome")
chromedriver_path = os.path.join(user_home_dir, "chromedriver-linux64", "chromedriver")

options = Options()
options.add_argument("--headless")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.binary_location = chrome_binary_path

service = Service(chromedriver_path)


def main():
    driver = webdriver.Chrome(service=service, options=options)
    driver.get("https://www.saucedemo.com/")

    username = driver.find_element(By.ID, "user-name")
    password = driver.find_element(By.ID, "password")

    username.send_keys("standard_user")
    password.send_keys("secret_sauce")

    login_button = driver.find_element(By.ID, "login-button")
    login_button.click()

    time.sleep(5)

    print(f"Login bem-sucedido, URL atual: {driver.current_url}")

    driver.quit()


if __name__ == "__main__":
    main()
