import requests
import pandas as pd
import json
import openpyxl
import time
import sys
import random


def get_details_json(school_id, timeout=3):
    url = "https://static-data.eol.cn/www/school/{}/detail/69000.json".format(
        school_id)
    headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36"
    }
    response = requests.request("GET", url, headers=headers, timeout=timeout)
    response.encoding = "utf-8"

    return json.loads(response.text)


def get_batch(indices):
  for i in indices:
    file = open('./institute-detail-{}.json'.format(i), 'w')
    print("fetching the detail of institute no.{}".format(i))
    try:
      data = str(get_details_json(i))
      file.write(data)
    except Exception:
      print(Exception)
    file.close()
    #interval = random.randint(1,5) / random.randint(5,500)
    #print("after {} sec., proceeding to next fetch".format(interval))
    #time.sleep(interval)

if __name__ == "__main__":
  start = int(sys.argv[-2])
  end = int(sys.argv[-1])
  get_batch(range(start, end))
  