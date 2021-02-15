#!/usr/bin/env python
import datetime
import traceback
from math import floor

import pika
import time
import json

from bson import DBRef
from pymongo import MongoClient
from lib.server_status_fetching import parse_server_status_xml, get_server_status


MONGO_DSN = 'mongodb://root:example@localhost:27017'
RABBIT_LOGIN = 'example'
RABBIT_PASSWORD = 'examplf'
RABBIT_HOST = 'localhost'


mongo_connection = MongoClient(MONGO_DSN)
credentials = pika.PlainCredentials(RABBIT_LOGIN, RABBIT_PASSWORD)
connection = pika.BlockingConnection(
    pika.ConnectionParameters(host=RABBIT_HOST, credentials=credentials))
channel = connection.channel()

channel.queue_declare(queue='server_info', durable=True)
print(' [*] Waiting for messages. To exit press CTRL+C')

def getDate(timestamp, interval):
    x = timestamp + interval - 1
    return (floor(x / interval) * interval)


def server_status_job(ch, method, properties, body):
    message = json.loads(body.decode())
    data = False
    print(message['host'])
    try:
        data = parse_server_status_xml(get_server_status(message['host'], message['port']))['players']
        print('Success for:')
        print(message['host'], message['port'], data)
    except Exception as e:
        print('Error for:')
        print('ErrorCode: ', str(e))
        print(message['host'], message['port'])
        traceback.print_exc()
        data = False

    db = mongo_connection['symfony']
    update = {}
    if not data:
        update = {
            "online": False
        }
    else:
        update = {
            "online": True,
            "players.online": data['online'],
            "players.max": data['max'],
            "players.peak": data['peak']
        }
        db['ServerStatistics'].insert_one(
            {
                "server": DBRef('Server', message['id']),
                "date": datetime.datetime.strptime(time.strftime("%Y-%m-%dT%H:%M:%S.000%z", time.localtime(getDate(time.time(), 300))), "%Y-%m-%dT%H:%M:%S.000%z"),
                "playersOnline": data['online']
            }
        )


    db['Server'].update_one(
        {"ip": message['host']},
        {
            "$set": update
        }
    )

    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='server_info', on_message_callback=server_status_job)

channel.start_consuming()
