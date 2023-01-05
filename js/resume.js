(function ($) {
    ("use strict"); // Start of use strict

    $("#URL").val(location.hostname);
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });
    contactFormValidation();
    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#sideNav",
    });

    /*----------------------------------------
		contact form validation
	------------------------------------------*/
    function contactFormValidation() {
        $(".contact-form").validate({
            rules: {
                name: {
                    required: true,
                },
                email: {
                    required: true,
                    email: true,
                },
                subject: {
                    required: true,
                },
                message: {
                    required: true,
                },
            },
            messages: {
                name: {
                    required: "Write your name here",
                },
                email: {
                    required: "No email, no support",
                },
                subject: {
                    required: "you have a reason to contact, write it here",
                },
                message: {
                    required: "You have to write something to send this form",
                },
            },
            submitHandler: function (form) {
                $.ajax({
                    type: "POST",
                    data: $(form).serialize(),
                    url: `mail.php`,
                    success: function (data) {
                        console.log(data);
                        if (data == 1) {
                            $(".contact-form .msg-success").html(
                                `Your Message was sent successfully`
                            );
                            $(".contact-form").fadeTo("slow", 1, function () {
                                $(".contact-form .msg-success").slideDown();
                            });
                            form.resetForm();
                        } else {
                            $(".contact-form .msg-failed").html(
                                `Something went wrong, please try again later`
                            );
                            $(".contact-form").fadeTo("slow", 1, function () {
                                $(".contact-form .msg-failed").slideDown();
                            });
                        }
                    },
                    error: function (error) {
                        console.log(error);
                        $(".contact-form .msg-failed").html(
                            `Something went wrong, please try again later`
                        );
                        $(".contact-form").fadeTo("slow", 1, function () {
                            $(".contact-form .msg-failed").slideDown();
                        });
                    },
                });
            },
            errorPlacement: function (error, element) {
                element.after(error);
                error.hide().slideDown();
            },
        });
    }
})(jQuery); // End of use strict
