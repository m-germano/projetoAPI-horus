from flask import Flask, render_template, send_from_directory
app = Flask(__name__)



@app.route('/')
def home():
    return render_template('index.html')

@app.route('/conceitos/<id>')
def conceitos(id):
    if id == 'introducao':
        return render_template('introducao.html')
    elif id == 'kanban':
        return render_template('kanban.html')
    elif id == 'definitionReadyDone':
        return render_template('definitionReadyDone.html')



@app.route('/responsabilidades/<id>')
def responsabilidades(id):
    if id == 'scrum':
        return render_template('scrum_master.html')
    elif id == 'po':
        return render_template('product_owner.html')
    elif id == 'dev':
        return render_template('dev.html')
    else:
        return 'Página não encontrada'

@app.route('/eventos-scrum')
def eventos_scrum():
    return render_template('eventos_scrum.html')
   
@app.route('/artefatos-scrum/<id>')
def artefatos_scrum(id):
    if id == 'sprint-backlog':
        return render_template('sprint_backlog.html')
    elif id == 'mvp':
        return render_template('mvp.html')
    elif id == 'productbacklog':
        return render_template('product_backlog.html')
    elif id == 'productincrement':
        return render_template('product_increment.html')
    
@app.route('/questionarios')
def questionarios_home():
    return render_template('questionarios.html') 

@app.route('/questionarios/<id>')
def questionarios(id):
    if id=="dev":
        return render_template('questionario_dev.html')
    if id=="scrum-master":
        return render_template('questionario_sm.html')
    if id=="po":
        return render_template('questionario_po.html')
    
@app.route('/estimativa')
def estimativas():
    return render_template('estimativa.html')
   

@app.route('/download/<path:filename>')
def download_file(filename):
    return send_from_directory('static', filename, as_attachment=True)




if __name__ == "__main__":
    app.run(debug=True)
