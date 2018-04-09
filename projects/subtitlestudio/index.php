<!DOCTYPE HTML>
<?php
    function getStatsUrl()
    {
        return "http://sourceforge.net/projects/lyrs2sub/files/Subtitle%20Studio%203.1%20for%20Windows.zip/stats/timeline?dates=2012-05-01+to+". date("Y-m-d");
    }

    function downloadCount()
    {
        $url = "http://sourceforge.net/projects/lyrs2sub/files/Subtitle%20Studio%203.1%20for%20Windows.zip/stats/json?start_date=2012-05-01&end_date=" . date("Y-m-d");
        $response = file_get_contents($url);
        $json = json_decode($response);
        return $json->{'total'};
    };
?>
    <html>

    <head>
        <title>Subtitle Studio by Swapnil</title>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600" rel="stylesheet" type="text/css" />
        <!-- Fancy image -->
        <script type="text/javascript" src="fancybox/lib/jquery-1.10.1.min.js"></script>
        <script type="text/javascript" src="fancybox/lib/jquery.mousewheel-3.0.6.pack.js"></script>
        <script type="text/javascript" src="fancybox/source/jquery.fancybox.js?v=2.1.5"></script>
        <link rel="stylesheet" type="text/css" href="fancybox/source/jquery.fancybox.css?v=2.1.5" media="screen" />
        <link rel="stylesheet" type="text/css" href="fancybox/source/helpers/jquery.fancybox-buttons.css?v=1.0.5" />
        <script type="text/javascript" src="fancybox/source/helpers/jquery.fancybox-buttons.js?v=1.0.5"></script>
        <link rel="stylesheet" type="text/css" href="fancybox/source/helpers/jquery.fancybox-thumbs.css?v=1.0.7" />
        <script type="text/javascript" src="fancybox/source/helpers/jquery.fancybox-thumbs.js?v=1.0.7"></script>
        <script type="text/javascript" src="fancybox/source/helpers/jquery.fancybox-media.js?v=1.0.6"></script>
        <!--[if lte IE 8]><script src="js/html5shiv.js"></script><![endif]-->
        <script src="js/jquery.dropotron.min.js"></script>
        <script src="js/skel.min.js"></script>
        <script src="js/skel-panels.min.js"></script>
        <script src="js/init.js"></script>
        <noscript>
            <link rel="stylesheet" href="css/skel-noscript.css" />
            <link rel="stylesheet" href="css/style.css" />
            <link rel="stylesheet" href="css/style-desktop.css" />
            <link rel="stylesheet" href="css/style-noscript.css" /> </noscript>
        <!--[if lte IE 8]><link rel="stylesheet" href="css/ie8.css" /><![endif]-->
        <script type="text/javascript">
            $(document).ready(function () {
                $(".fancybox-effects-d").fancybox({
                    padding: 0,
                    openEffect: 'elastic',
                    openSpeed: 250,
                    closeEffect: 'elastic',
                    closeSpeed: 250,
                    closeClick: true,
                    helpers: {
                        overlay: null
                    }
                });
            });
        </script>
        <link rel="stylesheet" href="css/mystyle.css" /> </head>

    <body class="homepage">
        <!-- Header -->
        <div id="header">
            <!-- Inner -->
            <div class="inner">
                <header>
                    <h1><a href="index.php" id="logo">Subtitle Studio 3.1</a></h1>
                    <hr /> <span class="byline">create, convert, upload, download subtitles</span> </header>
                <footer> <a href="#banner" class="rect scrolly">Xplore more</a> <a href="#swap" class="rect scrolly" style="margin-left:10px;">Contact</a> </footer>
            </div>
        </div>
        <!-- Banner -->
        <div id="banner">
            <h2 style="margin-top: -30px;">Say Hi to the new Subtitle Studio.</h2> <span class="byline">
					Now you can upload subtitles you created, or search for subtitles in database both for Movies and Music videos.
					<br>
					<br>
					<span style="margin-top: 50px;"><a href="#create" class="scrolly rect2">Xplore even more</a></span> </span>
        </div>
        <!-- Carousel -->
        <div class="carousel" style="margin-top: -70px;">
            <div class="reel">
                <article>
                    <a href="images/01.jpg" rel="group" class="image featured fancybox-effects-d"><img src="images/pic01.jpg" alt="" /></a>
                    <header>
                        <h3><a href="#create" class="scrolly">Create</a></h3> </header>
                </article>
                <article>
                    <a href="images/02.jpg" rel="group" class="image featured fancybox-effects-d"><img src="images/pic02.jpg" alt="" /></a>
                    <header>
                        <h3><a href="#create" class="scrolly">Convert</a></h3> </header>
                </article>
                <article>
                    <a href="images/03.jpg" rel="group" class="image featured fancybox-effects-d"><img src="images/pic03.jpg" alt="" /></a>
                    <header>
                        <h3><a href="#upload" class="scrolly">Upload</a></h3> </header>
                </article>
                <article>
                    <a href="images/04.jpg" rel="group" class="image featured fancybox-effects-d"><img src="images/pic04.jpg" alt="" /></a>
                    <header>
                        <h3><a href="#upload" class="scrolly">Download</a></h3> </header>
                </article>
            </div>
        </div>
        <!-- Features -->
        <div class="wrapper style1" id="create">
            <section id="features" class="container special" style="margin-top: -70px;">
                <header>
                    <h2>Simple. Easy. Free.</h2>
                    <span class="byline">Subtitle Studio <a href="https://github.com/MarkXLII/subtitle-studio" target="_blank">Open Source</a>d Now!</span>
                </header>
                <div class="row">
                    <article class="6u special">
                        <a href="images/01.jpg" rel="group" class="image featured fancybox-effects-d"><img src="images/pic01.jpg" alt="" /></a>
                        <header>
                            <h3>Create subtitles</h3> </header>
                        <p> This feature will enable you to create subtitles for any videos of your choice. So create subtitles for your favourite music videos and share them with everyone by following these simple steps!
                            <br> 1. Browse your video
                            <br> 2. Add simple text lyrics
                            <br> 3. The application will enable you to synchronize those lyrics and create its subtitle file
                            <br> Easy and fun! </p>
                    </article>
                    <article class="6u special">
                        <a href="images/02.jpg" rel="group" class="image featured fancybox-effects-d"><img src="images/pic02.jpg" alt="" /></a>
                        <header>
                            <h3>Convert subtitles</h3> </header>
                        <p> So you created your subtitle file (srt) using the create feature. But wanna go a step further and make those subtitles look more interesting?
                            <br> Using the convert feature, customize the subtitle file, customize its font, size, style and so on. Add various animation effects you want to in order to make the subtitles look really cool on the video!
                            <br> Exciting eh? </p>
                    </article>
                </div>
                <div class="row" id="upload">
                    <article class="6u special">
                        <a href="images/03.jpg" rel="group" class="image featured fancybox-effects-d"><img src="images/pic03.jpg" alt="" /></a>
                        <header>
                            <h3>Upload subtitles</h3> </header>
                        <p> The upload feature will enable you to upload music videos or movie subtitle files on the Subtitle Studio server for free! Wait no longer to share your subtitle files with everyone! </p>
                    </article>
                    <article class="6u special">
                        <a href="images/04.jpg" rel="group" class="image featured fancybox-effects-d"><img src="images/pic04.jpg" alt="" /></a>
                        <header>
                            <h3>Download subtitles</h3> </header>
                        <p> Want to watch a music video or a movie along with it's subtitles? Just use the download feature and search and download any subtitle files you want! </p>
                    </article>
                </div>
                <hr>
                <header> <span style="margin-top: 0px;" class="byline">So what are you waiting for when fun with music and lyrics is just a click away!</span>
                    <h2 style="margin-top: -50px;"><a href="#features2" class="scrolly">Download</a></h2> </header>
            </section>
        </div>
        <!-- Features -->
        <div class="wrapper style1" id="features2">
            <section id="features3" class="container special">
                <header style="margin-top: -50px;">
                    <h2>Download now for free</h2>
                    <h3><a target="_blank" href=<?php  echo getStatsUrl();?>><strong><?php  echo downloadCount();?></strong> downloads so far and counting...</a></h3> <span class="byline">Subtitle Studio is a Java application which requires the following things installed in order to work:</span>
                    <ul>
                        <li>Java Runtime Environment. Get it <strong><a target="_blank" href="http://java.com/en/download/index.jsp">here</a></strong>.</li>
                        <li>VLC media player(32 bit version only!). Get it <strong><a target="_blank" href="http://www.videolan.org/vlc/index.html">here</a></strong>.</li>
                    </ul> <span class="byline"><a class="rect2" target="_blank" href="http://sourceforge.net/projects/lyrs2sub/files/latest/download?source=files">Download Subtitle Studio 3.1</a></span>
                    <h3>If you like Subtitle Studio, buy me a coffee ;&#41;</h3>
                    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                        <input type="hidden" name="cmd" value="_s-xclick">
                        <input type="hidden" name="hosted_button_id" value="FWZFUU3RYQYBW">
                        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG_global.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online!">
                        <img alt="" border="0" src="https://www.paypalobjects.com/en_GB/i/scr/pixel.gif" width="1" height="1">
                    </form>

                    <div class='shareaholic-canvas' data-app='share_buttons' data-app-id='4837477'></div>
                </header>
            </section>
        </div>
        <!-- Footer -->
        <div id="swap">
            <div id="footer">
                <div class="container">
                    <header>
                        <h2 style="margin-top:-50px; margin-bottom:90px;">QUESTIONS OR COMMENTS? GET IN TOUCH:</h2> </header>
                    <div class="row">
                        <div class="6u">
                            <section>
                                <form method="post" action="message.php">
                                    <div class="row half">
                                        <div class="6u">
                                            <input name="name" id="name" placeholder="Name" type="text" class="text" required/> </div>
                                        <div class="6u">
                                            <input name="email" id="email" placeholder="Email" type="email" class="text" required/> </div>
                                    </div>
                                    <div class="row half">
                                        <div class="12u">
                                            <textarea name="message" id="message" placeholder="Message" required></textarea>
                                        </div>
                                    </div>
                                    <div class="row half">
                                        <div class="12u">
                                            <button type="submit" class="button button-icon fa fa-envelope button2"> Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </section>
                        </div>
                        <div class="6u">
                            <!-- Contact -->
                            <section class="contact">
                                <ul class="icons">
                                    <li><a target="_blank" href="https://www.facebook.com/SwapnilBhoite28" class="fa fa-facebook solo"><span>Facebook</span></a></li>
                                    <li><a target="_blank" href="https://plus.google.com/112676652162568598342" class="fa fa-google-plus solo"><span>Google+</span></a></li>
                                    <li><a target="_blank" href="http://in.linkedin.com/in/swapnilbhoite" class="fa fa-linkedin solo"><span>Linkedin</span></a></li>
                                    <li><a target="_blank" href="https://github.com/MarkXLII" class="fa fa-github solo"><span>Linkedin</span></a></li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
                <hr style="margin-top: -50px; margin-bottom: 120px;">
                <!-- Copyright -->
                <div class="copyright">
                    <ul class="menu">
                        <li>&copy; Swapnil Bhoite. All rights reserved.</li>
                        <li><a target="_blank" href="https://www.facebook.com/SwapnilBhoite28">Facebook profile</a></li>
                        <li><a target="_blank" href="http://in.linkedin.com/in/swapnilbhoite">Linkedin profile</a></li>
                        <li>Template by: <a href="http://html5up.net" target="_blank">HTML5 UP</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </body>
    <script type="text/javascript">
        //<![CDATA[
        (function () {
            var shr = document.createElement('script');
            shr.setAttribute('data-cfasync', 'false');
            shr.src = '//dsms0mj1bbhn4.cloudfront.net/assets/pub/shareaholic.js';
            shr.type = 'text/javascript';
            shr.async = 'true';
            shr.onload = shr.onreadystatechange = function () {
                var rs = this.readyState;
                if (rs && rs != 'complete' && rs != 'loaded') return;
                var site_id = 'e11081cd4613fd7a032a8e65636bc7cc';
                try {
                    Shareaholic.init(site_id);
                } catch (e) {}
            };
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(shr, s);
        })();
        //]]>
    </script>
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-92525667-1', 'auto');
        ga('send', 'pageview');
    </script>

    </html>