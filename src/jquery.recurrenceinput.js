/**
 * http://garbas.github.com/jquery.recurrenceinput.js
 *
 * Author: Rok Garbas <rok@garbas.si>
 * Since: Sep 2010
 * Date: XX-XX-XXXX
 */
(function($) {

    var today = new Date()
    var basename = 'recurrenceinput';

    /**
     * Configurable values
     */
    var default_conf = {
        // STRING TO BE TRANSLATED
        i18n: {
            display_label_unactivate: 'Does not repeat',
            display_label_activate: 'Repeats ',

            freq_daily: 'Daily',
            freq_weekly: 'Weekly',
            freq_monthly: 'Monthly',
            freq_yearly: 'Yearly',

            daily_interval: 'Every [INPUT] days.',

            weekly_interval: 'Every [INPUT1] week(s) on:',

            monthly_day_of_month: 'Day [INPUT1] of the month, every [INPUT2] month(s).',
            monthly_weekday_of_month: 'The [INPUT1] [INPUT2], every [INPUT3] month(s)',

            yearly_day_of_month: 'Every [INPUT1] [INPUT2]',
            yearly_weekday_of_month: 'The [INPUT1] [INPUT2] of [INPUT3]',
            yearly_weekday_of_month_weekday: 'Weekday',
            yearly_weekday_of_month_weekend_day: 'Weekend Day',

            range_label: 'End recurrance',
            range_no_end_label: 'No end',
            range_by_occurences_label: 'End after [INPUT] occurence(s)',
            range_by_end_date_label: 'End by: ',

            cancel_button_label: 'Cancel',
            save_button_label: 'Save',

            order_indexes: ['First', 'Second', 'Third', 'Fourth', 'Last'],
            months: [
                'Januar', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'],
            weekdays: [
                'Monday', 'Tuesday', 'Wednesday', 'Thursday',
                'Friday', 'Saturday', 'Sunday']
        },

        // FORM OVERLAY
        form_overlay: {
           speed: 'fast',
           mask: {
               color: '#ebecff',
               loadSpeed: 'fast',
               closeSpeed: 'fast',
               opacity: 0.5
           }
        },

        range_by_end_date_calendar: {
            yearRange: [-10, 10],
            selectors: true,
            trigger: true
        },

        order_indexes: ['+1', '+2', '+3', '+4', '-1'],
        weekdays: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'],

        // FIELD VALUES
        field: {
            display_name: basename+'_display',
            display_text: null,

            checkbox_name: basename+'_checkbox',
            edit_name: basename+'_button',

            freq_name: basename+'_freq',
            freq_daily_value: 'DAILY',
            freq_weekly_value: 'WEEKLY',
            freq_monthly_value: 'MONTHLY',
            freq_yearly_value: 'YEARLY',

            daily_interval_name: basename+'_daily_interval',
            daily_interval_value: '1',

            weekly_interval_name: basename+'_weekly_interval',
            weekly_interval_value: '1',
            weekly_weekdays_name: basename+'_weekly_weekdays',

            monthly_type_name: basename+'_monthly_type',
            monthly_day_of_month_value: 'DAY_OF_MONTH',
            monthly_day_of_month_interval_value: '1',
            monthly_day_of_month_interval_name: '_monthly_day_of_month_interval',
            monthly_weekday_of_month_value: 'WEEKDAY_OF_MONTH',
            monthly_weekday_of_month_index_name: basename+'_monthly_weekday_of_month_index',
            monthly_weekday_of_month_name: basename+'_monthly_weekday_of_month',
            monthly_weekday_of_month_interval_name: basename+'_monthly_weekday_of_month_interval',
            monthly_weekday_of_month_interval_value: '1',

            yearly_type_name: basename+'_yearly_type',
            yearly_day_of_month_name: basename+'_yearly_day_of_month',
            yearly_day_of_month_index_name: basename+'_yearly_day_of_month_index',
            yearly_day_of_month_value: 'DAY_OF_MONTH',
            yearly_weekday_of_month_index_name: basename+'_yearly_weekday_of_month_index',
            yearly_weekday_of_month_name: basename+'_yearly_weekday_of_month',
            yearly_weekday_of_month_month_name: basename+'_yearly_weekday_of_month_month',
            yearly_weekday_of_month_value: 'WEEKDAY_OF_MONTH',
            yearly_weekday_of_month_weekday_value: 'WEEKDAY',
            yearly_weekday_of_month_weekend_day_value: 'WEEKEND_DAY',

            range_type_name: basename+'_range_type',
            range_no_end_name: basename+'_range_no_end',
            range_no_end: 'NO_END_DATE',
            range_by_ocurrences_name: basename+'_range_by_ocurrences',
            range_by_ocurrences: 'BY_OCURRENCES',
            range_by_ocurrences_value_name: basename+'_range_by_ocurrences_value',
            range_by_ocurrences_value: '10',
            range_by_end_date_name: basename+'_range_by_end_date',
            range_by_end_date: 'BY_END_DATE',
            range_by_end_date_year_value: today.getFullYear(),
            range_by_end_date_month_value: today.getMonth(),
            range_by_end_date_day_value: today.getDate(),
            range_by_end_date_year_name: basename+'_range_by_end_date_year',
            range_by_end_date_month_name: basename+'_range_by_end_date_month',
            range_by_end_date_day_name: basename+'_range_by_end_date_day',
            range_by_end_date_calendar_name: basename+'_range_by_end_date_calendar',
        },

        // TEMPLATE NAMES
        template: {
            form: '#jquery-recurrenceinput-form-tmpl',
            display: '#jquery-recurrenceinput-display-tmpl',
        },

        // CLASS NAMES
        klass: {
            clear: basename+'_clear',
            main: basename+'_main',

            display: basename+'_display',
            display_text: basename+'_display_text',

            form: basename+'_form',
            freq: basename+'_freq',
            freq_options: basename+'_freq_options',
            freq_option_active: basename+'_freq_option_active',
            freq_daily: basename+'_freq_daily',
            freq_weekly: basename+'_freq_weekly',
            freq_monthly: basename+'_freq_monthly',
            freq_yearly: basename+'_freq_yearly',

            weekly_interval: basename+'_weekly_interval',
            weekly_weekdays: basename+'_weekly_weekdays',

            range: basename+'_range',
            range_type: basename+'_range_type',
            range_by_ocurrences: basename+'_range_by_ocurrences',
            range_by_end_date: basename+'_range_by_end_date',

            cancel_button: basename+'_cancel_button',
            save_button: basename+'_save_button'
        }
    };

    /**
     * RecurrenceInput - form, display and tools for recurrenceinput widget
     */
    function RecurrenceInput(conf) {

        var self = this;
        $.ajax({
            url: $(conf.template.display)[0].src,
            async: false,
            success: function (data) {
                conf.template.display = data;
            }
        });

        $.ajax({
            url: $(conf.template.form)[0].src,
            async: false,
            success: function (data) {
                conf.template.form = data;
            }
        });

        // The display part of the widget
        var display = $(conf.template.display).tmpl(conf);
        // recurrance form in an overlay
        var form = $(conf.template.form).tmpl(conf);
        overlay_conf = $.extend(conf.form_overlay, {});
        form.hide().overlay(overlay_conf);

        display.find('input[name='+conf.field.range_by_end_date_calendar_name+']').dateinput({
            selectors: true,
        });

        function recurrenceOn() {
            display.find('div[class='+conf.klass.range+']').show();
            RFC2554 = widget_save_to_rfc2445(form, conf);
            display.closest('form').find('textarea').val(RFC2554);
        };

        function recurrenceOff() {
            display.find('div[class='+conf.klass.range+']').hide();
            display.closest('form').find('textarea').val('');
        };

        function toggleRecurrence(e) {
            var checkbox = display.find('input[name='+conf.field.checkbox_name+']');
            if (checkbox.is(':checked')) {
                recurrenceOn();
            } else {
                display.find('div[class='+conf.klass.range+']').hide();
                display.closest('form').find('textarea').val('');
                recurrenceOff();
            }
        };
        toggleRecurrence();

        display.find('input[name='+conf.field.checkbox_name+']').click(toggleRecurrence);

        // show form overlay on change of display radio box 
        display.find('a[name='+conf.field.edit_name+']')
            .click(function(e) {
                e.preventDefault();
                form.overlay().load();
        });


        //  make labels clickable (XXX: Seriously? You need JS for that?)
        function clickableLabel() {
            $(this).parent().find('> input').click().change();
        }
        form.find('ul.'+conf.klass.freq+' label').click(clickableLabel);
        display.find('label').click(clickableLabel);

        // frequency options
        form.find('input[name='+conf.field.freq_name+']')
            .change(function(e) {
                form.find('div.'+conf.klass.freq_options+' > div').hide();
                form.find($(this).attr('ref')).show()
                    .addClass(conf.klass.freq_option_active);
        });


        /**
         * Saving data selected in form and returning RFC2554 string
         */
        function save(event) {
            event.preventDefault();
            // close overlay
            form.overlay().close();
            // check checkbox
            display.find('input[name='+conf.field.checkbox_name+']')
                    .attr('checked', true);
            recurrenceOn();
        }


        /**
         * Loading (populating) display and form widget with
         * passed RFC2554 string (data)
         */
        function load(data) {
            if (data) {
                widget_load_from_rfc2445(form, data);
                // check checkbox
                display.find('input[name='+conf.field.checkbox_name+']')
                    .attr('checked', true);
                recurrenceOn();
            } //else {
                //alert('we should load default values. FREQ')
            //}
        }


        /*
         * Public API of RecurrenceInput
         */
        $.extend(self, {
            display: display,
            form: form,
            load: load,
            save: save
        });

        // This is necessary, but I don't understand why.
        form.find('.'+conf.klass.save_button).click(save);
    }


    /*
     * jQuery plugin implementation
     */
    $.fn.recurrenceinput = function(conf) {
        if (this.data('recurrenceinput')) { return this; } // plugin already installed
        // "compile" configuration for widget
        var conf = $.extend(default_conf, conf)

        this.each(function() { // apply this for every textarea
            var textarea = $(this);
            if (textarea[0].type == 'textarea') {
                // our recurrenceinput widget instance
                var recurrenceinput = new RecurrenceInput(conf);
                // hide textarea and place display_widget after textarea
                recurrenceinput.form.appendTo('body');
                textarea.after(recurrenceinput.display);
                // load data provided by textarea
                recurrenceinput.load(textarea.val());
                // hide the textarea
                //textarea.hide(); Commented while developing
            };
        });
    };

})(jQuery);
