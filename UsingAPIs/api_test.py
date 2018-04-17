"""
api_test.py
Liz Nichols 04/16

to run from the command line specify either list or "specify" and then a pokemon ability
accesses poke api to return information about pokemon abilities
"""
import requests
import argparse

abilities = []

def get_abilities():
    base = 'http://pokeapi.co/api/v2/ability'
    ability = ""
    response = requests.request("GET", base, data=ability)
    data = response.json()
    for item in data.get('results'):
        abilities.append(item.get("name"))

def get_data_for_ability(ability):
    base = 'http://pokeapi.co/api/v2/ability/{0}'
    ability_index = abilities.index(ability) + 1
    url = base.format(ability_index)
    description = ""
    response = requests.request("GET", url, data=description)
    data = response.json()
    if data.get("effect_entries"):
        ability_data = data.get("effect_entries")
        return ability_data
    else:
        return data

def main(args):
    get_abilities()
    if args.action == 'list':
        print()
        print()
        print("Pokemon have the following abilities. "
              "Abilities provide passive effects for Pokémon in battle or in the overworld. "
              " Pokémon have multiple possible abilities but can have only one ability at a time. "
              "Check out Bulbapedia for greater detail or run this program again with args 'specify' and a"
              " particular ability to learn more about it.")
        print()
        print("*********")
        print()
        for item in abilities:
            print(item)
        print()
        print("*********")
        print()

    elif args.action == 'specify':
        if args.ability:
            print()
            print("The details for ", args.ability, "are: ")
            print()
            details = get_data_for_ability(args.ability)
            # print(details[0].keys())
            # print(details)
            for key in details[0].keys():
                if not(key =='language'):
                    description = details[0][key]
                    print(key, ' : ', description)
                    print()
            print("for a list of all abilities, run this program again with the arg 'list'")





if __name__ == '__main__':
    # When I use argparse to parse my command line, I usually
    # put the argparse setup here in the global code, and then
    # call a function called main to do the actual work of
    # the program.
    parser = argparse.ArgumentParser(description='Get ability info from the Pokemon api')

    parser.add_argument('action',
                        metavar='action',
                        help='action to perform - list abilities or specify and investigate a specific ability',
                        choices=['list', 'specify'])

    parser.add_argument('ability',
                        nargs = '?',
                        metavar='ability',
                        help ='type the ability you would like to investigate',
                        default = None,
                        choices=['stench', 'drizzle', 'speed-boost', 'battle-armor', 'sturdy', 'damp', 'limber',
                                 'sand-veil', 'static', 'volt-absorb', 'water-absorb', 'oblivious', 'cloud-nine',
                                 'compound-eyes', 'insomnia', 'color-change', 'immunity', 'flash-fire', 'shield-dust',
                                 'own-tempo'])

    args = parser.parse_args()
    main(args)
