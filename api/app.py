from flask import Flask, abort, request
from flask_cors import CORS
from flask_restx import Api, Resource, fields
from commands.init_database import init_database_command
from database.database import close_db, get_db

# Configure application
app = Flask(__name__)
# Configure API
api = Api(
    app=app,
    version='1.0',
    title='Shooting range API',
    description='API for Shooting Ranges application'
)

CORS(app)

# Set configuration parameters
app.config['DATABASE'] = 'main-db'

# Register commands
app.cli.add_command(init_database_command)

# Setup teardown
app.teardown_appcontext(close_db)

# Configure namespaces
shooting_range_ns = api.namespace(name='Shooting range', path='/shooting-range')

# Configure schemas
shooting_range_schema = api.model('ShootingRange', {
    'id': fields.Integer(description='Shooting range identifier'),
    'name': fields.String(required=True, description='Shooting range name'),
    'street': fields.String(required=True, description='Shooting range street'),
    'city': fields.String(required=True, description='Shooting range city'),
    'latitude': fields.Float(required=True, description='Shooting range latitude'),
    'longitude': fields.Float(required=True, description='Shooting range longitude'),
    'phone': fields.String(description='Shooting range phone'),
    'web': fields.String(description='Shooting range web'),
    'about': fields.String(description='Shooting range information'),
    'foursquare_place_id': fields.String(description='Shooting range information')
})


@shooting_range_ns.route('/')
class ShootingRangeList(Resource):
    @shooting_range_ns.doc(description='Get list of all shooting ranges')
    @shooting_range_ns.response(200, 'Shooting ranges returned', shooting_range_schema)
    def get(self):
        # Get database connection
        db = get_db()

        # Prepare select statement
        db_cursor = db.cursor()
        db_cursor.execute("SELECT * FROM shooting_range")
        # Select data
        shooting_ranges_rows = db_cursor.fetchall()

        # Close connection
        db_cursor.close()

        # Transform data
        shooting_ranges = [dict(shooting_ranges_row) for shooting_ranges_row in shooting_ranges_rows]

        return shooting_ranges, 200

    @api.doc(description="Create a shooting range")
    @shooting_range_ns.response(201, 'Shooting range created', shooting_range_schema)
    @shooting_range_ns.response(400, 'Invalid request parameters')
    @shooting_range_ns.expect(shooting_range_schema)
    def post(self):
        # Get request data
        request_data = request.get_json()
        name = request_data['name']
        street = request_data['street']
        city = request_data['city']
        latitude = request_data['latitude']
        longitude = request_data['longitude']
        phone = request_data['phone']
        web = request_data['web']
        about = request_data['about']
        foursquare_place_id = request_data['foursquare_place_id']

        # Get database connection
        db = get_db()

        # Prepare insert statement
        db_cursor = db.cursor()
        db_cursor.execute("INSERT INTO shooting_range (name, street, city, latitude, longitude, phone, web, about, foursquare_place_id) VALUES (?,?,?,?,?,?,?,?,?)", [str(name), str(street), str(city), str(latitude), str(longitude), str(phone), str(web), str(about), str(foursquare_place_id)])
        # Insert data
        db.commit()

        # Prepare select statement
        db_cursor_2 = db.cursor()
        db_cursor_2.execute("SELECT * FROM shooting_range WHERE id=?", [str(db_cursor.lastrowid)])

        # Select data
        shooting_range_row = db_cursor_2.fetchone()
        # Transform data
        shooting_range = dict(shooting_range_row)

        # Close connection
        db_cursor.close()
        db_cursor_2.close()

        return shooting_range, 201


@shooting_range_ns.route('/<int:id>')
@shooting_range_ns.param('id', 'Shooting range identifier')
@shooting_range_ns.response(404, 'Shooting range not found')
class ShootingRange(Resource):
    @api.doc(description="Get a shooting range")
    @shooting_range_ns.response(200, 'Shooting range returned', shooting_range_schema)
    @shooting_range_ns.response(400, 'Invalid request parameters')
    def get(self, id):
        # Get database connection
        db = get_db()

        # Prepare select statement
        db_cursor = db.cursor()
        db_cursor.execute("SELECT * FROM shooting_range WHERE id=?", [str(id)])
        # Select data
        shooting_range_row = db_cursor.fetchone()

        # Close connection
        db_cursor.close()

        # Return 404 if not found
        if shooting_range_row is None:
            return abort(404)

        # Transform data
        shooting_range = dict(shooting_range_row)

        return shooting_range, 200

    @api.doc(description="Edit a shooting range")
    @shooting_range_ns.response(200, 'Shooting ranges edited and returned', shooting_range_schema)
    @shooting_range_ns.response(400, 'Invalid request parameters')
    @shooting_range_ns.expect(shooting_range_schema)
    def put(self, id):
        # Get database connection
        db = get_db()

        # Prepare select statement
        db_cursor = db.cursor()
        db_cursor.execute("SELECT * FROM shooting_range WHERE id=?", [str(id)])
        # Select data
        shooting_range_row = db_cursor.fetchone()

        # Close connection
        db_cursor.close()

        # Return 404 if not found
        if shooting_range_row is None:
            return abort(404)

        # Transform data
        shooting_range = dict(shooting_range_row)

        # Get request data
        request_data = request.get_json()
        name = request_data['name']
        street = request_data['street']
        city = request_data['city']
        latitude = request_data['latitude']
        longitude = request_data['longitude']
        phone = request_data['phone']
        web = request_data['web']
        about = request_data['about']
        foursquare_place_id = request_data['foursquare_place_id']

        # Prepare update statement
        db_cursor_2 = db.cursor()
        db_cursor_2.execute("UPDATE shooting_range SET name=?, street=?, city=?, latitude=?, longitude=?, phone=?, web=?, about=?, foursquare_place_id=?  WHERE id=?", [str(name), str(street), str(city), str(latitude), str(longitude), str(phone), str(web), str(about), str(foursquare_place_id), str(id)])
        # Update data
        db.commit()
        # Update local data
        shooting_range['name'] = name
        shooting_range['street'] = street
        shooting_range['city'] = city
        shooting_range['latitude'] = longitude
        shooting_range['longitude'] = name
        shooting_range['phone'] = phone
        shooting_range['web'] = web
        shooting_range['about'] = about
        shooting_range['foursquare_place_id'] = foursquare_place_id

        # Close connection
        db_cursor_2.close()

        return shooting_range, 200

    @api.doc(description="Delete a shooting range")
    @shooting_range_ns.response(204, 'Shooting ranges deleted')
    def delete(self, id):
        # Get database connection
        db = get_db()

        # Prepare select statement
        db_cursor = db.cursor()
        db_cursor.execute("SELECT * FROM shooting_range WHERE id=?", [str(id)])

        # Select data
        shooting_range_row = db_cursor.fetchone()

        # Close connection
        db_cursor.close()

        # Return 404 if not found
        if shooting_range_row is None:
            return abort(404)

        # Prepare delete statement
        db_cursor_2 = db.cursor()
        db_cursor_2.execute("DELETE FROM shooting_range WHERE id=?", [str(id)])

        # Delete data
        db.commit()

        # Close connection
        db_cursor_2.close()

        return None, 204


@app.errorhandler(400)
def error_400(e):
    return {
        'code': 400,
        'detail': str(e)
    }, 400


@app.errorhandler(404)
def error_404(e):
    return {
        'code': 404,
        'detail': str(e)
    }, 404


@app.errorhandler(500)
def error_500(e):
    return {
        'code': 500,
        'detail': str(e)
    }, 500


if __name__ == '__main__':
    # Run Flask
    app.run()
