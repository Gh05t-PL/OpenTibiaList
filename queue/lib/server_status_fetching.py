import socket
import struct
from xml.dom import minidom


def get_server_status(host, port):
    """

    :param str host: OTS Host
    :param str port: OTS status port
    :return: str XML string of server info e.g. max players online
    """
    s = socket.socket()
    s.settimeout(0.7)
    data = ''

    s.connect((host, int(port)))
    s.send(bytes(chr(6) + chr(0) + chr(255) + chr(255) + 'info', encoding='ISO-8859-1'))
    data = s.recv(1024)
    print('xml', data)
    s.close()
    return data


def get_players_status(host, port):
    """

    :param str host: OTS Host
    :param str port: OTS status port
    :return: buffer string with players online and playername level pairs
    """
    s = socket.socket()
    s.settimeout(0.7)
    data = ''
    # try:
    s.connect((host, int(port)))
    s.send(bytes(chr(6) + chr(0) + chr(255) + chr(0x01), encoding='ISO-8859-1') + struct.pack('I', 0x20))
    data = s.recv(1024)
    # except Exception as e:
    #     print(e.message)
    s.close()
    return data


def deque(listt, num):
    list2 = [listt.pop(0) for _ in range(0, num)]
    return list2


def parse_players_status_buffer(message):
    """
    :param message: Players status buffer
    :return: Dict with `online` and `players` keys
    """
    message = list(message)
    deque(message, 3)

    playersOnline = struct.unpack('I', ''.join(deque(message, 4)))[0]
    res = {
        "online": playersOnline,
        "players": []
    }

    while message:
        i = struct.unpack('H', ''.join(deque(message, 2)))[0]
        res['players'].append({
            "nick": ''.join(struct.unpack(str(i) + 'c', ''.join(deque(message, i)))),
            "level": struct.unpack('I', ''.join(deque(message, 4)))[0]
        })

    return res


def parse_server_status_xml(xml):
    """

    :param xml: XML string of server status
    :return:
    """
    data = {}
    dom = minidom.parseString(xml).documentElement
    playersNode = dom.getElementsByTagName('players')[0]
    data['players'] = {
        'online': int(playersNode.getAttribute('online')),
        'max': int(playersNode.getAttribute('max')),
        'peak': int(playersNode.getAttribute('peak'))
    }
    return data


# print(REQUEST_EXT_PLAYERS_INFO_PARSE(get_status(host, port)))
# print(list(get_status(host, port)))
# print(list((get_status(host, port))))
# host = '51.222.76.158'
# port = 7171
# print(getServerStatus(host, port))
