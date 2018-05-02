#!/usr/bin/env python3
'''
    example_flask_app.py
    Jeff Ondich, 22 April 2016

    A slightly more complicated Flask sample app than the
    "hello world" app found at http://flask.pocoo.org/.
'''
import sys
import flask
import json

app = flask.Flask(__name__)

# Who needs a database when you can just hard-code some actors and movies?
actors = [
    {'last_name': 'Pickford', 'first_name': 'Mary'},
    {'last_name': 'Rains', 'first_name': 'Claude'},
    {'last_name': 'Lorre', 'first_name': 'Peter'},
    {'last_name': 'Greenstreet', 'first_name': 'Sydney'},
    {'last_name': 'Bergman', 'first_name': 'Ingrid'},
    {'last_name': 'Welles', 'first_name': 'Orson'},
    {'last_name': 'Colbert', 'first_name': 'Claudette'},
    {'last_name': 'Adams', 'first_name': 'Amy'}
]

movies = [
    {'title': 'Casablanca', 'year': 1942, 'genre': 'drama'},
    {'title': 'North By Northwest', 'year': 1959, 'genre': 'thriller'},
    {'title': 'Alien', 'year': 1979, 'genre': 'scifi'},
    {'title': 'Bridesmaids', 'year': 2011, 'genre': 'comedy'},
    {'title': 'Arrival', 'year': 2016, 'genre': 'scifi'},
    {'title': 'It Happened One Night', 'year': 1934, 'genre': 'comedy'},
    {'title': 'Fargo', 'year': 1996, 'genre': 'thriller'},
    {'title': 'Clueless', 'year': 1995, 'genre': 'comedy'}
]

@app.route('/')
def hello():
    return 'Hello, Citizen of CS257.'

@app.route('/industries')
def industries():
    ''' Returns the complete list of all industries contained in the database.
    Response format: a JSON list of industry dictionaries. Each industry dictionary will have keys “id”, “proper_name” and “category”. A response to a query like this is as follows:
    '''
    industry_dictionary = {}
    lower_last_name = last_name.lower()
    for industry in industries:
            industry_dictionary = industry
            break
    return json.dumps(industry_dictionary)

@app.route('/industries/<industry_id>')
def industries(industry_id):
    '''Summary: Returns all information in the database related to the
       industry with the specific ID. The ID can be 2-digit or 3-digit;
       if the former, a list of all subsumed industry codes under the 2-digit
       ID is returned.
    '''

@app.route('/movies')
def get_movies():
    ''' Returns the list of movies that match GET parameters:
          start_year, int: reject any movie released earlier than this year
          end_year, int: reject any movie released later than this year
          genre: reject any movie whose genre does not match this genre exactly
        If a GET parameter is absent, then any movie is treated as though
        it meets the corresponding constraint. (That is, accept a movie unless
        it is explicitly rejected by a GET parameter.)
    '''
    movie_list = []
    genre = flask.request.args.get('genre')
    start_year = flask.request.args.get('start_year', default=0, type=int)
    end_year = flask.request.args.get('end_year', default=10000, type=int)
    for movie in movies:
        if genre is not None and genre != movie['genre']:
            continue
        if movie['year'] < start_year:
            continue
        if movie['year'] > end_year:
            continue
        movie_list.append(movie)

    return json.dumps(movie_list)

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print('Usage: {0} host port'.format(sys.argv[0]))
        print('  Example: {0} perlman.mathcs.carleton.edu 5101'.format(sys.argv[0]))
        exit()
    
    host = sys.argv[1]
    port = int(sys.argv[2])
    app.run(host=host, port=port, debug=True)
