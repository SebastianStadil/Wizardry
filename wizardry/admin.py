from wizardry.models import Wizard
from django.contrib import admin

class WizardAdmin(admin.ModelAdmin):
	fieldsets = [
        ('Element ids',               {'fields': ['target_id', 'trigger_id']}),
        ('Tooltip info', {'fields': ['tooltip_title', 'tooltip_text'], 'classes': ['collapse']}),
    ]
	list_display = ('target_id', 'trigger_id', 'tooltip_title', 'tooltip_text')
	list_filter = ['tooltip_title']
	search_fields = ['target_id', 'trigger_id', 'tooltip_title', 'tooltip_text']

admin.site.register(Wizard, WizardAdmin)