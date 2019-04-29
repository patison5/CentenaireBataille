window.onload = function () {

    let registrationForm = document.getElementById("js-registration__form"),
        loginForm = document.getElementById("js-login__form"),
        swapFormBtn = document.getElementsByClassName('js-swap_form-btn');

    let loginSubmit = document.getElementById('js-login__submit'),
        registrationSubmit = document.getElementById('js-registration__submit');

    let _isLoginForm = true;

    for (let i = 0; i < swapFormBtn.length; i++) {
        swapFormBtn[i].addEventListener('click', function (e) {
            e.preventDefault();

            _isLoginForm = !_isLoginForm;

            if (!_isLoginForm) {
                loginForm.style.display = 'none';
                registrationForm.style.display = 'block';
            } else {
                loginForm.style.display = 'block';
                registrationForm.style.display = 'none';
            }
        })
    }

    /**
     * Отправка на сервер запроса о входе в аккаунт
     */
    loginSubmit.addEventListener('click', function (e) {
        e.preventDefault();

        let data = {
            userName: document.getElementById('js-login_login').value,
            userPassword: document.getElementById('js-login_password').value
        };

        $.ajax({
            type: "post",
            url: "/api/auth/login",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data, null, 2)
        }).success(function (data) {
            if (data.url !== undefined) {
                window.location.href = data.url;
            }
        });
    });


    /**
     * Отправка на сервер регистрационных данных
     */
    registrationSubmit.addEventListener('click', function (e) {
        e.preventDefault();

        let data = {
            userName: document.getElementById('js-registration_login').value,
            userPassword: document.getElementById('js-registration_password').value
        };

        $.ajax({
            type: "post",
            url: "/api/auth/registration",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data, null, 2)
        }).done(function (data) {

        });
    });
};