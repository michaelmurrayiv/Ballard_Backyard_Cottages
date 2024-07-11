import webbrowser
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import time

def get_address():
    a = input("Enter the address of the property: ")
    return a

def open_google_maps(address):
    encoded_address = address.replace(" ", "+")
    url = f"https://www.google.com/maps/search/?api=1&query={encoded_address}"
    webbrowser.open(url)

def open_parcel_viewer(address):
    chrome_options = Options() 
    chrome_options.add_experimental_option("detach", True)
    driver = webdriver.Chrome(options=chrome_options)

    driver.get("https://gismaps.kingcounty.gov/parcelviewer2/")
    time.sleep(6)

    search_box = driver.find_element(By.ID, "searchInput")
    search_box.send_keys(address)
    search_box.send_keys(Keys.RETURN)
    time.sleep(4)
    
    parcel_element = driver.find_element(By.CSS_SELECTOR, "td.dojoxGridCell[idx='1']")
    parcel_number = parcel_element.text
    print("Parcel Number:", parcel_number)

    return parcel_number

def open_property_detail(parcel_number):
    url = f"https://blue.kingcounty.com/Assessor/eRealProperty/Detail.aspx?ParcelNbr={parcel_number}"
    webbrowser.open(url)
    
# MAIN

def main():
    address = get_address()
    try:
        parcel = open_parcel_viewer(address)
    except:
        print("Invalid address. Please try again.")
        return
    open_google_maps(address)
    open_property_detail(parcel)

main()
