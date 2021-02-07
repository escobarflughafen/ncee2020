import requests
import pandas as pd
import json
import openpyxl
import time
import sys
import random
import os

detail_path = './details/'
info_path = './info/'

detail_prefix = 'institute-detail-'
info_prefix = 'institute-info-'


def get_detail_json(school_id, timeout=2):
    url = "https://static-data.eol.cn/www/school/{}/detail/69000.json".format(
        school_id)
    headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36"
    }
    response = requests.request("GET", url, headers=headers, timeout=timeout)
    response.encoding = "utf-8"

    return json.loads(response.text)


def get_detail_batch(indices, force_override=False):
    for i in indices:
        filename = detail_path + '{}.json'.format(i)
        if (os.path.exists(filename)) and (os.path.getsize(filename) > 0) and (not force_override):
            pass
        else:
            file = open(filename, 'w')

            print("fetching the info of institute no.{}".format(i))
            try:
                data = str(get_detail_json(i))
                file.write(data)
            except Exception:
                print(Exception)
            file.close()

        #interval = random.randint(1,5) / random.randint(5,500)
        #print("after {} sec., proceeding to next fetch".format(interval))
        # time.sleep(interval)


def get_info_json(school_id, timeout=2):
    url = "https://static-data.eol.cn/www/2.0/school/{}/info.json".format(
        school_id)
    headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36"
    }
    response = requests.request("GET", url, headers=headers, timeout=timeout)
    response.encoding = "utf-8"

    return json.loads(response.text)


def get_info_batch(indices, force_override=False):
    for i in indices:
        filename = info_path + '{}.json'.format(i)
        if (os.path.exists(filename)) and (os.path.getsize(filename) > 0) and (not force_override):
            pass
        else:
            file = open(filename, 'w')

            print("fetching the info of institute no.{}".format(i))
            try:
                data = str(get_info_json(i))
                file.write(data)
            except Exception:
                print(Exception)
            file.close()


def get_empty_indices(path):
    if path[-1] != '/':
        path += '/'

    filelist = os.listdir(path)
    indices = []

    for f in filelist:
        if os.path.getsize(path+f) == 0:
            indices.append(f.split('-')[-1].split('.')[0])

    print('{} empty files in total, indices:\n'.format(
        len(indices)) + str(indices))
    return indices


if __name__ == "__main__":
    start = int(sys.argv[-2])
    end = int(sys.argv[-1])
    mode = sys.argv[-3]
    force_override = sys.argv[-5] == 'force'
    if mode == "detail":
        if sys.argv[-4] == 'refetch':
            get_detail_batch(get_empty_indices('./details'), force_override=force_override)
        else:
            get_detail_batch(range(start, end+1), force_override=force_override)
    elif mode == "info":
        if sys.argv[-4] == 'refetch':
            get_info_batch(get_empty_indices('./info'), force_override=force_override)
        else:
            get_info_batch(range(start, end+1), force_override=force_override)
