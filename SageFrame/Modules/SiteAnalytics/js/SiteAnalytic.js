﻿(function($) {
    $.createSiteAnalytic = function(p) {
        p = $.extend
                ({
                    PortalID: '',
                    UserModuleID: ''
                }, p);
        var SiteAnalyticControl = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                baseURL: SageFrameAppPath + "/Modules/SiteAnalytics/SiteAnalyticWebService.asmx/",
                method: "",
                url: "",
                method: "",
                ajaxCallMode: 0,
                PortalID: p.PortalID,
                UserModuleID: p.UserModuleID,
                StartDate: "",
                EndDate: "",
                ImagePath: SageFrameAppPath + "/Modules/SiteAnalytics/img/"
            },
            ajaxCall: function(config) {
                $.ajax({
                    type: SiteAnalyticControl.config.type,
                    contentType: SiteAnalyticControl.config.contentType,
                    cache: SiteAnalyticControl.config.cache,
                    async: SiteAnalyticControl.config.async,
                    url: SiteAnalyticControl.config.url,
                    data: SiteAnalyticControl.config.data,
                    dataType: SiteAnalyticControl.config.dataType,
                    success: SiteAnalyticControl.ajaxSuccess,
                    error: SiteAnalyticControl.ajaxFailure,
                    complete: SiteAnalyticControl.ajaxComplete
                });
            },
            //Loader
            ShowLoader: function(divID) {
                var html = "";
                html += '<div class="loader" id="' + divID + '_loading" style=" position:relative; text-align:center;">';
                html += '<img src="' + SiteAnalyticControl.config.ImagePath + 'ajax-loader.gif" alt="Processing" />';
                html += '</div>';
                $(divID).append(html);
            },
            //End Loader
            GetVisitedPage: function() {
                $('#tblVisitedPageList').PagingVisited({
                    Type: '',
                    divID: 'tblVisitedPageList', //Data div
                    PagingID: 'PagingVisitedPageList', // Paging Div
                    DataUrl: 'GetVisitedPage', // web service Method
                    DataParams: {   // json Parameter to b pass
                        StartDate: SiteAnalyticControl.config.StartDate,
                        EndDate: SiteAnalyticControl.config.EndDate,
                        range: '5'
                    },
                    PageNo: 1,
                    range: 5,
                    AutoWrap: false,
                    OnComplete3: function(msg) {
                        var html = "";
                        if (msg.d.length > 0) {
                            $('#ddlChartType2').removeAttr('disabled');
                            var PageList = msg.d;
                            html += '<thead align="center"><tr><th>Page</th><th>Visit Time</th></tr></thead>';
                            $.each(PageList, function(index, item) {
                                var styleClass = index % 2 == 0 ? 'class="sfOdd"' : "sfEven";
                                html += '<tr class=' + styleClass + '><td>' + item.VistPageWithoutExtension + '</td><td>' + item.VisitTime + '</td></tr>';
                            });
                            $('#tblVisitedPageList').html(html);
                        }
                        else {
                            html += '<span>Record not found.</span>';
                            $('#tblVisitedPageList').html(html);
                            $('#ddlChartType2').attr('disabled', 'disabled');
                        }
                    }
                });
            },
            GetCountryName: function() {
                $("#tblVisitedCountryList").PagingCountry({
                    Type: '',
                    divID: 'tblVisitedCountryList', //Data div
                    PagingID: 'PagingVisitedCountryList', // Paging Div
                    DataUrl: 'GetCountryName', // web service Method
                    DataParams: {   // json Parameter to b pass
                        StartDate: SiteAnalyticControl.config.StartDate,
                        EndDate: SiteAnalyticControl.config.EndDate,
                        range: '6'
                    },
                    PageNo: 1,
                    range: 6,
                    AutoWrap: false,
                    OnComplete2: function(data) {
                        $('.loader').remove();
                        var html = "";
                        if (data.d.length > 0) {
                            $('#ddlChartType3').removeAttr('disabled');
                            var countryList = data.d;
                            html += '<thead align="center"><tr><th>Country</th><th>Visit Time</th></tr></thead>';
                            $.each(countryList, function(index, item) {
                                var styleClass = index % 2 == 0 ? 'class="sfOdd"' : "sfEven";
                                html += '<tr class=' + styleClass + '><td>' + item.Country + '</td><td>' + item.VisitTime + '</td></tr>';
                            });
                            $('#tblVisitedCountryList').html(html);
                        }
                        else {
                            html += '<span>Record not found.</span>';
                            $('#tblVisitedCountryList').html(html);
                            $('#ddlChartType3').attr('disabled', 'disabled');
                        }
                    }
                });
            },


            GetSearchPage: function() {
                this.config.method = "GetSearchPage";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ StartDate: SiteAnalyticControl.config.StartDate, EndDate: SiteAnalyticControl.config.EndDate });
                this.config.ajaxCallMode = 6;
                this.ajaxCall(this.config);
            },

            BindSearchPage: function(msg) {
                var pages = msg.d;
                var html = '';
                html += '<option> --- Choose Page --- </option>';
                $.each(pages, function(index, item) {
                    var sn = parseInt(index) + 1;
                    html += '<option value=' + item.VisitTime + '>' + item.VistPageWithoutExtension + '</option>';
                });
                $('#slPage').html(html);

            },


            GetRefSite: function() {
                $('#tblRefSite').PagingRef({
                    Type: '',
                    divID: 'tblRefSite', //Data div
                    PagingID: 'PagingRefList', // Paging Div
                    DataUrl: 'GetRefSite', // web service Method
                    DataParams: {   // json Parameter to be pass
                        StartDate: SiteAnalyticControl.config.StartDate,
                        EndDate: SiteAnalyticControl.config.EndDate,
                        range: '5'
                    },
                    PageNo: 1,
                    range: 5,
                    AutoWrap: false,
                    OnComplete3: function(msg) {
                        var html = "";
                        if (msg.d.length > 0) {
                            var RefList = msg.d;
                            html += '<thead align="center"><tr><th>Reference Site</th><th>Visit Time</th></tr></thead>';
                            $.each(RefList, function(index, item) {
                                var styleClass = index % 2 == 0 ? 'class="sfOdd"' : "sfEven";
                                html += '<tr class=' + styleClass + '><td>' + item.RefPage + '</td><td>' + item.VisitTime + '</td></tr>';
                            });
                            $('#tblRefSite').html(html);
                        }
                        else {
                            html += '<span>Record not found.</span>';
                            $('#tblRefSite').html(html);
                        }
                    }
                });
            },
            GetBrowser: function() {
                $('#tblBrowserList').PagingBrowsed({
                    Type: '',
                    divID: 'tblBrowserList', //Data div
                    PagingID: 'PagingBrowserList', // Paging Div
                    DataUrl: 'GetBrowser', // web service Method
                    DataParams: {   // json Parameter to be pass
                        StartDate: SiteAnalyticControl.config.StartDate,
                        EndDate: SiteAnalyticControl.config.EndDate,
                        range: '5'
                    },
                    PageNo: 1,
                    range: 5,
                    AutoWrap: false,
                    OnComplete1: function(msg) {
                        var html = "";
                        if (msg.d.length > 0) {
                            $('#ddlChartType1').removeAttr('disabled');
                            var PageList = msg.d;
                            html += '<thead align="center"><tr><th>Browser</th><th>Visit Time</th></tr></thead>';
                            $.each(PageList, function(index, item) {
                                var styleClass = index % 2 == 0 ? 'class="sfOdd"' : "sfEven";
                                html += '<tr class=' + styleClass + '><td>' + item.Browser + '</td><td>' + item.VisitTime + '</td></tr>';
                            });
                            $('#tblBrowserList').html(html);
                        }
                        else {
                            html += '<span>Record not found.</span>';
                            $('#tblBrowserList').html(html);
                            $('#ddlChartType1').attr('disabled', 'disabled');
                        }
                    }
                });
            },
            //End Table Data
            GetSetting: function() {
                this.config.method = "GetSetting";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ UserModuleID: SiteAnalyticControl.config.UserModuleID, PortalID: SiteAnalyticControl.config.PortalID });
                this.config.ajaxCallMode = 0;
                this.ajaxCall(this.config);
            },
            LoadTopBrowser: function() {
                var BrowserWiseVisit = '#BrowserWiseVisit';
                SiteAnalyticControl.ShowLoader(BrowserWiseVisit);
                this.config.method = "LoadTopBrowser"
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ StartDate: SiteAnalyticControl.config.StartDate, EndDate: SiteAnalyticControl.config.EndDate });
                this.config.ajaxCallMode = 4;
                this.ajaxCall(this.config);
            },
            LoadTopVisitedPage: function() {
                var PageVisit = '#PageVisit';
                SiteAnalyticControl.ShowLoader(PageVisit);
                this.config.method = "LoadTopVisitedPage";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ StartDate: SiteAnalyticControl.config.StartDate, EndDate: SiteAnalyticControl.config.EndDate });
                this.config.ajaxCallMode = 5;
                this.ajaxCall(this.config);
            },
            LoadTopCountryName: function() {
                var CountryWiseVisit = '#CountryWiseVisit';
                SiteAnalyticControl.ShowLoader(CountryWiseVisit);
                this.config.method = "GetTopFiveCountryName";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ StartDate: SiteAnalyticControl.config.StartDate, EndDate: SiteAnalyticControl.config.EndDate });
                this.config.ajaxCallMode = 3;
                this.ajaxCall(this.config);
            },
            Range: function() {
                $('#txtStartDate').datepicker();
                $('#txtEndDate').datepicker();
                $('#txtStartDate').val(SiteAnalyticControl.config.StartDate);
                $('#txtEndDate').val(SiteAnalyticControl.config.EndDate);
            },
            MonthlyVisitMeterGauge: function() {
                var MonthlyVisitMeterGaugeChart = '#MonthlyVisitMeterGaugeChart';
                SiteAnalyticControl.ShowLoader(MonthlyVisitMeterGaugeChart);
                this.config.method = "MonthlyVisitMeterGauge";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = '{}';
                this.config.ajaxCallMode = 2;
                this.ajaxCall(this.config);
            },
            PageVisit: function(PageName, VisitTime) {
                $('#PageVisit').html('');
                $.jqplot.config.enablePlugins = true;
                var PageName = PageName;
                var arrTime = VisitTime;
                plot1 = $.jqplot('PageVisit', [arrTime], {
                    // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
                    animate: !$.jqplot.use_excanvas,
                    title: 'Page Wise Visit',
                    seriesDefaults: {
                        renderer: $.jqplot.BarRenderer,
                        rendererOptions: {
                            varyBarColor: true
                        },
                        pointLabels: { show: true }
                    },
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.CategoryAxisRenderer,
                            ticks: PageName
                        }
                    },
                    highlighter: { show: false }
                });
                $('#PageVisit').bind('jqplotDataClick',
                function(ev, seriesIndex, pointIndex, data) {
                    $('#info2').html('series: ' + seriesIndex + ', point: ' + pointIndex + ', data: ' + data);
                }
                );
            },
            CountryWiseVisitChart: function(CountryName, VisitTime) {
                $('#CountryWiseVisit').html('');
                $.jqplot.config.enablePlugins = true;
                var CountryName = CountryName;
                var arrTime = VisitTime;
                plot1 = $.jqplot('CountryWiseVisit', [arrTime], {
                    // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
                    animate: !$.jqplot.use_excanvas,
                    title: 'Country Wise Visit',
                    seriesDefaults: {
                        renderer: $.jqplot.BarRenderer,
                        rendererOptions: {
                            varyBarColor: true
                        },
                        pointLabels: { show: true }
                    },
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.CategoryAxisRenderer,
                            ticks: CountryName
                        }
                    },
                    highlighter: { show: false }
                });
                $('#CountryWiseVisit').bind('jqplotDataClick',
                function(ev, seriesIndex, pointIndex, data) {
                    $('#info1').html('series: ' + seriesIndex + ', point: ' + pointIndex + ', data: ' + data);
                }
                );
            },
            CreateRange: function(Count) {
                var counter = [100, 200, 300, 400];
                Count = Count + "";
                var length = Count.trim().length;
                if (length > 1) {
                    var num = 1;
                    for (var i = 0; i < length; i++) {
                        num += "0";
                    }
                    num = parseInt(num);
                    counter = [];
                    var inc = num / 4;
                    for (var j = 1; j <= 4; j++) {
                        counter.push(inc * j);
                    }
                    return counter;
                }
            },
            MonthlyVisitMeterGaugeChart: function(Count) {
                var Counter = [];
                Counter = SiteAnalyticControl.CreateRange(Count);
                $('MonthlyVisitMeterGaugeChart').html('');
                s1 = [Count];
                plot1 = $.jqplot('MonthlyVisitMeterGaugeChart', [s1], {
                    seriesDefaults: {
                        renderer: $.jqplot.MeterGaugeRenderer,
                        rendererOptions: {
                            label: 'Current Month Visit',
                            labelPosition: 'bottom',
                            labelHeightAdjust: -5,
                            showTickLabels: true,
                            intervals: Counter,
                            intervalColors: ['#66cc66', '#E7E658', '#cc6666']
                        }
                    }
                });
            },
            GetDailyVisit: function() {
                var DailyVisit = '#DailyVisit';
                SiteAnalyticControl.ShowLoader(DailyVisit);
                this.config.method = "GetDailyVisit";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ StartDate: SiteAnalyticControl.config.StartDate, EndDate: SiteAnalyticControl.config.EndDate });
                this.config.ajaxCallMode = 1;
                this.ajaxCall(this.config);
            },
            BrowserWiseVisit: function(data) {
                $('#BrowserWiseVisit').html('');
                s2 = data;
                jQuery.jqplot.config.enablePlugins = true;
                plot1 = jQuery.jqplot('BrowserWiseVisit', [s2], {
                    title: 'Browser Wise Visit',
                    seriesDefaults: { shadow: true, renderer: jQuery.jqplot.PieRenderer, rendererOptions: { showDataLabels: true} },
                    legend: { show: true },
                    cursor: { show: false }
                });
            },
            DateWiseVisit: function(DailyVisit) {
                $('#DailyVisit').html('');
                jQuery.jqplot.config.enablePlugins = true;
                var plot1 = $.jqplot('DailyVisit', [DailyVisit], {
                    title: 'Date wise page visit',
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.DateAxisRenderer,
                            tickOptions: {
                                formatString: '%b&nbsp;%#d'
                            }
                        },
                        yaxis: {
                            tickInterval: 5,
                            tickOptions: {
                                formatString: ''
                            }
                        }
                    },
                    highlighter: {
                        show: false
                    },
                    cursor: {
                        show: true,
                        tooltipLocation: 'sw'
                    }
                });
            },
            BindControl: function() {

                $('#slPage').live("change", function() {
                    var page = $('#slPage option:selected').val();
                    var label = "";
                    $('#spnVistTime').remove();
                    if (page != "--- Choose Page ---") {
                        label += "<label id='spnVistTime' class='sfFormlable' style='float:right;'>Visit Time - > " + page + "</label>";
                    }
                    $(label).insertAfter('#slPage');

                });

                $('#divChoose  li').live("click", function() {
                    $(this).addClass("sfDefault");
                    $('#divChoose li').not($(this)).removeClass("sfDefault");
                    if ($(this).attr('id') == 'Chart') {
                        $('#divChart').show();
                        $('#divData').hide();
                    }
                    if ($(this).attr('id') == 'Data') {
                        $('#divData').show();
                        $('#divChart').hide();
                        var PagingVisitedCountryList = '#PagingVisitedCountryList';
                        SiteAnalyticControl.ShowLoader(PagingVisitedCountryList);
                        SiteAnalyticControl.GetVisitedPage();
                        SiteAnalyticControl.GetBrowser();
                        SiteAnalyticControl.GetCountryName();
                        SiteAnalyticControl.GetRefSite();
                        SiteAnalyticControl.GetSearchPage();
                    }
                });
                $('#btnShowData').live("click", function() {
                    SiteAnalyticControl.GetSetting();
                });
            },
            ajaxComplete: function() {
                $('.loader').remove();
            },
            ajaxSuccess: function(msg) {
                switch (SiteAnalyticControl.config.ajaxCallMode) {
                    case 0:
                        if (msg.d.length > 0) {
                            $.each(msg.d, function(index, item) {
                                SiteAnalyticControl.config.StartDate = $('#txtStartDate').val() == "" ? item.StartDate : $('#txtStartDate').val();
                                SiteAnalyticControl.config.EndDate = $('#txtEndDate').val() == "" ? item.EndDate : $('#txtEndDate').val();
                                if ($('#divChoose  li.sfDefault').attr('id') == 'Chart') {
                                    $('#divChart').show();
                                    $('#divData').hide();
                                    SiteAnalyticControl.GetDailyVisit();
                                    SiteAnalyticControl.LoadTopVisitedPage();
                                    SiteAnalyticControl.LoadTopCountryName();
                                    SiteAnalyticControl.MonthlyVisitMeterGauge();
                                    SiteAnalyticControl.LoadTopBrowser();
                                }
                                if ($('#divChoose  li.sfDefault').attr('id') == 'Data') {
                                    $('#divData').show();
                                    $('#divChart').hide();
                                    var PagingVisitedCountryList = '#PagingVisitedCountryList';
                                    SiteAnalyticControl.ShowLoader(PagingVisitedCountryList);
                                    SiteAnalyticControl.GetVisitedPage();
                                    SiteAnalyticControl.GetBrowser();
                                    SiteAnalyticControl.GetCountryName();
                                    SiteAnalyticControl.GetRefSite();
                                }
                            });
                        }
                        break;
                    case 1:
                        var DailyVisit = [];
                        if (msg.d.length > 0) {
                            var arrVisit = [];
                            $.each(msg.d, function(index, item) {
                                arrVisit = [];
                                arrVisit.push(item.VisitedDate);
                                arrVisit.push(parseInt(item.VisitTime));
                                DailyVisit.push(arrVisit);
                            });
                        }
                        SiteAnalyticControl.DateWiseVisit(DailyVisit);
                        break;
                    case 2:
                        SiteAnalyticControl.MonthlyVisitMeterGaugeChart(msg.d);
                        break;
                    case 3:
                        var CountryName = [];
                        var VisitTime = [];
                        if (msg.d.length > 0) {
                            $.each(msg.d, function(index, item) {
                                CountryName.push(item.Country);
                                VisitTime.push(parseInt(item.VisitTime));
                            });
                        }
                        SiteAnalyticControl.CountryWiseVisitChart(CountryName, VisitTime);
                        break;
                    case 4:
                        var BrowserWiseVisit = [];
                        if (msg.d.length > 0) {
                            var arrVisit = [];
                            $.each(msg.d, function(index, item) {
                                arrVisit = [];
                                arrVisit.push(item.Browser);
                                arrVisit.push(parseInt(item.VisitTime));
                                BrowserWiseVisit.push(arrVisit);
                            });
                        }
                        SiteAnalyticControl.BrowserWiseVisit(BrowserWiseVisit);
                        break;
                    case 5:
                        var PageName = [];
                        var VisitTime = [];
                        if (msg.d.length > 0) {
                            $.each(msg.d, function(index, item) {
                                PageName.push(item.VistPageWithoutExtension);
                                VisitTime.push(parseInt(item.VisitTime));
                            });
                        }
                        SiteAnalyticControl.PageVisit(PageName, VisitTime);
                        break;
                    case 6:
                        SiteAnalyticControl.BindSearchPage(msg);
                        break;

                }
            },
            ajaxFailure: function(msg) {

            },
            init: function(config) {
                SiteAnalyticControl.GetSetting();
                SiteAnalyticControl.Range();
                SiteAnalyticControl.BindControl();
            }
        };
        SiteAnalyticControl.init();
    };
    $.fn.SiteAnalyticBuilder = function(p) {
        $.createSiteAnalytic(p);
    };
})(jQuery);