from django.shortcuts import render_to_response, get_object_or_404
from wizardry.models import Wizard
from django.http import Http404

def index(request):
    all_wizards = Wizard.objects.all()
    return render_to_response('wizardry/index.html', {'all_wizards': all_wizards})

def detail(request, wizard_id):
    p = get_object_or_404(Wizard, pk=wizard_id)
    return render_to_response('wizardry/detail.html', {'wizard': p})

def json(request):
	"""docstring for json"""
	all_wizards = Wizard.objects.all()
	return render_to_response('wizardry/wizardry.js', {'all_wizards': all_wizards})