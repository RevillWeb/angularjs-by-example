class PageValues {
    title : string
    description : string
    loading : boolean    
}

angular
    .module('app.core')
    .value('PageValues', PageValues);