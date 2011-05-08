from django.conf.urls.defaults import *
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    # (r'^mysite/', include('mysite.foo.urls')),

	(r'^polls/', include('polls.urls')),
	(r'^admin/', include(admin.site.urls)),


	(r'^wizards/$', 'wizardry.views.index'),
	(r'^wizards/(?P<wizard_id>\d+)/$', 'wizardry.views.detail'),
	(r'^json/$', 'wizardry.views.json'),
    (r'^static/(?P<path>.*)$', 'django.views.static.serve',
	        {'document_root': '/Users/sebastianstadil/Sites/Wizardry/wizardry/static/'}),

    # Uncomment the admin/doc line below and add 'django.contrib.admindocs'
    # to INSTALLED_APPS to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # (r'^admin/', include(admin.site.urls)),
)