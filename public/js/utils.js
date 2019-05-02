/**
 * Вывод сообщения от сервера пользователю
 */
let showMessgae = function (data, buttonEvent, buttonText) {

    $(".message_wrap_jq").remove();

    let template = String.raw`<div class="message_wrap_jq">
                                    <div class="message_wrap">
                                        <div class="message_container">
                                            <div class="message">
                                                <p>${data.message}</p>
                                            </div>
                                            <div class="message_button" data-event="${buttonEvent}">
                                                <div class="button">
                                                    <p>${buttonText}</p>
                                                </div>    
                                            </div>
                                         </div>
                                     </div> 
                              </div>`;
    $("body").append(template);

    let elem = $(".message_button").last();
    elem.click(function () {
        closeMessage($(this)[0], data);
    });
    $(".message_wrap_jq").fadeIn(1000);
};

/**
 * Закрытие сообщения пользователя
 */
let closeMessage = function (elem, data) {
    let event = elem.getAttribute("data-event");

    if (event === "registr_event") {
        $(".message_wrap_jq").last().fadeOut(1000);
    }
    if (event === "login_event") {
        if (data.ok) {
            setTimeout(() => {
                window.location.href = data.url;
            }, 1000);
        }
        $(".message_wrap_jq").last().fadeOut(1000);
    }
    if (event === "nickname_changed") {
        $(".message_wrap_jq").last().fadeOut(1000);
    }
    if (event === "createBattle") {
        $(".message_wrap_jq").last().fadeOut(1000);
    }
};