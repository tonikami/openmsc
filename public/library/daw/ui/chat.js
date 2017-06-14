(function () {
    var Message;
    var usernme;
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
                var new_message = allMessages[i].author + ": " + allMessages[i].message;
                var direction = 'right';
                if (allMessages[i].author == username) {
                    direction = 'left';
                }
                sendMessage(new_message, direction);
            }
        });
        ui.messageListener(function (new_message) {
            var finalMessage = new_message.author.username + "\n" + new_message.message;
            sendMessage(finalMessage);
        })
        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        sendMessage = function (text, direction) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message_side = direction;
            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();
            return $messages.animate({
                scrollTop: $messages.prop('scrollHeight')
            }, 300);
        };
        $('.send_message').click(function (e) {
            if (username) {
                var mess = username + ": " + getMessageText();
                ui.sendMessage(getMessageText());
                sendMessage(mess, 'left');
            }
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                if (username) {
                    var mess = username + ": " + getMessageText();
                    ui.sendMessage(getMessageText());
                    sendMessage(mess, 'left');
                }
            }
        });
    });
}.call(this));
