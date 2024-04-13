from flask import Flask, render_template
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
   
   
@app.route('/artefatosdescrum/<id>')
def artefatosdescrum(id):
    if id == 'productbacklog':
        return render_template('product_backlog.html')
    elif id == 'productincrement':
        return render_template('product_increment.html')



if __name__ == "__main__":
    app.run(debug=True)
