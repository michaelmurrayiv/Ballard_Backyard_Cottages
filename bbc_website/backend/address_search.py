import webbrowser
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import sys
import pyperclip

chrome_options = Options() 
chrome_options.add_experimental_option("detach", True)
driver = webdriver.Chrome(options=chrome_options)

def get_address():
    a = sys.argv[1]
    return a

def open_google_maps(address):
    encoded_address = address.replace(" ", "+")
    url = f"https://www.google.com/maps/search/?api=1&query={encoded_address}"
    driver.execute_script(f"window.open('{url}', '_blank');")


def open_parcel_viewer(address):
    driver.get("https://gismaps.kingcounty.gov/parcelviewer2/")
    wait = WebDriverWait(driver, 10)
    search_box = wait.until(EC.presence_of_element_located((By.ID, "searchInput")))
    search_box.send_keys(address)
    search_box.send_keys(Keys.RETURN)
    wait = WebDriverWait(driver, 10)
    
    parcel_element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "td.dojoxGridCell[idx='1']")))
    parcel_number = parcel_element.text
    print("Parcel Number:", parcel_number)

    return parcel_number

def open_property_detail(parcel_number):
    url = f"https://blue.kingcounty.com/Assessor/eRealProperty/Detail.aspx?ParcelNbr={parcel_number}"
    driver.execute_script(f"window.open('{url}', '_blank');")


def open_aduniverse(address):
    url = "https://aduniverse-seattlecitygis.hub.arcgis.com/pages/feasibility"
    driver.execute_script(f"window.open('{url}', '_blank');")
    driver.switch_to.window(driver.window_handles[-1])

    wait = WebDriverWait(driver, 10)
    search_box = EC.presence_of_element_located(By.CLASS_NAME, "esri-input esri-search__input")
    

    search_box.send_keys("test")
    #search_box.send_keys(Keys.RETURN)
    
# MAIN

def main():
    address = get_address()
    pyperclip.copy(address)
    try:
        parcel = open_parcel_viewer(address)
    except:
        print("Invalid address. Please try again.")
        return
    open_google_maps(address)
    open_property_detail(parcel)
    open_aduniverse(address)

main()
