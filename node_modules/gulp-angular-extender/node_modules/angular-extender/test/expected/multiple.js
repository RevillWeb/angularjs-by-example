
angular.module('mod1', ["mod2","mod3","mod4","test1","test2"]).controller('mod3', function() {});

angular.module('mod2', ["test3"]).controller('mod2', function() {});


angular.module('mod3', ['doNotTouch']).controller('mod2', function() {});
