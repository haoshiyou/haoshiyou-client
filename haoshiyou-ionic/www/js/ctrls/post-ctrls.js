var ctrls = angular.module('haoshiyou.PostCtrls', ['ngResource', 'lbServices']);

function EditOrCreateCtrl($log, $scope, $q, $state, $stateParams,
                          $ionicLoading, $ionicModal,  $ionicPopup,
                          HsyPost, ConstantService, SessionService, uuid4) {
    $scope.postInput = {};
    $scope.dirty = {};
    if ($stateParams.postId) {
        $scope.title = "编辑";
        $scope.submitLabel = "更新";
        HsyPost.findById({id: $stateParams.postId}, function(hsyPost){

            $log.info("original!");
            $log.info(hsyPost);
        }, function(err){});
        HsyPost.findById({id: $stateParams.postId}).$promise
            .then(function(hsyPost){
                $log.info("Fetched!");
                $log.info(hsyPost);
                $log.info(HsyPost);
                return $q.all([hsyPost,
                    HsyPost.hsyHousePreference({id: $stateParams.postId})
                        .$promise,
                    HsyPost.hsyRoommatePreference({id: $stateParams.postId})
                        .$promise
                ]);
            }).then(function(results) {
                $log.info(results);
                var hsyPost = results[0];
                var housePref = results[1];
                var roommatePref = results[2];
                for (var i in $scope.FIELDS) {
                    var field = $scope.FIELDS[i];
                    if (field.type === "date") {
                        $scope.postInput[field.key] = new Date(hsyPost[field.key]);
                    } else {
                        $scope.postInput[field.key] = hsyPost[field.key];
                    }
                }

                ['privateBath', 'designatedParking'].forEach(function(key) {
                    $scope.postInput[key] = housePref[key];
                });
                ['lessCooking', 'noPets'].forEach(function(key) {
                    $scope.postInput[key] = roommatePref[key];
                });
            })
            .catch(function(err){
                //TODO(zzn): handle error when no postId found
            });

    } else {
        $scope.title = "创建";
        $scope.submitLabel = "发布";
    }

    $scope.FIELDS = ConstantService.FIELDS;
    // Load the add / change dialog from the given template URL
    $ionicModal.fromTemplateUrl('templates/edit-field.html', function(modal) {
        $scope.modal = modal;
    }, {
        scope: $scope,
        backdropClickToClose: false
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
        post.guid = uuid4.generate();
        post.createdBySessionId = SessionService.getSessionId();
        $log.info("new guid = " + post.guid);
        var roommatePreference = _.pick($scope.postInput, ['lessCooking', 'noPets']);
        var housePreference = _.pick($scope.postInput, ['privateBath', 'designatedParking']);
        if ($stateParams.postId) {
            return HsyPost.findById({id: $stateParams.postId}).$promise
                .then(function(hsyPost) {
                    $log.info(hsyPost);
                    for (var i in $scope.FIELDS) {
                        var field = $scope.FIELDS[i];
                        hsyPost[field.key] = $scope.postInput[field.key];
                    }
                    return $q.all([
                        hsyPost.$save(),
                        HsyPost.hsyHousePreference.update({id: $stateParams.postId}, housePreference),
                        HsyPost.hsyRoommatePreference.update({id: $stateParams.postId}, roommatePreference),
                    ]);
                }).catch(function(err) {
                    $log.error(err);
                });
        } else {
            return HsyPost.create(post).$promise
                .then(function (hsyPost) {
                    $log.info(hsyPost);
                    return $q.all([

                        HsyPost.hsyHousePreference.create({id: hsyPost.id}, housePreference),
                        HsyPost.hsyRoommatePreference.create({id: hsyPost.id}, roommatePreference),
                    ]);
                });

        }
    }
    $scope.onSubmit = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: '确认发布'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $scope.attempted = true;
                if (validate()) {
                    submitToDataStorePromise().then(function(){
                        $state.go('tab.my');
                        $ionicLoading.show({ template: $scope.submitLabel + '成功', noBackdrop: true, duration: 1500 });
                    });
                } else {
                    // Do nothing

                    $ionicLoading.show({ template: $scope.submitLabel + '失败', noBackdrop: true, duration: 1500 });
                    $log.info("invalid, not submiting");
                }
            } else {
                $log.info("cancel on submit, not submiting");
            }
        });
    }
}
ctrls.controller('EditOrCreateCtrl', EditOrCreateCtrl);

function ViewCtrl($scope, $state, ConstantService, HsyPost, $stateParams, $log, $q) {
  $scope.$state = $state;
  $scope.FIELDS = ConstantService.FIELDS;
    $scope.postInput = {};
  $log.info("view post id = " + $stateParams.postId);
    HsyPost.findById({id: $stateParams.postId}).$promise
        .then(function(hsyPost){
            $log.info("Fetched!");
            $log.info(hsyPost);
            $log.info(HsyPost);
            return $q.all([hsyPost,
                HsyPost.hsyHousePreference({id: $stateParams.postId})
                    .$promise,
                HsyPost.hsyRoommatePreference({id: $stateParams.postId})
                    .$promise
            ]);
        }).then(function(results) {
            $log.info(results);
            var hsyPost = results[0];
            var housePref = results[1];
            var roommatePref = results[2];
            for (var i in $scope.FIELDS) {
                var field = $scope.FIELDS[i];
                if (field.type === "date") {
                    $scope.postInput[field.key] = new Date(hsyPost[field.key]);
                } else {
                    $scope.postInput[field.key] = hsyPost[field.key];
                }
            }

            ['privateBath', 'designatedParking'].forEach(function(key) {
                $scope.postInput[key] = housePref[key];
            });
            ['lessCooking', 'noPets'].forEach(function(key) {
                $scope.postInput[key] = roommatePref[key];
            });
        })
        .catch(function(err){
            //TODO(zzn): handle error when no postId found
        });
}
ctrls.controller('ViewCtrl', ViewCtrl);


function EditStartDateCtrl($scope, $state, ConstantService, HsyPost, $stateParams, $log, $q) {
    $scope.currentDate = new Date();

    $scope.datePickerCallback = function (val) {
        if(typeof(val)==='undefined'){
            console.log('Date not selected');
        }else{
            console.log('Selected date is : ', val);
        }
    };

    $scope.isIOS = ionic.Platform.isIOS();
}

ctrls.controller('EditStartDateCtrl', EditStartDateCtrl);