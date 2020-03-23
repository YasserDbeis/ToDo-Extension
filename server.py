import http.server
import socketserver
from app import get_tasks
import json

PORT = 8080
DIRECTORY = 'public'

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_POST(self):
        self.send_response(200)
        self.end_headers()
        tasks = get_tasks()
        json_string = json.dumps(tasks)
        print(str.encode(json_string))
        self.wfile.write(str.encode(json_string))

with socketserver.TCPServer(('', PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()


# import http.server
# import socketserver
# from google_search import chatbot_query

# PORT = 8080
# DIRECTORY = 'public'

# class Handler(http.server.SimpleHTTPRequestHandler):
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, directory=DIRECTORY, **kwargs)

#     def do_POST(self):
#         self.send_response(200)
#         content_length = int(self.headers['Content-Length'])
#         post_body = self.rfile.read(content_length)
#         self.end_headers()
#         print('user query', post_body)
#         google_search_chatbot_reply = chatbot_query(post_body)
#         self.wfile.write(str.encode(google_search_chatbot_reply))

# with socketserver.TCPServer(('', PORT), Handler) as httpd:
#     print('serving at port', PORT)
#     try:
#         httpd.serve_forever()
#     except KeyboardInterrupt:
#         pass
#     httpd.server_close()
    