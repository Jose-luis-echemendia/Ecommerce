import datetime

def createTransaction(postal_zip_code, country_region,  shipping_name, shipping_time):
    current_date = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    transaction_id = f"{postal_zip_code}_{country_region}_{shipping_name}_{shipping_time}_{current_date}"
    return transaction_id