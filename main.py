import requests as r
import json

API_BASE_URL = "http://localhost:8000/api/v1/"


def get_ressource(endpoint, base_url=API_BASE_URL, **filters):
    query_params = "?"
    for key, value in filters.items():
        query_params += f"{key}={value}&"
    specific_url = base_url + endpoint + query_params
    try:
        response = r.get(specific_url)
        response.raise_for_status()
        json_data = response.json()
    except:
        # Catche les exceptions et tester la methode
        return "error"
    return json_data


def get_best_rated_movie():
    endpoint = "titles/"
    ressources = get_ressource(endpoint, sort_by="-imdb_score")
    return ressources["results"][0]


def get_movie_list(category):
    endpoint = "titles/"
    ressources_1 = get_ressource(endpoint, genre=category, sort_by="-imdb_score")
    ressources_2 = get_ressource(endpoint, genre=category, sort_by="-imdb_score", page=2)
    result = [ressources_1["results"][i] for i in range(1, 5)]
    result.append(ressources_2["results"][0])
    result.append(ressources_2["results"][1])
    result.append(ressources_2["results"][2])
    return result


get_best_rated_movie()
get_movie_list("Adventure")
get_movie_list("Animation")
get_movie_list("Action")
