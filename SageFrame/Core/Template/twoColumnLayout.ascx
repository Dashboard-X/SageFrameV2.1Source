<%@ Control Language="C#" ClassName="twoColumnLayout" %>
<div id='sfOuterWrapper' class="sfCurve" runat="server">
    <div class='sfSectionwrap sfWrap0 clearfix'>
        <div id='sfHeaders' class='sfOuterwrapper clearfix'>
            <div class='sfInnerwrapper clearfix'>
                <div class='sfMoreblocks clearfix'>
                    <div id="sfLogo" style='width: 30%; float: left'>
                        <div class='sfWrapper'>
                            <asp:PlaceHolder ID='pch_logo' runat='server'></asp:PlaceHolder>
                        </div>
                    </div>
                    <div id="sfSearch" style='width: 70%; float: left'>
                        <div class='sfWrapper'>
                            <asp:PlaceHolder ID='pch_search' runat='server'></asp:PlaceHolder>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id='sfNavigation' class='sfOuterwrapper clearfix'>
            <div class='sfInnerwrapper clearfix'>
                <div class='sfMoreblocks clearfix'>
                    <th id="sfNavigation" style='width=100%'>
                        <div class='sfWrapper'>
                            <asp:PlaceHolder ID='pch_navigation' runat='server'></asp:PlaceHolder>
                        </div>
                </div>
            </div>
        </div>
        <div id='sfBreadcrumb' class='sfOuterwrapper clearfix'>
            <div class='sfInnerwrapper clearfix'>
                <div class='sfMoreblocks clearfix'>
                    <th id="sfBreadcrumb" style='width=100%'>
                        <div class='sfWrapper'>
                            <asp:PlaceHolder ID='pch_breadcrumb' runat='server'></asp:PlaceHolder>
                        </div>
                </div>
            </div>
        </div>
        <div id='sfMessage' class='sfOuterwrapper clearfix'>
            <div class='sfInnerwrapper clearfix'>
                <div class='sfMoreblocks clearfix'>
                    <th id="sfMessage" style='width=100%'>
                        <div class='sfWrapper'>
                            <asp:PlaceHolder ID='pch_message' runat='server'></asp:PlaceHolder>
                        </div>
                </div>
            </div>
        </div>
        <div id='sfBodyContent' class='sfOuterwrapper sfCurve clearfix'>
            <div class='sfInnerwrapper clearfix'>
                <div class='clearfix'>
                    <div id='sfMainWrapper' style='width: 72%'>
                        <div class='sfContainer sfCurve'>
                            <div class='sfMainContent sfCurve'>
                                <div class='middlemaincurrent'>
                                    <div class='sfWrapper'>
                                        <asp:PlaceHolder ID='pch_middlemaincurrent' runat='server'></asp:PlaceHolder>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id='sfRight' style='width: 28%'>
                        <div class='sfContainer sfCurve'>
                            <div class='sfColswrap sfSingle sfCurve clearfix'>
                                <div class='sfRightb clearfix ' style='width: 100%'>
                                    <div class='sfWrapper'>
                                        <asp:PlaceHolder ID='pch_righta' runat='server'></asp:PlaceHolder>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class='sfBlockwrap sfWrap1 sffooterwrapper clearfix'>
        <div id='sfFooterblocks' class='sfOuterwrapper clearfix'>
            <div class='sfInnerwrapper clearfix'>
                <div class='sfMoreblocks clearfix'>
                    <div id="sfTestimonials" style='width: 25%; float: left'>
                        <div class='sfWrapper'>
                            <asp:PlaceHolder ID='pch_testimonials' runat='server'></asp:PlaceHolder>
                        </div>
                    </div>
                    <div id="sfSubscribe" style='width: 25%; float: left'>
                        <div class='sfWrapper'>
                            <asp:PlaceHolder ID='pch_subscribe' runat='server'></asp:PlaceHolder>
                        </div>
                    </div>
                    <div id="sfSocial" style='width: 25%; float: left'>
                        <div class='sfWrapper'>
                            <asp:PlaceHolder ID='pch_social' runat='server'></asp:PlaceHolder>
                        </div>
                    </div>
                    <div id="sfContact" style='width: 25%; float: left'>
                        <div class='sfWrapper'>
                            <asp:PlaceHolder ID='pch_contact' runat='server'></asp:PlaceHolder>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id='sfCopyright' class='sfOuterwrapper clearfix'>
            <div class='sfInnerwrapper clearfix'>
                <div class='sfMoreblocks clearfix'>
                    <th id="sfCopyright" style='width=100%'>
                        <div class='sfWrapper'>
                            <asp:PlaceHolder ID='pch_copyright' runat='server'></asp:PlaceHolder>
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>
