from django.conf.urls.defaults import *

import os
ROOT_PATH_POLLS = os.path.dirname(__file__)

urlpatterns = patterns('polls.views',
    (r'^$', 'index'),
    (r'^(?P<poll_id>\d+)/$', 'detail'),
    (r'^(?P<poll_id>\d+)/results/$', 'results'),
    (r'^(?P<poll_id>\d+)/vote/$', 'vote'),
)