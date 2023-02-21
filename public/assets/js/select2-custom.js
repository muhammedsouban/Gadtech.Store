"use strict";
setTimeout(function () {
    (function ($) {
        "use strict";
        // Single Search Select
        $('.js-example-basic-single').select2();

        $(".js-example-placeholder-multiple").select2({
            placeholder: "Select Your Name"
        });

    })(jQuery);
}
    , 350);