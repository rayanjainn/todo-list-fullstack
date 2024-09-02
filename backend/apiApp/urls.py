from django.urls import path
import apiApp.views as views

urlpatterns = [
    path('login',views.login,name='login'),
    # path('create_user',views.create_user,name='create_user')
    path('create_todo',views.create_todo,name='create_todo'),
    path('initial_call',views.initial_call,name='initial_call'),
    path('completed',views.completed,name='completed'),
    path('inprogress',views.inprogress,name='inprogress'),
    path('archived',views.archived,name='archived'),
    path('complete_task',views.complete_task,name='complete_task'),
    path('archive_task',views.archive_task,name='archive_task'),
    path('delete_task',views.delete_task,name='delete_task'),
    path('update_task',views.update_task,name='update_task')
]