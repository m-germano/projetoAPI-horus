from flask import Flask, render_template, send_from_directory,redirect,url_for, flash,request
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError
from flask_bcrypt import Bcrypt
from wtforms.validators import EqualTo
from flask import jsonify


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
    current_password = PasswordField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Senha atual"})
    new_password = PasswordField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Nova Senha"})
    confirm_new_password = PasswordField(validators=[InputRequired(), Length(min=4, max=20), EqualTo('new_password', message='Passwords must match')], render_kw={"placeholder": "Confirme a nova senha"})
    submit = SubmitField("Mudar senha")




##########################################     APP ROUTE          ###################################################
@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('main/index.html')

@app.route('/login', methods=['GET','POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))
    
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


#MODULOS INTRODUCAO

@app.route('/modulo1')
def modulo01():
    return render_template('conteudos/modulos-info/modulo1.html')

@app.route('/modulo2')
def modulo02():
    return render_template('conteudos/modulos-info/modulo2.html')

@app.route('/modulo3')
def modulo03():
    return render_template('conteudos/modulos-info/modulo3.html')

@app.route('/modulo4')
def modulo04():
    return render_template('conteudos/modulos-info/modulo4.html')

@app.route('/modulo5')
def modulo05():
    return render_template('conteudos/modulos-info/modulo5.html')



# Módulo 01


@app.route('/introducao')
def introducao():
    return render_template('conteudos/modulo1/introducao.html', first_page=True, next_url=url_for('kanban'), next_label='Próximo')

@app.route('/kanban')
def kanban():
    return render_template('conteudos/modulo1/kanban.html', previous_url=url_for('introducao'), next_url=url_for('questionario_modulo1'), previous_label='Anterior', next_label='Próximo')


@app.route('/questionario_01')
def questionario_modulo1():
    return render_template('questionarios/questionario_modulo1.html')

# Módulo 02
@app.route('/scrum')
def scrum():
    return render_template('conteudos/modulo2/scrum_master.html', first_page=True, next_url=url_for('product_owner'), next_label='Próximo')

@app.route('/product_owner')
def product_owner():
    return render_template('conteudos/modulo2/product_owner.html', previous_url=url_for('scrum'), next_url=url_for('dev'), previous_label='Anterior', next_label='Próximo')

@app.route('/dev')
def dev():
    return render_template('conteudos/modulo2/dev.html', previous_url=url_for('product_owner'), next_url=url_for('questionario_modulo2'), previous_label='Anterior', next_label='Próximo')

@app.route('/questionario_02')
def questionario_modulo2():
    return render_template('questionarios/questionario_modulo2.html')

# Módulo 03
@app.route('/eventos_scrum')
def eventos_scrum():
    return render_template('conteudos/modulo3/eventos_scrum.html', first_page=True, next_url=url_for('eventos_scrum2'), next_label='Próximo')

@app.route('/eventos_scrum-burndown')
def eventos_scrum2():
    return render_template('conteudos/modulo3/eventos_scrum2.html', previous_url=url_for('eventos_scrum'), next_url=url_for('questionario_modulo3'), previous_label='Anterior', next_label='Próximo')

@app.route('/questionario_03')
def questionario_modulo3():
    return render_template('questionarios/questionario_modulo3.html')

# Módulo 04
@app.route('/sprint_backlog')
def sprint_backlog():
    return render_template('conteudos/modulo4/sprint_backlog.html', first_page=True, next_url=url_for('mvp'), next_label='Próximo')

@app.route('/mvp')
def mvp():
    return render_template('conteudos/modulo4/mvp.html', previous_url=url_for('sprint_backlog'), next_url=url_for('product_increment'), previous_label='Anterior', next_label='Próximo')


@app.route('/definition_ready_done')
def definition_ready_done():
    return render_template('conteudos/modulo1/definitionReadyDone.html', previous_url=url_for('mvp'), next_url=url_for('product_increment'), previous_label='Anterior', next_label='Quiz')

@app.route('/product_increment')
def product_increment():
    return render_template('conteudos/modulo4/product_increment.html', previous_url=url_for('definition_ready_done'), next_url=url_for('product_backlog'), previous_label='Anterior', next_label='Próximo')

@app.route('/product_backlog')
def product_backlog():
    return render_template('conteudos/modulo4/product_backlog.html', previous_url=url_for('product_increment'), next_url=url_for('questionario_modulo4'), previous_label='Anterior', next_label='Próximo')

@app.route('/questionario_04')
def questionario_modulo4():
    return render_template('questionarios/questionario_modulo4.html')

# Módulo 05
@app.route('/estimativas')
def estimativas():
    return render_template('conteudos/modulo5/estimativa.html', first_page=True, next_url=url_for('planningpoker'), next_label='Próximo')

@app.route('/planningpoker')
def planningpoker():
    return render_template('conteudos/modulo5/planningpoker.html',previous_url=url_for('estimativas'), previous_label='Anterior', next_url=url_for('userstories'), next_label='Próximo')

@app.route('/userstories')
def userstories():
    return render_template('conteudos/modulo5/userstories.html',previous_url=url_for('planningpoker'), previous_label='Anterior', next_url=url_for('fibonacci'), next_label='Próximo')

@app.route('/fibonacci')
def fibonacci():
    return render_template('conteudos/modulo5/fibonacci.html', previous_url=url_for('planningpoker'),previous_label='Anterior',next_url=url_for('questionario_modulo5'), next_label='Próximo')

@app.route('/questionario')
def questionario_modulo5():
    return render_template('questionarios/questionario_modulo5.html')

@app.route('/questionarios')
def questionarios():
    return render_template('questionarios/questionarios.html')

@app.route('/download/<path:filename>')
def download_file(filename):
    return send_from_directory('static', filename, as_attachment=True)

@app.route('/modulos')
def modulos():
    return render_template('conteudos/modulos-info/modulos.html')


######################## DASHBOARD DO ADMINSTRADOR #################################


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

@app.route('/avaliacoes', methods=['POST', 'GET'])
@login_required
def principal():
    lista = databaseProjeto.query.all()  # Buscar todos os itens
    return render_template('avaliacao/tabela.html', lista=lista)

@app.route('/<int:id>/remover')
def remover(id):
    item_a_deletar = databaseProjeto.query.filter_by(id=id).first()
    db.session.delete(item_a_deletar)
    db.session.commit()
    return redirect(url_for('principal'))


@app.route('/dicionario')
def dicionario():
    return render_template('dicionario.html')


if __name__ == "__main__":
    
    with app.app_context():
        db.create_all()

    app.run(debug=True)