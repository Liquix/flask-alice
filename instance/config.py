# Flask configuration file
DEBUG = True

# MySQL - this should all be in instance/config.py because it is sensitive
MYSQL_SERVER    = 'localhost'
MYSQL_DATABASE  = 'testdb'
MYSQL_USERNAME  = 'dev'
MYSQL_PASSWORD  = 'Smuckers123'
MYSQL_CONN      = 'mysql://' + MYSQL_USERNAME + ':' + MYSQL_PASSWORD + '@' + MYSQL_SERVER + '/' + MYSQL_DATABASE

# SQLAlchemy
SQLALCHEMY_TRACK_MODIFICATIONS      = False
SQLALCHEMY_DATABASE_URI             = MYSQL_CONN
