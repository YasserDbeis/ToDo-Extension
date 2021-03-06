import todoist
import uuid, requests, json


token = ''
api = todoist.TodoistAPI('{}'.format(token))
api.sync()
print(api.state['user'])
full_name = api.state['user']['full_name']
print(full_name)

for project in api.state['projects']:
    print(project['name'])
    projID = project['id']


# item = api.items.add('Task1', project_id=projID)

# api.commit()

def get_name():
    return full_name;


def get_tasks():

    tasks = requests.get(
        "https://api.todoist.com/rest/v1/tasks",
        params={
            "project_id": projID
        },
        headers={
            "Authorization": "Bearer {}".format(token)
        }).json()
    print("task gotten")
    print(len(tasks))
    return tasks

def delete_task(task):

    print("task deleted")
    print(task.decode('utf-8'))
    task = int(task.decode('utf-8'))
    tasks =(get_tasks())
    print(tasks)
    print(tasks[0]['id'])



    delTask = tasks[task]['id']
    print(delTask)
    requests.post(
        "https://api.todoist.com/rest/v1/tasks/{}/close".format(delTask), 
        headers={
            "Authorization": "Bearer {}".format(token)
        })

def create_task(task):
    requests.post(
        "https://api.todoist.com/rest/v1/tasks",
        data=json.dumps({
            "content": task.decode('utf-8'),
            "project_id": projID,
        }),
        headers={
            "Content-Type": "application/json",
            "X-Request-Id": str(uuid.uuid4()),
            "Authorization": "Bearer {}".format(token)
    }).json()
# for task in tasks:
#     print(task['content'])

