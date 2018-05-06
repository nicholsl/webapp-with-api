#!/usr/bin/env python3
'''
    webapp_api.py
    Liz Nichols, Chiraag Gohel, Sharan GS, 4 May 2018
    Flask app implementation of our "employment data by race and gender" API.
    Modified from Jeff Ondich's books_api.py for the "authors and books" API.
    CS 257, Spring 2018. 
'''
import sys
import flask
import json
import config
import psycopg2

from config import password
from config import database
from config import user

app = flask.Flask(__name__, static_folder='static', template_folder='templates')

def get_connection():
    '''
    Returns a connection to the database described
    in the config module. Returns None if the
    connection attempt fails.
    '''
    connection = None
    try:
        connection = psycopg2.connect(database=database,
                                      user=user,
                                      password=password)
    except Exception as e:
        print(e, file=sys.stderr)
    return connection

def get_select_query_results(connection, query, parameters=None):
    '''
    Executes the specified query with the specified tuple of
    parameters. Returns a cursor for the query results.
    Raises an exception if the query fails for any reason.
    '''
    cursor = connection.cursor()
    if parameters is not None:
        cursor.execute(query, parameters)
    else:
        cursor.execute(query)
    return cursor

@app.after_request
def set_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route('/industries/') 
def get_industries():
    '''
    Returns a list of all the industries in our database, in alphabetical
    order. An industry resource
    will be represented by a JSON dictionary with keys 'industryID' (int) -
    the 2-digit code for each industry category,
    and 'industry' (string) - the description of each industry category.
    Refer the industrycodes table for details.
    Returns an empty list if there's any database failure.
    '''
    query = '''SELECT * FROM jobs ORDER BY industry'''

    industry_list = []

    connection = get_connection()

    if connection is None:
        print("hello")
    if connection is not None:
        try:
            for row in get_select_query_results(connection, query):
                industry = {'industryID':row[0],
                          'industry':row[1]}
                industry_list.append(industry)
        except Exception as e:
            print(e, file=sys.stderr)
        connection.close()
    return json.dumps(industry_list)



@app.route('/industry/<industry_id>')
def get_industry_by_id(industry_id):
    '''
    Returns the industry data resource holding the specified industry id.
    An industry data resource will be represented as a JSON dictionary
    with keys that represent the series of integer entries for employment
    (ordered by race and gender identity)
    in the specific industry in our database.
    Returns an empty dictionary if there's any database failure.
    '''
    query = '''SELECT * FROM mastertable2 WHERE NAC2_code = %s'''

    data_industry = {}
    connection = get_connection()
    if connection is not None:
        try:
            cursor = get_select_query_results(connection, query, (industry_id,))
            row = cursor.__next__()
            if row is not None:
                data_industry = {'industry_id':row[0],
                          'total':row[1],
                          'male_total':row[2], 'female_total':row[3],
                          'white_total':row[4],
                          'white_male':row[5], 'white_female':row[6],
                          'black_total':row[7],
                          'black_male':row[8], 'black_female':row[9],
                          'hispanic_total':row[10],
                          'hispanic_male':row[11], 'hispanic_female':row[12],
                          'asian_total':row[13],
                          'asian_male':row[14], 'asian_female':row[15],
                          'aian_total':row[16],
                          'aian_male':row[17], 'aian_female':row[18],
                          'nhopi_total':row[19],
                          'nhopi_male':row[20], 'nhopi_female':row[21],
                          'tomr_total':row[22],
                          'tomr_male':row[23]}
                          
        except Exception as e:
            print(e, file=sys.stderr)
        connection.close()

    return json.dumps(data_industry)

@app.route('/identities/')
def get_identities():
    '''
    Returns the list of identities in the database. An identity resource
    will be represented by a JSON dictionary with keys 'racecode' (string) -
    the codeword for each race/gender identity,
    and 'race' (string) - the description of each race/gender identity.
    Refer the raceCodes table for details.
    Returns an empty list if there's any database failure.
    '''
    query = '''SELECT * FROM race_codes'''
    identity_list = []
    connection = get_connection()
    if connection is not None:
        try:
            for row in get_select_query_results(connection, query):
                print(row)
                identity = {'race_codes':row[0], 'race':row[1]}
                identity_list.append(identity)

        except Exception as e:
            print(e, file=sys.stderr)
        connection.close()

    return json.dumps(identity_list)
    
@app.route('/identity/<identity_id>')
def get_identity_by_id(identity_id):
    '''
    Returns the data entried under the specified identity id.
    These will just be integers.
    Returns an empty dictionary if there's any database failure.
    '''
    query = '''SELECT CASE identity_id
               WHEN 'TOTAL' THEN TOTAL10
               WHEN 'MT' THEN MT10
               WHEN 'FT' THEN FT10
               WHEN 'WHT' THEN WHT10
               WHEN 'WHM' THEN WHM10
               WHEN 'WHF' THEN WHF10
               WHEN 'BLK' THEN BLKT10
               WHEN 'BLKM' THEN BLKM10
               WHEN 'BLKF' THEN BLKF10
               WHEN 'HISPT' THEN HISPT10
               WHEN 'HISPM' THEN HISPM10
               WHEN 'HISPF' THEN HISPF10
               WHEN 'ASIANT' THEN ASIANT10
               WHEN 'ASIANM' THEN ASIANM10
               WHEN 'ASIANF' THEN ASIANF10
               WHEN 'AIANT' THEN AIANT10
               WHEN 'AIANM' THEN AIANM10
               WHEN 'AIANF' THEN AIANF10
               WHEN 'nhopi' THEN nhopiT10
               WHEN 'NHOPIM' THEN NHOPIM10
               WHEN 'NHOPIF' THEN NHOPIF10
               WHEN 'tomrT' THEN tomrT10
               WHEN 'TOMRM' THEN TOMRM10
               ELSE null
               FROM mastertable2
               WHERE identity_id = %s'''
    identity_data = {}
    connection = get_connection()
    if connection is not None:
        try:
            cursor = get_select_query_results(connection, query, (identity_id,))
            row = cursor.__next__()
            if row is not None:
                identity_data = {'value':row[0]}
        except Exception as e:
            print(e, file=sys.stderr)
        connection.close()

    return json.dumps(identity_data)


@app.route('/help')
def help():
    rule_list = []
    for rule in app.url_map.iter_rules():
        rule_text = rule.rule.replace('<', '&lt;').replace('>', '&gt;')
        rule_list.append(rule_text)
    return json.dumps(rule_list)

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print('Usage: {0} host port'.format(sys.argv[0]), file=sys.stderr)
        exit()

    host = sys.argv[1]
    port = sys.argv[2]
    app.run(host=host, port=int(port), debug=True)
