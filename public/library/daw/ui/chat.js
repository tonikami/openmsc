(function () {
    var Message;
    var username;
    ui.getUser(function (u) {
        username = u;
    })
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var messageHistory = ui.getMessages(function (allMessages) {
            for (var i in allMessages) {
                var new_message = allMessages[i].author.username + ": " + allMessages[i].message;
                var direction = 'right';
                if (username) {
                    if (allMessages[i].author.username == username) {
                        direction = 'left';
                    }
                }
                display_message(new_message, direction);
            }
        });
        ui.messageListener(function (new_message) {
            var finalMessage = new_message.author.username + ": " + new_message.message;
            receive_message(finalMessage);
        })
        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        display_message = function (text, direction) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $messages = $('.messages');
            message = new Message({
                text: text,
                message_side: direction
            });
            message.draw();
        }
        receive_message = function (text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $messages = $('.messages');
            message = new Message({
                text: text,
                message_side: 'right'
            });
            message.draw();
            return $messages.animate({
                scrollTop: $messages.prop('scrollHeight')
            }, 300);
        };
        sendMessage = function (text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message = new Message({
                text: text,
                message_side: 'left'
            });
            message.draw();
            return $messages.animate({
                scrollTop: $messages.prop('scrollHeight')
            }, 300);
        };
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                if (username) {
                    var mess = username + ": " + getMessageText();
                    ui.sendMessage(getMessageText());
                    sendMessage(mess);
                }
            }
        });
    });
}.call(this));


$(function () {
    $(".top_menu").click(function () {
        console.log('Click');
        if ($(this).parent().hasClass('mini')) {
            console.log('maximising');

            $(this).parent().removeClass('mini').addClass('normal');
            $('.messangerBody').animate({
                height: "400px"
            }, 500).show();

            setTimeout(function () {
                $('.bottom_wrapper').show();
            }, 500);
        } else {
            console.log('minimizing');

            $(this).parent().removeClass('normal').addClass('mini');
            $('.messangerBody').animate({
                height: "0px"
            }, 500).show();
            setTimeout(function () {
                $('.bottom_wrapper').hide();
            }, 500);
        }
    });
})