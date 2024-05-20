# redirects.py
from flask import Blueprint, render_template, send_from_directory

redirects = Blueprint('redirects', __name__)

@redirects.route('/')
def home():
    return render_template('index.html')

@redirects.route('/login')
def login():
    return render_template('login.html')

@redirects.route('/avaliacoes')
def avaliacoes():
    return render_template('avaliacoes.html')

@redirects.route('/conceitos/<id>')
def conceitos(id):
    if id == 'introducao':
        return render_template('introducao.html')
    elif id == 'kanban':
        return render_template('kanban.html')
    elif id == 'definitionReadyDone':
        return render_template('definitionReadyDone.html')

@redirects.route('/responsabilidades/<id>')
def responsabilidades(id):
    if id == 'scrum':
        return render_template('scrum_master.html')
    elif id == 'po':
        return render_template('product_owner.html')
    elif id == 'dev':
        return render_template('dev.html')
    else:
        return 'Página não encontrada'

@redirects.route('/eventos-scrum')
def eventos_scrum():
    return render_template('eventos_scrum.html')
   
@redirects.route('/artefatos-scrum/<id>')
def artefatos_scrum(id):
    if id == 'sprint-backlog':
        return render_template('sprint_backlog.html')
    elif id == 'mvp':
        return render_template('mvp.html')
    elif id == 'productbacklog':
        return render_template('product_backlog.html')
    elif id == 'productincrement':
        return render_template('product_increment.html')
    
@redirects.route('/questionarios')
def questionarios_home():
    return render_template('questionarios.html') 

@redirects.route('/questionarios/<id>')
def questionarios(id):
    if id=="dev":
        return render_template('questionario_dev.html')
    if id=="scrum-master":
        return render_template('questionario_sm.html')
    if id=="po":
        return render_template('questionario_po.html')
    
@redirects.route('/estimativa')
def estimativas():
    return render_template('estimativa.html')

@redirects.route('/download/<path:filename>')
def download_file(filename):
    return send_from_directory('static', filename, as_attachment=True)

@redirects.route('/flashcards')
def flashcards():
    return render_template('flashcards.html')
