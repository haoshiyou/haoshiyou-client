var ctrls = angular.module('haoshiyou.PostCtrls', ['ngResource', 'lbServices']);

function EditOrCreateCtrl($log, $scope, $ionicModal, $q, $ionicPopup, $state, HsyPost, ConstantService) {
    $scope.title = "创建";
    $scope.postInput = {};
    $scope.dirty = {};
    $scope.FIELDS = ConstantService.FIELDS;
    // Load the add / change dialog from the given template URL
    $ionicModal.fromTemplateUrl('templates/edit-field.html', function(modal) {
        $scope.modal = modal;
    }, {
        scope: $scope
    });

    $scope.showModal = function(action) {
        $log.info("modalAction = " + action);
        $scope.modalField = $scope.FIELDS.filter(function(field) {
            return field.key == action;
        })[0];
        $scope.modal.show();
    };

    $scope.done = function() {
        $scope.modal.hide();
    };
    function validate () {
        var valid = true;
        for (var i in $scope.FIELDS) {
            var field = $scope.FIELDS[i];
            if (!field.required || $scope.postInput[field.key]) {
                // Do nothing
                $log.info("field = " + JSON.stringify(field));
            } else {
                valid = false;
            }
        }
        return valid;
    }
    function submitToDataStorePromise() {
        $log.info("submit!");
        $log.info($scope.postInput);
        $log.log("submiting");

        var post = _.omit($scope.postInput, [
            // TODO(zzn): use a better solution instead of hardcoding them here.
            'privateBath', 'designatedParking',
            'lessCooking', 'noPets'
        ]);
        var roommatePreference = _.pick($scope.postInput, ['lessCooking', 'noPets']);
        var housePreference = _.pick($scope.postInput, ['privateBath', 'designatedParking']);

        return HsyPost.create(post).$promise // XXX remove this
            .then(function(hsyPost) {
                $log.info(hsyPost);
                $log.info("444");
                //roommatePreference.postId = hsyPost.id;
                //housePreference.postId = hsyPost.id;
                return $q.all([
                    hsyPost.$prototype$__create__hsyRoommatePreference(roommatePreference),
                    hsyPost.$prototype$__create__hsyHousePreference(housePreference)
                ]);
            });

    }
    $scope.onSubmit = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: '确认提交'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $scope.attempted = true;
                if (validate()) {
                    submitToDataStorePromise().then(function(){
                        $state.go('tab.my');
                    });
                } else {
                    // Do nothing
                    $log.info("invalid, not submiting");
                }
            } else {
                $log.info("cancel on submit, not submiting");
            }
        });
    }
}
ctrls.controller('EditOrCreateCtrl', EditOrCreateCtrl);

function EditEntryCtrl($log, $scope, uiGmapGoogleMapApi) {
    uiGmapGoogleMapApi.then(function(maps){
        $log.info("loaded maps");
        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    });
    $scope.currentDate = new Date();

    $scope.datePickerCallback = function (val) {
        if(typeof(val)==='undefined'){
            console.log('Date not selected');
        }else{
            console.log('Selected date is : ', val);
        }
    };
}
ctrls.controller('EditEntryCtrl', EditEntryCtrl);

function ViewCtrl($scope, ConstantService) {
  $scope.FIELDS = ConstantService.FIELDS;
}
ctrls.controller('ViewCtrl', ViewCtrl);

