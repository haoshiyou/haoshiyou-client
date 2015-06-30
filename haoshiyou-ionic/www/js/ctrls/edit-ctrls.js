var ctrls = angular.module('haoshiyou.editCtrls', ['ngResource', 'lbServices']);

function EditCtrl($log, $scope, $ionicModal, $q, $ionicPopup, $state, HsyPost) {
    $scope.postInput = {};
    $scope.dirty = {};
    $scope.FIELDS = [
        { key: 'needType', label:'需求类型', icon: 'ion-star',
            required: true, type: 'radio', options: ['招租', '求租']
        },
        { key: 'location', label:'位置', icon: 'ion-location', required: true,
            type: 'location' },
        { key: 'startDate', label:'起始时间', icon: 'ion-calendar', required: true,
            type: 'date'
        },
        { key: 'price', label:'预期价格', icon: 'ion-cash',
            type: 'number' },
        { key: 'house', label:'房屋', icon: 'ion-ios-home-outline',
            type: 'checkbox', options: [
            { key: 'privateBath', label: '独立卫生间' },
            { key: 'designatedParking' , label :'专用停车位' }
        ]
        },
        { key: 'roommate', label: '室友', icon: 'ion-person',
            type: 'checkbox', options: [
            { key: 'lessCooking', label: '少炊' },
            { key: 'noPets', label: '不带宠物' }
        ]},
        { key: 'introduction', label:'情况简介', icon: 'ion-document', required: true,
            type: 'text'
        }
    ];
    // Load the add / change dialog from the given template URL
    $ionicModal.fromTemplateUrl('templates/edit-entry.html', function(modal) {
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

ctrls.controller('EditCtrl', EditCtrl);

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