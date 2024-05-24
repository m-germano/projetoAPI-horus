from flask import Flask, render_template, send_from_directory,redirect,url_for, flash,request
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError
from flask_bcrypt import Bcrypt
from wtforms.validators import EqualTo


db = SQLAlchemy()
app = Flask(__name__)
bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_BINDS'] = {'projeto_db': 'sqlite:///listadeavaliacoes.db'}

db.init_app(app)
app.config['SECRET_KEY'] = 'thisisasecretkey'



login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id=db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String(20), nullable=False, unique=True)
    password=db.Column(db.String(80), nullable=False)

class RegisterForm(FlaskForm):
    username = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder":"Username"})

    password = PasswordField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder":"Password"})

    submit= SubmitField("Register")

    def validate_username(self,username):
        existing_user_username=User.query.filter_by(
            username=username.data).first()
        
        if existing_user_username:
            raise ValidationError('Nome de usuario ja cadastrado. Escolha um diferente')
        

class LoginForm(FlaskForm):
    username = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder":"Username"})

    password = PasswordField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder":"Password"})

    submit= SubmitField("Login")

class databaseProjeto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50))
    registro = db.Column(db.String(50))
    idade = db.Column(db.Integer)
    modulos_feitos = db.Column(db.String(50))  # Alterado para String
    classificacao = db.Column(db.Integer)  # Nova coluna para a classificação

    def __init__(self, nome, registro, idade, modulos_feitos, classificacao):
        self.nome = nome
        self.registro = registro
        self.idade = idade
        self.modulos_feitos = modulos_feitos
        self.classificacao = classificacao


class ChangePasswordForm(FlaskForm):
    current_password = PasswordField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Current Password"})
    new_password = PasswordField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "New Password"})
    confirm_new_password = PasswordField(validators=[InputRequired(), Length(min=4, max=20), EqualTo('new_password', message='Passwords must match')], render_kw={"placeholder": "Confirm New Password"})
    submit = SubmitField("Change Password")




##########################################     APP ROUTE          ###################################################
@app.route('/')
def home():
    return render_template('main/index.html')

@app.route('/login', methods=['GET','POST'])
def login():
    form=LoginForm()
    if form.validate_on_submit():
        user=User.query.filter_by(username=form.username.data).first()
        if user:
            if bcrypt.check_password_hash(user.password, form.password.data):
                login_user(user)
                return redirect(url_for('dashboard'))
    return render_template('login/login.html', form=form)

@app.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    return render_template('login/admin_dashboard.html')

@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/register', methods=['GET','POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        new_user = User(username=form.username.data, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('login/register.html', form=form)


@app.route('/change_password', methods=['GET', 'POST'])
@login_required
def change_password():
    form = ChangePasswordForm()
    if form.validate_on_submit():
        if bcrypt.check_password_hash(current_user.password, form.current_password.data):
            hashed_password = bcrypt.generate_password_hash(form.new_password.data).decode('utf-8')
            current_user.password = hashed_password
            db.session.commit()
            flash("Password changed successfully", "success")
            return redirect(url_for('dashboard'))
        else:
            flash("Current password is incorrect", "danger")
    return render_template('login/change_password.html', form=form)

@app.route('/conceitos/<id>')
def conceitos(id):
    if id == 'introducao':
        return render_template('conteudos/introducao.html')
    elif id == 'kanban':
        return render_template('conteudos/kanban.html')
    elif id == 'definitionReadyDone':
        return render_template('conteudos/definitionReadyDone.html')

@app.route('/responsabilidades/<id>')
def responsabilidades(id):
    if id == 'scrum':
        return render_template('conteudos/scrum_master.html')
    elif id == 'po':
        return render_template('conteudos/product_owner.html')
    elif id == 'dev':
        return render_template('conteudos/dev.html')
    else:
        return 'Página não encontrada'

@app.route('/eventos-scrum')
def eventos_scrum():
    return render_template('conteudos/eventos_scrum.html')
   
@app.route('/artefatos-scrum/<id>')
def artefatos_scrum(id):
    if id == 'sprint-backlog':
        return render_template('conteudos/sprint_backlog.html')
    elif id == 'mvp':
        return render_template('conteudos/mvp.html')
    elif id == 'productbacklog':
        return render_template('conteudos/product_backlog.html')
    elif id == 'productincrement':
        return render_template('conteudos/product_increment.html')
    
@app.route('/questionarios')
def questionarios_home():
    return render_template('questionarios/questionarios.html') 

@app.route('/questionarios/<id>')
def questionarios(id):
    if id=="introdução":
        return render_template('questionarios/questionario_introducao.html')
    if id=="responsabilidades":
        return render_template('questionarios/questionario_responsabilidades.html')
    if id=="eventos":
        return render_template('questionarios/questionario_eventos.html')
    if id=="artefatos":
        return render_template('questionarios/questionario_artefatos.html')
    if id=="estimativas":
        return render_template('questionarios/questionario_estimativas.html')
    
    
@app.route('/estimativa')
def estimativas():
    return render_template('conteudos/estimativa.html')

@app.route('/download/<path:filename>')
def download_file(filename):
    return send_from_directory('static', filename, as_attachment=True)


######################## DASHBOARD DO ADMINSTRADOR #################################

@app.route('/avaliacoes', methods=['POST', 'GET'])
@login_required
def principal():
    lista = databaseProjeto.query.all()  # Buscar todos os itens
    return render_template('avaliacao/tabela.html', lista=lista)


@app.route('/avaliar', methods=['POST', 'GET'])
def avaliar():
    if request.method == 'POST':
        nome = request.form.get('nome')
        registro = request.form.get('registro')
        idade = request.form.get('idade')
        modulos_feitos = request.form.getlist('modulos_feitos')  # Obter lista de seleções de checkboxes
        classificacao = request.form.get('classificacao')  # Obter classificação do formulário

        if not nome or not registro or not idade or not modulos_feitos or not classificacao:
            flash("Preencha todos os campos do formulário", "error")
        else:
            # Converter a lista de seleções para uma string delimitada por vírgula
            modulos_feitos_str = ",".join(modulos_feitos)
            nova_lista = databaseProjeto(nome, registro, idade, modulos_feitos_str, classificacao)
            db.session.add(nova_lista)
            db.session.commit()
            return redirect(url_for('home'))
    return render_template('avaliacao/avaliar.html')



@app.route('/<int:id>/remover')
def remover(id):
    item_a_deletar = databaseProjeto.query.filter_by(id=id).first()
    db.session.delete(item_a_deletar)
    db.session.commit()
    return redirect(url_for('principal'))



if __name__ == "__main__":
    
    with app.app_context():
        db.create_all()

    app.run(debug=True)

