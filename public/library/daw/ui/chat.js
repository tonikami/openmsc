(function () {
    var Message;
    var username;
    ui.getUser(function (u) {
        username = u;
    })
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side, this.usernameText = arg.usernameText;
        console.log(this);
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $message.addClass(_this.message_side).find('.usernameText').html(_this.usernameText);
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
                var author = allMessages[i].author.username;
                var message = allMessages[i].message;
                var direction = 'left';
                if (username) {
                    if (allMessages[i].author.username == username) {
                        direction = 'right';
                    }
                }
                display_message(message, '', direction);
            }
        });
        ui.messageListener(function (new_message) {
            var author = new_message.author.username;
            var message = new_message.message;
            receive_message(message, author);
        })
        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        display_message = function (text, usernameText, direction) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $messages = $('.messages');
            message = new Message({
                usernameText: usernameText,
                text: text,
                message_side: direction
            });
            message.draw();
            return $messages.animate({
                scrollTop: $messages.prop('scrollHeight')
            }, 0);
        }
        receive_message = function (text, usernameText) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $messages = $('.messages');
            message = new Message({
                usernameText: usernameText,
                text: text,
                message_side: 'left'
            });
            message.draw();
            return $messages.animate({
                scrollTop: $messages.prop('scrollHeight')
            }, 300);
        };
        sendMessage = function (text, usernameText) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message = new Message({
                usernameText: usernameText,
                text: text,
                message_side: 'right'
            });
            message.draw();
            return $messages.animate({
                scrollTop: $messages.prop('scrollHeight')
            }, 300);
        };
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                if (username) {
                    ui.sendMessage(getMessageText());
                    sendMessage(getMessageText(), username);
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
