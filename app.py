import todoist
import requests

token = 'a5f743262263c060a85465a3e5e03615a28b7871'
api = todoist.TodoistAPI('{}'.format(token))
api.sync()
full_name = api.state['user']['full_name']
print(full_name)




# item = api.items.add('Task1', project_id=projID)

# api.commit()

def get_tasks():
    for project in api.state['projects']:
        print(project['name'])
        projID = project['id']

    tasks = requests.get(
        "https://api.todoist.com/rest/v1/tasks",
        params={
            "project_id": projID
        },
        headers={
            "Authorization": "Bearer {}".format(token)
        }).json()
    return tasks

# for task in tasks:
#     print(task['content'])

