class Actor {
    name: string
    character: string
}

class Show {
    id: number
    original_name: string
    cast: Actor[]
    genres: string[]
}

class TvServiceResponse {
    results: Show[]
}

/*
 * Contains a service to communicate with the TRACK TV API
 */
class ShowService {
    static $inject = ["$http", "$log", "moment"]

    constructor(private $http : ng.IHttpService,
        private $log : ng.ILogService,
        private moment : any) {
            return this;
        }

    private API_KEY : string = '87de9079e74c828116acce677f6f255b'
    private BASE_URL : string = 'http://api.themoviedb.org/3'

    private makeRequest = (url : string, params : any) : any => {
        let requestUrl = `${this.BASE_URL}/${url}?api_key=${this.API_KEY}`;
        angular.forEach(params, function(value, key){
            requestUrl = `${requestUrl}&${key}=${value}`;
        });
        return this.$http({
            'url': requestUrl,
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json'
            },
            'cache': true
        }).then((response) => {
            return response.data;
        }).catch(this.dataServiceError);
    }
    getPremieres = () => {
        //Get first day of the current month
        let date = new Date();
        date.setDate(1);
        return this.makeRequest('discover/tv', {'first_air_date.gte': this.moment(date), append_to_response: 'genres'}).then((data : TvServiceResponse) => {
            return data.results;
        });
    }
    get = (id : number) => {
        return this.makeRequest(`tv/${id}`, {});
    }
    getCast = (id : number) => {
        return this.makeRequest(`tv/${id}/credits`, {});
    }
    search = (query : string) => {
        return this.makeRequest('search/tv', {query: query}).then((data : TvServiceResponse) => {
            return data.results;
        });
    }
    getPopular = () => {
        return this.makeRequest('tv/popular', {}).then((data : TvServiceResponse) => {
            return data.results;
        });
    }

    private dataServiceError = (errorResponse : string) => {
        this.$log.error('XHR Failed for ShowService');
        this.$log.error(errorResponse);
        return errorResponse;
    }
}

angular
    .module('app.services')
    .factory('ShowService', ShowService);