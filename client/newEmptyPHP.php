<!DOCTYPE html><html lang="en">
    <head> 
        
        <base href="http://www.thelostbitcoin.com">
        
        <title>Bitponger - The realtime multiplayer Bitcoin game !</title>
        
        <meta charset="utf-8"> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, maximum-scale=1, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        

        <link href="/css/ui-lightness/jquery-ui-1.10.3.custom.css" media="screen" rel="stylesheet" type="text/css">
        <link href="/css/style.css" media="screen" rel="stylesheet" type="text/css">
        <link href="/css/style_hover.css" media="screen" rel="stylesheet" type="text/css">
        <link href="/css/flapper.css" media="screen" rel="stylesheet" type="text/css">
        <link href="http://fonts.googleapis.com/css?family=Lobster+Two|Bangers|Dosis|Open+Sans:400,800|Roboto|Permanent+Marker|Oswald" media="screen" rel="stylesheet" type="text/css">
        <!--<link href="http://fonts.googleapis.com/css?family=Lobster+Two|Bangers|Dosis|Dancing+Script|Permanent+Marker|Open+Sans:400,800|Roboto|Oswald|Cabin" media="screen" rel="stylesheet" type="text/css">-->
        <link href="/img/favicon.ico" rel="shortcut icon" type="image/vnd.microsoft.icon">
        <!--[if lt IE 9]><script type="text/javascript" src="/js/html5shiv.js"></script><![endif]-->
        <!--[if lt IE 9]><script type="text/javascript" src="/js/respond.min.js"></script><![endif]-->
        
        <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script type="text/javascript" src="/js/stats.min.js"></script> 
        <script type="text/javascript" src="/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="/js/jquery.timeago.js"></script>
        <script type="text/javascript" src="/js/jquery.velocity.min.js"></script>
        <script type="text/javascript" src="/js/jstorage.js"></script>
        <script type="text/javascript" src="/js/jquery.validate.min.js"></script>
        <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>
        <script type="text/javascript" src="/js/jquery.transit.min.js"></script>
        <script type="text/javascript" src="/js/jquery.flapper.js"></script>
        <script type="text/javascript" src="/js/jquery.ion.sound.min.js"></script>
        <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>        


        <!-- socket.io -->
        <script src="https://cdn.socket.io/socket.io-1.0.6.js"></script>
        
        <!-- shims for backwards compatibility -->
        <script type="text/javascript" src="http://code.famo.us/lib/functionPrototypeBind.js"></script>
        <script type="text/javascript" src="http://code.famo.us/lib/classList.js"></script>
        <script type="text/javascript" src="http://code.famo.us/lib/requestAnimationFrame.js"></script>

        <!-- module loader -->
        <script type="text/javascript" src="http://code.famo.us/lib/require.js"></script>

        <!-- famous -->
        <link rel="stylesheet" type="text/css" href="http://code.famo.us/famous/0.2/famous.css" />
        <script type="text/javascript" src="http://code.famo.us/famous/0.2/famous.min.js"></script>
        
        
        
        
        
        
        
        
        <!--        <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/CSSPlugin.min.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/easing/EasePack.min.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenLite.min.js"></script>-->
    </head>
    <body>
        <div class="content theme-black" >
            <script src='/game/pong.js'></script>
            <script src='/game/events.js'></script>
            <script src='/game/click.js'></script>
            <!--<script src='/famousmain.js'></script>-->
            
            <script type="text/javascript">
            require.config({baseUrl: 'famous/'});
            require(['main']);
        </script>
        <script src='/game/start.js'></script>
            
            <div id="panel-theme" class="game-out">
                <div id="theme-dark" val="black" class="theme"><div class="theme-tooltip">Dark theme</div></div>
                <div id="theme-green" val="green"  class="theme"><div class="theme-tooltip">Tennis theme</div></div>
                <div id="theme-blue" val="blue"  class="theme"><div class="theme-tooltip">Blue theme</div></div>
                <div id="theme-orange" val="orange"  class="theme"><div class="theme-tooltip">Sand theme</div></div>
                <div id="theme-flow" val="flow"  class="theme"><div class="theme-tooltip">Flow theme</div></div>
                <div id="theme-sch" val="sch"  class="theme"><div class="theme-tooltip">Scottish </div></div>
            </div>
            <div id="bgc" ></div>
            <div id="accountbar"  class="game-out">
                <div id="accountbar-in">
                    <!--<span class="span-button button-top" style="border:0px" id="button-halloffame">Hall of fame</span>-->
                    <!--<span class="span-button button-top"  id="button-login">Login</span>
                    <span class="span-button button-top" id="button-register">Register</span>-->
                </div></div>
            <div id="bar"  class="game-out">
                <div id="bar-in">
                    <!--<span class="span-button button-top" style="border:0px" id="button-halloffame">Hall of fame</span>-->
                    <span class="span-button button-top bar-unlogged"  id="button-faq">FAQ</span> 
                    <span class="span-button button-top bar-unlogged" id="button-howtoplay">How to play</span>
                    <span class="span-button button-top bar-unlogged" id="button-show-login">Login</span>
                    <span class="span-button button-top bar-logged" id="button-feedaccount">Feed</span>
                    <span class="span-button button-top bar-logged openpanel" panel="panel-tx" id="button-show-tx" >Transactions</span>
                    <span class="span-button button-top bar-logged" id="button-show-account">Account</span>
                    <span class="span-button button-top bar-logged" id="button-show-logout">Log out</span>
                </div></div>
            <div id="bgt" class="bg" ></div>
            <div id="bgl" class="bg" ></div>  
            <div id="bgr" class="bg" ></div>
            
            <div id="bgb" class="bg" ></div>
            <div id="bglog"  >  
                <div id="bglog1" class="bglog-in"  ></div>
                <div id="bglog2" class="bglog-in"  ></div>
                <div id="showlog">V</div>
            </div>
            <div id="version" class="game-out">v.0.5</div>
            <div id="panel-welcome" class="game-out">
                <div id="panel-welcome-in">

                    <div id="mylogo-box" > <div id="tennis-ball-in"></div>
                        <div id="sine">
  <div id="sine1"></div>
  <div id="sine2"></div>
  <div id="sine3"></div>
</div>
                        
                    </div>
                    <div id="mylogo" >BitPonger</div>

                </div>
                <div id="star"></div>
                <input type="button" class="cbutton"  value="Play now !" id="button-playnow">
            </div>

            <div id="exp" >
                Put your bitcoins into the pot !<br>
                Challenge your opponent !<br>
                Receive your earnings in bitcoins !<br><br  >
            </div>


            <div id="panel-gameready" class="canvas">
                <h3>Ready to play ?</h3>
                The match consists of 5 points.<br><br>
                
                You are playing <span id="span-playercolor"></span> on the <span id="span-playerside"></span> !<br><br>
                
                <input type="button" class="cbutton" value="Let's play!" id="button-gameready">
                <input class="buttonsmall" value="<< Cancel game" id="button-step-gameready-cancel" type="button"/>
            </div>
            <div id="panel-account" class="canvas">
                <h2>Your account</h2>
                <h3>Player info</h3>
                <label class="account-info-name">Your address</label>
                <input type="text" class="panc"  value="" id="account-address" disabled>

                <label class="account-info-name">Your name</label>
                <input type="text" class="panc"  value="" id="account-name">

                <label class="account-info-name">Your country</label>
                <input type="text" class="panc"  value="" id="account-country" >

                <input type="button" class="buttonsmall closebutton" id="game-close-account" value="<< Close" >

            </div>    
            <div id="panel-tx" class="canvas">    
                <h2>Transactions</h2>
                <div id="txabs">
                    <ul>
                        <li><a id="tab-room-10-head" href="http://www.thelostbitcoin.com:8080/#txabs-1">All</a></li>
                        <li><a id="tab-room-0-head" href="http://www.thelostbitcoin.com:8080/#txabs-2">Deposits</a></li>
                        <li><a id="tab-room-1-head" href="http://www.thelostbitcoin.com:8080/#txabs-3">Rewards</a></li>
                        <li><a id="tab-room-1-head" href="http://www.thelostbitcoin.com:8080/#txabs-4">Refunds</a></li>
                    </ul>
                    <div class="tabc" id="txabs-1">
                        <div id="transactions-box">
                            <span id="transactions-list-nb"></span>
                            <table id="transactions-list">
                                <thead><tr><td>Date</td><td>Amount</td><td>Transaction hash</td><td>Transfered ?</td><td>Confirmed ?</td><td>Status</td><td>Actions</td></tr></thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        <input type="button" class="cbutton" value="Load transactions" id="button-loadtransactions">
                    </div>
                    <div class="tabc" id="txabs-2"></div>
                    <div class="tabc" id="txabs-3">
                        <div id="rewards-box">
                            <span id="rewards-list-nb"></span>
                            <table id="rewards-list">
                                <thead><tr><td>Date</td><td>Amount</td><td>Transaction hash</td><td>Transfered ?</td><td>Confirmed ?</td><td>Status</td><td>Actions</td></tr></thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        <input type="button" class="cbutton" value="Load rewards" id="button-loadrewards">

                    </div>
                    <div class="tabc" id="txabs-4"></div>
                </div>
                <input type="button" class="buttonsmall closebutton" id="game-close-tx" value="<< Close" >
            </div>
            <div id="panel-logout" class="canvas">
                <h2>Log out</h2>
                <h3></h3>
                Are you sure you want to disconnect yourself ?
                <input type="button" class="cbutton smallbutton " value="Log out " id="button-logout">
                <input type="button" class="buttonsmall closebutton" id="game-returnhomelogout" value="<< Close" >
            </div>

            <div id="panel-step-login" class="canvas">
                <h2>Login</h2>
                <h3>Your credentials</h3>
                <label class="pan">Your bitcoin address</label>
                <span id="login-wrong">Your address and password do not match</span> 
                <input type="text" name="login-address" class="panc"  value="15ang4Kzk92ecuMmCYJ5VoxCS7AEPamM8w" id="login-address">
                <label class="pan">Your password</label>
                <input type="password" name="login-password" class="panc"  value="azeaze" id="login-password">
                <label class="error " id="span-wronglogin">Your address and password do not match !</label>
                <input type="button" class="cbutton smallbutton " value="Submit" id="button-login">
                <input type="button" class="buttonsmall closebutton" id="game-returntothehome" value="<< Close" >
            </div>

            <div id="panel-step-createplayer" class="canvas">
                <h2>Welcome !</h2>
                <h3>Create player</h3>
                <form id="form-createplayer">
                    <label class="pan">Your bitcoin address</label>
                    <input type="text" name="player-address" class="panc" value="" placeholder="ex: 15ang4Kzk92ecuMmCYJ5..." id="player-address">
                    <label class="pan">Your password</label>
                    <input type="password" name="player-password" class="panc"  value="" id="player-password" placeholder="Your password">
                    <label class="pan">Nickname (optional) </label>
                    <input type="text" name="player-nickname" class="panc" id="player-nickname" value="" placeholder="Your name">
                    <label class="pan">Country (optional)</label>
                    <select name="player-country" class="panc"  id="player-country">
                        <option value="ZZ" selected>Select your country...</option>
                        <option value="AF">Afghanistan</option>
                        <option value="AL">Albania</option>
                        <option value="DZ">Algeria</option>
                        <option value="AS">American Samoa</option>
                        <option value="AD">Andorra</option>
                        <option value="AG">Angola</option>
                        <option value="AI">Anguilla</option>
                        <option value="AG">Antigua &amp; Barbuda</option>
                        <option value="AR">Argentina</option>
                        <option value="AA">Armenia</option>
                        <option value="AW">Aruba</option>
                        <option value="AU">Australia</option>
                        <option value="AT">Austria</option>
                        <option value="AZ">Azerbaijan</option>
                        <option value="BS">Bahamas</option>
                        <option value="BH">Bahrain</option>
                        <option value="BD">Bangladesh</option>
                        <option value="BB">Barbados</option>
                        <option value="BY">Belarus</option>
                        <option value="BE">Belgium</option>
                        <option value="BZ">Belize</option>
                        <option value="BJ">Benin</option>
                        <option value="BM">Bermuda</option>
                        <option value="BT">Bhutan</option>
                        <option value="BO">Bolivia</option>
                        <option value="BL">Bonaire</option>
                        <option value="BA">Bosnia &amp; Herzegovina</option>
                        <option value="BW">Botswana</option>
                        <option value="BR">Brazil</option>
                        <option value="BC">British Indian Ocean Ter</option>
                        <option value="BN">Brunei</option>
                        <option value="BG">Bulgaria</option>
                        <option value="BF">Burkina Faso</option>
                        <option value="BI">Burundi</option>
                        <option value="KH">Cambodia</option>
                        <option value="CM">Cameroon</option>
                        <option value="CA">Canada</option>
                        <option value="IC">Canary Islands</option>
                        <option value="CV">Cape Verde</option>
                        <option value="KY">Cayman Islands</option>
                        <option value="CF">Central African Republic</option>
                        <option value="TD">Chad</option>
                        <option value="CD">Channel Islands</option>
                        <option value="CL">Chile</option>
                        <option value="CN">China</option>
                        <option value="CI">Christmas Island</option>
                        <option value="CS">Cocos Island</option>
                        <option value="CO">Colombia</option>
                        <option value="CC">Comoros</option>
                        <option value="CG">Congo</option>
                        <option value="CK">Cook Islands</option>
                        <option value="CR">Costa Rica</option>
                        <option value="CT">Cote D'Ivoire</option>
                        <option value="HR">Croatia</option>
                        <option value="CU">Cuba</option>
                        <option value="CB">Curacao</option>
                        <option value="CY">Cyprus</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="DK">Denmark</option>
                        <option value="DJ">Djibouti</option>
                        <option value="DM">Dominica</option>
                        <option value="DO">Dominican Republic</option>
                        <option value="TM">East Timor</option>
                        <option value="EC">Ecuador</option>
                        <option value="EG">Egypt</option>
                        <option value="SV">El Salvador</option>
                        <option value="GQ">Equatorial Guinea</option>
                        <option value="ER">Eritrea</option>
                        <option value="EE">Estonia</option>
                        <option value="ET">Ethiopia</option>
                        <option value="FA">Falkland Islands</option>
                        <option value="FO">Faroe Islands</option>
                        <option value="FJ">Fiji</option>
                        <option value="FI">Finland</option>
                        <option value="FR">France</option>
                        <option value="GF">French Guiana</option>
                        <option value="PF">French Polynesia</option>
                        <option value="FS">French Southern Ter</option>
                        <option value="GA">Gabon</option>
                        <option value="GM">Gambia</option>
                        <option value="GE">Georgia</option>
                        <option value="DE">Germany</option>
                        <option value="GH">Ghana</option>
                        <option value="GI">Gibraltar</option>
                        <option value="GB">Great Britain</option>
                        <option value="GR">Greece</option>
                        <option value="GL">Greenland</option>
                        <option value="GD">Grenada</option>
                        <option value="GP">Guadeloupe</option>
                        <option value="GU">Guam</option>
                        <option value="GT">Guatemala</option>
                        <option value="GN">Guinea</option>
                        <option value="GY">Guyana</option>
                        <option value="HT">Haiti</option>
                        <option value="HW">Hawaii</option>
                        <option value="HN">Honduras</option>
                        <option value="HK">Hong Kong</option>
                        <option value="HU">Hungary</option>
                        <option value="IS">Iceland</option>
                        <option value="IN">India</option>
                        <option value="ID">Indonesia</option>
                        <option value="IA">Iran</option>
                        <option value="IQ">Iraq</option>
                        <option value="IR">Ireland</option>
                        <option value="IM">Isle of Man</option>
                        <option value="IL">Israel</option>
                        <option value="IT">Italy</option>
                        <option value="JM">Jamaica</option>
                        <option value="JP">Japan</option>
                        <option value="JO">Jordan</option>
                        <option value="KZ">Kazakhstan</option>
                        <option value="KE">Kenya</option>
                        <option value="KI">Kiribati</option>
                        <option value="NK">Korea North</option>
                        <option value="KS">Korea South</option>
                        <option value="KW">Kuwait</option>
                        <option value="KG">Kyrgyzstan</option>
                        <option value="LA">Laos</option>
                        <option value="LV">Latvia</option>
                        <option value="LB">Lebanon</option>
                        <option value="LS">Lesotho</option>
                        <option value="LR">Liberia</option>
                        <option value="LY">Libya</option>
                        <option value="LI">Liechtenstein</option>
                        <option value="LT">Lithuania</option>
                        <option value="LU">Luxembourg</option>
                        <option value="MO">Macau</option>
                        <option value="MK">Macedonia</option>
                        <option value="MG">Madagascar</option>
                        <option value="MY">Malaysia</option>
                        <option value="MW">Malawi</option>
                        <option value="MV">Maldives</option>
                        <option value="ML">Mali</option>
                        <option value="MT">Malta</option>
                        <option value="MH">Marshall Islands</option>
                        <option value="MQ">Martinique</option>
                        <option value="MR">Mauritania</option>
                        <option value="MU">Mauritius</option>
                        <option value="ME">Mayotte</option>
                        <option value="MX">Mexico</option>
                        <option value="MI">Midway Islands</option>
                        <option value="MD">Moldova</option>
                        <option value="MC">Monaco</option>
                        <option value="MN">Mongolia</option>
                        <option value="MS">Montserrat</option>
                        <option value="MA">Morocco</option>
                        <option value="MZ">Mozambique</option>
                        <option value="MM">Myanmar</option>
                        <option value="NA">Nambia</option>
                        <option value="NU">Nauru</option>
                        <option value="NP">Nepal</option>
                        <option value="AN">Netherland Antilles</option>
                        <option value="NL">Netherlands (Holland, Europe)</option>
                        <option value="NV">Nevis</option>
                        <option value="NC">New Caledonia</option>
                        <option value="NZ">New Zealand</option>
                        <option value="NI">Nicaragua</option>
                        <option value="NE">Niger</option>
                        <option value="NG">Nigeria</option>
                        <option value="NW">Niue</option>
                        <option value="NF">Norfolk Island</option>
                        <option value="NO">Norway</option>
                        <option value="OM">Oman</option>
                        <option value="PK">Pakistan</option>
                        <option value="PW">Palau Island</option>
                        <option value="PS">Palestine</option>
                        <option value="PA">Panama</option>
                        <option value="PG">Papua New Guinea</option>
                        <option value="PY">Paraguay</option>
                        <option value="PE">Peru</option>
                        <option value="PH">Philippines</option>
                        <option value="PO">Pitcairn Island</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="QA">Qatar</option>
                        <option value="ME">Republic of Montenegro</option>
                        <option value="RS">Republic of Serbia</option>
                        <option value="RE">Reunion</option>
                        <option value="RO">Romania</option>
                        <option value="RU">Russia</option>
                        <option value="RW">Rwanda</option>
                        <option value="NT">St Barthelemy</option>
                        <option value="EU">St Eustatius</option>
                        <option value="HE">St Helena</option>
                        <option value="KN">St Kitts-Nevis</option>
                        <option value="LC">St Lucia</option>
                        <option value="MB">St Maarten</option>
                        <option value="PM">St Pierre &amp; Miquelon</option>
                        <option value="VC">St Vincent &amp; Grenadines</option>
                        <option value="SP">Saipan</option>
                        <option value="SO">Samoa</option>
                        <option value="AS">Samoa American</option>
                        <option value="SM">San Marino</option>
                        <option value="ST">Sao Tome &amp; Principe</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="SN">Senegal</option>
                        <option value="RS">Serbia</option>
                        <option value="SC">Seychelles</option>
                        <option value="SL">Sierra Leone</option>
                        <option value="SG">Singapore</option>
                        <option value="SK">Slovakia</option>
                        <option value="SI">Slovenia</option>
                        <option value="SB">Solomon Islands</option>
                        <option value="OI">Somalia</option>
                        <option value="ZA">South Africa</option>
                        <option value="ES">Spain</option>
                        <option value="LK">Sri Lanka</option>
                        <option value="SD">Sudan</option>
                        <option value="SR">Suriname</option>
                        <option value="SZ">Swaziland</option>
                        <option value="SE">Sweden</option>
                        <option value="CH">Switzerland</option>
                        <option value="SY">Syria</option>
                        <option value="TA">Tahiti</option>
                        <option value="TW">Taiwan</option>
                        <option value="TJ">Tajikistan</option>
                        <option value="TZ">Tanzania</option>
                        <option value="TH">Thailand</option>
                        <option value="TG">Togo</option>
                        <option value="TK">Tokelau</option>
                        <option value="TO">Tonga</option>
                        <option value="TT">Trinidad &amp; Tobago</option>
                        <option value="TN">Tunisia</option>
                        <option value="TR">Turkey</option>
                        <option value="TU">Turkmenistan</option>
                        <option value="TC">Turks &amp; Caicos Is</option>
                        <option value="TV">Tuvalu</option>
                        <option value="UG">Uganda</option>
                        <option value="UA">Ukraine</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="GB">United Kingdom</option>
                        <option value="US">United States of America</option>
                        <option value="UY">Uruguay</option>
                        <option value="UZ">Uzbekistan</option>
                        <option value="VU">Vanuatu</option>
                        <option value="VS">Vatican City State</option>
                        <option value="VE">Venezuela</option>
                        <option value="VN">Vietnam</option>
                        <option value="VB">Virgin Islands (Brit)</option>
                        <option value="VA">Virgin Islands (USA)</option>
                        <option value="WK">Wake Island</option>
                        <option value="WF">Wallis &amp; Futana Is</option>
                        <option value="YE">Yemen</option>
                        <option value="ZR">Zaire</option>
                        <option value="ZM">Zambia</option>
                        <option value="ZW">Zimbabwe</option>

                    </select> 
                </form>

                <input type="button" class="cbutton" value="Submit" id="button-saveplayer">

                <input type="button" class="buttonsmall" id="game-returnhome" value="<< Return to home" >
            </div>
            <div id="panel-step-sendpayment" class="canvas  game-out">
                <h2>Balance</h2>
                
                <div class="bar-knownplayer">
                <span id="span-feed-logged">Your balance <span id="span-feed-logged-box"><span id="span-feed-logged-val">0</span> mBTC</span><br><br></span>
                </div>
                
                Each room has a different pot size. Feed the pot to enter a room and challenge your opponent ! Send the payment to the pot address below and then press the button.<br>
                <h3>Feed your account</h3>
                <div id="payment-left">

                    <div id="room-selector">
                        <div class='bar-unknownplayer'><label for="radio-chooseroom-guest"><div class="payment-amount"><input  checked type="radio" value="-2" name="radio-chooseroom" class="radio-chooseroom" id="radio-chooseroom-guest"><div class="payment-def"><strong>Guest<span id="roomsize-0"></span></strong>No pot size <span class="btc"></span></div></div></label></div>
                        <label for="radio-chooseroom-1"><div class="payment-amount"><input type="radio" value="0.001" name="radio-chooseroom" class="radio-chooseroom" id="radio-chooseroom-1"><div class="payment-def"><strong>Tiny Room<span id="roomsize-1"></span></strong>Pot size <span class="btc">1 mBTC</span></div></div></label>
                        <label for="radio-chooseroom-2"><div class="payment-amount"><input  type="radio" value="0.01"  name="radio-chooseroom" class="radio-chooseroom" id="radio-chooseroom-2"><div class="payment-def"><strong>Small Room<span id="roomsize-10"></span></strong>Pot size <span class="btc">10 mBTC</span></div></div></label>
                        <label for="radio-chooseroom-3"><div class="payment-amount"><input type="radio"  value="0.1" name="radio-chooseroom" class="radio-chooseroom" id="radio-chooseroom-3"><div class="payment-def"><strong>Medium Room<span id="roomsize-100"></span></strong>Pot size <span class="btc">100 mBTC</span></div></div></label>
                        <label for="radio-chooseroom-4"><div class="payment-amount"><input type="radio"  value="1" name="radio-chooseroom" class="radio-chooseroom" id="radio-chooseroom-4"><div class="payment-def"><strong>Large Room<span id="roomsize-1000"></span></strong>Pot size <span class="btc">1BTC</span></div></div></label>
                        <!--<label for="radio-chooseroom-5"><div class="payment-amount"><input type="radio"  value="-1" name="radio-chooseroom" class="radio-chooseroom" id="radio-chooseroom-5"><div class="payment-def"><strong>Free amount<span id="roomsize--1"></span></strong> You can play as long as you are credited</div></div></label>-->
                        <br class="clear">
                    </div>
                </div>
                <div id="payment-right">
                    <br><br>
                    <div id="payment-right-charge" style="display:none">
                        <div id="qr-box">
                            <img id="bitcoin-qr" height="150" width="150" src="">
                            <div id="bitcoin-qr-overlay">Loading QR Code...<input class="cbutton smallbutton" value="Refresh" id="button-qrcode-refresh"></div>
                            <textarea readonly class=" text-qr" id="payment-address" ></textarea><br><br>
                        </div>

                        <input type="button" class="cbutton"  id="button-declarepaymentsent" value="I fed the pot !">

                        <span id="step-send-payment-check" style="margin-left:20px;display:none">Checking the pot...</span>
                    </div>
                    <div id="payment-right-free" >
                        <input type="button" class="cbutton"  id="button-enterasguest" value="Enter the room">
                    </div>

                </div>
                <input class="buttonsmall untour closebutton" value="<< Close" id="button-stn" type="button"/>
                <input class="buttonsmall tour" value="<< Return to create player" id="button-step-sendpayment-return" type="button"/>
                <br class="clear">
            </div>

            <div id="panel-joinroom" style="display:none" class="canvas"  class="game-out">
                <h2>Hall</h2>
                <div id="room-chart">

                    <div id="room-chart-in">
                        <div id="room-chart-x"></div>
                        <div id="room-chart-y"></div>
                    </div>


                </div>
                <h3>Choose your room </h3>
                <div id="panel-joinroom-recap-box">
                    <div id="panel-joinroom-recap-box-in"></div><br>
                    <input type="button" class="cbutton smallbutton buttonwhite" value="Change rooms" id="button-joinroom-edit"/> 
                </div><br>
                <div id="panel-joinroom-choose-box">

                    Select the rooms you want to appear in, up to your budget.
                    <div id="room-select">
                        <div id="room-select-all" class="room-sel" val="all">All<span class="room-sel-am">&nbsp;</span></div>
                        <div id="room-select-0" class="room-sel" val="0">Guest<span class="room-sel-am">Free play</span></div>
                        <div id="room-select-1" class="room-sel" val="1">Tiny Room<span class="room-sel-am">Up to 1mBTC</span></div>
                        <div id="room-select-10" class="room-sel" val="10">Small Room<span class="room-sel-am">Up to 10mBTC</span></div>
                        <div id="room-select-100" class="room-sel" val="100">Medium Room<span class="room-sel-am">Up to 100mBTC</span></div>
                        <div id="room-select-1000" class="room-sel" val="1000">Large Room<span class="room-sel-am">Up to 1BTC</span></div>
                        <div class="clear"></div>
                    </div>
                    <input type="button" class="cbutton  smallbutton buttonwhite" value="Done" id="button-joinroom-edited"/> 
                </div>
                <div id="panel-joinroom-thank">
                    <h3>Thank you for feeding the pot ! </h3>
                    The transaction <a id="transaction-hash" href="" target="new" ></a>     has been successfully found and your account has been credited with <span id="transaction-amount"></span>.<br><br>
                    To be certified, it now needs confirmation from the Bitcoin servers. Still, you can play while the bitcoin transaction is being confirmed. Just remind that any rejected transaction will cancel the game you play<br><br>
                </div>
                <h3>Challenge your opponent</h3>
                <span id="span-challengeroom"></span>
                <div id="tabs">
                    <ul>
                        <li><a id="tab-room-0-head" href="http://www.thelostbitcoin.com:8080/#tabs-all">All</a></li>
                        <li><a id="tab-room-0-head" href="http://www.thelostbitcoin.com:8080/#tabs-1">Guest</a></li>
                        <li><a id="tab-room-1-head" href="http://www.thelostbitcoin.com:8080/#tabs-2">1 mBTC</a></li>
                        <li><a id="tab-room-10-head" href="http://www.thelostbitcoin.com:8080/#tabs-3">10 mBTC</a></li>
                        <li><a id="tab-room-100-head" href="http://www.thelostbitcoin.com:8080/#tabs-4">100 mBTC</a></li>
                        <li><a id="tab-room-1000-head" href="http://www.thelostbitcoin.com:8080/#tabs-5">1 BTC</a></li>

                    </ul>
                    <div class="tabc" id="tabs-all">
                        <table class="tableroomcontent" id="roomcontent-all"> <thead><tr><td>Nickname</td><td>Entered</td><td>Amount</td><td>Play ?</td></tr>                        </thead> <tbody>                        </tbody>                    </table>
                    </div>
                    <div class="tabc" id="tabs-1">
                        <table class="tableroomcontent"  id="roomcontent-0"> <thead><tr><td>Nickname</td><td>Entered</td><td>Amount</td><td>Play ?</td></tr>                        </thead> <tbody>                        </tbody>                    </table>
                    </div> 
                    <div  class="tabc" id="tabs-2">
                        <table class="tableroomcontent"  id="roomcontent-1"> <thead><tr><td>Nickname</td><td>Entered</td><td>Amount</td><td>Play ?</td></tr>                        </thead> <tbody>                        </tbody>                    </table>
                    </div>
                    <div class="tabc"  id="tabs-3">
                        <table class="tableroomcontent" id="roomcontent-10"> <thead><tr><td>Nickname</td><td>Entered</td><td>Amount</td><td>Play ?</td></tr>                        </thead> <tbody>                        </tbody>                    </table>
                    </div>
                    <div class="tabc"  id="tabs-4">
                        <table class="tableroomcontent"  id="roomcontent-100"> <thead><tr><td>Nickname</td><td>Entered</td><td>Amount</td><td>Play ?</td></tr>                        </thead> <tbody>                        </tbody>                    </table>
                    </div>
                    <div class="tabc"  id="tabs-5">
                        <table  class="tableroomcontent" id="roomcontent-1000"> <thead><tr><td>Nickname</td><td>Entered</td><td>Amount</td><td>Play ?</td></tr>                        </thead> <tbody>                        </tbody>                    </table>
                    </div>
                </div>  


                <input type="button" class="cbutton smallbutton  buttonwhite"  id="button-updateroomcontent" value="Update" >

                <input class="buttonsmall tour" value="<< Return to feed" id="button-step-hall-return" type="button"/>
                <input class="buttonsmall closebutton untour" value="<< Close" id="button-step-hall-return-2" type="button"/>

            </div>

            <div id="panel-askedchallenge" style="display:none" class="canvas"  class="game-out">
                <h3 style="cursor: move;">You are challenged ! </h3>
                <div id="panel-askedchallenge-in">
                <table id="challenger-list">
                    <thead><tr><td>Name</td><td>Amount</td><td>Date</td><td>Play ?</td><td>&nbsp;</td></thead>
                    <tbody></tbody>
                </table> </div> 
            </div>

            <div id="panel-game-end" style="display:none" class="canvas" >
                <h3 id="panel-game-end-result"></h3>
                <div id="span-gameend-result-pay">
                    
                <span id="span-gameend-result-pay-win">You have won the game with the score of <span id="span-gameend-result-win-score"> </span>!
                    <br><br>Celebrate you winning as you receive the pot size of <span></span> 
                    to be transfered to you bitcoin address <span id="span-gameend-result-address"></span> in a few seconds. <br><br>
                    <span id="panel-gameend-pay-win-rewardhash"></span>
                    Notice that it may take a few minutes before you see the transaction in the blockchain.<br><br>
                </span> 
                    
                <span id="span-gameend-result-pay-lost">You have lost the game with the score of <span id="span-gameend-result-lost-score">      </span>. <br>
                    </span> 
                    </div>
                <div id="span-gameend-result-free">
                    <div id="span-gameend-result-free-win">You win the free game</div>
                    <div id="span-gameend-result-free-lost">You lost the free game</div>
                    
                    
                </div>
                <div id="rechallengeinfo">
                        
                    </div>
                <input type="button" class="cbutton buttonwhite"  id="game-returntotheroom" value="Return to the room" >
            </div>
            <div id="panel-howitworks" style="display:none" class="canvas">
                <h2>How to play</h2>
                <h3>The game</h3>
                Bitpong is a realtime multiplayer game featuring the pionneer virtual tennis table Pong, released in 1967. <br><br>
                Challenge online opponents in a realtime game and double your stake each time you win a set.<br><br>
                To process as below : <br>
                Feed the pot by sending a Bitcoin payment to the pot address. There are four different pot sizes : 0.001B, 0.01B, 0.1B and 1B. You may enter the room as soon as the transaction is being processed.<br>
                Choose an opponent among the online connected players of the room.<br>
                Enter the game court : you will be given the role of Player 1 (blue bar on the left) or Player 2 (red bar on the right). 
                The first player to receive the ball is choosen randomly. 
                Return the ball behind the opponent line to score a turn.
                A set is made of 5 turns. Win at least 3 turns to win the game !<br>
                As you win, your Bitcoin address will be credited the pot, i.e. 1.95x your stake !<br>
                <input type="button" class="cbutton buttonwhite"  id="button-howitworks-close" value="Close" >
            </div>

            <div id="panel-faq" style="display:none" class="canvas">
                <h2>F.A.Q.</h2>
                <h3>Rules</h3>
                <h4>How do I win a turn ?</h4>
                You win the ball if you succeed returning the ball behind the opponent line.
                <h4>What happens if I leave the game during a turn ?</h4>

                <h4>What happens if I get disconnected / refresh the page ?</h4>
                If you get temporarily disconnected, the server will attempt to reconnect you 
                <h4>Can I play BitPong with several people on the same computer ?</h4>
                Among others, BitPong uses sessions to identify the player. You can play simultenaously only if each player is on a different browser. The game will not work if you play simultaneously on the same browser (multiple tabs).
                <h4>I have found a bug, how can I submit it ?</h4>

                <h4>How can I suggest improvements to the game ?</h4>
                Feel free to write us some comments on 
                <h4>Can I change my bitcoin address ?</h4>
                No, for security reasons your account is deeply related to your bitcoin address. If you want to change your address, you can ask a refund from your actual account and create a new one.
                <input type="button" class="cbutton buttonwhite"  id="button-faq-close" value="Close" >
            </div>


            <div id="panel-halloffame" style="display:none" class="canvas">
                <h3>Hall of fame</h3>
                <table>
                    <thead>
                        <tr><td>Nickname</td><td>Country</td><td>Date</td><td>Amount</td></tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <input type="button" class="cbutton buttonwhite"  id="button-halloffame-close" value="Close" >
            </div>

            <div id="panel-opponentdisconnected" style="display:none" class="canvas">
                <h3>Your opponent left the game !</h3>

                <input type="button" class="cbutton buttonwhite"  id="button-opponentdisconnected-close" value="Close" >
            </div>

            <!--            <input id="disconnect" class="cbutton buttonwhite" value="Leave game"/>-->

            <br class="clear">
            <input type="hidden" value="" id="tid">
            <input type="hidden" value="" id="game-cid">
            <input type="hidden" value="0" id="pid">
            <input type="hidden" id="payment-hash" value="">




            <div class="in-game scorepanel"  id="player-info">
                <div id="player-info-left">
                    <span class="playerinfo-score"  id="playerinfo-score-left" >0</span>
                    <div class="playerinfo-box"  id="playerinfo-box-left">
                        <img class="playerinfo-flag flag" id="playerinfo-left-flag">
                        <span id="player1">Player 1</span>
                        <span id="playerinfo-left-type">You</span>
                    </div>
                    <br class="clear">
                </div>
                <div id="player-info-right"> 
                    <span class="playerinfo-score"  id="playerinfo-score-right" >0</span>

                    <div class="playerinfo-box" id="playerinfo-box-right">

                        <span id="player2">Player 2</span> <img class="playerinfo-flag flag" id="playerinfo-right-flag"> <br class="clear">
                        <span id="playerinfo-right-type">Opponent</span>
                    </div>
                    <br class="clear">
                </div>


            </div>
            <div class="in-game scorepanel" id="panel-flapscore">
                <div id="panel-flapscore-left">
                    <span id="panel-flapscore-left-name">Player 1</span> 
                    <span id="panel-flapscore-left-type"></span> 
                    <img id="panel-flapscore-left-flag"  class="flag panel-flapscore-flag"> 
                    <input class="playerinfo-score-flap" id="playerinfo-flapscore-left-flap" value="0"/>
                </div>
                <div id="panel-flapscore-right">
                    <span id="panel-flapscore-right-name">Player 2</span> 
                    <span id="panel-flapscore-right-type"></span> 

                    <img class="panel-flapscore-flag flag" id="panel-flapscore-right-flag"> 
                    <input class="playerinfo-score-flap"  id="playerinfo-flapscore-right-flap" value="0">
                </div>
                <br class="clear">

            </div>
            <div class="in-game" id="player2-pad"></div>
            <div class="in-game" id="player1-pad"></div>
            <div class="in-game" id="ball"></div>
            <div class="" id="bounce">
                <div class="" id="bounce-in">

                </div>

            </div>

            <div id="alert3">3</div>
            <div id="alert2">2</div>
            <div id="alert1">1</div>
            <div id="alert-point-youlost">you lost</div>
            <div id="alert-point-youwin">you win</div>
            <div id="alert-match-youlost">you lost the game...</div>
            <div id="alert-match-youwin">you win the game !</div>
            <div id="alertstart">start</div>
            
<div class="in-game" id="speedbar" >Speed indicator
  <div id="speedbar-in" >  
    <div id="speedbar-in-in"></div>
  </div>
</div>
            
            <div id="horline"></div>
        </div>
        <div id="topbar">
            <div class="topbarb topbarwithlogo" id="sound"><img src="img/raise.png" ></div>
            <!--<div class="topbarb" id="logg"><img src="img/user.png" ><span id="logbu">log</span></div>-->
            <div class="topbarb" id="count"><img src="img/coins-icon.png" ><span id="count-amount" >0</span><span id="count-dev">mBTC</span></div>
            <div class="topbarb topbarwithlogo" id="user"><img src="img/user.png" ><span id="user-count" >0</span><span id="user-desc">online</span></div>
            <br class="clear">
        </div>
        <div id="bottomspace">
            <div id="bs-in">
                <div id="bottomspace-close">X</div>
            </div>
        </div>
        <div id="rightspace">
            <div id="rs-in"> 
                <div id="rs-in-top"> 
                <div id="rightspace-header" class="rs-head" style="display:none">
                    ROOM COMPOSITION
                
                </div>
                <div id="rightspace-close">X</div>
                <table id="rightspace-table"><thead> </thead><tbody></tbody></table>
                </div>
                <div id="rs-in-bottom"> 
                    <div id="log">
                         <div id="log-head" class="rs-head">LOG
                             <div id="log-close">X</div></div><div id="log-in"></div></div>
            </div>
            </div>
            
        </div>
        <div id="reconnecting"><div id="reconnecting-in"  class="canvas">Reconnecting</div></div>
        <div id="ajaxloader"><div id="ajaxloader-in"></div></div>
        <div id="voile"></div> 
    </body>
</html>










<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

