# IBM Action, method=GET, Python 3.9
# API https://eca74085.eu-gb.apigw.appdomain.cloud/postreviews
# Params
# {
# "review":
#     {
#         "id": 1114,
#         "name": "Upkar Lidder",
#         "dealership": 15,
#         "review": "Great service!",
#         "purchase": false,
#         "another": "field",
#         "purchase_date": "02/16/2021",
#         "car_make": "Audi",
#         "car_model": "Car",
#         "car_year": 2021
#     }
# }
# xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

import sys
from ibmcloudant.cloudant_v1 import CloudantV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

import sys
from ibmcloudant.cloudant_v1 import CloudantV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

dict = {
    "id": 1114,
    "name": "Upkar Lidder",
    "dealership": 15,
    "review": "Great service!",
    "purchase": "false",
    "another": "field",
    "purchase_date": "02/16/2021",
    "car_make": "Audi",
    "car_model": "Car",
    "car_year": 2021
}


def main(dict):
    print(dict)
    # my IAM_API_KEY
    authenticator = IAMAuthenticator(
        "5JZc4yWEBGRae-Ppwi9ydOglDcWwjW1egFx8-rnfElnm")
    service = CloudantV1(authenticator=authenticator)
    # my COUCH_URL
    service.set_service_url(
        "https://apikey-v2-1csac5kpgz3565tngf6qkazsen0qjdv8yrhfztjrui5c:41b9f6ff47a41bdd5e7c8df2a5b4cb1e@01770a55-31d3-478f-adf1-9df9ca660237-bluemix.cloudantnosqldb.appdomain.cloud")
    response = service.post_document(
        db='reviews', document=dict).get_result()
    try:
        # result_by_filter=my_database.get_query_result(selector,raw_result=True)
        result = {
            'headers': {'Content-Type': 'application/json'},
            'body': {'data': response}
        }
        return result
    except:
        return {
            'statusCode': 404,
            'message': 'Something went wrong'
        }


main(dict)
