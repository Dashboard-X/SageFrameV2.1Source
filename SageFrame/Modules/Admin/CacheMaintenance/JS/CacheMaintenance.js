﻿(function($) {
    $.createCacheMaintenance = function(p) {
        p = $.extend
                ({
                    PortalID: '',
                    UserModuleID: '',
                    UserName: ''
                }, p);

        var CacheMaintenanceControl = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                baseURL: SageFrameAppPath + "/Modules/Admin/CacheMaintenance/WebService.asmx/",
                method: "",
                url: "",
                ajaxCallMode: 0,
                PortalID: p.PortalID,
                UserModuleID: p.UserModuleID
            },
            ajaxCall: function(config) {
                $.ajax({
                    type: CacheMaintenanceControl.config.type,
                    contentType: CacheMaintenanceControl.config.contentType,
                    cache: CacheMaintenanceControl.config.cache,
                    async: CacheMaintenanceControl.config.async,
                    url: CacheMaintenanceControl.config.url,
                    data: CacheMaintenanceControl.config.data,
                    dataType: CacheMaintenanceControl.config.dataType,
                    success: CacheMaintenanceControl.ajaxSuccess,
                    error: CacheMaintenanceControl.ajaxFailure,
                    complete: CacheMaintenanceControl.ajaxComplete
                });
            },

            ResetCache: function(CashKey) {
                this.config.method = "ResetCache";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ CashKey: CashKey });
                this.config.ajaxCallMode = 0;
                this.ajaxCall(this.config);
            },
            EnableHeavyCache: function(EnableHeavyCacheKey, DisableHeavyCacheKey) {
                this.config.method = "EnableHeavyCache";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ EnableHeavyCacheKey: EnableHeavyCacheKey, DisableHeavyCacheKey: DisableHeavyCacheKey, PortalID: p.PortalID });
                this.config.ajaxCallMode = 2;
                this.ajaxCall(this.config);
            },

            GetCacheKeys: function() {
                this.config.method = "GetCacheKeys";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = '{}';
                this.config.ajaxCallMode = 1;
                this.ajaxCall(this.config);
            },
            GetHeavyCacheKey: function() {
                this.config.method = "GetHeavyCacheKey";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({ PortalID: p.PortalID });
                this.config.ajaxCallMode = 3;
                this.ajaxCall(this.config);
            },
            BindHeavyCacheKey: function(msg) {
                var HeavyCachKey = msg.d;
                if (msg.d.length > 0) {

                    $.each(HeavyCachKey, function(index, item) {
                        switch (item.HeavyCacheKey) {
                            case 1:
                                $('#chkFrontMenu').attr('checked', 'checked');
                                break;
                            case 2:
                                $('#chkSideMenu').attr('checked', 'checked');

                                break;
                            case 3:
                                $('#chkFooterMenu').attr('checked', 'checked');
                                break;
                        }

                    });
                }
            },
            BindCachKey: function(msg) {
                var CachKey = msg.d;
                var html = "";
                if (msg.d.length > 0) {
                    html += '<table width="100%" id="tblCache">';
                    html += '<tr>'
                    html += '<th>Check All</th>'
                    html += '<th><input type="checkbox" id="chkCheckAll" class="sfCheckbox"  /></th>';
                    html += '</tr>';
                    $.each(CachKey, function(index, item) {
                        if (item != "") {
                            html += '<tr>';
                            html += '<td><label id="lbl_" ' + item.CacheKey + ' class="sfFormlabel">' + item.CacheKey + '</label></td>';
                            html += '<td><input type="checkbox" id="chk_" ' + item.CacheKey + ' class="sfCheckbox"  name="clearCache" value="' + item.CacheKey + '" /></td>';
                            html += '</tr>';

                        }
                    });
                }
                else {
                    html += '<label id="lblmsg" class="sfFormlabel"> Cache is clear.</label>';
                }
                html += '</table>';
                $('#divBindCacheKey').html(html);

            },

            BindControl: function() {
                $('#btnSave').live("click", function() {
                    if ($("input[name='clearCache']:checked").length > 0) {
                        var CashKey = "";
                        $("input[name='clearCache']:checked").each(function() {
                            CashKey += $(this).val() + ",";
                        });
                        CacheMaintenanceControl.ResetCache(CashKey);
                        CacheMaintenanceControl.GetCacheKeys();
                    }
                    else {
                        SageFrame.messaging.show("Select At least a cache to clear", "Error");
                    }
                });
                $('#chkCheckAll').live("click", function() {
                    if ($(this).is(':checked')) {
                        $("input[name='clearCache']").each(function() {
                            $(this).attr("checked", "checked");
                        });

                    } else {
                        $("input[name='clearCache']").each(function() {
                            $(this).attr("checked", false);
                        });
                    }
                });

                $('#chkCheckAllHeavyCache').live("click", function() {
                    if ($(this).is(':checked')) {
                        $("input[name='chkHeavyCache']").each(function() {
                            $(this).attr("checked", "checked");
                        });

                    } else {
                        $("input[name='chkHeavyCache']").each(function() {
                            $(this).attr("checked", false);
                        });
                    }
                });

                $('#tblCache tr').each(function(index, value) {
                    var styleClass = index % 2 == 0 ? "sfOdd" : "sfEven";
                    $(this).addClass(styleClass);
                });
                $('#btnEnableCache').live("click", function() {
                    //if ($("input[name='chkHeavyCache']:checked").length > 0) {
                        var EnableHeavyCacheKey = "";
                        var DisableHeavyCacheKey = "";
                        $("input[name='chkHeavyCache']:checked").each(function() {
                            EnableHeavyCacheKey += $(this).val() + ",";
                        });
                        $("input[name='chkHeavyCache']:not(:checked)").each(function() {
                            DisableHeavyCacheKey += $(this).val() + ",";
                        });
                        CacheMaintenanceControl.EnableHeavyCache(EnableHeavyCacheKey, DisableHeavyCacheKey);
//                    }
//                    else {
//                        SageFrame.messaging.show("Select At least a cache to enable", "error");
//                    }
                });
            },
            ajaxComplete: function() {

            },
            ajaxSuccess: function(msg) {
                switch (CacheMaintenanceControl.config.ajaxCallMode) {
                    case 0:
                        SageFrame.messaging.show("Cache clear successfully", "success");
                        break;
                    case 1:
                        CacheMaintenanceControl.BindCachKey(msg);
                        break;
                    case 2:
                        SageFrame.messaging.show("Enable cache successfully", "success");
                        break;
                    case 3:
                        CacheMaintenanceControl.BindHeavyCacheKey(msg);
                        break;
                }
            },
            ajaxFailure: function(msg) {
                return false;
            },
            init: function(config) {

                CacheMaintenanceControl.BindControl();
                CacheMaintenanceControl.GetCacheKeys();
                CacheMaintenanceControl.GetHeavyCacheKey();
            }
        };
        CacheMaintenanceControl.init();
    };
    $.fn.CacheMaintenance = function(p) {
        $.createCacheMaintenance(p);
    };
})(jQuery);
