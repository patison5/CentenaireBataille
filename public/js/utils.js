/**
 * Вывод сообщения от сервера пользователю
 */
let showMessgae = function (message, buttonEvent, buttonText, data) {

    $(".message_wrap_jq").remove();

    let template = String.raw`<div class="message_wrap_jq">
                                    <div class="message_wrap">
                                        <div class="message_container">
                                            <div class="message">
                                                <p>${message}</p>
                                            </div>
                                            <div class="message_button">
                                                <div data-event="${buttonEvent}" class="button">
                                                    <p>${buttonText}</p>
                                                </div>
                                                <div class="button close">
                                                    <p>Закрыть</p>
                                                </div>
                                            </div>
                                         </div>
                                     </div> 
                              </div>`;
    $("body").append(template);

    let buttons = $(".message_wrap_jq .message_button .button");
    (buttons[0]).addEventListener("click", function () {
        closeMessage($(this)[0], data);
    });
    buttons[1].addEventListener("click", () => {
        $(".message_wrap_jq").last().fadeOut(1000);
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
            }, 2000);
        }
        $(".message_wrap_jq").last().fadeOut(1000);
    }
    if (event === "nickname_changed") {
        $(".message_wrap_jq").last().fadeOut(1000);
    }
    if (event === "createBattle") {
        window.location.href = window.location.href + data.url;
        $(".message_wrap_jq").last().fadeOut(1000);
    }
    if (event === "error") {
        $(".message_wrap_jq").last().fadeOut(1000);
    }
    if (event === "current_battle") {
        socket.emit("reConnect");
    }
};