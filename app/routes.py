from flask import render_template, flash, redirect, url_for
from app import app
from app.forms import LoginForm
from flask_login import login_user, logout_user, current_user, login_required 
from flask_login import logout_user
from app.models import User
from datetime import datetime
from app.forms import EditProfileForm
from app.forms import EmptyForm # note that since the tutorial is open-source we can always just copy the code from that if we ever have any really big questions. Base/core understanding is still there

@app.before_request
def before_request():
    if current_user.is_authenticated:
        current_user.last_seen = datetime.utcnow()
        db.session.commit()

@app.route('/')
@app.route('/index')
@login_required
def index():
    return render_template('index.html', title='Home', user=user, posts=posts)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('index')
        return redirect(next_page)
    return render_template('login.html', title='Sign In', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/user/<username>') # url slug is domain.tld/user/your-username | dynamic components like username are put inside <>
@login_required # won't be visible or accessible to anonymous/logged-out users as they don't have a profile page. Uses 'login_required` decorator
def user(username):
    user = User.query.filter_by(username=username).first_or_404() # load the user from the database, 
    posts = [
        {'author': user, 'body': 'Test post #1'}, # takes the actual username and then uses strings to display demo body text for now
        {'author': user, 'body': 'Test post #2'}
    ]
    return render_template('user.html', user=user, posts=posts) # Sets values and renders the user template

@app.route('/edit_profile')
@login_required
def edit_profile():
    form = EditProfileForm(current_user.username)
    if form.validate_on_submit():
        current_user.username = form.username.data
        current_user.about_me = form.about_me.data
        db.session.commit()
        flash('Your changes have been saved')
        return redirect(url_for('edit_profile'))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.about_me.data = current_user.about_me
    return render_template('edit_profile.html', title='Edit Profile',
                           form=form)

# Integrate followers and create a follow page
# ALlow a user to follow another user
@app.route('/follow/<username>', methods=['POST']) # Post result of a form which is to follow a user from another user
@login_required
def follow(username):
    form = EmptyForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=username).first() # the user that the account page belongs to, not the logged in user
        if user is None: # If the user that the logged in user is trying to follow doesn't exist
            flash('user {} not found.'.format(username))
            return redirect(url_for('index'))
        if user == current_user: # if the account page's user is the same as the logged in user (l.i.u = current_user)
            flash('You cannot follow yourself!')
            return redirect(url_for('user', username=username))
        current_user.follow(user) # use the user's "follow" function to follow the user who owns the current page
        db.session.commit() # add this latest development/update to the database
        flash('You are following {}!'.format(username))
        return redirect(url_for('user', username=username))
    else:
        return redirect(url_for('index'))
    return render_template('user.html', user=user, posts=posts, form=form)
# Allow a user to unfollow another user
@app.route('/unfollow/<username>', methods=['POST'])
@login_required
def unfollow(username):
    form = EmptyForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=username).first()
        if user is None:
            flash('User {} not found.'.format(username))
            return redirect(url_for('index'))
        if user == current_user:
            flash('You cannot unfollow yourself!')
            return redirect(url_for('user', username=username))
        current_user.unfollow(user)
        db.session.commit()
        flash('You are not following {}.'.format(username))
        return redirect(url_for('user', username=username))
    else:
        return redirect(url_for('index'))