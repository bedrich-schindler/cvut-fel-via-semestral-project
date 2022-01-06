import click
from database.database import init_db
from flask.cli import with_appcontext


@click.command('init-database')
@with_appcontext
def init_database_command():
    init_db()
    click.echo('Initialized the database.')
