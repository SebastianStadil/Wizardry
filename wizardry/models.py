from django.db import models

# Create your models here.
class Wizard(models.Model):
	target_id = models.CharField(max_length=20) # id attribute of the element to focus on
	trigger_id = models.CharField(max_length=20, blank=True) # id attribute of the element that triggers next step
	tooltip_title = models.CharField(max_length=70) # title of the tooltip
	tooltip_text = models.CharField(max_length=500) # text to put in the body of the tooltip
	def __unicode__(self):
		return self.tooltip_title
