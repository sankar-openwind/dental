app.factory('roleInterceptor', function () {
    return {
        setRole: function (roleName) {
            if (typeof (Storage) !== "undefined") {
                sessionStorage.role = roleName;
            }
        },
        isAdmin: function () {
            if (sessionStorage.role == 'admin') {
                return true;
            } else {
                return false;
            }
        },
        isDoctor: function () {
            if (sessionStorage.role == 'doctor') {
                return true;
            } else {
                return false;
            }
        },
        isReceptionist: function () {
            if (sessionStorage.role == 'receptionist') {
                return true;
            } else {
                return false;
            }
        },
        isLoggedIn: function () {
            if (sessionStorage.role) {
                return true;
            } else {
                return false;
            }
        }

    };
});